<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketbase';

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

let mobileMenu = ref(false);
function mobileMenuToggle() {
  mobileMenu.value = !mobileMenu.value;
  console.log(mobileMenu.value);
}

const isSticky = ref(false);
const hideNav = ref(false);
const isHovered = ref(false);

const handleScroll = () => {
  isSticky.value = window.scrollY > 0;
};

const isNotHomePage = computed(() => {
  return route.path !== '/';
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Use watch to react to route changes
  watch(route, (to, from) => {
    isSticky.value = to.path !== '/';
    hideNav.value = to.path === '/register';
  });
});

function logOut() {
  pb.authStore.clear();
  router.push('/register');
  mobileMenu.value = false;
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="p-2" :class="['header', { sticky: isSticky, notsticky: !isSticky, hovered: isHovered || isNotHomePage, hideNavCSS: hideNav, '!bg-white': mobileMenu }]"
    @mouseover="isHovered = true" @mouseleave="isHovered = false">
    <div class="flex justify-between items-center w-full px-4">
      <div class="flex items-center">
        <a href="/"><img class="w-24" src="../assets/websitelogos/light.png"></a>
      </div>
      <div :class="{'ml-1':!isAuthenticated, 'ml-[77px]':isAuthenticated}" class="isPC flex items-center space-x-4">
        <!-- <a href="/about"><button class="navBarButton" :class="{ 'text-black': isSticky || mobileMenu || isHovered || isNotHomePage, 'text-white': !isSticky && !mobileMenu && !isHovered && !isNotHomePage }">About</button></a> -->
      </div>
      <div class="isPC flex items-center space-x-4">
        <!-- <a href="/menu">
          <p class="truncate max-w-[78px]" :class="{ 'text-black': isSticky || mobileMenu || isHovered || isNotHomePage, 'text-white': !isSticky && !mobileMenu && !isHovered && !isNotHomePage }">{{ model?.username }}</p>
        </a> -->
        <!-- Sign In / Sign Out Buttons -->
        <!-- <a v-if="!isAuthenticated" href="/register"><button class="registerNavBarButton" :class="{ 'text-green-600': isSticky || isHovered, 'text-green-500': !isSticky && !isHovered }">Sign In</button></a>
        <a v-if="isAuthenticated" @click.prevent="logOut()"><button class="signOutrNavBarButton" :class="{ 'text-red-600': isSticky || isHovered, 'text-red-500': !isSticky && !isHovered }">Sign Out</button></a> -->
      </div>
      <div class="isMobile flex items-center space-x-4">
        <button @click="mobileMenuToggle()" class="menuNavButton">
          <!-- :class="{ 'text-black': isSticky || mobileMenu || isHovered || isNotHomePage, 'text-white': !isSticky && !mobileMenu && !isHovered && !isNotHomePage }" -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="mobileMenu" class="isMobile flex flex-col text-center bg-white mt-2">
      <!-- <a class="navBarMobileButton" href="/about"><button>About</button></a> -->
      <div class="p-[1px] my-2 bg-zinc-200"></div>
      <!-- <a v-if="isAuthenticated" href="/menu" class="navBarMobileButton"><button>{{model?.username}}</button></a> -->
      <!-- Sign In / Sign Out Buttons -->
      <!-- <a v-if="!isAuthenticated" href="/register" class="registerNavBarButton"><button>Sign In</button></a>
      <a v-if="isAuthenticated" @click.prevent="logOut()" class="signOutrNavBarButton"><button>Sign Out</button></a> -->
    </div>
  </div>
</template>

<style scoped>
.hideNavCSS {
  display: none;
}

.header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: background-color 0.2s ease, border-bottom-left-radius 0.2s ease, border-bottom-right-radius 0.2s ease, margin 0.2s ease, margin-left 0.2s ease, margin-right 0.2s ease, box-shadow 0.2s ease;
}

.sticky {
  position: fixed;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.notsticky {
  background-color: transparent;
}

.hovered {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

a {
  transition: color 0.2s ease;
}

.text-black {
  color: black;
}

.text-white {
  color: white;
}

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
