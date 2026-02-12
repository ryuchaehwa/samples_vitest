<template>
    <GnbHeader></GnbHeader>
    <router-view ></router-view>
    <FooterContainer></FooterContainer>
</template>

<script setup>
import GnbHeader from '@/components/commons/GnbHeader.vue';
import FooterContainer from '@/components/commons/FooterContainer.vue';
</script>

<style>

</style>