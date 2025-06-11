<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

let popularPages = [
  { pageName: 'GPA Calculator', route: '/gpa-calculator', keywords: ['calculator', 'gpa'] },
  { pageName: 'MATH 182 Practice', route: '/calc2practice', keywords: ['calculus 2'] },
]
let toolPages = [
  { pageName: 'GPA Calculator', route: '/gpa-calculator', keywords: ['calculator', 'gpa'], image: 'https://cdn-icons-png.flaticon.com/512/3755/3755243.png' },
  { pageName: 'QR Code Generator', route: '/qr-code-generator', keywords: ['qr', 'qr code generator', 'code'], image: 'https://icons.veryicon.com/png/o/miscellaneous/simple-and-round-line-mark/qr-code-125.png' },
  { pageName: 'Course Practice Banks', route: '/course-practice-banks', keywords: [], image: 'https://cdn-icons-png.flaticon.com/512/2995/2995440.png' },
  { pageName: 'Class Resources', route: '/class-resources', keywords: [], image: 'https://cdn-icons-png.flaticon.com/512/1705/1705351.png' },
  { pageName: 'UNLV Calendar', route: '/unlv-calendar', keywords: [], image: 'https://www.freeiconspng.com/uploads/calendar-icon-13.png' },
  { pageName: 'Textbook Finder', route: '/textbook-finder', keywords: [], image: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' },
]

let allPages = [
  ...popularPages,
  ...toolPages,
]

// rewrite this part
let inputSearch = ref("");
let searchResults = computed(() => {
  const query = inputSearch.value.trim().toLowerCase();
  if (!query) return [];

  return allPages.filter(page => {
    const inName = page.pageName.toLowerCase().includes(query);
    const inKeywords = page.keywords?.some(keyword =>
      keyword.toLowerCase().includes(query)
    );
    return inName || inKeywords;
  });
});

function selectPage(page) {
  router.push(page.route);
  inputSearch.value = "";
}

</script>

<!-- :class="`theme-${websiteTheme}`" -->
<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center w-full">
    <div class="mb-10 text-center space-y-4">
      <p class="md:text-6xl text-5xl font-bold text-unlvRed">You&LV.com</p>
      <p class="text-textBody text-xl">The resource hub for the UNLV community and all members of the college community</p>
    </div>
    <div class="w-full max-w-[1000px] px-5">
      <div class="relative mb-5">
        <input v-model="inputSearch" class="w-full rounded-md"
        placeholder="What are you looking for?">
        <div v-if="inputSearch && searchResults.length" class="flex flex-col absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-borderDefault bg-white shadow-lg">
          <a @click="selectPage(i)" v-for="i in searchResults" :key="i.pageName" class="cursor-pointer px-4 py-2 text-textHeading bg-backgroundBase hover:bg-backgroundSurface">{{ i.pageName }}</a>
        </div>
        <div v-if="inputSearch && searchResults.length === 0" class="flex flex-col absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-borderDefault bg-white shadow-lg">
          <p class="pointer-events-none px-4 py-2 text-textBody bg-backgroundBase">No results found</p>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[1000px] px-5">
      <div class="flex items-center space-x-2 mb-3">
        <span class="localBeepingRed mb-1">●</span>
        <p class="text-textSubtle">Most Popular Resources</p>
      </div>
      <div class="space-x-2">
        <a :href="i.route" target="_blank" v-for="i in popularPages" class="roundedTextCard">{{ i.pageName }}</a>
      </div>
    </div>
  </div>
  <div class="min-h-[80vh] flex flex-col items-center justify-start w-full">
    <div class="mb-10">
      <p class="text-textHeading text-3xl font-bold">Explore Tools & Resources</p>
    </div>
    <div class="flex flex-wrap w-full max-w-[900px] items-center justify-center">
      <a class="textWithImageCard1 m-2" :href="i.route" target="_blank" v-for="i in toolPages">
        <img class="w-32" :src="i.image">
        <p>{{ i.pageName }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.localBeepingRed {
  font-size: larger;
  /* background-color: red; */
  animation: beepingRedAnimation 1s ease-in-out infinite;
}
  
@keyframes beepingRedAnimation {
  0% {
    color: rgba(255, 0, 0, 0.171);
  }
  50% {
    color: red;
  }
  100% {
    color: rgba(255, 0, 0, 0.171);
  }
}

</style>
