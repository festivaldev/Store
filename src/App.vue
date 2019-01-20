<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import MyyDialog from "@/components/MyyDialog.vue";
    import MyyNavigation from "@/components/MyyNavigation.vue";

    @Component({
        components: {
            MyyDialog,
            MyyNavigation,
        },
    })
    export default class App extends Vue {}

</script>

<template>

    <div id="app">
        <MyyDialog />

        <MyyNavigation :key="$route.fullPath + '-nav'" />

        <router-view :key="$route.fullPath + '-rv'" />
    </div>

</template>

<style lang="scss">

    @import "style/_breakpoints";
    @import "style/_colors";

    * {
        margin: 0;
        padding: 0;
        position: relative;

        &, &::after, &::before {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }
    }

    html, body {
        height: 100%;
    }

    body {
        background-color: $light;
        color: $dark;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.15;
        overflow-x: hidden;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        -webkit-text-decoration-skip: ink;
    }

    a {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -o-user-select: none;
    }

    kbd {
        background-color: #F4F4F4;
        border-radius: 3px;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        font-size: 85%;
        margin: 0;
        padding: 0.2em 0.4em;
    }

    #app {
        min-height: 100vh;
        position: absolute;
        top: 0;
        width: 100%;
    }

</style>
