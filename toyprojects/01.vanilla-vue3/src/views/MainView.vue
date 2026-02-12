<template>
    <GnbHeader></GnbHeader>
    <router-view class="main-body"></router-view>
    <FooterContainer></FooterContainer>
</template>

<script setup>
import GnbHeader from '@/components/commons/GnbHeader.vue';
import FooterContainer from '@/components/commons/FooterContainer.vue';
</script>

<style>
.main-body {
    margin: 80px 0 0 0;
}
</style>