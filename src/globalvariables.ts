import { ref, onMounted  } from 'vue';

/* Handling theme (just dark/light for now(?))
***************************/
export let darkTheme = ref(false);
export let websiteTheme = ref("light");

export function changeTheme() {
  if(darkTheme.value) {
      websiteTheme.value = "dark";
      localStorage.setItem("theme", "dark");
  } else {
      websiteTheme.value = "light";
      localStorage.setItem("theme", "light");
  }
}

/* Initialize theme on app mount (so new pages pick up the correct theme)
***************************/
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  darkTheme.value = true;
} else {
  darkTheme.value = false;
}
changeTheme();
