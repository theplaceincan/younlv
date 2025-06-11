<!-- QR Code Generator
----------------------------------------------
 This is meant to be a completely free QR Code Generator for students
 and organizations.
-->

<script setup>
import { ref, computed, onMounted, watch } from "vue";
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

let linkString = ref()


// *******************************
// QR-Code Implementation

let generationComplete = ref(false);
function generateQRCode(linkString) {
  console.log(linkString);
  generationComplete.value = true;
}


// QR-Code Implementation
// *******************************


onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
  });
});

</script>

<template>
  <div class="min-h-[100vh] p-4">
    <p :class="`theme-${websiteTheme} text-textHeading font-bold text-2xl`">QR Code Generator</p>
    <p class="bg-yellow-300 text-black font-bold">UNDER DEVELOPMENT</p>
    <!-- <div class="border-t-[1px] my-4 border-tertiary"></div> -->
    <div class="my-4"></div>
    <div>
      <p :class="`theme-${websiteTheme} text-textHeading font-semibold`">Instructions & Info</p>
      <button @click="howToReadMore = !howToReadMore"
        :class="`theme-${websiteTheme} cursor-pointer text-textBody border border-borderDefault font-semibold text-sm bg-backgroundSubtle hover:bg-backgroundSubtlest px-1`">
        <span v-if="howToReadMore === false">Open</span><span v-if="howToReadMore">Close</span>
        Instructions & Info</button>
      <div v-if="howToReadMore" :class="`theme-${websiteTheme} text-textBody`">
        <p><span class="text-textHeading">a) </span>Put your link in the input field, then click "Generate QR Code". You will be
          given a QR code of the link you used.<br></p>
        <p><span class="text-textHeading">b) </span>This page doesn't require sign-in and it doesn't save your QR code. Ensure
          you save your QR code before leaving.<br></p>
        <p><span class="text-textHeading">c) </span>Send a message at <a href="https://forms.gle/TVk6J6SoD43d29229"
            target="_blank" class="underline">this
            Google form</a> if you have any other questions!<br></p>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-borderDefault"></div>
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <p :class="`theme-${websiteTheme} text-textHeading font-semibold`">Enter link to generate QR code for:</p>
        <input class="w-80" v-model="linkString" placeholder="Enter Link">
        <button @click="generateQRCode(linkString)"
          class="mainButton1Blue">
          Generate QR Code
        </button>
      </div>
      <div v-if="generationComplete">
        <p :class="`theme-${websiteTheme} text-textHeading font-semibold`">Generated QR Code:</p>
        <div class="qr-code-container">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  width: 100%;
  max-width: 230px;
}

input {
  outline: none;
  background: none;
}

select {
  outline: none;
  background: none;
}

.courseInput {
  padding: 2px;
  padding-left: 4px;
  border-radius: 0.175rem;
  transition: border 0.2s ease;
}

.courseInput:hover {
  border: 1px solid var(--color-unlvRed);
}

.courseInput:focus {
  border: 1px solid var(--color-unlvDarkRed);
}
</style>
