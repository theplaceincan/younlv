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

let gpaGradePoints = ref(170.200);
let gpaUnitsTaken = ref(51.000);
let gpa = ref(3.937);

let semesterSeason = ref("");
let semesterYear = ref();
let SemesterSeasonOptions = ["Season", "Spring", "Summer", "Fall"]
let courseGrade = ref("");
let courseName = ref("");
let courseUnits = ref("");


let aa = 1
</script>

<!-- :class="`theme-${websiteTheme} text-primaryText`" -->
<template>
  <div class="min-h-[100vh] p-4">
    <p :class="`theme-${websiteTheme} text-primaryText font-bold text-lg`">GPA Calculator</p>
    <p class="bg-yellow-300 text-black font-bold">UNDER DEVELOPMENT</p>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <p :class="`theme-${websiteTheme} text-primaryText`" class="font-semibold underline">Results</p>
    <div>
      <p :class="`theme-${websiteTheme} text-primaryText`">GPA: <span class="font-bold">{{ gpa }}</span> </p>
      <p :class="`theme-${websiteTheme} text-primaryText`">Units Taken: <span class="font-bold">{{ gpaUnitsTaken }}</span> </p>
      <p :class="`theme-${websiteTheme} text-primaryText`">Grade Points: <span class="font-bold">{{ gpaGradePoints }}</span> </p>
      <div class="flex flex-col mt-2 items-start space-y-1 justify-center">
        <button class="rounded-sm w-[100px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition ease-in-out text-white font-semibold">Calculate</button>
        <button class="rounded-sm w-[100px] bg-lime-600 hover:bg-lime-700 active:bg-lime-800 transition ease-in-out text-white font-semibold">Download</button>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <div>
      <div v-for="a in aa" class="flex my-5 flex-col border border-tertiary p-2 rounded-sm shadow-md">
        <div :class="`theme-${websiteTheme} text-secondaryText font-semibold`" class="flex flex-col">
          <input :class="`hover:bg-secondary transition ease-in-out theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" v-model="semesterSeason" placeholder="Semester name">
          <input :class="`hover:bg-secondary transition ease-in-out theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" v-model="semesterYear" placeholder="Semester year">
        </div>
        <div class="border-t-[1px] rounded-sm my-2 border-tertiary"></div>
        <div class="flex flex-wrap">
          <div v-for="a in aa" :class="`theme-${websiteTheme} border-2 border-tertiary`" class="flex m-1 flex-col w-fit p-1 rounded-sm">
            <div class="flex flex-col space-y-1">
              <input :class="`courseInput border-[2px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" v-model="courseName" placeholder="Course name">
              <input :class="`courseInput border-[2px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" v-model="courseGrade" placeholder="Course grade">
              <input :class="`courseInput border-[2px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" v-model="courseUnits" placeholder="Course units">
            </div>
            <div class="flex flex-col space-y-1 mt-4 items-center justify-center">
              <button class="rounded-sm w-full bg-green-600 hover:bg-green-700 active:bg-green-800 transition ease-in-out text-white font-semibold">Create course</button>
              <button class="rounded-sm w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition ease-in-out text-white font-semibold">Delete course</button>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-4 space-y-1 items-start justify-center">
          <button class="rounded-sm px-5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition ease-in-out text-white font-semibold">Create semester</button>
          <button class="rounded-sm px-5 bg-red-600 hover:bg-red-700 active:bg-red-800 transition ease-in-out text-white font-semibold">Delete semester</button>
        </div>
      </div>
    </div>
    <button class="rounded-sm w-[100px] bg-red-600 hover:bg-red-700 active:bg-red-800 transition ease-in-out text-white font-semibold">Clear all</button>
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
  padding: 4px;
  padding-left: 4px;
  border-radius: 0.175rem;
  transition: border 0.2s ease;
}

.courseInput:hover {
  border: 2px solid var(--color-unlvRed);
}

.courseInput:focus {
  border: 2px solid var(--color-unlvDarkRed);
}

</style>
