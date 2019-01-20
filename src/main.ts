import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";

import Setting from "@/script/Setting";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {

    // Axios.get(`${store.state.serverUrl}/settings`).then((res) => {
    //     store.commit("setSettings", (res.data as Setting));
    // });

    //next(); // debug! REMOVE IN PRODUCTION

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!store.state.session || !store.state.session.jwt) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount("#app");
