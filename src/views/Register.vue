<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

let buttonSearchInput = ref("");
let isLoading = ref(false)

const isAuthenticated = computed(() => {
  return pb.authStore.model !== null;
});

// SignIn / CreateAcc view variables
let viewN = ref(0);
// 0: create account
// 1: sign in
// 2: reset password (not made yet)

// Registration variables
let signIn_email = ref("");
let signIn_password = ref("");
let crAcc_username = ref("");
let crAcc_email = ref("");
let crAcc_password = ref("");
let crAcc_confirmPassword = ref("");

const signInForm = () => {
  isLoading.value = true;
  if (!signIn_email.value || !signIn_password.value) {
    alert('Please complete the form.');
    return;
    isLoading.value = false;
  }
  signIn({ email: signIn_email.value, password: signIn_password.value });
};
async function signIn(loginData) {
  try {
    const record = await pb.collection('users').authWithPassword(loginData.email, loginData.password);
    router.push('/menu')
  } catch (error) {
    alert(error.message)
    isLoading.value = false;
  }
  isLoading.value = false;
}

const createAccForm = () => {
  isLoading.value = true;
  if (!crAcc_username.value || !crAcc_email.value || !crAcc_password.value || crAcc_password.value !== crAcc_confirmPassword.value) {
    alert('Please fill the form or ensure passwords match.');
    return;
    isLoading.value = false;
  }
  createAccount({ email: crAcc_email.value, password: crAcc_password.value, username: crAcc_username.value });
}
async function createAccount({ username, email, password }) {
  console.log("username value:", username);
  console.log("email value:", email);
  console.log("password value:", password);
  try {
    const data = {
      "username": username,
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
      "bio": ""
    };
    const record = await pb.collection('users').create(data);
    signIn({ email, password })
  } catch (error) {
    alert(error.message)
    isLoading.value = false;
  }
  isLoading.value = false;
}

</script>

<!-- :class="`theme-${websiteTheme} `" -->
<!-- <p :class="`theme-${websiteTheme} text-primaryText text-xl text-center font-bold`">Account Registration</p> -->

<template>
  <div class="min-h-[100vh] flex flex-col items-center">
    <!-- Create account -->
    <div v-if="viewN === 0" class="space-y-2 max-w-[300px]">
      <p :class="`theme-${websiteTheme} text-center text-primaryText font-bold text-2xl my-6`">Create an account</p>
      <input v-model="crAcc_username" type="text" class="" placeholder="Username" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <input v-model="crAcc_email" type="email" class="" placeholder="Email (example@gmail.com)" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <input v-model="crAcc_password" type="password" class="" placeholder="Password (follow listed guide)" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <input v-model="crAcc_confirmPassword" type="password" class="" placeholder="Confirm Password" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <div class="flex flex-col items-center justify-center">
        <button @click.prevent="createAccForm(crAcc_username, crAcc_email, crAcc_password, crAcc_confirmPassword)" class="mainButton1 w-full my-5">Create Account</button>
        <div v-if="isLoading">
          <img src="/src/assets/gifs/loading.gif">
        </div>
      </div>
    </div>
    <!-- Sign in to existing account -->
    <div v-if="viewN === 1" class="space-y-2 max-w-[300px]">
      <p :class="`theme-${websiteTheme} text-center text-primaryText font-bold text-2xl my-6`">Sign In</p>
      <input v-model="signIn_email" type="email" class="" placeholder="Email (example@gmail.com)" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <input v-model="signIn_password" type="password" class="" placeholder="Password" :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`">
      <div class="flex flex-col items-center justify-center">
        <button @click.prevent="signInForm(signIn_email, signIn_password)" class="mainButton1 w-full my-5">Sign In</button>
        <div v-if="isLoading">
          <img src="/src/assets/gifs/loading.gif">
        </div>
      </div>    
    </div>
    <!-- Toggle register view -->
    <div class="h-20 flex flex-col items-center justify-center">
        <button @click="viewN = 1" v-if="viewN === 0" :class="`textLink theme-${websiteTheme} text-secondaryText`">Have an account? Sign in.</button>
        <button @click="viewN = 0" v-if="viewN === 1" :class="`textLink theme-${websiteTheme} text-secondaryText`">Don't have an account? Create one.</button>
    </div>
  </div>
</template>

<style scoped>
</style>