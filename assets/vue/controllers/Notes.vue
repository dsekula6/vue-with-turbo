<script setup>
import { computed, ref } from 'vue';
const note = ref('');
const characters = computed(() => note.value.length);
const instance = crypto.randomUUID();
</script>

<template>
    <section class="panel page" :data-instance="instance">
        <p class="eyebrow">02 / Notes.vue</p>
        <h2>A temporary notebook.</h2>
        <p>Compare this page-local draft with the persistent draft in the navigation.</p>
        <label>Page note <textarea v-model="note" rows="4" placeholder="Only here until you leave…"></textarea></label>
        <p aria-live="polite">{{ characters }} characters</p>
        <small>Vue instance: <code>{{ instance }}</code></small>
    </section>
</template>
