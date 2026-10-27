import { test, expect } from '@playwright/test';

test('frame visits preserve the Vue navigation and replace page components', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    const navigation = page.locator('.navigation');
    await expect(navigation).toBeVisible();
    const instance = await navigation.getAttribute('data-instance');
    const firstPage = await page.locator('.page').getAttribute('data-instance');
    await page.evaluate(() => {
        window.navigationElement = document.querySelector('.navigation');
        window.unmountedPages = [];
        const observeUnmount = element => element.addEventListener('vue:unmount', event => window.unmountedPages.push(event.detail.componentName));
        document.querySelectorAll('[data-symfony--ux-vue--vue-component-value]').forEach(observeUnmount);
        document.addEventListener('vue:mount', event => observeUnmount(event.target));
    });
    await page.getByRole('button', { name: 'Navigation clicks: 0' }).click();
    await page.getByLabel('Navigation draft').fill('Keep me');
    await page.getByRole('button', { name: 'Page clicks: 0' }).click();

    const request = page.waitForRequest(request => request.url().endsWith('/notes') && request.headers()['turbo-frame'] === 'page-content');
    await page.getByRole('link', { name: 'Notes', exact: true }).click();
    await request;
    await expect(page.getByRole('heading', { name: 'A temporary notebook.' })).toBeVisible();
    await expect(page).toHaveURL('/notes');
    await expect(page.getByRole('link', { name: 'Notes', exact: true })).toHaveAttribute('aria-current', 'page');
    await page.getByLabel('Page note').fill('Hello');
    await expect(page.getByText('5 characters')).toBeVisible();

    await page.getByRole('link', { name: 'Colors', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'A change of color.' })).toBeVisible();
    await page.getByRole('button', { name: 'Peach', exact: true }).click();
    await expect(page.locator('.swatch')).toHaveText('Peach');
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'A temporary notebook.' })).toBeVisible();
    await page.goForward();
    await expect(page.getByRole('heading', { name: 'A change of color.' })).toBeVisible();

    await page.getByRole('link', { name: 'Counter', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Page clicks: 0' })).toBeVisible();
    await expect(page.locator('.page')).not.toHaveAttribute('data-instance', firstPage);
    await expect(navigation).toHaveAttribute('data-instance', instance);
    await expect(page.getByRole('button', { name: 'Navigation clicks: 1' })).toBeVisible();
    await expect(page.getByLabel('Navigation draft')).toHaveValue('Keep me');
    expect(await page.evaluate(() => window.navigationElement === document.querySelector('.navigation'))).toBe(true);
    expect(await page.evaluate(() => window.unmountedPages)).toEqual(expect.arrayContaining(['Counter', 'Notes', 'Colors']));
    expect(errors).toEqual([]);
});

for (const [url, heading] of [['/notes', 'A temporary notebook.'], ['/colors', 'A change of color.']]) {
    test('direct load and refresh: ' + url, async ({ page }) => {
        await page.goto(url);
        await expect(page.getByRole('heading', { name: heading })).toBeVisible();
        await page.reload();
        await expect(page.getByRole('heading', { name: heading })).toBeVisible();
        await expect(page.locator('nav [aria-current="page"]')).toHaveAttribute('href', url);
    });
}
