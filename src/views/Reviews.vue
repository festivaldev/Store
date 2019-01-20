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
    export default class Reviews extends Vue {
        packages: {packageId: string, packageName: string}[] = [];
        reviews: {id: number, reviewId: string, packageId: string, stars: number, reviewer: string, title: string, content: string, createdAt: Date, updatedAt: Date}[] = [];
        selectedPackage: string = "";

        deleteReview(id: string): void {
            Axios.delete(`${this.$store.state.serverUrl}/review/${id}`).then((res) => {
                this.selectPackage(this.selectedPackage);
            });
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

            Axios.get(`${this.$store.state.serverUrl}/reviews/${id}`).then((res) => {
                this.reviews = (res.data as {id: number, reviewId: string, packageId: string, stars: number, reviewer: string, title: string, content: string, createdAt: Date, updatedAt: Date}[]);
            });
        }

        toDateString(date: Date): string {
            return new Date(date).toLocaleDateString();
        }
    }

</script>

<template>

    <MyyPage :narrow-content="true">
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
                <div class="reviews-container">

                    <template v-for="r in reviews">
                        <article class="review" :key="r.reviewId">
                            <p class="sv-stars" style="color: #999"><MyyIcon style="color: #000"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 1 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 2 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 3 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 4 }"></MyyIcon></p>
                            <p>{{ r.reviewer }} <span style="font-size: 14px; margin: 0 12px; opacity: .6">{{ toDateString(r.updatedAt) }}</span> <code class="sv-code">{{ r.reviewId }}</code></p>
                            <h6>{{ r.title }}</h6>
                            <article>{{ r.content }}</article>
                            <a class="sv-link delete-review" @click="deleteReview(r.reviewId)">Löschen</a>
                        </article>
                    </template>

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
        padding: 40px;
    }

    .reviews-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        max-height: 100%;
        overflow-y: scroll;
        width: calc(100vw - 528px);
    }

    .review {
        margin-bottom: 48px;
        margin-right: 16px;
        width: calc(25% - 12px);

        &:nth-of-type(4n) {
            margin-right: 0;
        }

        .sv-stars {
            margin: 0 -3px 6px;
        }

        .sv-stars .myy-icon {
            font-size: 18px;
        }

        h6 {
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            padding: 22px 0 5px;
        }

        article {
            font-size: 15px;
            line-height: 20px;
            margin-bottom: 22px;
        }
    }

    .delete-review {
        --accent: #FF1946;

        &:hover {
            cursor: pointer;
        }
    }

    .sv-stars .myy-icon.given {
        color: #000;
    }

</style>
