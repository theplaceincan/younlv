import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Menu from "./views/Menu.vue";

// tool pages
import gpaCalculator from "./toolpages/gpacalculator.vue";
import qrCodeGenerator from "./toolpages/qrcodegenerator.vue";
import classResources from "./toolpages/classresources.vue";
import textbookFinder from "./toolpages/textbookfinder.vue";
import coursePracticeBanks from "./toolpages/coursepracticebanks.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/menu', component: Menu, meta: { requiresAuth: true } },

    // Tool pages
    { path: '/gpa-calculator', component: gpaCalculator},
    { path: '/qr-code-generator', component: qrCodeGenerator},
    { path: '/class-resources', component: classResources},
    { path: '/textbook-finder', component: textbookFinder},
    { path: '/course-practice-banks', component: coursePracticeBanks},
];

export default routes;

// meta: { requiresAuth: true }