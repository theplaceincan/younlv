<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketbase';

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

const isAuthenticated = computed(() => {
    return pb.authStore.model !== null;
});

const homeButtons = ref([
    { href: '/gpa-calculator', title: 'GPA Calculator' },
    { href: '/qr-code-generator', title: 'Free QR-code Generator' },
]);
</script>

<template>
    <div class="h-[100vh] flex items-center justify-center">
        <div>
            <!-- <p class="text-center font-semibold text-xl text-zinc-700">Tools</p>
            <div class="p-[1px] my-2 bg-zinc-200"></div> -->
            <div v-for="button in homeButtons" :key="button.id">
                <a :href="button.href"><button class="my-2 homeToolButtonsCSS w-full">
                        <p>{{ button.title }}</p>
                    </button></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.homeToolButtonsCSS {
    background-color: rgb(233, 22, 57);
    color: white;
    padding: 19px;
    padding-left: 23px;
    padding-right: 23px;
    text-align: center;
    font-weight: 500;
    border-radius: 10px;
    border: 3px solid rgb(233, 22, 57);
    transition: background-color 0.2s ease, color 0.2s ease, border 0.2s ease;
}

.homeToolButtonsCSS:hover {
    background-color: white;
    color: rgb(233, 22, 57);
    border: 3px solid rgb(233, 22, 57);
}
</style>
