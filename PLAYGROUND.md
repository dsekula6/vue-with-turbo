# Vue + Turbo playground

Start Symfony with `symfony serve -d`, run `npm run build`, and open
http://127.0.0.1:8000. For frontend development, use `npm run dev` instead
of the build command.

- `/`: Counter.vue
- `/notes`: Notes.vue
- `/colors`: Colors.vue

Increment the navigation counter and enter a navigation draft. Visit all three
pages, then use Back/Forward: the navigation state and instance ID stay the same.
Page-local state resets when its component mounts again. Reloading the browser
resets all state.

## How it works

Each route has its own controller and Twig page. The page template directly names its Vue component with Symfony UX Vue's `vue_component()` helper. The shared shell and Turbo Frame live in `templates/base.html.twig`; navigation links live in a small Twig include.
Vite/Reprise compiles the Vue single-file components and starts Stimulus and
Turbo from `assets/controllers.json`. The template loads only the Vite entry,
avoiding duplicate applications from loading an importmap entry as well.

Navigation links target `turbo-frame#page-content`. Turbo fetches the destination
HTML and extracts that frame. Each destination template defines its own Vue component, so Symfony UX mounts Counter.vue, Notes.vue, or Colors.vue directly. This is Turbo
Frame navigation with `data-turbo-action="advance"` for URL/history updates,
rather than ordinary Turbo Drive full-body replacement. Responses contain the
full page, so direct URLs and refresh work too.

The navigation sits outside the frame and has a stable ID and
`data-turbo-permanent`. History restoration can still replace the body.
The standard UX Vue controller unmounts on Stimulus disconnect, including when
Turbo temporarily detaches a permanent element. `assets/vue/PermanentVueController.js`
extends that controller to retain its app during a Turbo render and reuse it on
reconnection. Removed elements are still unmounted after rendering. Each page component uses the normal UX Vue lifecycle.

## Verification

Run `php bin/phpunit` for the HTTP tests.

With Symfony running and assets built:
```sh
npx playwright install chromium
npm run test:e2e
```

Set `PLAYWRIGHT_BASE_URL` if your server uses another address.
Browser tests cover frame requests, component interactions, page unmounts,
navigation DOM identity and state, Back/Forward, direct loads, and refresh.
