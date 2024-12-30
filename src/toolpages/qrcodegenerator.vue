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

// *******************************
// Version 5 QR-Code Implementation

let linkString = ref("");
let qrSize = 37;
function generateQRCode(_linkString) {
  if (!_linkString) { console.log("No link provided"); return; }
  // Convert string to binary, create qrMatrix
  const charArray = _linkString.split('')
  const binaryArray = charArray.map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
  const binaryData = binaryArray.join('');
  const qrMatrix = Array.from({ length: qrSize }, () => Array(qrSize).fill(null));
 
  console.log(binaryData)
  console.log("QR Code Generated")
}


// Version 5 QR-Code Implementation
// *******************************


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
    <div class="space-y-4">
      <div class="flex flex-col space-y-2">
        <p :class="`theme-${websiteTheme} text-primaryText font-semibold`">Enter link to generate QR code for:</p>
        <input class="w-80"
          :class="`courseInput border-[1px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
          v-model="linkString" placeholder="Enter Link">
        <button @click="generateQRCode(linkString)"
          class="rounded-sm w-[230px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition ease-in-out text-white font-semibold">
          Generate QR Code
        </button>
      </div>
      <div>
        <p :class="`theme-${websiteTheme} text-primaryText font-semibold`">Generated QR Code:</p>
        <div class="qr-code-container">

        </div>
      </div>
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
