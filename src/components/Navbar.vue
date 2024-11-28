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
  if(darkTheme.value) {
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
  // isSticky is true if the page is scrolled down (scrollY > 0), 
  // otherwise isSticky is false.
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
  // Use watch to react to route changes
  watch(route, (to, from) => {
    isSticky.value = to.path !== '/';
    hideNav.value = to.path === '/register';
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="p-2 flex items-center justify-between">
    <div>
      <a href="/">
        <button>
          <img v-if="darkTheme" class="w-24" src="/src/assets/websitelogos/dark.png">
          <img v-if="!darkTheme" class="w-24" src="/src/assets/websitelogos/light.png">
        </button>
      </a>
    </div>
    <div>
      <!-- :class="`theme-${websiteTheme} text-secondaryText`"  -->
      <button class="font-semibold text-white rounded-full p-1 text-sm bg-unlvRed hover:bg-unlvDarkRed active:bg-unlvDarkerRed transition ease-in-out" @click="toggleTheme()">
        <div v-if="darkTheme">
          <p>🌙</p>
        </div>
        <div v-if="!darkTheme">
          <p>☀️</p>
        </div>
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
