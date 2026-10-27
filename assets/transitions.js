const curtain = document.querySelector('[data-transition-curtain]');
const frame = document.querySelector('#page-content');
let startedAt = 0;
let hideTimer;

if (curtain && frame) {
    document.addEventListener('turbo:before-fetch-request', (event) => {
        if (!event.target.closest?.('#page-content')) return;

        clearTimeout(hideTimer);
        startedAt = performance.now();
        curtain.classList.add('is-visible');
        curtain.setAttribute('aria-hidden', 'false');
    });

    document.addEventListener('turbo:before-frame-render', (event) => {
        if (event.target.id !== 'page-content' || !startedAt) return;

        const render = event.detail.render;
        const duration = Number(frame.dataset.transitionDuration ?? 1800);
        const remaining = Math.max(0, duration - (performance.now() - startedAt));

        event.detail.render = async (...args) => {
            if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
            await render(...args);

            startedAt = 0;
            hideTimer = setTimeout(() => {
                curtain.classList.remove('is-visible');
                curtain.setAttribute('aria-hidden', 'true');
            }, 250);
        };
    });

    document.addEventListener('turbo:fetch-request-error', () => {
        startedAt = 0;
        curtain.classList.remove('is-visible');
        curtain.setAttribute('aria-hidden', 'true');
    });
}
