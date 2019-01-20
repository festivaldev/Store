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
    export default class Packages extends Vue {
        packages: {packageId: string, packageName: string}[] = [];

        al(s: string): void {
            alert(s);
        }

        mounted(): void {
            Axios.get(`${this.$store.state.serverUrl}/packages`).then((res) => {
                this.packages = (res.data as {packageId: string, packageName: string}[]);
            });
        }
    }

</script>

<template>

    <MyyPage :narrow-content="true">
        <MyyPageNavigation slot="navigation">
            <router-link to="/editor"><MyyIcon>&#xE109;</MyyIcon><span>Neues Paket anlegen</span></router-link>
        </MyyPageNavigation>

        <div slot="content">
            <div class="cards-container">
                <MyyCard v-for="p in this.packages" :key="p.packageId" action-icon="" :title="p.packageName" :router-link="'/editor/' + p.packageId">
                    <div class="card-meta">
                        <h5 class="meta-title"><MyyIcon>&#xE928;</MyyIcon><span>{{ p.packageId }}</span></h5>
                    </div>
                </MyyCard>

                <!-- <MyyCard action-icon="" title-icon="&#xE814;" title="The Defectively Ecosystem">
                    <div class="card-meta">
                        <h5 class="meta-title"><MyyIcon>&#xF384;</MyyIcon><span>Nicht verfügbar</span></h5>
                        <h5 class="meta-title"><MyyIcon>&#xE12B;</MyyIcon><span>Verfügbar</span></h5>
                        <h5 class="meta-title"><MyyIcon>&#xECC5;</MyyIcon><span>0.2.5</span></h5>
                        <h5 class="meta-title"><MyyIcon>&#xE896;</MyyIcon><span>142</span></h5>
                    </div>
                </MyyCard> -->

            </div>
        </div>
    </MyyPage>

</template>

<style lang="scss" scoped>

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

</style>
