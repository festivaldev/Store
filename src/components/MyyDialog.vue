<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    import { EventBus } from "@/eventbus";

    import Dialog from "@/script/Dialog";

    @Component
    export default class MyyDialog extends Vue {

        dialogData: Dialog = Dialog.Empty;
        dialogShown: boolean = false;
        dialogStack: Dialog[] = [];

        callback(primary: boolean): void {
            if (primary && this.dialogData.primaryRoute) {
                this.$router.push(this.dialogData.primaryRoute);
            }

            EventBus.$emit(this.dialogData.callback, { primary: primary, input: this.dialogData.inputContent });
            this.dialogShown = false;
            this.dialogData = Dialog.Empty;

            if (this.dialogStack.length > 0) {
                this.dialogData = (this.dialogStack.shift() as Dialog);
                this.dialogShown = true;
            }
        }

        mounted(): void {
            EventBus.$on('show-dialog', (dialog: Dialog) => {
                if (this.dialogData === Dialog.Empty && this.dialogShown == false) {
                    this.dialogData = dialog;
                    this.dialogShown = true;
                } else {
                    this.dialogStack.push(dialog);
                }
            });
        }

    }

</script>

<template>

    <article v-if="this.dialogShown" class="sv-dialog" :style="{ '--dialog-accent': this.dialogData.accent }">
        <div class="sv-content">
            <a v-if="this.dialogData.hasClose" @click.once="callback(false)" class="myy-dialog-close">&#xE10A;</a>

            <h2 v-if="this.dialogData.title" v-html="this.dialogData.title"></h2>
            <div v-if="this.dialogData.content" v-html="this.dialogData.content"></div>

            <input v-if="this.dialogData.hasInput" class="sv-input" :placeholder="this.dialogData.inputPlaceholder" v-model="dialogData.inputContent" type="text" style="margin: 26px 0 -10px">

            <div v-if="this.dialogData.hasPrimary || this.dialogData.hasSecondary" class="sv-buttons">
                <a v-if="this.dialogData.hasPrimary" v-html="this.dialogData.primaryContent" @click.once="callback(true)" class="sv-button primary" style="color: #FFF"></a>
                <a v-if="this.dialogData.hasSecondary" v-html="this.dialogData.secondaryContent" @click.once="callback(false)" class="sv-button"></a>
            </div>
        </div>
    </article>

</template>

<style lang="scss" scoped>

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

    .sv-dialog .sv-content {
        background-color: #FFF;
        border: 1px solid var(--dialog-accent);
    }

    .sv-button.primary {
        background-color: var(--dialog-accent);
    }

    .sv-button:active {
        border-color: #000;
    }

    .sv-input:focus {
        border-color: var(--dialog-accent);
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