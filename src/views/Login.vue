<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";
    import hash from "hash.js";

    import { EventBus } from "@/eventbus";

    import MyyIcon from "@/components/MyyIcon.vue";

    import Dialog from '@/script/Dialog';

    @Component({
        components: {
            MyyIcon,
        },
    })
    export default class Login extends Vue {

        email: string = "";
        password: string = "";

        login(): void {
            Axios.post(`${this.$store.state.serverUrl}/token`, { email: this.email }).then((res) => {
                Axios.post(`${this.$store.state.serverUrl}/auth`, { email: this.email, password: hash.sha512().update(hash.sha512().update(this.password).digest("hex") + res.data.token).digest("hex") }).then((res) => {
                    this.$store.commit("setSession", { email: this.email, username: res.data.name, avatar: res.data.avatar, jwt: res.data.jwt });

                    if (this.$route.query["redirect"]) {
                        this.$router.push(this.$route.query["redirect"]);
                    } else {
                        this.$router.push("/dashboard");
                    }
                }).catch((err) => {
                    if (err.response.status === 403) {
                        let dialog: Dialog = new Dialog("Die eingegebene E-Mail-Adresse oder das Passwort sind falsch.", "Authentifizierungsfehler");

                        EventBus.$emit('show-dialog', dialog);
                    }
                });
            }).catch((err) => {
                if (err.response.status === 403) {
                    let dialog: Dialog = new Dialog("Die eingegebene E-Mail-Adresse oder das Passwort sind falsch.", "Authentifizierungsfehler");

                    EventBus.$emit('show-dialog', dialog);
                }
            });
        }

    }

</script>

<template>

    <div class="myy-login">        
        <div class="myy-login-container">
            <h2>Melde dich mit deinem FΞSTIVΛL Account an</h2>

            <input class="sv-input" type="email" placeholder="E-Mail" v-model="email">
            <input class="sv-input" type="password" placeholder="Passwort" v-model="password">

            <a class="sv-button" style="margin-top: 32px" @click="login()" :disabled="!this.email || !this.password">Anmelden</a>
        </div>

        <span class="copyright">&copy; publicjournal.online / Mariko Reed</span>
    </div>

</template>

<style lang="scss" scoped>

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .myy-login {
        height: 100vh;
        width: 100vw;

        &::after {
            // background-image: url('https://images.pexels.com/photos/163811/street-art-shipping-container-freight-highway-163811.jpeg');

            // background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/2dfae047373177.587824cf5dcf3.jpg');

            background-image: url('https://media.festival.ml/images/store/storefront.jpg');
            background-position: center center;
            background-size: cover;
            content: "";
            height: 100%;
            position: absolute;
            width: 50%;
        }
    }

    .copyright {
        color: #000A;
        bottom: 16px;
        font-size: 14px;
        left: 16px;
        position: absolute;
        z-index: 99999;
    }

    .myy-login-container {
        left: 50%;
        padding: 48px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        h2 {
            font-weight: 600;
            margin-bottom: 36px;
        }

        .sv-input + .sv-input {
            margin-top: 12px;
        }

        .sv-button {
            max-width: 374px;
            min-width: 120px;
            padding: 9px 12px 10px;

            &:active {
                border-color: #000;
            }

            &[disabled] {
                pointer-events: none;
            }
        }
    }

</style>
