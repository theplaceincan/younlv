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
let errCorrectionLevel = 32; // 15% error correction
let modeIndicator = 0b0100; // byte mode
let maxDataSymbols = 223;

let symbolSize = 8;
let genPoly = [1];
let paritySymbols = [];

let gfLogarithmTable = new Array(512)
let gfExponentialTable = new Array(256)

// ^= checks if specified property exists in an object
// <<= left shift, multiplies by 2

// Fill Galois Field (GF) exponential & logarithmic tables
let primPoly = 0x11D
let x = 1;
for (let i = 0; i < 255; i++) {
  gfExponentialTable[i] = x;
  gfLogarithmTable[x] = i;
  x <<= 1; // shift left, multiplies by 2
  if (x & 0x100) {
    x ^= primPoly
  }
}
for (let i = 225; i < 512; i++) {
  gfExponentialTable[i] = gfExponentialTable[i-255];
}

// Implementing polynomial multiplication in GF(256)
function gfPolyMultiply(_poly1, _poly2) {
  let result = new Array(_poly1.length + _poly2.length - 1).fill(0);
  for (let i = 0; i < _poly1.length; i++) {
    for (let j = 0; j < _poly2.length; j++) {
      let product = gfExponentialTable[gfLogarithmTable[_poly1[i]] + gfLogarithmTable[_poly2[j]]]; // multiplying coefficients
      result[i + j] ^= product;
    }
  }
  return result;
}

// Implementing exponentiation in GF(256)
function gfExp(_power) { 
  return gfExpTable[_power % 255];
}

function generateQRCode(_linkString) {
  if (!_linkString) { console.log("No link provided"); return; }

  // Converting link/string to binary array
  const charArray = _linkString.split('')
  const binaryArray = charArray.map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
  const binaryData = binaryArray.join('');
  const qrMatrix = Array.from({ length: qrSize }, () => Array(qrSize).fill(null));
 
  // Adding metadata to binary array (prepending char count and qr mode)
  const charCount = _linkString.length.toString(2).padStart(8, '0')
  const encodedData = modeIndicator + charCount + binaryData

  // Error correction
  let symbolsData = [];
  for (let i = 0; i < encodedData.length; i++) {  // creating list of numbers (0-255)
    symbolsData.push(parseInt(encodedData.slice(i, i+symbolSize), 2));
  }
  
  for (let i = 0; i < errCorrectionLevel; i++) {  // creating generator polynomial G(x)
    // greating G(x) using Galois Field, where G(x) = (x-a^i)(x-a^i)...
    let nextTerm = [1, gfExp(i)]; // (x-α^i)
    genPoly = gfPolyMultiply(genPoly, nextTerm)
  }
  

  
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
      <div v-if="howToReadMore" :class="`theme-${websiteTheme} text-secondaryText`">
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
