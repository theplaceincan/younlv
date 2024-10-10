import Home from "./views/Home.vue";
import Register from "./views/Register.vue";
import gpaCalculator from "./toolpages/gpacalculator.vue";
import qrCodeGenerator from "./toolpages/qrcodegenerator.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },

    // Tool pages
    { path: '/gpa-calculator', component: gpaCalculator},
    { path: '/qr-code-generator', component: gpaCalculator}
];

export default routes;

// meta: { requiresAuth: true }