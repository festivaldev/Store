import Vue from "vue";
import Router from "vue-router";

import Alias from "./views/Alias.vue";
import Codes from "./views/Codes.vue";
import Dashboard from "./views/Dashboard.vue";
import Editor from "./views/Editor.vue";
import Index from "./views/Index.vue";
import Login from "./views/Login.vue";
import Packages from "./views/Packages.vue";
import Reports from "./views/Reports.vue";
import Reviews from "./views/Reviews.vue";
import Settings from "./views/Settings.vue";
import Sku from "./views/Sku.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "index",
            component: Index,
            meta: { minimalNav: true }
        },
        {
            path: "/a/:alias",
            name: "alias",
            component: Alias,
            meta: { noNav: true }
        },
        {
            path: "/codes",
            name: "codes",
            component: Codes,
            meta: { requiresAuth: true }
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard,
            meta: { requiresAuth: true }
        },
        {
            path: "/editor",
            name: "editor",
            component: Editor,
            meta: { requiresAuth: true }
        },
        {
            path: "/editor/:id",
            name: "editorWithId",
            component: Editor,
            meta: { requiresAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: { minimalNav: true }
        },
        {
            path: "/packages",
            name: "packages",
            component: Packages,
            meta: { requiresAuth: true }
        },
        {
            path: "/reports",
            name: "reports",
            component: Reports,
            meta: { requiresAuth: true }
        },
        {
            path: "/reviews",
            name: "reviews",
            component: Reviews,
            meta: { requiresAuth: true }
        },
        {
            path: "/settings",
            name: "settings",
            component: Settings,
            meta: { requiresAuth: true }
        },
        {
            path: "/sku/",
            redirect: "/"
        },
        {
            path: "/sku/:id",
            name: "sku",
            component: Sku,
            meta: { minimalNav: true }
        }
    ]
});

// {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
// }