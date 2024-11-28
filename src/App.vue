<script setup lang="ts">
import Footer from '../src/components/Footer.vue'
import Navbar from '../src/components/Navbar.vue'
import { websiteTheme } from './globalvariables';

</script>

<template>
    <div :class="`theme-${websiteTheme} bg-bgPrimary`">
        <Navbar></Navbar>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>

<style scoped></style>
