<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    import MyyCard from "@/components/MyyCard.vue";
    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyPageNavigation from "@/components/MyyPageNavigation.vue";

    import Package from "@/script/Package";

    @Component({
        components: {
            MyyCard,
            MyyIcon,
            MyyPage,
            MyyPageNavigation,
        },
    })
    export default class Reports extends Vue { }

</script>

<template>

    <MyyPage :narrow-content="true">
        <div slot="content" class="inner-page-wrapper">

            <nav class="inner-page-nav">
                <h2>Pakete</h2>
                <input type="text" placeholder="Suchen" style="margin-bottom: 17px" disabled>
            </nav>

            <div class="inner-page-content">
                <div class="reports-container">

                    <article class="report">
                        <div class="report-header">
                            <h3><span>#1</span>DateTimeFormatInfo.set_Calendar (System.Globalization.Calendar value)</h3>
                            <div style="display: flex">
                                <div class="report-meta">
                                    <h5>Auswirkungen</h5>
                                    <p><MyyIcon>&#xE945;</MyyIcon>44</p>
                                </div>
                                <div class="report-meta">
                                    <h5>Version</h5>
                                    <p>1.3.1</p>
                                </div>
                                <div class="report-meta">
                                    <h5>Zuletzt aufgetreten</h5>
                                    <p>11. Jan, 18:46</p>
                                </div>
                                <a class="report-button green">Erledigt</a>
                            </div>
                        </div>
                    </article>

                </div>
            </div>
        </div>
    </MyyPage>

</template>

<style lang="scss" scoped>

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-page {
        background-color: #FFF;
    }

    .inner-page-wrapper {
        display: flex;
        height: calc(100vh - 48px);
        margin: -40px;
    }

    .inner-page-nav {
        background-color: #E5E5E5;
        color: #000;
        height: 100%;
        width: 400px;

        div {
            margin-right: -17px;
            max-height: calc(100% - 110px);
            overflow-y: scroll;
        }

        h2 {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.15;
            padding: 14.8px 16px;
        }

        input {
            background-color: #FFF;
            border: 1px solid transparent;
            border-radius: 0 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
            margin: 4.7px 16px;
            max-width: 746px;
            min-width: 367px;
            padding: 8px 10px;
            transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

            &:focus {
                border-color: #333;
            }
        }

        a {
            cursor: pointer;
            display: block;
            padding: 14.8px 16px;

            &:hover {
                background-color: #DADADA;
            }

            &.is-active {
                background-color: #FF1946;
                color: #FFF;
            }
        }
    }

    .inner-page-content {
        background-color: #FFF;
    }

    .reports-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: 100%;
        max-height: 100%;
        overflow-y: scroll;
        width: calc(100vw - 448px);
    }

    .report {
        padding: 0 26px;        
        width: 100%;
    }

    .report-header {
        align-items: center;
        display: flex;
        height: 100px;

        .report-meta {
            margin-left: 36px;
        }

        h3 {
            flex-grow: 1;
            font-size: 16px;
            font-weight: 600;

            span {
                font-weight: 400;
                margin-right: 12px;
                opacity: .6;
            }
        }

        h5 {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 6px;
            opacity: .6;
        }
    }

    .report-button {
        background-color: #F5F5F5;
        border-radius: 4px;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        height: 40px;
        margin-left: 12px;
        padding: 12px;
        transition: all .2s cubic-bezier(.4, .01, .165, .99);

        &:hover {
            background-color: #E6E6E6;
        }

        &:active {
            transform: scale(.98);
        }

        &.green {
            background-color: #107C10;
            color: #FFF;

            &:hover {
                background-color: #0F630F;
            }
        }
    }

</style>
