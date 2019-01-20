<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class MyyWelcome extends Vue {

        @Prop({ type: String, default: "Willkommen" })
        public message: String;

    }

</script>

<template>

    <header class="myy-welcome">
        <h1>{{ this.message }}</h1>

        <div class="welcome-content">
            <slot />
        </div>
    </header>

</template>

<style lang="scss" scoped>

    .myy-welcome {
        align-items: center;
        background: linear-gradient(to bottom, #0078D7 0%, #09A2CE);
        box-shadow: 0 12px 45px -8px #0078D74D;
        color: #FFF;
        display: flex;
        justify-content: space-between;
        padding: 40px 5%;

        h1 {
            font-size: 28px;
            font-weight: 600;
        }
    }

    .welcome-content {
        display: flex;

        div {
            min-width: 200px;
        }

        div:not(:last-of-type) {
            margin-right: 48px;
        }

        .myy-icon {
            font-size: 21px
        }

        h2 {
            font-size: 16px;
            font-weight: 600;
            margin: 6px 0;
        }

        span:not(.myy-icon) {
            display: block;
            font-size: 14px;
            opacity: .6;
        }

        a {
            border-bottom: 1px solid transparent;
            color: #FFF;
            display: inline-block;
            font-size: 15px;
            font-weight: 600;
            margin-top: 12px;
            text-decoration: none;

            &::after {
                content: "";
                font-family: 'Segoe MDL2 Assets';
                font-size: 11px;
                margin-left: 3px;
            }

            &:hover {
                border-bottom-color: #FFF;
            }
        }
    }

</style>