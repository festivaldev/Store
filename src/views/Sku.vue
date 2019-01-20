<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    import MyyCard from "@/components/MyyCard.vue";
    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyWelcome from "@/components/MyyWelcome.vue";

    import Package from "@/script/Package";
    import Setting from "@/script/Setting";

    @Component({
        components: {
            MyyCard,
            MyyIcon,
            MyyPage,
            MyyWelcome,
        },
    })
    export default class Sku extends Vue {

        bundles: Package[] = [];
        bundledPackages: Package[] = [];
        medianReview: number = 0.0;
        review: {stars: number, title: string, content: string} = { stars: 0, title: "", content: "" };
        reviews: {id: number, reviewId: string, packageId: string, stars: number, reviewer: string, title: string, content: string, createdAt: Date, updatedAt: Date}[] = [];
        sku: Package = new Package();
        showContent: boolean = false;
        showDialog: boolean = false;

        beforeMount(): void {
            Axios.get(`${this.$store.state.serverUrl}/settings`).then((res) => {
                if ((res.data as Setting).maintenance) {
                    this.$router.replace("/");
                }
            });

            Axios.get(`${this.$store.state.serverUrl}/sku/${this.$route.params["id"]}`).then((res) => {
                this.sku = res.data as Package;

                this.sku.bundleContentIds.split(",").forEach((contentId) => {
                    Axios.get(`${this.$store.state.serverUrl}/sku/${contentId.toLowerCase()}`).then((res2) => {
                        this.bundledPackages.push(res2.data as Package);
                    });
                });

                Axios.get(`${this.$store.state.serverUrl}/bundles/${this.sku.packageId.toLowerCase()}`).then((res3) => {
                    let bundlePackages = res3.data as Package[];

                    if (bundlePackages.length > 0) {
                        bundlePackages.forEach(p => this.bundles.push(p));
                    }
                });

                Axios.get(`${this.$store.state.serverUrl}/reviews/${this.sku.packageId.toLowerCase()}`).then((res4) => {
                    this.reviews = (res4.data as {id: number, reviewId: string, packageId: string, stars: number, reviewer: string, title: string, content: string, createdAt: Date, updatedAt: Date}[]);

                    this.medianReview = this.reviews.map(r => r.stars).reduce((a, b) => a + b, 0) / this.reviews.length;

                    if (this.reviews.length === 0) {
                        this.medianReview = 0;
                    }
                });

                this.showContent = true;
            });
        }

        composeReview(): void {
            this.review = { stars: 0, title: "", content: "" };
            this.showDialog = true;
        }

        getBundledPackage(id: string): Package {
            if (this.bundledPackages.some((p) => p.packageId.toLowerCase() === id.toLowerCase())) {
                return this.bundledPackages.find((p) => p.packageId.toLowerCase() === id.toLowerCase())!;
            } else {
                return new Package();
            }
        }

        getPercentageOfReviews(stars: number): number {
            if (this.reviews.length === 0) {
                return 0;
            }

            return (100 / this.reviews.length) * this.reviews.filter(r => r.stars === stars).length;
        }
                
        mounted(): void {
            if (document.querySelector(".sv-nav") && document.querySelector(".sv-card")) {
                window.addEventListener("scroll", () => {
                    const elementTarget: HTMLElement = (document.querySelector(".sv-card") as HTMLElement);
                    if (window.scrollY > (elementTarget!.offsetTop + elementTarget!.offsetHeight)) {
                        document.querySelector(".sv-nav:not(.reveal)")!.classList.add("reveal");

                        // if (document.querySelector(".sv-button.up")) {
                        //     document.querySelector(".sv-button.up").classList.add("reveal");
                        // }
                    } else {
                        document.querySelector(".sv-nav.reveal")!.classList.remove("reveal");
                        
                        // if (document.querySelector(".sv-button.up")) {
                        //     document.querySelector(".sv-button.up").classList.remove("reveal");
                        // }
                    }
                });
            }

            // Axios.get(`${this.$store.state.serverUrl}/sku/${this.$route.params["id"]}`).then((res) => {
            //     this.sku = res.data as Package;

            //     document.querySelectorAll(".sv-cta-content .js-open-tab")!.forEach(el => {
            //         el.addEventListener("click", ev => {
            //             ev.preventDefault();

            //             this.openTab(el.getAttribute("href")!.substr(1));
            //         });
            //     });

            //     this.sku.bundleContentIds.split(",").forEach((contentId) => {
            //         Axios.get(`${this.$store.state.serverUrl}/sku/${contentId.toLowerCase()}`).then((res2) => {
            //             this.bundledPackages.push(res2.data as Package);
            //         });
            //     });
            // });
        }

        openTab(tab: string): void {
            const target = document.querySelector(`#${tab}`);

            if (target) {
                if (document.querySelector(".sv-tabs a.active")) {
                    document.querySelector(".sv-tabs a.active")!.classList.remove("active");
                }

                document.querySelector(`.sv-tabs a[href="#${tab}"]`)!.classList.add("active");

                if (document.querySelector(".sv-page.reveal")) {
                    document.querySelector(".sv-page.reveal")!.classList.remove("reveal");
                }

                target.classList.add("reveal");
            }
        }

        sendReview(): void {
            let chars: string[] = [..."BCDFGHJKMNPQRTVWXYZ2346789"];

            Axios.put(`${this.$store.state.serverUrl}/review`, { reviewId: [...Array(16)].map((i) => chars[Math.random() * chars.length | 0]).join(""), packageId: this.sku.packageId, stars: this.review.stars, reviewer: this.$store.state.session.username, title: this.review.title, content: this.review.content }).then((res) => {
                location.reload();
            });
        }

        toDateString(date: Date): string {
            return new Date(date).toLocaleDateString();
        }

        toggleDropdown(dropdown: string): void {
            const target = document.getElementById(dropdown);

            if (target) {
                target.classList.toggle("reveal");
                document.querySelector(`.js-trigger-dropdown[data-dropdown="${dropdown}"]`)!.classList.toggle("active");
            }
        }

        updated(): void {
            document.querySelectorAll(".sv-cta-content .js-open-tab:not(.listener-attached)")!.forEach(el => {
                el.classList.add("listener-attached");
                el.addEventListener("click", ev => {                    
                    ev.preventDefault();

                    this.openTab(el.getAttribute("href")!.substr(1));
                });
            });
        }

    }

</script>

<template>

    <section class="myy-sku" style="--dark: #000; --light: #FFF">

        <div v-if="this.showContent" :style="{ '--accent': this.sku.accent, 'flex-grow': '1' }">

            <article v-if="this.showDialog" class="sv-dialog">
                <div class="sv-content">
                    <a @click.once="showDialog = false" class="myy-dialog-close">&#xE10A;</a>

                    <h2>Rezension für {{ this.sku.packageName }}</h2>
                    <div>Ihre Bewertung wird mit Ihrem Benutzernamen verbunden und für alle sichtbar veröffentlicht. Wenn die Bewertung unangebrachte Inhalte aufweist, wird sie gelöscht und Sie evtl. vom Verfassen neuer Rezensionen ausgeschlossen.</div>

                    <select class="sv-input" v-model="review.stars" style="margin: 26px 0 -10px">
                        <option :value="1">1 Stern</option>
                        <option :value="2">2 Sterne</option>
                        <option :value="3">3 Sterne</option>
                        <option :value="4">4 Sterne</option>
                        <option :value="5">5 Sterne</option>
                    </select>
                    <input class="sv-input" placeholder="Titel" v-model="review.title" type="text" style="margin: 26px 0 -10px">
                    <textarea class="sv-input" placeholder="Rezension" v-model="review.content" rows="6" style="margin: 26px 0 -10px"></textarea>

                    <div class="sv-buttons">
                        <a :disabled="!review.stars || !review.title || !review.content" @click.once="sendReview()" class="sv-button primary" style="color: #FFF">Bewertung abschicken</a>
                        <!-- <a v-if="this.dialogData.hasSecondary" v-html="this.dialogData.secondaryContent" @click.once="callback(false)" class="sv-button"></a> -->
                    </div>
                </div>
            </article>

            <nav class="sv-nav">
                <h1>{{ this.sku.packageName }}</h1>
                <a v-if="sku.hasPrimaryButton" class="sv-button primary" :href="(this.sku.primaryButtonUrl ? this.sku.primaryButtonUrl : (this.sku.versions[this.sku.versions.length - 1] ? this.sku.versions[this.sku.versions.length - 1].versionUrl : '#'))" :disabled="this.sku.isPrimaryButtonDisabled" style="color: var(--light)">{{ this.sku.primaryButtonContent }}</a>
            </nav>

            <!-- <a class="sv-button up"><i class="fas fa-arrow-up"></i></a> -->

            <section style="background-color: #FFF">
                <div class="sv-main-container">
                    <div class="sv-cover-image myy-no-editable-resize" :style="{ 'background-image': `url('${this.sku.coverImageUrl}')`}"></div>

                    <article :class="['sv-card', { 'has-promo': this.sku.hasPromo }]">
                        <div v-if="sku.hasPromo" class="sv-card-promo">
                            <div class="sv-promo-container">
                                <div class="sv-content">
                                    <h2>{{ this.sku.promoTitle }}</h2>
                                    <p>{{ this.sku.promoContent }}</p>
                                </div>
                                <div class="sv-promo-cta">
                                    <a class="sv-button primary" :href="this.sku.promoCtaUrl" :style="{'background-color': this.sku.promoCtaBackgroundColor, 'color': this.sku.promoCtaForegroundColor}">{{ this.sku.promoCtaContent }}</a>
                                </div>
                            </div>
                        </div>

                        <div class="sv-container">
                            <div class="sv-content">
                                <img :src="this.sku.iconUrl" height="100" width="100" />
                                <div>
                                    <div v-if="sku.badges.length > 0">
                                        <span v-for="(b, index) in sku.badges" :key="'badge-' + index" class="sv-badge" :style="{'background-color': b.badgeBackgroundColor, 'color': b.badgeForegroundColor}">{{ b.badgeContent }}</span>
                                    </div>
                                    <h1>{{ this.sku.packageName }}</h1>
                                    <p style="display: inline-block; margin-bottom: 6px"><a class="sv-link" :href="this.sku.projectUrl" style="align-items: center; display: flex"><MyyIcon style="margin-right: 6px">&#xE8A1;</MyyIcon><span>Projekt ansehen</span></a></p>
                                    <a v-if="sku.hasReviews" class="sv-stars js-open-tab" style="color: #999; display: block" href="reviews" @click.prevent="openTab('reviews')"><MyyIcon :class="{ 'given': this.medianReview > 0 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 1 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 2 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 3 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 4 }"></MyyIcon><span style="color: #999; margin: 0 3px 0 6px">{{ this.reviews.length }}</span></a>
                                    <div class="sv-description" v-html="this.sku.shortDescription" style="margin-top: 6px"></div>
                                </div>
                            </div>

                            <div class="sv-cta">
                                <div v-if="sku.hasAlternativeButton">
                                    <div class="sv-buttons" style="width: 228px">
                                        <a class="sv-button multiline">
                                            <p style="width: 100%">{{ this.sku.alternativeButtonLine1 }}</p>
                                            <p style="font-size: 13px; width: 100%">{{ this.sku.alternativeButtonLine2 }}</p>
                                        </a>
                                    </div>
                                    <div class="sv-divider" :data-text="this.sku.seperatorContent"></div>
                                </div>

                                <div>
                                    <p class="sv-price"><s v-if="sku.oldPrice" class="sv-s">{{ this.sku.oldPrice }}</s>{{ this.sku.newPrice }}</p>
                                    <p v-if="sku.priceDetail" class="sv-offer">{{ this.sku.priceDetail }}</p>
                                </div>

                                <div class="sv-buttons">
                                    <a v-if="sku.hasPrimaryButton" class="sv-button primary" :href="(this.sku.primaryButtonUrl ? this.sku.primaryButtonUrl : (this.sku.versions[this.sku.versions.length - 1] ? this.sku.versions[this.sku.versions.length - 1].versionUrl : '#'))" :disabled="this.sku.isPrimaryButtonDisabled" style="color: var(--light)">{{ this.sku.primaryButtonContent }}</a>
                                    <a v-if="sku.hasSecondaryButton" class="sv-button js-trigger-dropdown" data-dropdown="cta-actions-dropdown" @click.prevent="toggleDropdown('cta-actions-dropdown')">•••</a>
                                    <ul class="sv-dropdown" id="cta-actions-dropdown">
                                        <li v-for="(sa, index) in this.sku.secondaryActions" :key="'sa-' + index"><a :href="sa.secondaryActionUrl">{{ sa.secondaryActionContent }}</a></li>
                                    </ul>
                                </div>
                                <div class="sv-cta-content" v-html="this.sku.tcsContent"></div>
                            </div>
                        </div>
                    </article>

                    <nav class="sv-tabs">
                        <a href="#overview" class="active" @click.prevent="openTab('overview')">{{ this.sku.overviewPageName }}</a>

                        <a v-for="(page, index) in sku.customPages" :href="'#' + page.customPageId" :key="'pagelink-' + index" @click.prevent="openTab(page.customPageId)">{{ page.customPageName }}</a>

                        <a v-if="sku.hasSystemRequirementsPage" href="#system-requirements" @click.prevent="openTab('system-requirements')">{{ this.sku.systemRequirementsPageName }}</a>
                        <a v-if="sku.hasChangelogPage" href="#changelog" @click.prevent="openTab('changelog')">{{ this.sku.changelogPageName }}</a>
                        <a v-if="sku.hasReviews" href="#reviews" @click.prevent="openTab('reviews')">{{ this.sku.reviewsPageName }}</a>
                    </nav>

                    <div class="sv-page reveal" id="overview">
                        <h2 v-if="sku.packageType === 'bundle'">In diesem Paket</h2>
                        <div v-if="sku.packageType === 'bundle' && sku.bundleContentIds" class="sv-packages">
                            <router-link v-for="(bundleId, index) in sku.bundleContentIds.split(',')" :key="'bundle-content-' + index" class="sv-package" :to="'/sku/' + bundleId">
                                <img :src="getBundledPackage(bundleId).iconUrl" />
                                <div class="sv-content">
                                    <h6>{{ getBundledPackage(bundleId).packageName }}</h6>
                                    <p><s class="sv-s" v-if="getBundledPackage(bundleId).oldPrice">{{ getBundledPackage(bundleId).oldPrice }}</s>{{ getBundledPackage(bundleId).newPrice }}</p>
                                </div>
                            </router-link>
                        </div>

                        <template v-if="bundles.length > 0">
                            <h2>Enthalten in</h2>
                            <div class="sv-packages">
                                <router-link v-for="(bundle, index) in bundles" :key="'bundle-' + index" class="sv-package" :to="'/sku/' + bundle.packageId.toLowerCase()">
                                    <img :src="bundle.iconUrl" />
                                    <div class="sv-content">
                                        <h6>{{ bundle.packageName }}</h6>
                                        <p><s class="sv-s" v-if="bundle.oldPrice">{{ bundle.oldPrice }}</s>{{ bundle.newPrice }}</p>
                                    </div>
                                </router-link>

                                <!-- <a class="sv-package">
                                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                                    <div class="sv-content">
                                        <h6>Bundle 1</h6>
                                        <p>Kostenlos</p>
                                    </div>
                                </a> -->
                            </div>
                        </template>

                        <template v-if="sku.availableOnTags.length > 0">
                            <h2>Verfügbar auf</h2>
                            <div style="margin-top: -12px">
                                <span v-for="(tag, index) in sku.availableOnTags" class="sv-tag" :key="'tag-' + index">{{ tag }}</span>
                            </div>
                        </template>

                        <template v-if="sku.fullDescription">
                            <h2>Beschreibung</h2>
                            <div v-html="sku.fullDescription"></div>
                        </template>

                        <template v-if="sku.screenshots.length > 0">
                            <h2>Screenshots</h2>
                            <div class="dragscroll sv-screenshots">
                                <img v-for="(screenshot, index) in sku.screenshots" :src="screenshot" :key="'screenshot-' + index" />
                            </div>
                        </template>

                        <h2 v-if="this.sku.hasChangelogPage">Neuigkeiten in dieser Version</h2>
                        <template v-if="this.sku.hasChangelogPage && this.sku.versions && this.sku.versions[this.sku.versions.length - 1]">
                            <p style="font-weight: 600; margin-bottom: 6px">{{ this.sku.versions[this.sku.versions.length - 1].versionName }} <span v-if="this.sku.versions[this.sku.versions.length - 1].versionTag" class="sv-version-tag">{{ this.sku.versions[this.sku.versions.length - 1].versionTag }}</span></p>
                            <ul v-if="this.sku.versions[this.sku.versions.length - 1].versionChangelog" class="sv-ul" v-html="this.sku.versions[this.sku.versions.length - 1].versionChangelog">
                            </ul>

                            <p style="margin-top: 24px"><a href="#changelog" class="sv-link js-open-tab" @click.prevent="">Changelog ansehen</a></p>
                        </template>

                        <template v-if="sku.featureList">
                            <h2>Funktionen</h2>
                            <div v-html="sku.featureList"></div>
                        </template>

                        <template v-if="sku.additionalInfo.length > 0">
                            <h2>Zusätzliche Informationen</h2>
                            <div class="sv-meta">
                                <div v-for="(info, index) in sku.additionalInfo" class="sv-content" :key="'addInfo-' + index">
                                    <p>{{ info.additionalInformationTitle }}</p>
                                    <p v-html="info.additionalInformationContent"></p>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="sv-page" id="system-requirements">
                        <table class="sv-table">
                            <caption>{{ this.sku.requirementsTitle }}<template v-if="this.sku.requirementsSubtitle"><br><span>{{ this.sku.requirementsSubtitle }}</span></template></caption>
                            <tbody>
                                <tr v-for="(rkv, index) in this.sku.requirements" :key="'requirement-' + index">
                                    <th>{{ rkv.requirementKey }}</th>
                                    <td v-html="rkv.requirementValue"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="sv-page" id="changelog">
                        <div v-for="(v, index) in this.sku.versions" style="margin-bottom: 24px" :key="'version-' + index">
                            <p :key="'version-' + index + '-title'" style="font-weight: 600; margin-bottom: 6px">{{ v.versionName }} <span v-if="v.versionTag" class="sv-version-tag">{{ v.versionTag }}</span></p>
                            <ul :key="'version-' + index + '-content'" v-if="v.versionChangelog" class="sv-ul" v-html="v.versionChangelog">
                            </ul>
                        </div>
                    </div>

                    <div class="sv-page" id="reviews">
                        <h2>Kundenrezensionen</h2>
                        <div class="sv-ratings">
                            <div style="text-align: center">
                                <h5 style="font-size: 130px; font-weight: 100; letter-spacing: -5px; line-height: 1; margin-bottom: 7px">{{ this.medianReview.toFixed(1) }}</h5>
                                <p class="sv-stars" style="color: #999"><MyyIcon :class="{ 'given': this.medianReview > 0 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 1 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 2 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 3 }"></MyyIcon><MyyIcon :class="{ 'given': this.medianReview > 4 }"></MyyIcon><span style="color: #999; margin: 0 3px 0 6px">{{ reviews.length }}</span></p>
                            </div>
                            <div class="sv-histogram">
                                <div><span>5</span><MyyIcon></MyyIcon><div class="sv-bar" :style="{ width: getPercentageOfReviews(5) + '%'}"></div><span style="font-weight: 400">{{ getPercentageOfReviews(5).toFixed(0) }}%</span></div>
                                <div><span>4</span><MyyIcon></MyyIcon><div class="sv-bar" :style="{ width: getPercentageOfReviews(4) + '%'}"></div><span style="font-weight: 400">{{ getPercentageOfReviews(4).toFixed(0) }}%</span></div>
                                <div><span>3</span><MyyIcon></MyyIcon><div class="sv-bar" :style="{ width: getPercentageOfReviews(3) + '%'}"></div><span style="font-weight: 400">{{ getPercentageOfReviews(3).toFixed(0) }}%</span></div>
                                <div><span>2</span><MyyIcon></MyyIcon><div class="sv-bar" :style="{ width: getPercentageOfReviews(2) + '%'}"></div><span style="font-weight: 400">{{ getPercentageOfReviews(2).toFixed(0) }}%</span></div>
                                <div><span>1</span><MyyIcon></MyyIcon><div class="sv-bar" :style="{ width: getPercentageOfReviews(1) + '%'}"></div><span style="font-weight: 400">{{ getPercentageOfReviews(1).toFixed(0) }}%</span></div>
                            </div>
                        </div>

                        <p style="margin: 6px 0" v-if="!this.$store.state.session">Melden Sie sich an, um eine Kritik oder Bewertung abzugeben.</p>
                        <router-link :to="{ path: '/login', query: { redirect: this.$route.fullPath }}" v-if="!this.$store.state.session" class="sv-button sv-button-inline" style="margin-top: 5px">Anmelden</router-link>

                        <a v-if="this.$store.state.session" class="sv-button sv-button-inline" style="margin-top: 5px" @click="composeReview()">Bewerten und Kritik schreiben</a>

                        <div style="background-color: #CCC; height: 1px; margin-top: 16px; width: 100%"></div>

                        <h5 style="font-size: 20px; font-weight: 600; line-height: 24px; margin-top: 16px">Alle Benutzerrezensionen</h5>

                        <div class="reviews-container">

                            <template v-for="r in reviews">
                                <article class="review" :key="r.reviewId">
                                    <div>
                                        <p class="sv-stars" style="color: #999"><MyyIcon style="color: #000"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 1 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 2 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 3 }"></MyyIcon><MyyIcon :class="{ 'given': r.stars > 4 }"></MyyIcon></p>
                                        <p>{{ toDateString(r.updatedAt) }}</p>
                                        <p>{{ r.reviewer }}</p>
                                    </div>
                                    <div>
                                        <h6>{{ r.title }}</h6>
                                        <article>{{ r.content }}</article>
                                    </div>
                                </article>
                            </template>
                        </div>
                    </div>

                    <div v-for="(page, index) in sku.customPages" :id="page.customPageId" :key="'page-' + index" class="sv-page"></div>

                </div>
            </section>
        </div>

    </section>

</template>

<style lang="scss" scoped>

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-sku {
        height: 100vh;
        padding-top: 48px;
        width: 100vw;
    }

    .sv-button[disabled] {
        pointer-events: none;
    }

    .reviews-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-top: 26px;
        width: 100%;
    }

    .sv-bar {
        min-width: 1%;
    }

    .sv-stars .myy-icon.given {
        color: #000;
    }

    .review {
        margin-bottom: 48px;
        margin-right: 16px;
        width: 100%;

        &:nth-of-type(2n) {
            margin-right: 0;
        }

        .sv-stars {
            margin: 0 -3px 6px;

            .myy-icon {
                font-size: 18px;
            }
        }

        h6 {
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
            padding: 22px 0 6px;
        }

        article {
            font-size: 15px;
            line-height: 20px;
            margin-bottom: 22px;
        }
    }

    @media screen and (min-width: 769px) {
        .review {
            display: flex;
            width: calc(50% - 8px) !important;

            div {
                min-width: 150px;

                &:first-of-type {
                    margin-right: 24px;
                }
            }

            p {
                margin-bottom: 6px;
            }

            h6 {
                font-size: 18px;
                line-height: 24px;
                padding-top: 0;
            }
        }
    }

    .sv-dialog textarea {
        resize: none;
    }

    .myy-dialog-close {
        color: inherit;
        cursor: pointer;
        font-family: Segoe MDL2 Assets;
        padding: 10px;
        position: absolute;
        right: 0;
        text-decoration: none;
        top: 0;
        transition: all .2s cubic-bezier(0.4, 0.01, 0.165, 0.99);

        &:hover {
            background-color: #FF1946;
            color: #FFF;
        }
    }

</style>
