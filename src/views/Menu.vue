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
        <p :class="`theme-${websiteTheme} text-primaryText text-2xl text-center font-semibold`"> Menu</p>
        <button @click="logOut()" :class="`theme-${websiteTheme} text-primaryText`">Log out</button>
    </div>
</template>

<style scoped></style>