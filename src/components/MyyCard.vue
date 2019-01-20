<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    import MyyIcon from "@/components/MyyIcon.vue";

    @Component({
        components: {
            MyyIcon,
        },
    })
    export default class MyyWelcome extends Vue {

        @Prop({ type: String, default: "" })
        public actionIcon: string;

        @Prop({ type: String })
        public titleIcon!: string;

        @Prop({ type: String, default: "" })
        public title: string;
        
        @Prop({ type: String })
        public routerLink!: string;

        navigate(): void {
            if (this.routerLink) {
                this.$router.push(this.routerLink);
            }
        }

    }

</script>

<template>

    <article :class="['myy-card', { 'has-no-icon': !this.titleIcon }]" @click="navigate()">
        <h4 class="card-title" :data-icon="this.actionIcon"><MyyIcon v-html="this.titleIcon" v-if="this.titleIcon" /><span>{{ this.title }}</span></h4>
        <slot />
    </article>

</template>

<style lang="scss" scoped>

    .myy-card {
        background-color: #FFF;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
        cursor: pointer;
        flex-grow: 1;
        margin-bottom: 24px;
        margin-right: 12px;
        max-width: 367px;
        min-width: 367px;
        padding: 24px;
        transform: translateY(0);
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

        &:hover {
            box-shadow: 0 12px 30px 0 rgba(0, 0, 0, .2);
            transform: translateY(-4px);
        }

        &.has-no-icon p {
            padding: 0;
        }

        p {
            font-size: 14px;
            margin: 6px 0;
            padding: 0 30px;

            &:only-of-type {
                margin: 1em 0 0;
            }
        }
    }

    .card-title {
        align-items: center;
        display: flex;
        font-size: 16px;
        font-weight: 600;

        &::after {
            color: #000;
            content: attr(data-icon);
            font-family: 'Segoe MDL2 Assets';
            font-size: 16px;
            font-weight: 400;
            opacity: .6;
            position: absolute;
            right: 0;
            top: 1px;
        }

        .myy-icon {
            font-size: 18px;
            margin-right: 12px;
        }
    }

    .card-meta {
        margin: 1em 0 0 !important;
        opacity: .6;

        .meta-title {
            align-items: center;
            display: flex;
            font-weight: 400;
            margin-right: 16px;

            .myy-icon {
                margin-right: 6px;
            }
        }
    }

    div.card-meta {
        align-items: center;
        display: flex;
    }

</style>