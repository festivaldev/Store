<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    import { EventBus } from "@/eventbus";

    import MyyIcon from "@/components/MyyIcon.vue";

    import Dialog from '@/script/Dialog';

    @Component({
        components: {
            MyyIcon,
        },
    })
    export default class MyyNavigation extends Vue {

        about(): void {
            let dialog: Dialog = new Dialog("FΞSTIVΛL Store<br />Version 0.0.8 &beta;<br /><br />&copy; 2018 FΞSTIVΛL (@vainamov)", "Über");
            dialog.hasSecondary = false;
            dialog.hasClose = true;

            EventBus.$emit('show-dialog', dialog);
        }

        changePassword(): void {
            let dialog: Dialog = new Dialog("Wenn du dein Passwort ändern möchtest, kannst du hier ein neues setzen.", "Passwort ändern");
            dialog.hasPrimary = true;
            dialog.primaryContent = "Passwort ändern";
            dialog.hasInput = true;
            dialog.inputPlaceholder = "Dein neues Passwort"

            EventBus.$emit('show-dialog', dialog);
        }

        enterCode(): void {
            let dialog: Dialog = new Dialog("Wenn du einen Code für ein Produkt hast, kannst du ihn hier einlösen.", "Code einlösen");
            dialog.hasPrimary = true;
            dialog.primaryContent = "Code einlösen";
            dialog.hasInput = true;
            dialog.inputPlaceholder = "Dein Produkt-Code"

            EventBus.$emit('show-dialog', dialog);
        }

        logout(): void {
            this.$store.commit("setSession", null);
            this.$router.push("/");
        }

        toggleAsideNav(): void {
            document.body.classList.toggle("has-asidenav-open");
            this.$store.commit("setAsideNavOpen", !this.$store.state.asideNavOpen);

            // document.querySelector(".myy-asidenav")!.classList.toggle("is-open");
        }

        toggleDropdown(): void {
            document.querySelector(".ts-toggle-dd")!.classList.toggle("is-active");
            document.querySelector(".navigation-dd")!.classList.toggle("is-open");
        }

    }

</script>

<template>

    <div v-if="!this.$route.meta.noNav">
        <nav class="myy-navigation">
            <h1 class="global-title">FΞSTIVΛL Store</h1>

            <div class="navigation-content">
                <a class="navigation-link" disabled><MyyIcon>&#xE094;</MyyIcon></a>
                <a class="navigation-link" disabled><MyyIcon>&#xED0D;</MyyIcon></a>
                <a class="navigation-link" @click.prevent="enterCode()" disabled><MyyIcon style="margin-right: 6px;">&#xE9A9;</MyyIcon><span>Code einlösen</span></a>

                <a class="navigation-link ts-toggle-dd" @click="toggleDropdown()">
                    <img v-if="this.$store.state.session" :src="this.$store.state.session.avatar" height="24" width="24" style="border-radius: 24px" />                        
                    <MyyIcon v-else>&#xE13D;</MyyIcon>

                    <MyyIcon class="navigation-arrow-dd" style="margin-left: 12px">&#xE011;</MyyIcon>
                </a>

                <ul class="navigation-dd">
                    <li style="border-bottom: 1px solid #333; padding: 10px 16px">
                        <div style="align-items: center; display: flex">
                            <img v-if="this.$store.state.session" :src="this.$store.state.session.avatar" height="48" width="48" style="border-radius: 48px; margin-right: 12px" />
                            <MyyIcon v-else style="background-color: #666; border-radius: 100px; height: 48px; line-height: 48px; margin-right: 12px; width: 48px; text-align: center">&#xE13D;</MyyIcon>

                            <div v-if="this.$store.state.session">
                                <p v-html="this.$store.state.session.username"></p>
                                <p style="font-size: 13px; opacity: .6">{{ this.$store.state.session.email }}</p>
                            </div>

                            <p v-else>Nicht angemeldet</p>
                        </div>
                    </li>

                    <template v-if="this.$store.state.session">
                        <li style="border-bottom: 1px solid #333" v-if="this.$route.name === 'editorWithId'"><router-link :to="'/sku/' + $route.params['id']" class="navigation-link"><MyyIcon>&#xE12B;</MyyIcon><span>Im Store ansehen</span></router-link></li>
                        <li style="border-bottom: 1px solid #333" v-if="this.$route.name === 'sku'"><router-link :to="'/editor/' + $route.params['id']" class="navigation-link"><MyyIcon>&#xE14E;</MyyIcon><span>Im Editor bearbeiten</span></router-link></li>

                        <li><router-link to="/dashboard" class="navigation-link"><MyyIcon>&#xF246;</MyyIcon><span>Dashboard</span></router-link></li>
                        <li style="border-bottom: 1px solid #333"><router-link to="/" class="navigation-link"><MyyIcon>&#xE14D;</MyyIcon><span>Store</span></router-link></li>
                        <li><a class="navigation-link" @click.prevent="changePassword()" disabled=""><MyyIcon>&#xE8AC;</MyyIcon><span>Passwort ändern</span></a></li>
                        <li style="border-bottom: 1px solid #333"><a class="navigation-link" @click.prevent="logout()"><MyyIcon>&#xE748;</MyyIcon><span>Abmelden</span></a></li>
                    </template>
                    
                    <li v-else style="border-bottom: 1px solid #333"><router-link :to="{ path: '/login', query: { redirect: this.$route.fullPath }}" class="navigation-link"><MyyIcon>&#xE13D;</MyyIcon><span>Anmelden</span></router-link></li>

                    <li><a class="navigation-link" @click.prevent="about()"><MyyIcon>&#xE9CE;</MyyIcon><span>Über</span></a></li>
                </ul>

            </div>
        </nav>

        <aside v-if="!this.$route.meta.minimalNav" :class="['myy-asidenav', { 'is-open': this.$store.state.asideNavOpen }]">
            <a class="asidenav-link" @click="toggleAsideNav()"><MyyIcon>&#xE700;</MyyIcon></a>
            <router-link to="/dashboard" class="asidenav-link"><MyyIcon>&#xF246;</MyyIcon><span>Dashboard</span></router-link>
            <div class="asidenav-seperator"></div>
            <router-link to="/packages" class="asidenav-link"><MyyIcon>&#xF133;</MyyIcon><span>Pakete</span></router-link>
            <router-link to="/betas" class="asidenav-link" disabled><MyyIcon>&#xE7E3;</MyyIcon><span>Betas</span></router-link>
            <router-link to="/codes" class="asidenav-link"><MyyIcon>&#xE9A9;</MyyIcon><span>Codes</span></router-link>
            <div class="asidenav-seperator"></div>
            <router-link to="/announcements" class="asidenav-link" disabled><MyyIcon>&#xEC24;</MyyIcon><span>Ankündigungen</span></router-link>
            <router-link to="/planned" class="asidenav-link" disabled><MyyIcon>&#xEC92;</MyyIcon><span>Geplante Aktionen</span></router-link>
            <div class="asidenav-seperator"></div>
            <router-link to="/reports" class="asidenav-link"><MyyIcon>&#xE7BA;</MyyIcon><span>Reports</span></router-link>
            <router-link to="/reviews" class="asidenav-link"><MyyIcon>&#xED15;</MyyIcon><span>Bewertungen</span></router-link>
            <router-link to="/metrics" class="asidenav-link" disabled><MyyIcon>&#xE9D9;</MyyIcon><span>Statistiken</span></router-link>
            <!-- <router-link to="/editor" class="asidenav-link"><MyyIcon>&#xE14E;</MyyIcon><span>Editor</span></router-link> -->

            <div class="asidenav-bottom">
                <router-link to="/settings" class="asidenav-link"><MyyIcon>&#xE115;</MyyIcon><span>Einstellungen</span></router-link>
            </div>
        </aside>

        <img class="myy-logo" src="https://media.festival.ml/icons/Icon-App-60x60@2x.png" />
    </div>

</template>

<style lang="scss" scoped>

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-navigation {
        background-color: #333;
        color: #FFF;
        height: 48px;
        left: 0;
        padding: 0 0 0 48px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99999;
    }

    .global-title {
        display: inline-block;
        font-size: 18px;
        font-weight: 600;
        line-height: 48px;
    }

    .navigation-content {
        background-color: #333;
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
    }

    .navigation-link {
        align-items: center;
        color: #FFF;
        cursor: pointer;
        display: flex;
        height: 48px;
        padding: 0 16px;
        text-decoration: none;
    }

    .navigation-link:hover, .navigation-link.is-active {
        background-color: #484848;
    }

    .ts-toggle-dd .navigation-arrow-dd {
        transform: rotate(0);
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    }

    .ts-toggle-dd.is-active .navigation-arrow-dd {
        transform: rotate(180deg);
    }

    .navigation-link span:not(.myy-icon) {
        font-size: 14px;
    }

    .navigation-dd {
        background-color: #484848;
        border: 1px solid #333;
        border-top: none;
        position: absolute;
        list-style: none;
        right: 0;
        top: 48px;
        transform: translateY(-100%);
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
        width: 250px;
        z-index: -1;
    }

    .navigation-dd.is-open {
        transform: translateY(0);
    }

    .navigation-dd li a {
        height: auto;
        min-height: 40px;
        padding: 10px 16px;
        text-align: right;
    }

    .navigation-dd li a:hover {
        background-color: #666;
    }

    .navigation-dd li a .myy-icon {
        font-size: 18px;
        margin-right: 12px;
    }

    .myy-asidenav {
        background-color: #333;
        display: flex;
        flex-direction: column;
        height: 100%;
        left: 0;
        padding: 48px 0 0 0;
        position: fixed;
        top: 0;
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);
        width: 48px;
    }

    .myy-asidenav.is-open {
        width: 240px;
    }

    .myy-asidenav.is-open .asidenav-link span:not(.myy-icon) {
        display: inline-block;
    }

    .myy-asidenav .asidenav-link {
        align-items: center;
        color: #FFF;
        cursor: pointer;
        display: flex;
        height: 48px;
        text-decoration: none;
        white-space: nowrap;
    }

    .navigation-link[disabled], .asidenav-link[disabled] {
        opacity: .4;
        pointer-events: none;
    }

    .myy-asidenav .asidenav-link:hover {
        background-color: #484848;
    }

    .myy-asidenav .asidenav-link .myy-icon {
        padding: 0 16px;
    }

    .myy-asidenav .asidenav-link span:not(.myy-icon) {
        display: none;
    }

    .myy-asidenav .asidenav-seperator {
        background-color: #FFF;
        display: inline-block;
        height: 1px;
        margin: 6px 15px;
        opacity: .2;
    }    

    .myy-asidenav .asidenav-bottom {
        margin-top: auto;
    }

    .myy-logo {
        height: 24px;
        left: 12px;
        position: fixed;
        top: 12px;
        width: 24px;
        z-index: 999999;
    }

</style>