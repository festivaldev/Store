<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    import MyyCard from "@/components/MyyCard.vue";
    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyWelcome from "@/components/MyyWelcome.vue";

    import Package from '@/script/Package';
    import Setting from "@/script/Setting";

    @Component({
        components: {
            MyyCard,
            MyyIcon,
            MyyPage,
            MyyWelcome,
        },
    })
    export default class Index extends Vue {

        promo: Package = new Package();
        settings: Setting = new Setting();
        spotlight1: Package = new Package();
        spotlight2: Package = new Package();
        spotlight3: Package = new Package();
        spotlight4: Package = new Package();

        beforeMount(): void {
            Axios.get(`${this.$store.state.serverUrl}/settings`).then((res) => {
                this.settings = (res.data as Setting);

                if (this.settings.promoPackageId) {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${this.settings.promoPackageId}`).then((res2) => {
                        this.promo = (res2.data as Package);
                    });
                }

                if (this.settings.spotlight1) {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${this.settings.spotlight1}`).then((res2) => {
                        this.spotlight1 = (res2.data as Package);
                    });
                }

                if (this.settings.spotlight2) {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${this.settings.spotlight2}`).then((res2) => {
                        this.spotlight2 = (res2.data as Package);
                    });
                }

                if (this.settings.spotlight3) {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${this.settings.spotlight3}`).then((res2) => {
                        this.spotlight3 = (res2.data as Package);
                    });
                }

                if (this.settings.spotlight4) {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${this.settings.spotlight4}`).then((res2) => {
                        this.spotlight4 = (res2.data as Package);
                    });
                }
            });
        }

    }

</script>

<template>

    <section class="myy-index">
        <section v-if="!this.settings.maintenance" class="article-container">

            <article v-if="this.settings.promoPackageId" :class="['main', this.settings.promoOrientation]" :style="{ 'background-image': 'url(\'' + this.promo.coverImageUrl + '\')' }">
                <div class="article-content" style="color: #FFF">
                    <h2>{{ this.promo.packageName }}</h2>
                    <p>{{ this.settings.promoText }}</p>
                    <router-link class="sv-button" :to="'/sku/' + this.settings.promoPackageId" :style="{ 'background-color': this.promo.accent }">{{ this.settings.promoButton }}</router-link>
                </div>
            </article>

            <!-- <article class="main left" style="background-image: url('https://cdn-images-1.medium.com/max/1920/1*xiZKGgRzUazXQAnmIRDtrQ.png'); margin-top: 48px">
                <div class="article-content" style="color: #FFF">
                    <h2>The Defectively Ecosystem</h2>
                    <p>Lade jetzt Server, Client und SDK im praktischen Bundle.</p>
                    <a class="sv-button" style="color: #000">Mehr Informationen</a>
                </div>
            </article> -->

            <div v-if="this.settings.spotlight1 || this.settings.spotlight2 || this.settings.spotlight3 || this.settings.spotlight4" class="article-row">
                <article v-if="this.settings.spotlight1" class="card">
                    <img :src="this.spotlight1.coverImageUrl" />
                    <h2>{{ this.spotlight1.packageName }}</h2>
                    <div v-html="this.spotlight1.shortDescription"></div>
                    <router-link :to="'/sku/' + this.settings.spotlight1">Mehr anzeigen</router-link>
                </article>

                <article v-if="this.settings.spotlight2" class="card">
                    <img :src="this.spotlight2.coverImageUrl" />
                    <h2>{{ this.spotlight2.packageName }}</h2>
                    <div v-html="this.spotlight2.shortDescription"></div>
                    <router-link :to="'/sku/' + this.settings.spotlight2">Mehr anzeigen</router-link>
                </article>

                <article v-if="this.settings.spotlight3" class="card">
                    <img :src="this.spotlight3.coverImageUrl" />
                    <h2>{{ this.spotlight3.packageName }}</h2>
                    <div v-html="this.spotlight3.shortDescription"></div>
                    <router-link :to="'/sku/' + this.settings.spotlight3">Mehr anzeigen</router-link>
                </article>

                <article v-if="this.settings.spotlight4" class="card">
                    <img :src="this.spotlight4.coverImageUrl" />
                    <h2>{{ this.spotlight4.packageName }}</h2>
                    <div v-html="this.spotlight4.shortDescription"></div>
                    <router-link :to="'/sku/' + this.settings.spotlight4">Mehr anzeigen</router-link>
                </article>

                <!-- <article class="card">
                    <img src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?h=1080&w=1920" />
                    <h2>Product</h2>
                    <p>Product Description</p>
                    <router-link to="/sku/product">Mehr anzeigen</router-link>
                </article> -->
            </div>

            <h2 class="section-title">Populäre Produkte</h2>

            <div class="article-row">
                <article class="small">
                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                    <h2>Product</h2>
                    <p>Kostenlos</p>
                </article>

                <article class="small">
                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                    <h2>Product</h2>
                    <p>Kostenlos</p>
                </article>
                
                <article class="small">
                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                    <h2>Product</h2>
                    <p>Kostenlos</p>
                </article>

                <article class="small">
                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                    <h2>Product</h2>
                    <p>Kostenlos</p>
                </article>

                <article class="small">
                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                    <h2>Product</h2>
                    <p>Kostenlos</p>
                </article>
            </div>            

            <h2 class="section-title">Kategorien</h2>

            <div style="background-color: #F5F5F5; margin-top: 48px; padding: 5%">
                <h2 class="section-title" style="margin-top: 0; padding: 0 !important">Suchst du nach Tweaks?</h2>    
                <p>Im FΞSTIVΛL Store findest du alle unsere Projekte zum Download. Hiervon ausgenommen sind Tweaks für iOS, die wir ausschließlich über unsere Repo verteilen.</p>    
                <a class="sv-button inline-button" style="background-color: #0078D7; color: #FFF; margin-top: 48px">Zur FΞSTIVΛL Repo</a>
            </div>

        </section>

        <section v-if="this.settings.maintenance" class="article-container">
            <p>Dieser Store ist im Wartungsmodus</p>
        </section>
    </section>

</template>

<style lang="scss" scoped>

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-index {
        --dark: #000;
        height: 100vh;
        padding-top: 48px;
        width: 100vw;
    }

    .banner {
        background-color: #EBEBEB;
        color: #000;
        font-size: 14px;
        padding: 12px 36px;
        text-align: center;

        &.info {            
            background-color: #0078D7;
            color: #FFF;
        }

        &.warning {
            background-color: #FFD800;
            color: #000;
        }

        &.error {
            background-color: #FF1946;
            color: #FFF;
        }
    }

    .article-container {
        margin: 0 auto;
        max-width: 1600px;
        padding: 48px 0;
    }

    article.main {
        background-position: center center;
        background-size: cover;
        min-height: 600px;
        position: relative;
    }

    .article-content {
        position: absolute;
        width: 50%;

        .left & {
            left: 5%;
            top: 50%;
            transform: translateY(-50%);
        }

        .center & {
            bottom: 60px;
            left: 50%;
            text-align: center;
            transform: translateX(-50%);
        }

        h2 {
            font-size: 34px;
            font-weight: 600;
            line-height: 40px;
            padding: 36px 0 4px;
        }

        p {
            margin-top: 12px;
        }

        .sv-button {
            margin-top: 16px;
            padding: 10px 22px;
            text-transform: uppercase;
        }        
    }

    .article-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 48px;

        .section-title + & {
            margin-top: 22px;
        }
    }

    article.card {
        width: calc(25% - 18px);

        & + & {
            margin-left: 24px;
        }

        img {
            width: 100%;
        }

        h2 {
            font-size: 20px;
            font-weight: 600;
            line-height: 24px;
            margin-top: 28px;
            margin-bottom: 12px;
        }

        div {
            line-height: 1.25;
        }

        a {
            border-bottom: 2px solid transparent;
            color: #0078D7;
            display: inline-block;
            font-weight: 600;
            margin-top: 22px;
            padding: 0 0 2px 0;
            text-decoration: none;
            text-transform: uppercase;
            transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

            &::after {
                content: "";
                font-family: 'Segoe MDL2 Assets';
                font-size: 11px;
                margin-left: 6px;
                transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
            }

            &:hover {
                border-bottom-color: #0078D7;

                &::after {
                    margin-left: 10px;
                }
            }
        }
    }

    article.small {
        margin: 0 18px 0 0;

        img {
            height: 124px;
            width: 124px;
        }

        h2 {
            font-size: 15px;
            font-weight: 600;
            line-height: 20px;
            padding-top: 16px;
        }

        p {
            font-size: 15px;
            line-height: 20px;
            margin-top: 6px;
        }
    }

    .section-title {
        font-size: 24px;
        font-weight: 600;
        line-height: 28px;
        margin-bottom: 18px;
        margin-top: 48px;
    }

    .inline-button {
        max-width: 374px;
        min-width: 120px;
        padding: 9px 12px 10px;
    }

    @media screen and (max-width: 1600px) {
        .article-container {
            padding: 0;
        }

        .article-row {
            padding: 0 5%;
        }

        article.card {
            width: calc(25% - 18px);
        }

        .section-title {
            padding: 0 5%;
        }
    }

    @media screen and (max-width: 768px) {
        .article-row {
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 0;
        }

        article.card {
            margin: 48px 0 0 !important;
            width: 47.5%;
        }
    }

</style>
