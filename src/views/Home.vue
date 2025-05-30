<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

let buttonSearchInput = ref("");

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

let splashTextTypes = ["Yay", "In-Progress", "Planned"]

const homeButtons = ref([
  { href: "/calc2practice", planned: false, title: "Calculu 2 Steward Practice", splashText: "New!", splashType: splashTextTypes[0] },
  { href: "/gpa-calculator", planned: false, title: "GPA Calculator", splashText: "New!", splashType: splashTextTypes[0] },
  { href: "/qr-code-generator", planned: false, title: "Free QR-code Generator", splashText: "In Progress", splashType: splashTextTypes[1] },
  { href: "/course-prep-resources", planned: true, title: "Course Prep Resources", splashText: "Planned", splashType: splashTextTypes[2] },
]);

const filteredButtons = computed(() => {
  return homeButtons.value.filter(button => {
    const matchesTitle = button.title.toLowerCase().includes(buttonSearchInput.value.toLowerCase());
    return matchesTitle;
  });
});

</script>

<!-- :class="`theme-${websiteTheme} `" -->

<template>
  <div class="min-h-[100vh]">
    <div class="sm:h-56 h-40 flex flex-col items-center justify-center">
      <p class="text-3xl sm:text-4xl font-bold" :class="`theme-${websiteTheme} text-unlvRed`">
        You&lv.com
      </p>
      <p :class="`theme-${websiteTheme} text-secondaryText`">
        Resource hub for the UNLV community.
      </p>
    </div>
    <div class="flex flex-col items-center justify-center my-3">
      <input v-model="buttonSearchInput" class="border-2 w-60 rounded-md p-1 px-2" placeholder="Search"
        :class="`theme-${websiteTheme} border-unlvRed text-secondaryText focus:border-unlvDarkRed`" />
      <p :class="`theme-${websiteTheme} text-tertiaryText italic`">Searches for exact word (anywhere)</p>
    </div>
    <div class="w-full flex flex-col items-center justify-center" v-for="button in filteredButtons" :key="button.id">
      <div class="my-2 w-fit relative">
        <div class="absolute z-10 top-[-13px] right-[-20px] splashTexts" :class="{
          'bg-yellow-400': button.splashType === splashTextTypes[0],
          'bg-green-600 text-white': button.splashType === splashTextTypes[1],
          'bg-gray-600 text-white': button.splashType === splashTextTypes[2],
        }" v-if="button.splashText != null">
          <p>{{ button.splashText }}</p>
        </div>
        <a :class="{'pointer-events-none' : button.planned}" :href="button.href">
          <button class="w-72 font-semibold" :class="[
            { 'planned': button.planned },
            `theme-${websiteTheme}`,
            'text-white',
            'bg-unlvRed',
            'hover:bg-unlvDarkRed',
            'active:bg-unlvDarkerRed',
            'transition',
            'ease-in-out',
            'p-4',
            'w-72',
            'rounded-md'
          ]">
            <p>{{ button.title }}</p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.planned {
  pointer-events: none;
  opacity: .2;
}

.splashTexts {
  rotate: 10deg;
  font-size: small;
  font-weight: 500;
  border-radius: 100%;
  padding: 7px;
}

input {
  outline: none;
  background: none;
}

textarea {
  outline: none;
}
</style>
