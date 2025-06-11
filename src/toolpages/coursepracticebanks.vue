<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();
const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});
</script>

<template>
    <div class="min-h-[100vh] p-4">
        <p :class="`text-textHeading font-bold text-2xl`">Course Practice Banks</p>
    </div>

</template>

<style scoped></style>