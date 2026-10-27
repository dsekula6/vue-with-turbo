<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

final class PlaygroundControllerTest extends WebTestCase
{
    public function testPagesExposeUxVueComponentsAndFrameTargets(): void
    {
        $client = static::createClient();
        foreach (['/' => 'Counter', '/notes' => 'Notes', '/colors' => 'Colors'] as $url => $component) {
            foreach ([[], ['HTTP_TURBO_FRAME' => 'page-content']] as $headers) {
                $client->request('GET', $url, server: $headers);
                self::assertResponseIsSuccessful();
                self::assertSelectorExists('#playground-navigation[data-turbo-permanent][data-symfony--ux-vue--vue-component-value="Navigation"]');
                self::assertSelectorExists('turbo-frame#page-content[data-turbo-action="advance"] [data-symfony--ux-vue--vue-component-value="'.$component.'"]');
            }
        }
    }
}
