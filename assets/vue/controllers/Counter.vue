<script setup>
import { ref } from 'vue';
const count = ref(0);
const instance = crypto.randomUUID();
</script>

<template>
    <section class="panel page" :data-instance="instance">
        <p class="eyebrow">01 / Counter.vue</p>
        <h2>A fresh counter.</h2>
        <p>This counter belongs to this page. Switch away and come back to mount a new component.</p>
        <button type="button" @click="count++">Page clicks: {{ count }}</button>
        <small>Vue instance: <code>{{ instance }}</code></small>
    </section>
</template>
