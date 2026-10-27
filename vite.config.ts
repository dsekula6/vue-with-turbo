import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Symfony from '@symfony/reprise/vite'

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                app: './assets/app.js',
            },
        },
    },
    plugins: [vue(), Symfony({ stimulus: 'assets/controllers.json' })],
})
