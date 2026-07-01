<script setup>
import { ref, onMounted } from 'vue';
import Card from '../components/ui/Card.vue';
import { obterLinks } from '../utils/storage.js';

const links = ref([]);

onMounted(() => {
  links.value = obterLinks();
});
</script>

<template>
    <section>
        <Card 
            v-for="item in links" 
            :key="item.id" 
            :text="item.text" 
            :icon="item.icon" 
            :link="item.link" 
        />

        <Card text="Fale com um de nossos consultores" icon="/icons/seller.svg" link="/consultores" :internal="true" />
    </section>
</template>

<style scoped></style>