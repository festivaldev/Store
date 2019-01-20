<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    import MyyCard from "@/components/MyyCard.vue";
    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyWelcome from "@/components/MyyWelcome.vue";

    import Package from '@/script/Package';

    @Component({
        components: {
            MyyCard,
            MyyIcon,
            MyyPage,
            MyyWelcome,
        },
    })
    export default class Dashboard extends Vue {

        packages: Package[] = [];

        mounted(): void {
            Axios.get(`${this.$store.state.serverUrl}/packages`).then((res) => {
                (res.data as { packageId: string, packageName: string}[]).forEach((p) => {
                    Axios.get(`${this.$store.state.serverUrl}/package/${p.packageId}`).then((res2) => this.packages.push(res2.data as Package));
                });
            });
        }

    }

</script>

<template>

    <MyyPage>
        <MyyWelcome :message="'Willkommen ' + this.$store.state.session.username" slot="navigation">
            <div>
                <MyyIcon>&#xF133;</MyyIcon>
                <h2>{{ this.packages.length }} Pakete angelegt</h2>
                <span>Davon {{ this.packages.filter((p) => p.isPublic).length }} veröffentlicht</span>
                <router-link to="/packages">Pakete verwalten</router-link>
            </div>

            <div>
                <MyyIcon>&#xE7E3;</MyyIcon>
                <h2>2 Betas angelegt</h2>
                <span>Davon 0 veröffentlicht</span>
                <a href="#">Betas verwalten</a>
            </div>

            <div>
                <MyyIcon>&#xE896;</MyyIcon>
                <h2>420 Downloads</h2>
                <span>Zuzüglich 1337 Seitenaufrufe</span>
                <a href="#">Alle Statistiken</a>
            </div>
        </MyyWelcome>

        <div slot="content">
            <h3 class="section-title">Schnellaktionen</h3>

            <div class="cards-container">
                <MyyCard action-icon="" title-icon="&#xF133;" title="Neues Paket" router-link="/editor" />
                <!-- <MyyCard action-icon="" title-icon="&#xE7E3;" title="Neue Beta" /> -->
            </div>

            <!-- <h3 class="section-title">Erkannte Probleme</h3>

            <div class="cards-container">
                <MyyCard action-icon="" title-icon="&#xE814;" title="The Defectively Ecosystem">
                    <p>Fehlender oder kaputter Download-Link obwohl zum Download verfügbar.</p>
                </MyyCard>
            </div>

            <h3 class="section-title">Anstehend</h3>

            <div class="cards-container">
                <MyyCard action-icon="" title-icon="&#xE183;" title="Release">
                    <p>The Defectively Ecosystem</p>
                    <p><kbd>tde/e141d60</kbd></p>
                    <p class="card-meta">10.10.18 10:00 &ndash; In 4 Stunden</p>
                </MyyCard>
            </div>

            <h3 class="section-title">Erledigt</h3>

            <div class="cards-container">
                <MyyCard action-icon="" title-icon="&#xE8EC;" title="Rabatt aktiviert">
                    <p>UNIcode</p>
                    <p>-10% für 14 Tage</p>
                    <p class="card-meta">Vor 21 Minuten</p>
                </MyyCard>

                <MyyCard action-icon="" title-icon="&#xE7BA;" title="Banner entfernt">
                    <p class="card-meta">Vor 6 Minuten</p>
                </MyyCard>
            </div> -->
        </div>
    </MyyPage>

</template>

<style lang="scss" scoped>

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

</style>
