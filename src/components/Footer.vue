<script setup>
import { websiteTheme } from '../globalvariables';

</script>

<template>
    <div class="p-2" :class="`theme-${websiteTheme} bg-bgPrimary`">
        <p class="text-zinc-400 text-center text-sm">© 2024 Younlv. All rights reserved.</p>
        <p class="text-zinc-400 text-center text-sm">This website is a sole personal project of a UNLV undergrad. 2023-Present.</p>
        <p class="text-zinc-400 text-center text-sm"><a target="_blank" href="https://forms.gle/TVk6J6SoD43d29229" class="underline">Click here</a> to send suggestions, bugs, messages, etc.</p>
    </div>
</template>