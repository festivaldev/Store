<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import { EventBus } from "@/eventbus";

    import Axios from "axios";

    import MyyIcon from "@/components/MyyIcon.vue";
    import MyyPage from "@/components/MyyPage.vue";
    import MyyPageNavigation from "@/components/MyyPageNavigation.vue";

    import AdditionalInformation from "@/script/AdditionalInformation";
    import Badge from "@/script/Badge";
    import CustomPage from "@/script/CustomPage";
    import Dialog from "@/script/Dialog";
    import EditableField from "@/script/EditableField";
    import Package from "@/script/Package";
    import Requirement from "@/script/Requirement";
    import SecondaryAction from "@/script/SecondaryAction";
    import Version from "@/script/Version";

    import PackageFieldStrings from "@/script/PackageFieldStrings";

    @Component({
        components: {
            MyyIcon,
            MyyPage,
            MyyPageNavigation,
        },
    })
    export default class Packages extends Vue {

        pfs: PackageFieldStrings = new PackageFieldStrings();

        editedPackage: Package = new Package();
        editorPanelFields: EditableField[] = [];
        editorPanelOpen: boolean = false;

        additionalInfo: any = AdditionalInformation;
        badge: any = Badge;
        customPage: any = CustomPage;
        requirement: any = Requirement;
        secondaryAction: any = SecondaryAction;
        version: any = Version;

        chars: string[] = [ ..."BCDFGHJKMNPQRTVWXYZ2346789" ];

        addNewItemToField(field: EditableField): void {
            (this.editedPackage[field.key] as any[]).push(new field.itemType());
        }

        closeEdit(): void {
            this.editorPanelFields = [];
            this.editorPanelOpen = false;
        }

        deleteItemFromField(field: EditableField, index: number): void {
            (this.editedPackage[field.key] as any[]).splice(index, 1);
        }

        edit(options: EditableField[]): void {
            options.forEach((o) => o.type = (o.type === undefined ? String : o.type));

            this.editorPanelOpen = true;
            this.editorPanelFields = options;
        }

        elementsHidden(): boolean {
            return !this.editedPackage.hasPromo || !this.editedPackage.hasAlternativeButton || !this.editedPackage.hasPrimaryButton || !this.editedPackage.hasSecondaryButton;
        }

        mounted(): void {
            document.querySelectorAll(".sv-button").forEach((el) => {
                el.addEventListener("click", (ev) => ev.preventDefault());
            });

            if (this.$route.params["id"]) {
                Axios.get(`${this.$store.state.serverUrl}/package/${this.$route.params["id"]}`).then((res) => {
                    let p: Package = (res.data as Package);

                    for (let i = 0; i < p.additionalInfo.length; i++) {
                        p.additionalInfo[i] = (Object.assign(new AdditionalInformation(), p.additionalInfo[i]) as AdditionalInformation);
                    }

                    for (let i = 0; i < p.badges.length; i++) {
                        p.badges[i] = (Object.assign(new Badge(), p.badges[i]) as Badge);
                    }

                    for (let i = 0; i < p.customPages.length; i++) {
                        p.customPages[i] = (Object.assign(new CustomPage(), p.customPages[i]) as CustomPage);
                    }

                    for (let i = 0; i < p.requirements.length; i++) {
                        p.requirements[i] = (Object.assign(new Requirement(), p.requirements[i]) as Requirement);
                    }

                    for (let i = 0; i < p.secondaryActions.length; i++) {
                        p.secondaryActions[i] = (Object.assign(new SecondaryAction(), p.secondaryActions[i]) as SecondaryAction);
                    }

                    for (let i = 0; i < p.versions.length; i++) {
                        p.versions[i] = (Object.assign(new Version(), p.versions[i]) as Version);
                    }

                    this.editedPackage = p;
                });
            } else {
                this.editedPackage.packageId = [ ...Array(10) ].map((i) => this.chars[Math.random() * this.chars.length | 0]).join("");
            }
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

        save(): void {
            const p: Package = JSON.parse(JSON.stringify(this.editedPackage));

            p.additionalInfo.forEach((_) => delete _.editDefinitions);
            p.badges.forEach((_) => delete _.editDefinitions);
            p.customPages.forEach((_) => delete _.editDefinitions);
            p.requirements.forEach((_) => delete _.editDefinitions);
            p.secondaryActions.forEach((_) => delete _.editDefinitions);
            p.versions.forEach((_) => delete _.editDefinitions);

            Axios.put(`${this.$store.state.serverUrl}/package`, { packageId: p.packageId, packageContent: p }).then((res) => {
                
                let dialog: Dialog = new Dialog("Möchtest du das Paket jetzt im Shop ansehen?", "Speichern erfolgreich");
                dialog.hasPrimary = true;
                dialog.primaryContent = "Ansehen";
                dialog.hasSecondary = true;
                dialog.secondaryContent = "Später";
                dialog.primaryRoute = "/sku/" + this.editedPackage.packageId.toLowerCase();

                EventBus.$emit('show-dialog', dialog);
                
            }).catch((err) => {
                alert(err.response.status);
            });
        }

        toggleFold(event: Event, id: string): void {
            ((event.target as HTMLElement).closest(".fold-button") as HTMLElement).classList.toggle("is-active");
            document.getElementById(id)!.classList.toggle("is-open");
        }
    }

</script>

<template>

    <MyyPage :extra-narrow-content="true">
        <MyyPageNavigation style="position: fixed; z-index: 9999" slot="navigation">
            <a @click="save()"><MyyIcon>&#xE105;</MyyIcon><span>Speichern</span></a>
            <a @click="edit([{ key: 'packageId', disabled: true }, { key: 'packageAlias' }, { type: Boolean, key: 'isPublic' }, { type: Boolean, key: 'isVisible' }, { type: Boolean, key: 'isAvailable' }, { type: 'Option', key: 'packageType', options: ['package', 'bundle', 'dlc'] }, { key: 'bundleContentIds' }])"><MyyIcon>&#xE2AC;</MyyIcon><span>Paketmeta</span></a>
            <a @click="edit([{ key: 'requirementsTitle' }, { key: 'requirementsSubtitle' }, { type: Array, key: 'requirements', itemType: requirement }])"><MyyIcon>&#xEC77;</MyyIcon><span>Anforderungen</span></a>
            <a @click="edit([{ type: Array, key: 'versions', itemType: version }])"><MyyIcon>&#xECC5;</MyyIcon><span>Versionen</span></a>
            <a @click="edit([{ key: 'accent' }])"><MyyIcon>&#xE790;</MyyIcon><span>Farben</span></a>
            <a v-if="elementsHidden()" @click="edit([{ type: Boolean, key: 'hasPromo' }, { type: Boolean, key: 'hasAlternativeButton' }, { type: Boolean, key: 'hasPrimaryButton' }, { type: Boolean, key: 'hasSecondaryButton' }])"><MyyIcon>&#xE727;</MyyIcon><span>Ausgeblendete Elemente</span></a>
        </MyyPageNavigation>

        <div style="--dark: #000; --light: #FFF; display: flex" slot="content">

            <div :style="{ '--accent': this.editedPackage.accent, 'flex-grow': '1' }">

                <nav class="sv-nav">
                    <h1>{{ this.editedPackage.packageName }}</h1>
                    <a v-if="editedPackage.hasPrimaryButton" class="sv-button primary" :href="(this.editedPackage.primaryButtonUrl ? this.editedPackage.primaryButtonUrl : (this.editedPackage.versions[this.editedPackage.versions.length - 1] ? this.editedPackage.versions[this.editedPackage.versions.length - 1].versionUrl : '#'))" :disabled="this.editedPackage.isPrimaryButtonDisabled" style="color: var(--light)">{{ this.editedPackage.primaryButtonContent }}</a>
                </nav>

                <a class="sv-button up"><i class="fas fa-arrow-up"></i></a>

                <section style="background-color: #FFF">
                    <div class="sv-main-container">
                        <div class="sv-cover-image editable myy-no-editable-resize" :style="{ 'background-image': `url('${this.editedPackage.coverImageUrl}')`}"  @click.stop="edit([{ key: 'coverImageUrl' }])"></div>

                        <article :class="['sv-card', { 'has-promo': this.editedPackage.hasPromo }]">
                            <div v-if="editedPackage.hasPromo" class="sv-card-promo editable" @click.stop="edit([{ type: Boolean, key: 'hasPromo' }, { key: 'promoTitle'}, { key: 'promoContent'}, { key: 'promoCtaBackgroundColor' }, { key: 'promoCtaForegroundColor'}, { key: 'promoCtaContent'}, { key: 'promoCtaUrl'}])">
                                <div class="sv-promo-container">
                                    <div class="sv-content">
                                        <h2>{{ this.editedPackage.promoTitle }}</h2>
                                        <p>{{ this.editedPackage.promoContent }}</p>
                                    </div>
                                    <div class="sv-promo-cta">
                                        <a class="sv-button primary" :href="this.editedPackage.promoCtaUrl" :style="{'background-color': this.editedPackage.promoCtaBackgroundColor, 'color': this.editedPackage.promoCtaForegroundColor}">{{ this.editedPackage.promoCtaContent }}</a>
                                    </div>
                                </div>
                            </div>

                            <div class="sv-container">
                                <div class="sv-content">
                                    <img :src="this.editedPackage.iconUrl" height="100" width="100" class="editable myy-no-editable-resize" @click.stop="edit([{ key: 'iconUrl' }])" />
                                    <div>
                                        <div class="editable" @click.stop="edit([{ type: Array, key: 'badges', itemType: badge }])">
                                            <span v-for="(b, index) in editedPackage.badges" :key="'badge-' + index" class="sv-badge" :style="{'background-color': b.badgeBackgroundColor, 'color': b.badgeForegroundColor}">{{ b.badgeContent }}</span>
                                        </div>
                                        <h1 class="editable" @click.stop="edit([{ key: 'packageName' }])">{{ this.editedPackage.packageName }}</h1>
                                        <p style="margin-bottom: 6px"><a class="sv-link editable" @click.prevent="edit([{ key: 'projectUrl' }])" :href="this.editedPackage.projectUrl" style="align-items: center; display: flex"><MyyIcon style="margin-right: 6px">&#xE8A1;</MyyIcon><span>Projekt ansehen</span></a></p>
                                        <a v-if="editedPackage.hasReviews" class="sv-stars js-open-tab" href="reviews" @click.prevent="openTab('reviews')"><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon style="color: #999"></MyyIcon><span style="color: #999; margin: 0 3px 0 6px">166</span></a>
                                        <div class="sv-description editable" @click.stop="edit([{ key: 'shortDescription', multiline: true }])" v-html="this.editedPackage.shortDescription" style="margin-top: 6px"></div>
                                    </div>
                                </div>

                                <div class="sv-cta">
                                    <div v-if="editedPackage.hasAlternativeButton" class="editable" @click.stop="edit([{ type: Boolean, key: 'hasAlternativeButton' }, { key: 'alternativeButtonLine1' }, { key: 'alternativeButtonLine2' }, { key: 'seperatorContent' }])">
                                        <div class="sv-buttons" style="width: 228px">
                                            <a class="sv-button multiline">
                                                <p style="width: 100%">{{ this.editedPackage.alternativeButtonLine1 }}</p>
                                                <p style="font-size: 13px; width: 100%">{{ this.editedPackage.alternativeButtonLine2 }}</p>
                                            </a>
                                        </div>
                                        <div class="sv-divider" :data-text="this.editedPackage.seperatorContent"></div>
                                    </div>

                                    <div class="editable" @click.stop="edit([{ key: 'newPrice' }, { key: 'oldPrice' }, { key: 'priceDetail' }])">
                                        <p class="sv-price"><s v-if="editedPackage.oldPrice" class="sv-s">{{ this.editedPackage.oldPrice }}</s>{{ this.editedPackage.newPrice }}</p>
                                        <p v-if="editedPackage.priceDetail" class="sv-offer">{{ this.editedPackage.priceDetail }}</p>
                                    </div>

                                    <div class="sv-buttons">
                                        <a v-if="editedPackage.hasPrimaryButton" class="sv-button primary editable" :href="(this.editedPackage.primaryButtonUrl ? this.editedPackage.primaryButtonUrl : (this.editedPackage.versions[this.editedPackage.versions.length - 1] ? this.editedPackage.versions[this.editedPackage.versions.length - 1].versionUrl : '#'))" :disabled="this.editedPackage.isPrimaryButtonDisabled" style="color: var(--light)" @click.stop="edit([{ type: Boolean, key: 'hasPrimaryButton' }, { key: 'primaryButtonContent' }, { key: 'primaryButtonUrl' }, { type: Boolean, key: 'isPrimaryButtonDisabled' }])">{{ this.editedPackage.primaryButtonContent }}</a>
                                        <a v-if="editedPackage.hasSecondaryButton" class="sv-button js-trigger-dropdown editable" data-dropdown="cta-actions-dropdown" @click.stop="edit([{ type: Boolean, key: 'hasSecondaryButton' }, { type: Array, key: 'secondaryActions', itemType: secondaryAction }])">•••</a>
                                        <ul class="sv-dropdown" id="cta-actions-dropdown">
                                            <li><a>Tertiary Button</a></li>
                                            <li><a>Tertiary Button</a></li>
                                            <li><a>Tertiary Button</a></li>
                                            <li><a>Tertiary Button</a></li>
                                        </ul>
                                    </div>
                                    <div class="sv-cta-content editable" @click.prevent="edit([{ key: 'tcsContent', multiline: true }])" v-html="this.editedPackage.tcsContent"></div>
                                </div>
                            </div>
                        </article>

                        <nav class="sv-tabs editable" @click="edit([{ key: 'overviewPageName' }, { type: Boolean, key: 'hasSystemRequirementsPage' }, { key: 'systemRequirementsPageName' }, { type: Boolean, key: 'hasChangelogPage' }, { key: 'changelogPageName' }, { type: Boolean, key: 'hasReviews' }, { key: 'reviewsPageName' }, { type: Array, key: 'customPages', itemType: customPage }])">
                            <a href="#overview" class="active" @click.prevent="openTab('overview')">{{ this.editedPackage.overviewPageName }}</a>

                            <a v-for="(page, index) in editedPackage.customPages" :href="'#' + page.customPageId" :key="'pagelink-' + index" @click.prevent="openTab(page.customPageId)">{{ page.customPageName }}</a>

                            <a v-if="editedPackage.hasSystemRequirementsPage" href="#system-requirements" @click.prevent="openTab('system-requirements')">{{ this.editedPackage.systemRequirementsPageName }}</a>
                            <a v-if="editedPackage.hasChangelogPage" href="#changelog" @click.prevent="openTab('changelog')">{{ this.editedPackage.changelogPageName }}</a>
                            <a v-if="editedPackage.hasReviews" href="#reviews" @click.prevent="openTab('reviews')">{{ this.editedPackage.reviewsPageName }}</a>
                        </nav>

                        <div class="sv-page reveal" id="overview">
                            <h2 v-if="editedPackage.packageType === 'bundle'">In diesem Paket (In this bundle)</h2>
                            <div v-if="editedPackage.packageType === 'bundle' && editedPackage.bundleContentIds" class="sv-packages">
                                <a v-for="(bundleId, index) in editedPackage.bundleContentIds.split(',')" :key="'bundle-content-' + index" class="sv-package">
                                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                                    <div class="sv-content">
                                        <h6>{{ bundleId }}</h6>
                                        <p>Free</p>
                                    </div>
                                </a>
                            </div>

                            <h2 v-if="editedPackage.packageType !== 'bundle'">Enthalten in (Included in)</h2>
                            <div v-if="editedPackage.packageType !== 'bundle'" class="sv-packages">
                                <a class="sv-package">
                                    <img src="https://pbs.twimg.com/profile_images/879270443139649536/lwUNjqvZ_400x400.jpg" />
                                    <div class="sv-content">
                                        <h6>Bundle 1</h6>
                                        <p>Free</p>
                                    </div>
                                </a>
                            </div>

                            <h2>Verfügbar auf (Available on)</h2>
                            <div class="editable" @click.stop="edit([{ type: Array, key: 'availableOnTags', itemType: String }])" style="margin-top: -12px">
                                <span v-for="(tag, index) in editedPackage.availableOnTags" class="sv-tag" :key="'tag-' + index">{{ tag }}</span>
                            </div>

                            <h2>Beschreibung (Description)</h2>
                            <div class="editable" @click.stop="edit([{ key: 'fullDescription', multiline: true }])" v-html="editedPackage.fullDescription"></div>

                            <h2>Screenshots (Screenshots)</h2>
                            <div class="dragscroll sv-screenshots editable" @click.stop="edit([{ type: Array, key: 'screenshots', itemType: String }])">
                                <img v-for="(screenshot, index) in editedPackage.screenshots" :src="screenshot" :key="'screenshot-' + index" />
                            </div>

                            <h2 v-if="this.editedPackage.hasChangelogPage">Neuigkeiten in dieser Version (What's new in this version)</h2>
                            <template v-if="this.editedPackage.hasChangelogPage && this.editedPackage.versions && this.editedPackage.versions[this.editedPackage.versions.length - 1]">
                                <p style="font-weight: 600; margin-bottom: 6px">{{ this.editedPackage.versions[this.editedPackage.versions.length - 1].versionName }} <span v-if="this.editedPackage.versions[this.editedPackage.versions.length - 1].versionTag" class="sv-version-tag">{{ this.editedPackage.versions[this.editedPackage.versions.length - 1].versionTag }}</span></p>
                                    <ul v-if="this.editedPackage.versions[this.editedPackage.versions.length - 1].versionChangelog" class="sv-ul" v-html="this.editedPackage.versions[this.editedPackage.versions.length - 1].versionChangelog">
                                </ul>

                                <p style="margin-top: 24px"><a href="#changelog" class="sv-link js-open-tab" @click.prevent="">Changelog ansehen</a></p>
                            </template>

                            <h2>Funktionen (Features)</h2>
                            <div class="editable" @click.stop="edit([{ key: 'featureList', multiline: true }])" v-html="editedPackage.featureList"></div>

                            <h2>Zusätzliche Informationen (Additional information)</h2>
                            <div class="sv-meta editable" @click.stop="edit([{ type: Array, key: 'additionalInfo', itemType: additionalInfo }])">
                                <div v-for="(info, index) in editedPackage.additionalInfo" class="sv-content" :key="'addInfo-' + index">
                                    <p>{{ info.additionalInformationTitle }}</p>
                                    <p v-html="info.additionalInformationContent"></p>
                                </div>
                            </div>
                        </div>

                        <div class="sv-page" id="system-requirements">
                            <table class="sv-table">
                                <caption>{{ this.editedPackage.requirementsTitle }}<template v-if="this.editedPackage.requirementsSubtitle"><br><span>{{ this.editedPackage.requirementsSubtitle }}</span></template></caption>
                                <tbody>
                                    <tr v-for="(rkv, index) in this.editedPackage.requirements" :key="'requirement-' + index">
                                        <th>{{ rkv.requirementKey }}</th>
                                        <td v-html="rkv.requirementValue"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="sv-page" id="changelog">
                            <div v-for="(v, index) in this.editedPackage.versions" style="margin-bottom: 24px" :key="'version-' + index">
                                <p :key="'version-' + index + '-title'" style="font-weight: 600; margin-bottom: 6px">{{ v.versionName }} <span v-if="v.versionTag" class="sv-version-tag">{{ v.versionTag }}</span></p>
                                <ul :key="'version-' + index + '-content'" v-if="v.versionChangelog" class="sv-ul" v-html="v.versionChangelog">
                                </ul>
                            </div>
                        </div>

                        <div class="sv-page" id="reviews">
                            <h2>Kundenrezensionen (Ratings and reviews)</h2>
                            <div class="sv-ratings">
                                <div style="text-align: center">
                                    <h5 style="font-size: 130px; font-weight: 100; letter-spacing: -5px; line-height: 1; margin-bottom: 7px">4.1</h5>
                                    <p class="sv-stars"><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon></MyyIcon><MyyIcon style="color: #999"></MyyIcon><span style="color: #999; margin: 0 3px 0 6px">166</span></p>
                                </div>
                                <div class="sv-histogram">
                                    <div><span>5</span><MyyIcon></MyyIcon><div class="sv-bar" style="width: 58%"></div><span style="font-weight: 400">58%</span></div>
                                    <div><span>4</span><MyyIcon></MyyIcon><div class="sv-bar" style="width: 18%"></div><span style="font-weight: 400">18%</span></div>
                                    <div><span>3</span><MyyIcon></MyyIcon><div class="sv-bar" style="width: 8%"></div><span style="font-weight: 400">8%</span></div>
                                    <div><span>2</span><MyyIcon></MyyIcon><div class="sv-bar" style="width: 7%"></div><span style="font-weight: 400">7%</span></div>
                                    <div><span>1</span><MyyIcon></MyyIcon><div class="sv-bar" style="width: 7%"></div><span style="font-weight: 400">7%</span></div>
                                </div>
                            </div>

                            <a class="sv-button sv-button-inline" style="margin-top: 5px" href="#" disabled="">Jetzt bewerten (Review now)</a>

                            <div style="background-color: #CCC; height: 1px; margin-top: 16px; width: 100%"></div>

                            <h5 style="font-size: 20px; font-weight: 600; line-height: 24px; margin-top: 16px">Alle Benutzerrezensionen (All user reviews)</h5>
                        </div>

                        <div v-for="(page, index) in editedPackage.customPages" :id="page.customPageId" :key="'page-' + index" class="sv-page"></div>

                    </div>
                </section>
            </div>

            <aside :class="['editor-panel', { 'is-open': this.editorPanelOpen}]">
                <a class="panel-close-button" @click="closeEdit()"><MyyIcon>&#xE126;</MyyIcon><span>Schließen</span></a>

                <div class="panel-content">
                    <template v-for="field in editorPanelFields">
                        <h6 v-if="!(field.key in pfs.titles)" :key="field.key + '-title'" class="myy-input-title">{{ field.key }}</h6>
                        <h6 v-if="field.key in pfs.titles" :key="field.key + '-title'" class="myy-input-title">{{ pfs.titles[field.key] }}</h6>

                        <p v-if="field.key in pfs.descriptions" :key="field.key + '-description'" class="myy-input-description" v-html="pfs.descriptions[field.key]"></p>

                        <input v-if="field.type.name === 'Boolean'" :key="field.key" v-model="editedPackage[field.key]" type="checkbox">

                        <input v-if="field.type.name === 'String' && !field.multiline" :key="field.key" v-model="editedPackage[field.key]" type="text" class="myy-input" :readonly="field.disabled">
                        <span v-if="field.disabled" :key="field.key + '-rotag'" class="myy-input-ro-tag">read-only</span>

                        <textarea v-if="field.type.name === 'String' && field.multiline" :key="field.key" v-model="editedPackage[field.key]" rows="5" class="myy-input" style="resize: none"></textarea>

                        <select v-if="field.type === 'Option'" :key="field.key" v-model="editedPackage[field.key]" class="myy-select">
                            <option v-for="option in field.options" :key="option" :value="option">{{ (pfs.titles[field.key + '/' + option] ? pfs.titles[field.key + '/' + option] : option) }}</option>
                        </select>

                        <div v-if="field.type.name === 'Array'" class="array-field" :key="field.key + '-array-container'">
                            <template v-for="(item, index) in editedPackage[field.key]">
                                <div style="align-items: center; display: flex; justify-content: space-between; margin-bottom: 12px" :key="field.key + '-container' + index">
                                    <h6 :key="field.key + '-item' + index" class="myy-input-title" style="margin-bottom: 0">#{{ index }}</h6>
                                    <div style="display: flex">
                                        <a :key="field.key + '-item' + index + '-fold'" :class="['sv-button fold-button', { 'is-active': index === editedPackage[field.key].length - 1 }]" @click.stop="toggleFold($event, field.key + '-' + index + '-panel')"><MyyIcon>&#xE7B3;</MyyIcon></a>
                                        <a :key="field.key + '-item' + index + '-delete'" class="sv-button delete-button" @click.stop="deleteItemFromField(field, index)"><MyyIcon>&#xE107;</MyyIcon><span>Löschen</span></a>
                                    </div>
                                </div>

                                <div :id="field.key + '-' + index + '-panel'" :key="field.key + '-' + index + '-panel'" :class="[ 'subfield-panel', { 'has-only-textarea': !item.editDefinitions, 'is-open': index === editedPackage[field.key].length - 1 }]">
                                    <template v-if="item.editDefinitions">
                                        <template v-for="(subfield, subfieldKey) in item" v-if="subfieldKey !== 'editDefinitions'">
                                            <h6 v-if="!(subfieldKey in pfs.titles)" :key="field.key + index + '-' + subfieldKey + '-title'" class="myy-input-title">{{ subfieldKey }}</h6>
                                            <h6 v-if="subfieldKey in pfs.titles" :key="field.key + index + '-'+ subfieldKey + '-title'" class="myy-input-title">{{ pfs.titles[subfieldKey] }}</h6>

                                            <p v-if="subfieldKey in pfs.descriptions" :key="field.key + index + '-' + subfieldKey + '-description'" class="myy-input-description">{{ pfs.descriptions[subfield.key] }}</p>

                                            <input v-if="item.editDefinitions.find(e => e.key === subfieldKey).type.name === 'Boolean'" :key="field.key + index + '-' + subfieldKey" v-model="editedPackage[field.key][index][subfieldKey]" type="checkbox">

                                            <input v-if="item.editDefinitions.find(e => e.key === subfieldKey).type.name === 'String' && !item.editDefinitions.find(e => e.key === subfieldKey).multiline" :key="field.key + index + '-' + subfieldKey" v-model="editedPackage[field.key][index][subfieldKey]" type="text" class="myy-input">

                                            <textarea v-if="item.editDefinitions.find(e => e.key === subfieldKey).type.name === 'String' && item.editDefinitions.find(e => e.key === subfieldKey).multiline" :key="field.key + index + '-' + subfieldKey" v-model="editedPackage[field.key][index][subfieldKey]" rows="5" class="myy-input" style="resize: none"></textarea>
                                        </template>
                                    </template>

                                    <textarea v-if="!item.editDefinitions" :key="field.key + index + '-' + subfieldKey" v-model="editedPackage[field.key][index]" rows="5" class="myy-input" style="resize: none"></textarea>
                                </div>
                            </template>

                            <a class="sv-button add-button" @click.stop="addNewItemToField(field)"><MyyIcon>&#xE109;</MyyIcon><span>Neues Element</span></a>
                        </div>
                    </template>
                </div>
            </aside>

        </div>


    </MyyPage>

</template>

<style lang="scss">

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .editable {
        border: 2px dashed #0002;
        cursor: pointer;
        transition: border .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

        &:not(.myy-no-editable-resize):empty {
            width: 36px;
            min-height: 36px;
        }

        &::after {
            color: #0002;
            content: "";
            font-family: 'Segoe MDL2 Assets';
            font-size: 18px;
            font-weight: 400;
            height: 100%;
            left: 0;
            padding: 6px;
            pointer-events: none;
            position: absolute;
            text-align: left;
            top: 0;
            transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
            width: 100%;
        }
    }

    .editable:hover {
        border: 2px dashed #000;

        &::after {
            background-color: #FFFC;
            color: #000;
            content: "";
        }
    }

    .editor-panel {
        background-color: #FFF;
        box-shadow: -4px 0 8px 0 rgba(0, 0, 0, .2);
        opacity: 0;
        transition: all .2s cubic-bezier(0.4, 0.01, 0.165, 0.99) .2s, opacity .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
        width: 0;
        z-index: 9999;

        &.is-open {
            opacity: 1;
            padding: 16px;
            transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99), opacity .2s cubic-bezier(0.4, 0.01, 0.165, 0.99) .2s;
            width: 400px;
        }

        input, textarea, select {
            margin-bottom: 24px;
        }

        .add-button {
            align-items: center;
            background-color: #1ED760;
            color: #FFF;
            display: flex;
            height: 48px;
            padding: 0 16px;

            .myy-icon {
                margin-right: 12px;
            }
        }

        .array-field {
            border-left: 2px solid #E6E6E6;
            margin-bottom: 24px;
            padding-left: 16px;
        }

        .delete-button, .fold-button {
            align-items: center;
            color: #FFF;
            display: flex;
            font-size: 14px;
            padding: 4px 5px;
        }

        .delete-button {
            background-color: #FF1946;

            .myy-icon {
                margin-right: 6px;
            }
        }

        .fold-button {
            color: #000;
            margin-right: 6px;

            &.is-active {
                background-color: #0078D7;
                color: #FFF;
            }
        }

        .sv-button {
            border: 2px solid transparent;

            &:active {
                border-color: #000;
            }
        }

        .subfield-panel {
            border: 1px solid #E6E6E6;
            margin-bottom: 16px;
            max-height: 0;
            overflow-y: hidden;
            padding: 0;

            &.has-only-textarea {
                border: 0;
                margin-bottom: -8px;
                padding: 0 !important;
            }

            &.is-open {
                max-height: unset;
                padding: 16px;
                padding-bottom: 0;
            }

            .myy-input {
                min-width: unset;
                width: 100%;
            }
        }
    }

    .panel-close-button {
        align-items: center;
        border-bottom: 1px solid #E6E6E6;
        cursor: pointer;
        display: flex;
        height: 48px;
        padding: 0 16px;
        margin: -16px -16px 16px -16px;
        text-decoration: none;

        &:hover {
            background-color: #F5F5F5;
        }

        .myy-icon {
            margin-right: 12px;
        }

        :not(.myy-icon) {
            font-size: 14px;
        }
    }

    .panel-content {
        position: sticky;
        top: 64px;
    }

    .myy-input-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .myy-input-description {
        margin-bottom: 12px;
    }

    .myy-input {
        background-color: #F5F5F5;
        border: 1px solid transparent;
        border-radius: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        max-width: 746px;
        min-width: 367px;
        padding: 12px 15px;
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    }

    .myy-input:focus {
        background-color: #FFF;
        border-color: #333;
    }

    .myy-input-ro-tag {
        background-color: #DDD;
        border-radius: 4px;
        font-size: 13px;
        margin: 11px;
        opacity: .4;
        padding: 5px 7px;
        pointer-events: none;
        position: absolute;
        right: 0;
    }

    .myy-select {
        background-color: #F5F5F5;
        border: 1px solid transparent;
        border-radius: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;
        max-width: 746px;
        min-width: 367px;
        padding: 11px 15px;
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

        &:focus {
            background-color: #FFF;
            border-color: #333;
        }
    }

    .sv-badge + .sv-badge {
        margin-left: 6px;
    }

    .sv-stars {
        color: inherit;
        line-height: 1.5;
        text-decoration: none;

        .myy-icon {
            font-size: 14px;
            margin: 0 3px;
        }
    }

    .sv-ratings {
        align-items: center;
        display: flex;
        margin-top: -32px;
        max-width: 1000px;
        width: 100%;
    }

    .sv-histogram {
        font-size: 13px;
        padding-left: 24px;
        padding-top: 32px;
        width: 100%;
    }

    .sv-histogram > div {
        align-items: center;
        display: flex;
        margin-bottom: 10px;
        padding: 2px 0;
    }

    .sv-histogram span {
        margin: 0 3px;
    }

    .sv-histogram .sv-bar {
        background-color: var(--accent);
        display: inline-block;
        height: 12px;
        margin: 0 6px;
    }

    .sv-button-inline {
        max-width: 374px;
        min-width: 120px;
        padding: 9px 12px 10px;
    }

    .editable.sv-button[disabled] {
        cursor: pointer;
    }

</style>
