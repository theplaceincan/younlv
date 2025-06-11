<!-- UNLV GPA Calculator
----------------------------------------------
 This page is a GPA calculator that students can use.
-->

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
let errorMsg = ref(false);

let totalGradePoints = ref(0);
let totalUnitsTaken = ref(0);
let gpa = ref(0);

let gradePoints = [
  { "letterGrade": "A", "point": 4.0 },
  { "letterGrade": "A-", "point": 3.7 },
  { "letterGrade": "B+", "point": 3.3 },
  { "letterGrade": "B", "point": 3.0 },
  { "letterGrade": "B-", "point": 2.7 },
  { "letterGrade": "C+", "point": 2.3 },
  { "letterGrade": "C", "point": 2.0 },
  { "letterGrade": "C-", "point": 1.7 },
  { "letterGrade": "D+", "point": 1.3 },
  { "letterGrade": "D", "point": 1.0 },
  { "letterGrade": "D-", "point": 0.7 },
  { "letterGrade": "F", "point": 0.0 },
  { "letterGrade": "S/U", "point": 0.0 },
  { "letterGrade": "S", "point": 0.0 },
  { "letterGrade": "U", "point": 0.0 },
]

// let inputSemesterSeason = ref("");
// let inputSemesterYear = ref();
let SemesterSeasonOptions = ["Spring", "Summer", "Fall"]
let inputSemester = ref("");
let inputCourseName = ref("");
let inputCourseGrade = ref("");
let inputCourseunits = ref("");
let SemesterYearOptions = [];
for (let year = 1980; year <= 2030; year++) {
  SemesterYearOptions.push(year.toString());
}
console.log(SemesterYearOptions);

let coursesJSONFile = ref();
let coursesJSONURL = ref();
let coursesJSON = ref(
  {
    "semesters": [
      {
        "year": "",
        "season": "",
        "courses": [
          { "name": "", "units": null, "grade": "" },
        ]
      }
    ]
  }
);

let JSONFileOpenStatus = ref(null) // 1: good, 0: bad

let aa = 1
let ee = ref("")

// Button functions
function createSemester() {
  try {
    coursesJSON.value.semesters.push(
      {
        "year": "",
        "season": "",
        "courses": [
          { "name": "", "units": null, "grade": "" },
        ]
      }
    )
    console.log("Semester created");
  } catch (error) {
    console.log("Semester failed to be made: ", error);
  }
}
function deleteSemester(_semesterIndex) {
  try {
    coursesJSON.value.semesters.splice(_semesterIndex, 1)
    console.log("Semester deleted.");
  } catch (error) {
    console.log("Semester failed to be deleted: ", error);
  }
}

function createCourse(_semester) {
  try {
    _semester.courses.push(
      { "name": "", "units": null, "grade": "" }
    )
    console.log("Course created");
  } catch (error) {
    console.log("Course failed to be made: ", error);
  }
}

function deleteCourse(_semester, _courseIndex) {
  try {
    _semester.courses.splice(_courseIndex, 1);
    // console.log(`Course ${_semester.course[_courseIndex].name} deleted`)
  } catch (error) {
    console.log("Course failed to delete: ", error)
  }
}

function clearSchedule() {
  coursesJSON.value =
  {
    "semesters": []
  }
  console.log("Course schedule has been cleared")
}

function calculateGPAInfo() {
  JSONFileOpenStatus.value = false;
  let foundGradePoint = 0;
  gpa.value = 0;
  totalGradePoints.value = 0;
  totalUnitsTaken.value = 0;
  errorMsg.value = false;
  try {
    for (const semester of coursesJSON.value.semesters) {
      for (const course of semester.courses) {
        if (course.units === "" || isNaN(course.units)) throw new Error(`Invalid units for course: ${course.name}`);

        foundGradePoint = gradePoints.find((e) => course.grade == e.letterGrade)?.point || 0
        console.log(`Course: ${course.name}, Grade: ${course.grade}, Grade Point: ${foundGradePoint}`);
        totalGradePoints.value += foundGradePoint * course.units;
        totalUnitsTaken.value += course.units
      }
    }
    gpa.value = (totalGradePoints.value / totalUnitsTaken.value)
    console.log("GPA Info Calculated")
  } catch (error) {
    console.log(`ERROR: ${error}`)
    errorMsg.value = true;
  }
}

let downloadWasSuccessfull = ref(null)
function downloadCoursesJSON() {
  try {
    const jsonString = JSON.stringify(coursesJSON.value, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log("JSON file of courses downloaded.")
  } catch (error) {
    console.log("JSON file of courses failed to download: ", error)
    downloadWasSuccessfull.value = false
  }
  downloadWasSuccessfull.value = true
  removeStatus(downloadWasSuccessfull);
}

function loadCoursesJSONfile(event) {
  coursesJSONFile.value = Array.from(event.target.files)[0];
  coursesJSONURL.value = URL.createObjectURL(coursesJSONFile.value);
  const reader = new FileReader(); // Create a new FileReader instance
  reader.onload = function (e) {
    try {
      const jsonContent = JSON.parse(e.target.result); // Parse JSON content
      console.log("JSON courses file loaded.");
      coursesJSON.value = jsonContent;

      JSONFileOpenStatus.value = 1;
      // removeStatus(JSONFileOpenStatus);
      console.log(JSONFileOpenStatus)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError.message);
      JSONFileOpenStatus.value = 0;
    }
  };
  reader.readAsText(coursesJSONFile.value);
}

function removeStatus(_var) {
  setTimeout(() => {
    _var.value = null;
  }, 3000);
}

let doubleCheck_deleteCourse = ref(false);
let doubleCheck_deleteSemester = ref(false);
let doubleCheck_clearSchedule = ref(false);

onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} text-textHeading`" -->
<template>
  <div class="min-h-[100vh] p-4">
    <p :class="`theme-${websiteTheme} text-textHeading font-bold text-2xl`">GPA Calculator</p>
    <!-- <p class="bg-yellow-300 text-black font-bold px-2">New! Report bugs <a target="_blank"
        href="https://forms.gle/TVk6J6SoD43d29229" class="underline">here</a></p> -->
    <!-- <div class="border-t-[1px] my-4 border-borderDefault"></div> -->
     <div class="my-4"></div>
    <div>
      <p :class="`theme-${websiteTheme} text-textHeading`">GPA: <span class="font-bold">{{ gpa.toFixed(3) }}</span> </p>
      <p :class="`theme-${websiteTheme} text-textHeading`">Units Taken: <span class="font-bold">{{
        totalUnitsTaken.toFixed(3)
      }}</span> </p>
      <p :class="`theme-${websiteTheme} text-textHeading`">Grade Points: <span class="font-bold">{{
        totalGradePoints.toFixed(3)
      }}</span> </p>
      <div class="flex flex-col mt-2 items-start space-y-1 justify-center">
        <button @click="calculateGPAInfo()"
          class="mainButton1 w-[230px] ">Calculate</button>
        <button @click="downloadCoursesJSON()"
          class="mainButton1Blue rounded-sm w-[230px]">Download
          JSON file (.json)</button>
        <div
          :class="{ 'bg-green-500': downloadWasSuccessfull === true, 'bg-red-500': downloadWasSuccessfull === false }">
          <p v-if="downloadWasSuccessfull === false" class="w-fit my-1 px-2 p-2 font-bold text-white">File failed to
            download. Try again.</p>
          <p v-if="downloadWasSuccessfull === true" class="w-fit my-1 px-2 p-2 font-bold text-white">File successfully
            downloaded.</p>
        </div>
        <div class="py-2">
          <p :class="`theme-${websiteTheme} text-textHeading font-semibold`">Load Courses JSON file (.json)</p>
          <div class="p-2"
            :class="{ 'bg-green-500/30': JSONFileOpenStatus === 1, 'bg-red-500/80': JSONFileOpenStatus === 0 }">
            <input @change="loadCoursesJSONfile" placeholder="Load JSON file"
              :class="`theme-${websiteTheme} text-textHeading placeholder-textSubtle`" type="file">
            <p v-if="JSONFileOpenStatus === 0" class="w-fit my-1 px-2 p-2 font-bold text-white">File failed to load. Try
              again.</p>
          </div>
        </div>
        <div class="">
          <p :class="`theme-${websiteTheme} text-textHeading font-semibold`">How this works</p>
          <a @click="howToReadMore = !howToReadMore"
            :class="`theme-${websiteTheme} cursor-pointer text-textBody border border-borderDefault font-semibold text-sm bg-backgroundSubtle hover:bg-backgroundSubtlest px-1`">
            <span v-if="howToReadMore === false">Open</span><span v-if="howToReadMore">Close</span>
            Instructions</a>
          <p v-if="howToReadMore" :class="`theme-${websiteTheme} text-textBody`">
            <span class="font-semibold">a)</span> List your courses and semesters below, then click "Calculate" to
            compute your GPA info. <br>
            <span class="font-semibold">b)</span> Download your schedule as a
            JSON file (a type of text file) to save your schedule and use later by uploading the file ("Choose File"
            button), which
            brings back your progress. <br>
            <span class="font-semibold">c)</span> This page uses this grading scale (from UNLV): A: 4.0, A-: 3.7, B+:
            3.3, B: 3.0, B-: 2.7, C+: 2.3, C: 2.0, C-: 1.7, D+: 1.3, D: 1.0, D-: 0.7, F: 0.0, S/U: 0.0, S: 0.0, U:
            0.0<br>
            <span class="font-semibold">d)</span> Send a message at <a href="https://forms.gle/TVk6J6SoD43d29229"
              target="_blank" class="underline">this
              Google form</a> if you have any other questions!
          </p>
        </div>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-borderDefault"></div>
    <div>
      <p v-if="errorMsg" class="font-bold text-red-500 p-2 border border-red-500">Error: invalid input. Check if
        Semester Year or Course Units are numbers.</p>
      <div v-for="(semester, semesterIndex) in coursesJSON.semesters"
        class="flex my-2 flex-col border border-borderDefault p-2 rounded-sm shadow-md">
        <div :class="`theme-${websiteTheme} text-textBody`" class="flex flex-col">
          <label class="font-semibold">Semester Season</label>
            <select
            :class="`transition ease-in-out theme-${websiteTheme} text-textHeading placeholder-textSubtle courseInput max-w-[300px] border-[1px] border-borderDefault`"
            v-model="semester.season" placeholder="Enter semester season">
            <option v-for="season in SemesterSeasonOptions">{{ season }}</option>
          </select>
          <label class="font-semibold">Semester Year</label>
          <select
            :class="`transition ease-in-out theme-${websiteTheme} text-textHeading placeholder-textSubtle courseInput max-w-[300px] border-[1px] border-borderDefault`"
            v-model="semester.year" placeholder="Enter semester year">
            <option v-for="year in SemesterYearOptions">{{ year }}</option>
          </select>
        </div>
        <div class="border-t-[1px] rounded-sm my-2 border-borderDefault"></div>
        <div class="flex flex-wrap">
          <div v-for="(course, courseIndex) in coursesJSON.semesters[semesterIndex].courses"
            :class="`shadow-md theme-${websiteTheme} border-2 border-borderDefault`"
            class="flex m-1 flex-col w-fit p-1 rounded-sm">
            <div class="flex flex-col space-y-1">
              <input
                :class="`courseInput border-[1px] border-borderDefault theme-${websiteTheme} text-textHeading placeholder-textSubtle`"
                v-model="course.name" placeholder="Course name">
              <select
                :class="`courseInput border-[1px] border-borderDefault theme-${websiteTheme} text-textHeading placeholder-textSubtle`"
                v-model="course.grade" placeholder="Course grade">
                <option v-for="grade in gradePoints">{{ grade.letterGrade }}</option>
              </select>
              <input type="number"
                :class="`courseInput border-[1px] border-borderDefault theme-${websiteTheme} text-textHeading placeholder-textSubtle`"
                v-model="course.units" placeholder="Course units">
            </div>
            <div class="flex flex-col space-y-1 mt-4 items-center justify-center">
              <button @click="deleteCourse(semester, courseIndex)"
                class="mainButton1OutlinedCondensed">
                Delete course
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col mt-4 space-y-1 items-start justify-center">
          <button @click="createCourse(semester)"
            class="mainButton1Green">
            Create course</button>
          <button @click="deleteSemester(semesterIndex)"
            class="mainButton1">
            Delete semester
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-4 space-y-1 items-start justify-center">
        <button @click="createSemester()"
          class="mainButton1Green">
          Create semester</button>
      </div>
    </div>
    <div class="border-t-[1px] my-4 border-borderDefault"></div>
    <button @click="clearSchedule()"
      class="mainButton1">
      Clear all
    </button>
  </div>
</template>

<style scoped>

button {
  width: 100%;
  max-width: 230px;
}

.inputError {
  background-color: rgba(255, 0, 0, 0.329);
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
