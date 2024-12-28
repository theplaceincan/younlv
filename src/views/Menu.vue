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

function logOut() {
  pb.authStore.clear();
  router.push('/register');
  mobileMenu.value = false;
}
</script>

<!-- :class="`theme-${websiteTheme} text-primaryText`" -->
<template>
    <div class="min-h-[100vh]">
        <p :class="`theme-${websiteTheme} text-primaryText text-2xl text-center font-semibold`">User Menu</p>
        <button @click="logOut()" class="my-2 font-semibold" :class="`theme-${ websiteTheme}
        text-white 
          bg-red-600
          hover:bg-red-700
          active:bg-red-800
          transition ease-in-out
          p-4
          rounded-md
          `">Log out</button>
    </div>
</template>

<style scoped></style>