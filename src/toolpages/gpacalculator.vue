<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import pb from "../composables/usePocketbase";
import { websiteTheme } from "../globalvariables";

const model = computed(() => pb.authStore.model);
const route = useRoute();
const router = useRouter();

const isAuthenticated = ref(pb.authStore.model !== null);

let howToReadMore = ref(false)

let gpaGradePoints = ref(170.200);
let gpaUnitsTaken = ref(51.000);
let gpa = ref(3.937);

let newSemesterSeason = ref("");
let newSemesterYear = ref();
let SemesterSeasonOptions = ["Season", "Spring", "Summer", "Fall"]
let newCourseGrade = ref("");
let newCourseName = ref("");
let newCourseUnits = ref("");

let coursesJSONFile = ref();
let coursesJSONURL = ref();
let courses = ref(
  {
    "semesters": [
      {
        "year": "",
        "season": "",
        "courses": []
      }
    ]
  }
);

let aa = 1

// Button functions

function deleteSemester() { console.log("Semester deleted") }
function createSemester() { console.log("Semester created") }
function deleteCourse() { console.log("Course deleted") }
function createCourse() { console.log("Course created") }
function clearSchedule() { console.log("Entire schedule has been cleared") }
function calculateGPAInfo() { console.log("GPA Info Calculated") }
function downloadCoursesJSON() { console.log("JSON file of courses downloaded.") }

let JSONFileOpenStatus = ref(null) // 1: good, 0: bad
function loadCoursesJSONfile(event) {
  coursesJSONFile.value = Array.from(event.target.files)[0];
  coursesJSONURL.value = URL.createObjectURL(coursesJSONFile.value);
  JSONFileOpenStatus.value = null;
  const reader = new FileReader(); // Create a new FileReader instance
  reader.onload = function (e) {
    try {
      const jsonContent = JSON.parse(e.target.result); // Parse JSON content
      console.log("JSON courses file loaded.");
      courses.value = jsonContent;
      // console.log(courses.value.semesters[1].year);
      // console.log(courses.value.semesters[1].season);
      // console.log(courses.value.semesters[1].courses[1]);
      JSONFileOpenStatus.value = 1;
      console.log(JSONFileOpenStatus)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError.message);
      JSONFileOpenStatus.value = 0;
    }
  };
  reader.readAsText(coursesJSONFile.value);
}


onMounted(() => {

  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
  });
});
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
      <p :class="`theme-${websiteTheme} text-primaryText`">Units Taken: <span class="font-bold">{{ gpaUnitsTaken
          }}</span> </p>
      <p :class="`theme-${websiteTheme} text-primaryText`">Grade Points: <span class="font-bold">{{ gpaGradePoints
          }}</span> </p>
      <div class="flex flex-col mt-2 items-start space-y-1 justify-center">
        <button @click="calculateGPAInfo()"
          class="rounded-sm w-[190px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition ease-in-out text-white font-semibold">Calculate</button>
        <button @click="downloadCoursesJSON()"
          class="rounded-sm w-[190px] bg-lime-600 hover:bg-lime-700 active:bg-lime-800 transition ease-in-out text-white font-semibold">Download
          JSON file</button>
        <div class="py-2">
          <p :class="`theme-${websiteTheme} text-primaryText font-semibold`">Load Courses JSON file</p>
          <input @change="loadCoursesJSONfile" placeholder="Load JSON file"
            :class="`theme-${websiteTheme} text-primaryText placeholder-tertiaryText`" type="file">
          <p v-if="JSONFileOpenStatus === 1" class="bg-green-500 w-fit my-1 px-2 p-2 font-bold text-white">File Successfully Loaded!</p>
          <p v-if="JSONFileOpenStatus === 0" class="bg-red-600 w-fit my-1 px-2 p-2 font-bold text-white">File failed to load. Try again.</p>
        </div>
        <div class="">
          <p :class="`theme-${websiteTheme} text-primaryText font-semibold`">How this works</p>
          <button @click="howToReadMore = !howToReadMore" :class="`theme-${websiteTheme} text-secondaryText font-semibold text-sm bg-secondary px-1`">
            <span v-if="howToReadMore === false">Open</span><span v-if="howToReadMore">Close</span>
            Instructions</button>
          <p v-if="howToReadMore" :class="`theme-${websiteTheme} text-secondaryText`">
            a) List your courses and semesters below, then click "Calculate" to compute your GPA info. <br> 
            b) Save your schedule as a
            JSON file (a type of text file) to save your schedule by uploading the file ("Choose File" button), which brings back your progress. <br>
            c) Send a message at <a href="https://forms.gle/TVk6J6SoD43d29229" target="_blank" class="underline">this Google form</a> if you have any other questions!
          </p>
        </div>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <div>
      <div v-for="a in aa" class="flex my-2 flex-col border border-tertiary p-2 rounded-sm shadow-md">
        <div :class="`theme-${websiteTheme} text-secondaryText font-semibold`" class="flex flex-col">
          <input
            :class="`hover:bg-secondary transition ease-in-out theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
            v-model="newSemesterSeason" placeholder="Semester name">
          <input
            :class="`hover:bg-secondary transition ease-in-out theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
            v-model="newSemesterYear" placeholder="Semester year">
        </div>
        <div class="border-t-[1px] rounded-sm my-2 border-tertiary"></div>
        <div class="flex flex-wrap">
          <div v-for="a in aa" :class="`theme-${websiteTheme} border-2 border-tertiary`"
            class="flex m-1 flex-col w-fit p-1 rounded-sm">
            <div class="flex flex-col space-y-1">
              <input
                :class="`courseInput border-[1px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
                v-model="newCourseName" placeholder="Course name">
              <input
                :class="`courseInput border-[1px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
                v-model="newCourseGrade" placeholder="Course grade">
              <input
                :class="`courseInput border-[1px] border-tertiary theme-${websiteTheme} text-primaryText placeholder-tertiaryText`"
                v-model="newCourseUnits" placeholder="Course units">
            </div>
            <div class="flex flex-col space-y-1 mt-4 items-center justify-center">
              <button @click="deleteCourse()"
                class="rounded-sm w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition ease-in-out text-white font-semibold">Delete
                course</button>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-4 space-y-1 items-start justify-center">
          <button @click="createCourse()"
            class="rounded-sm px-5 w-[170px] bg-green-600 hover:bg-green-700 active:bg-green-800 transition ease-in-out text-white font-semibold">Create
            course</button>
          <button @click="deleteSemester()"
            class="rounded-sm px-5 w-[170px] bg-red-600 hover:bg-red-700 active:bg-red-800 transition ease-in-out text-white font-semibold">Delete
            semester</button>
        </div>
      </div>
      <div class="flex flex-col mt-4 space-y-1 items-start justify-center">
        <button @click=createSemester()
          class="rounded-sm px-5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition ease-in-out text-white font-semibold">Create
          semester</button>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-tertiary"></div>
    <button @click="clearSchedule()"
      class="rounded-sm w-[100px] bg-red-600 hover:bg-red-700 active:bg-red-800 transition ease-in-out text-white font-semibold">Clear
      all</button>
  </div>
</template>

<style scoped>
.inputError {
  background-color: rgba(255, 0, 0, 0.329);
}

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
