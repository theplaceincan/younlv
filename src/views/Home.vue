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

const homeButtons = ref([
  { href: "/gpa-calculator", title: "GPA Calculator" },
  { href: "/qr-code-generator", title: "Free QR-code Generator" },
  { href: "/course-prep-resources", title: "Course Prep Resources" },
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
      <a class="w-72" :href="button.href">
        <button class="my-2 w-full font-semibold" :class="`theme-${websiteTheme} 
                  text-white 
                    bg-unlvRed
                    hover:bg-unlvDarkRed
                    active:bg-unlvDarkerRed
                    transition ease-in-out
                    p-4
                    rounded-md
                     `">
          <p>{{ button.title }}</p>
        </button>
      </a>
    </div>
  </div>
</template>

<style scoped>
input {
  outline: none;
  background: none;
}

textarea {
  outline: none;
}
</style>
