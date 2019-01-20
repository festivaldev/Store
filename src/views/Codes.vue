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
    export default class Codes extends Vue {
        chars: string[] = [..."BCDFGHJKMNPQRTVWXYZ2346789"];

        codes: {id: number, tkx: string, packageId: string, state: number, createdAt: Date, updatedAt: Date}[] = [];
        notification: string = "Code generiert";
        packages: {packageId: string, packageName: string}[] = [];
        selectedPackage: string = "";

        changeCodeState(tkx: string, state: number): void {
            Axios.put(`${this.$store.state.serverUrl}/code`, { tkx: tkx, state: state }).then((res) => {
                this.notification = "Code aktualisiert";
                document.querySelector(".notification")!.classList.add("is-shown");
                setTimeout(() => document.querySelector(".notification")!.classList.remove("is-shown"), 2000);
                this.selectPackage(this.selectedPackage);
            });
        }

        generateNewCode(): void {
            let tkx = [...Array(25)].map((i) => this.chars[Math.random() * this.chars.length | 0]).join("").replace(/(.{5})/g, "$1-").substring(0, 29);
            Axios.put(`${this.$store.state.serverUrl}/code`, { tkx: tkx, packageId: this.selectedPackage }).then((res) => {
                this.notification = "Code generiert";
                document.querySelector(".notification")!.classList.add("is-shown");
                setTimeout(() => document.querySelector(".notification")!.classList.remove("is-shown"), 2000);
                this.selectPackage(this.selectedPackage);
            });
        }

        generateNewCodes(): void {
            let count: number = Number.parseInt(prompt("Wie viele Codes sollen generiert werden?") + "");

            if (count && count > 0) {
                document.querySelector(".notification")!.classList.add("is-shown");
            }

            let c = 0;

            for (let n = 1; n <= count; n++) {
                let tkx = [...Array(25)].map((i) => this.chars[Math.random() * this.chars.length | 0]).join("").replace(/(.{5})/g, "$1-").substring(0, 29);
                Axios.put(`${this.$store.state.serverUrl}/code`, { tkx: tkx, packageId: this.selectedPackage }).then((res) => {
                    c++;
                    this.notification = `Code ${c} von ${count} generiert`;

                    if (c === count) {
                        setTimeout(() => document.querySelector(".notification")!.classList.remove("is-shown"), 2000);
                        this.selectPackage(this.selectedPackage);
                    }
                });
            }
        }

        mounted(): void {
            Axios.get(`${this.$store.state.serverUrl}/packages`).then((res) => {
                this.packages = (res.data as {packageId: string, packageName: string}[]);

                if (this.packages.length > 0) {
                    this.selectPackage(this.packages[0].packageId);
                }
            });
        }

        selectPackage(id: string): void {
            this.selectedPackage = id;

            Axios.get(`${this.$store.state.serverUrl}/codes/${id}`).then((res) => {
                this.codes = (res.data as {id: number, tkx: string, packageId: string, state: number, createdAt: Date, updatedAt: Date}[]);
            });
        }

        toDateString(date: Date): string {
            return new Date(date).toLocaleDateString();
        }
    }

</script>

<template>

    <MyyPage :narrow-content="true">

        <div slot="navigation" class="notification">
            <MyyIcon style="margin-right: 6px">&#xE10B;</MyyIcon><p>{{ this.notification }}</p>
        </div>

        <div slot="content" class="inner-page-wrapper">

            <nav class="inner-page-nav">
                <h2>Pakete</h2>
                <input type="text" placeholder="Suchen" style="margin-bottom: 17px" disabled>
                <div>
                    <template v-for="p in packages">
                        <a :key="p.packageId" @click="selectPackage(p.packageId)" :class="{ 'is-active': selectedPackage === p.packageId }">{{ p.packageName }}</a>
                    </template>
                </div>
            </nav>

            <div class="inner-page-content">
                <MyyPageNavigation style="margin: -40px 0 0 -40px; width: calc(100% + 80px)">
                    <a @click="generateNewCode()"><MyyIcon>&#xE1CC;</MyyIcon><span>Einen neuen Code erzeugen</span></a>
                    <a @click="generateNewCodes()"><MyyIcon>&#xE1CD;</MyyIcon><span>Mehrere neue Codes erzeugen</span></a>
                </MyyPageNavigation>

                <div class="codes-container">
                    <table>
                        <tr>
                            <th>Code</th>
                            <th>Status</th>
                            <th>Aktionen</th>
                        </tr>

                        <template v-for="code in codes">
                            <tr :key="code.id">
                                <td><code>{{ code.tkx }}</code></td>
                                <td>{{ (code.state == 1 ? "Valid" : (code.state == 2 ? "Invalid" : "Eingelöst")) }}</td>
                                <td v-if="code.state == 1"><a @click="changeCodeState(code.tkx, 2)" class="sv-link invalidate-code">Invalidieren</a></td>
                                <td v-if="code.state > 1"><a @click="changeCodeState(code.tkx, 1)" class="sv-link validate-code">Re-Validieren</a></td>
                            </tr>
                        </template>
                    </table>
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

    .notification {
        align-items: center;
        background-color: #1ED760;
        display: flex;
        height: 48px;
        margin-bottom: -48px;
        justify-content: center;
        transform: translateY(-100%);
        transition: all .2s ease;
        z-index: 9999;

        &.is-shown {
            transform: translateY(0);
        }
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
        padding: 40px;
    }

    .codes-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        height: calc(100% - 32px);
        margin-top: 32px;
        max-height: 100%;
        overflow-y: scroll;
        width: calc(100vw - 528px);

        table {
            border-collapse: collapse;
            table-layout: fixed;
            width: 100%;

            tr:not(:last-of-type) {
                border-bottom: 1px solid #E5E5E5;
            }

            th {
                border-bottom: 2px solid #E5E5E5;
                font-weight: 600;
                text-align: left;
            }

            th, td {
                padding: 12px 0;
            }
        }

        code {
            font-family: "SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", monospace;
        }

        .sv-button {
            max-width: 374px;
            min-width: 120px;
            padding: 9px 12px 10px;
        }

        .sv-link {
            &:not(:last-of-type) {
                margin-right: 12px;
            }

            &.invalidate-code {
                --accent: #FF1946;
            }

            &.validate-code {
                --accent: #1ED760;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

</style>
