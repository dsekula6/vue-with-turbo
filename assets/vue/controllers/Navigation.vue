<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

defineProps({ links: { type: Array, required: true } });
const count = ref(0);
const draft = ref('');
const currentPath = ref(window.location.pathname);
const instance = crypto.randomUUID();
const syncPath = () => { currentPath.value = window.location.pathname; };

onMounted(() => {
    document.addEventListener('turbo:load', syncPath);
    document.addEventListener('turbo:frame-load', syncPath);
    window.addEventListener('popstate', syncPath);
});
onUnmounted(() => {
    document.removeEventListener('turbo:load', syncPath);
    document.removeEventListener('turbo:frame-load', syncPath);
    window.removeEventListener('popstate', syncPath);
});
</script>

<template>
    <section class="navigation panel" :data-instance="instance">
        <div class="section-heading"><strong>Persistent navigation</strong><span class="badge">Stays mounted</span></div>
        <nav aria-label="Sample pages">
            <a v-for="link in links" :key="link.href" :href="link.href"
               data-turbo-frame="page-content" data-turbo-action="advance"
               :aria-current="currentPath === link.href ? 'page' : undefined">{{ link.label }}</a>
        </nav>
        <div class="controls">
            <button type="button" @click="count++">Navigation clicks: {{ count }}</button>
            <label>Navigation draft <input v-model="draft" placeholder="I should survive navigation"></label>
        </div>
        <small>Vue instance: <code>{{ instance }}</code></small>
    </section>
</template>
