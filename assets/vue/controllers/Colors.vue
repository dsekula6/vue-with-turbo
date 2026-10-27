<script setup>
import { ref } from 'vue';
const selected = ref('Mint');
const colors = { Mint: '#a7f3d0', Peach: '#fed7aa', Lavender: '#ddd6fe' };
const instance = crypto.randomUUID();
</script>

<template>
    <section class="panel page" :data-instance="instance">
        <p class="eyebrow">03 / Colors.vue</p>
        <h2>A change of color.</h2>
        <p>A third independent Vue component, mounted by Symfony UX after the frame swaps.</p>
        <div class="swatch" :style="{ backgroundColor: colors[selected] }">{{ selected }}</div>
        <div class="controls">
            <button v-for="(_, name) in colors" :key="name" type="button"
                    :aria-pressed="selected === name" @click="selected = name">{{ name }}</button>
        </div>
        <small>Vue instance: <code>{{ instance }}</code></small>
    </section>
</template>
