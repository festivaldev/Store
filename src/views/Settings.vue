<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    import MyyCard from "@/components/MyyCard.vue";
    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyPageNavigation from "@/components/MyyPageNavigation.vue";

    import Setting from "@/script/Setting";

    @Component({
        components: {
            MyyCard,
            MyyIcon,
            MyyPage,
            MyyPageNavigation,
        },
    })
    export default class Settings extends Vue {

        chars: string[] = [..."BCDFGHJKMNPQRTVWXYZ2346789"];
        settings: Setting = new Setting();

        getRandomId(): string {
            return [...Array(10)].map((i) => this.chars[Math.random() * this.chars.length | 0]).join("");
        }

        getRandomCode(): string {
            return [...Array(25)].map((i) => this.chars[Math.random() * this.chars.length | 0]).join("").replace(/(.{5})/g, "$1-").substring(0, 29);
        }

        mounted(): void {
            Axios.get(`${this.$store.state.serverUrl}/settings`).then((res) => {
                this.settings = (res.data as Setting);
            });
        }

        saveSettings(): void {
            Axios.put(`${this.$store.state.serverUrl}/settings`, this.settings).then((res) => {
                document.querySelector(".notification")!.classList.add("is-shown");
                setTimeout(() => document.querySelector(".notification")!.classList.remove("is-shown"), 2000);
            });
        }

        toggleMaintenance(): void {
            this.settings.maintenance = !this.settings.maintenance;
            this.saveSettings();
        }

    }

</script>

<template>

    <MyyPage :narrow-content="true">

        <div slot="navigation" class="notification">
            <MyyIcon style="margin-right: 6px">&#xE10B;</MyyIcon><p>Gespeichert</p>
        </div>

        <div slot="content" style="display: flex">
            <section style="width: 450px">
                <h3 class="section-title">Über diesen Store</h3>

                <div style="align-items: center; display: flex">
                    <img src="https://media.festival.ml/icons/Icon-App-60x60@3x.png" style="height: 48px; margin-right: 12px; width: 48px" />

                    <div>
                        <p>FΞSTIVΛL Store</p>
                        <p style="opacity: .6">store.festival.ml</p>
                    </div>
                </div>

                <div class="meta-link-row">
                    <router-link to="/">Store aufrufen</router-link>
                    <a @click="toggleMaintenance()">Wartungsmodus {{ this.settings.maintenance ? "de" : "" }}aktivieren</a>
                </div>

                <div class="meta-info-row">
                    <MyyIcon>&#xE14D;</MyyIcon>
                    <p>FΞSTIVΛL Store (0.0.8 &beta;)</p>
                </div>
                <div class="meta-info-row">
                    <MyyIcon>&#xE822;</MyyIcon>
                    <p>Wartungsmodus: {{ this.settings.maintenance ? "An" : "Aus" }}</p>
                </div>
                <div class="meta-info-row">
                    <MyyIcon>&#xF133;</MyyIcon>
                    <p>5 veröffentlichte Pakete (6 insgesamt)</p>
                </div>
                <div class="meta-info-row">
                    <MyyIcon>&#xE7E3;</MyyIcon>
                    <p>0 veröffentlichte Betas (2 insgesamt)</p>
                </div>

                <!-- <h3 class="section-title" style="margin-top: 48px">Zufällige Werte</h3>
                <p>{{ getRandomId() }}</p>
                <p>{{ getRandomCode() }}</p> -->
            </section>

            <section style="--dark: #000; --light: #FFF; margin-left: 40px; width: calc(100% - 490px)">
                <h3 class="section-title">Einstellungen</h3>

                <h4>Startseite</h4>

                <h5>Promo (Paket-Id)</h5>
                <input class="sv-input" type="text" v-model="settings.promoPackageId">
                <h5>Promo (Ausrichtung)</h5>
                <select class="sv-input" v-model="settings.promoOrientation">
                    <option :value="'center'">Mittig</option>
                    <option :value="'left'">Links</option>
                </select>
                <h5>Promo (Text)</h5>
                <input class="sv-input" type="text" v-model="settings.promoText">
                <h5>Promo (Button)</h5>
                <input class="sv-input" type="text" v-model="settings.promoButton">

                <div style="height: 36px"></div>

                <h5>Spotlight #1 (Paket-Id)</h5>
                <input class="sv-input" type="text" v-model="settings.spotlight1">
                <h5>Spotlight #2 (Paket-Id)</h5>
                <input class="sv-input" type="text" v-model="settings.spotlight2">
                <h5>Spotlight #3 (Paket-Id)</h5>
                <input class="sv-input" type="text" v-model="settings.spotlight3">
                <h5>Spotlight #4 (Paket-Id)</h5>
                <input class="sv-input" type="text" v-model="settings.spotlight4">

                <a class="sv-button" @click="saveSettings()" style="align-items: center; background-color: #0078D7; color: #FFF; display: inline-flex; padding: 9px 12px 10px"><MyyIcon style="margin-right: 12px">&#xE105;</MyyIcon><span>Speichern</span></a>

            </section>
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

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .meta-link-row {
        display: flex;
        margin: 24px 0 23px;

        a {
            border-bottom: 1px solid transparent;
            cursor: pointer;
            color: #0078D7;
            margin-right: 18px;
            text-decoration: none;

            &:hover {
                border-color: #0078D7;
            }
        }
    }

    .meta-info-row {
        align-items: center;
        border-top: 1px solid #E6E6E6;
        color: #666;
        display: flex;
        padding: 12px 0;

        .myy-icon {
            font-size: 23px;
            margin-right: 12px;
        }

        p {
            padding: 0 24px 0 0;
        }
    }

    h4 {
        font-weight: 600;
        margin-bottom: 22px;
    }

    h5 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .sv-input {
        margin-bottom: 22px;
    }

    .sv-button:active {
        border-color: #000;
    }

</style>
