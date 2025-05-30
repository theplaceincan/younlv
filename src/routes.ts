import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import Menu from "./views/Menu.vue";
import gpaCalculator from "./toolpages/gpacalculator.vue";
import qrCodeGenerator from "./toolpages/qrcodegenerator.vue";
import coursePrepResources from "./toolpages/courseprepresources.vue";
import Calc2practice from "./toolpages/calc2practice.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/menu', component: Menu, meta: { requiresAuth: true } },

    // Tool pages
    { path: '/gpa-calculator', component: gpaCalculator},
    { path: '/qr-code-generator', component: qrCodeGenerator},
    { path: '/course-prep-resources', component: coursePrepResources},
    { path: '/calc2practice', component: Calc2practice},
];

export default routes;

// meta: { requiresAuth: true }