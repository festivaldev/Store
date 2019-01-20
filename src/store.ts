import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,
    reducer: (state: any) => ({ session: state.session }),
});

// export default new Vuex.Store({
//     state: { serverUrl: "https://srv.store.festival.ml", session: null, asideNavOpen: false },
//     mutations: {
//         setSession(state: any, session: any): void {
//             state.session = session;
//         },
//         setAsideNavOpen(state: any, asideNavOpen: boolean): void {
//             state.asideNavOpen = asideNavOpen;
//         }
//     },
//     actions: {},
//     plugins: [vuexLocal.plugin]
// });

export default new Vuex.Store({
    state: { serverUrl: "http://localhost:64037", session: null, asideNavOpen: false },
    mutations: {
        setSession(state: any, session: any): void {
            state.session = session;
        },
        setAsideNavOpen(state: any, asideNavOpen: boolean): void {
            state.asideNavOpen = asideNavOpen;
        }
    },
    actions: {},
    plugins: [vuexLocal.plugin]
});
