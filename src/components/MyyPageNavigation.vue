<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    import MyyIcon from "@/components/MyyIcon.vue";

    @Component({
        components: {
            MyyIcon,
        },
    })
    export default class MyyNavigation extends Vue { }

</script>

<template>

    <nav class="myy-page-navigation">
        <slot />
    </nav>

</template>

<style lang="scss">

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-page-navigation {
        background-color: #FFF;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);
        display: flex;
        height: 48px;
        width: 100%;

        a, p {
            align-items: center;
            color: inherit;
            display: flex;
            height: 48px;
            padding: 0 16px;

            .myy-icon {
                margin-right: 12px;
            }

            :not(.myy-icon) {
                font-size: 14px;
            }
        }

        a {
            cursor: pointer;
            text-decoration: none;

            &:hover {
                background-color: #F5F5F5;
            }
        }

        p {
            font-weight: 600;
        }
    }

    .navigation-link {
        align-items: center;
        color: #FFF;
        cursor: pointer;
        display: flex;
        height: 48px;
        padding: 0 16px;
        text-decoration: none;
    }

    .navigation-link:hover, .navigation-link.is-active {
        background-color: #484848;
    }

</style>

