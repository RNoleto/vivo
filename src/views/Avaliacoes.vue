<script setup>
import Card from '../components/ui/Card.vue';
</script>

<template>
    <section>
        <Card text="Nos avalie no Google" icon="/icons/maps.svg" link="https://g.co/kgs/C9xaEaS" />

        <Card text="App Vivo para iPhone" icon="/icons/apple.svg"
            link="https://apps.apple.com/br/app/meu-vivo/id123456" />

        <Card text="App Vivo para Android" icon="/icons/android.svg"
            link="https://play.google.com/store/apps/details?id=com.vivo.meuvivo" />

        <!-- <Card text="Nossos vendedores" icon="/icons/seller.svg" link="/vendedores" :internal="true" /> -->
    </section>
</template>

<style scoped></style>