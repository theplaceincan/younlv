<script setup>
import { websiteTheme } from '../globalvariables';

</script>

<template>
    <div class="p-2" :class="`theme-${websiteTheme} bg-bgPrimary`">
        <p class="text-zinc-400 text-center text-sm">© 2024 Younlv. All rights reserved.</p>
    </div>
</template>