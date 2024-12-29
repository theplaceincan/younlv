<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});


let howToReadMore = ref(false);

onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} text-primaryText`" -->
<template>
  <div class="min-h-[100vh] p-4">
    <p :class="`theme-${websiteTheme} text-primaryText font-bold text-lg`">QR Code Generator</p>
    <p class="bg-yellow-300 text-black font-bold">UNDER DEVELOPMENT</p>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <div>
      <p :class="`theme-${websiteTheme} text-primaryText font-semibold`">Instructions & Info</p>
      <button @click="howToReadMore = !howToReadMore"
        :class="`theme-${websiteTheme} text-secondaryText font-semibold text-sm bg-secondary px-1`">
        <span v-if="howToReadMore === false">Open</span><span v-if="howToReadMore">Close</span>
        Instructions & Info</button>
      <div v-if="howToReadMore">
        <p><span class="semibold">a) </span>Put your link in the input field, then click "Generate QR Code". You will be
          given a QR code of the link you used.<br></p>
        <p><span class="semibold">b) </span>This page doesn't require sign-in and it doesn't save your QR code. Ensure
          you save your QR code before leaving.<br></p>
        <p><span class="semibold">c) </span>Send a message at <a href="https://forms.gle/TVk6J6SoD43d29229"
            target="_blank" class="underline">this
            Google form</a> if you have any other questions!<br></p>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <div>
      <p>Stuff</p>
    </div>
  </div>
</template>

<style scoped>
input {
  outline: none;
  background: none;
}

select {
  outline: none;
  background: none;
}
</style>
