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
const isAuthenticated = ref(pb.authStore.model !== null);

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

// Log out of account and go to /register
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

  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
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
      <!-- Github Link -->
      <a href="https://github.com/theplaceincan/younlv" target="_blank"
        class="font-semibold text-white rounded-full text-sm bg-unlvRed hover:bg-unlvDarkRed active:bg-unlvDarkerRed transition ease-in-out">
        <div v-if="darkTheme">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-8" viewBox="0 0 30 30">
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
          </svg>
        </div>
        <div v-if="!darkTheme">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-8" viewBox="0,0,256,256" style="fill:#FFFFFF;">
              <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path></g></g>
          </svg>
        </div>
      </a>
      <!-- Username/menu -->
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
      <!-- Profile button -->
      <a :href="isAuthenticated ? '/menu' : '/register'">
        <button :href="isAuthenticated ? '/menu' : '/register'" :class="isAuthenticated ? 'bg-unlvGray' : 'bg-unlvRed'"
          class="font-semibold text-white rounded-full p-1 text-sm hover:bg-unlvDarkRed active:bg-unlvDarkerRed transition ease-in-out">
          <svg v-if="!isAuthenticated" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          <svg v-if="isAuthenticated" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>
      </a>
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
