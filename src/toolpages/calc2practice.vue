<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

onMounted(() => {
  pb.authStore.onChange(() => { // Updates isAuthenticated automatically
    isAuthenticated.value = pb.authStore.model !== null;
  });
});

</script>

<template>
  <div class="min-h-[100vh] p-4">
    <p :class="`theme-${websiteTheme} text-primaryText font-bold text-lg`">Calculus 2 Practice</p>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    
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
