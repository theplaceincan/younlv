<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketbase';
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

// User model
const model = computed(() => pb.authStore.model);
// Routes constants
const route = useRoute();
const router = useRouter();

// Authentication status
const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

// Used to see if user is on mobile or not
let mobileMenu = ref(false);
function mobileMenuToggle() {
  mobileMenu.value = !mobileMenu.value;
  console.log(mobileMenu.value);
}

// Toggle global dark/light theme
function toggleTheme() {
  darkTheme.value = !darkTheme.value
  changeTheme()
  if (darkTheme.value) {
    console.log("Dark theme set to TRUE")
  } else {
    console.log("Dark theme set to FALSE")
  }
  console.log(`Current theme: ${websiteTheme.value}`);
}

const isSticky = ref(false);
const hideNav = ref(false);
const isHovered = ref(false);

// Handles the scroll event to toggle 'sticky'
const handleScroll = () => {
  isSticky.value = window.scrollY > 0;
};

const isNotHomePage = computed(() => {
  return route.path !== '/';
});

// Log out of account, go to /register
function logOut() {
  pb.authStore.clear();
  router.push('/register');
  mobileMenu.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  watch(route, (to, from) => { // Use watch to react to route changes
    isSticky.value = to.path !== '/';
    hideNav.value = to.path === '/register';
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="p-2 flex items-center justify-between mx-3">
    <div>
      <a href="/">
        <button>
          <img v-if="darkTheme" class="w-24" src="/src/assets/websitelogos/dark.png">
          <img v-if="!darkTheme" class="w-24" src="/src/assets/websitelogos/light.png">
        </button>
      </a>
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="font-semibold text-white rounded-full p-1 text-sm bg-unlvRed hover:bg-unlvDarkRed active:bg-unlvDarkerRed transition ease-in-out"
        @click="toggleTheme()">
        <div v-if="darkTheme">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>

        </div>
        <div v-if="!darkTheme">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>

        </div>
      </button>
      <button class="font-semibold text-white rounded-full p-1 text-sm bg-unlvRed hover:bg-unlvDarkRed active:bg-unlvDarkerRed transition ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 806px) {
  .isMobile {
    display: none;
  }
}

@media (max-width: 805px) {
  .isPC {
    display: none;
  }
}
</style>
