<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class MyyPage extends Vue {

        @Prop({ type: Boolean })
        public narrowContent: Boolean;

        @Prop({ type: Boolean })
        public extraNarrowContent: Boolean;

    }

</script>

<template>

    <section class="myy-page">
        <slot name="navigation" />

        <section :class="['page-content', { 'is-narrow': this.narrowContent, 'is-extra-narrow': this.extraNarrowContent }]">
            <slot name="content" />
        </section>
    </section>

</template>

<style lang="scss" scoped>

    .myy-page {
        background-color: #F2F2F2;
        margin: 48px 0 0 48px;
        min-height: calc(100vh - 48px);
        transition: all .4s cubic-bezier(0.4, 0.01, 0.165, 0.99);

        body.has-asidenav-open & {
            margin: 48px 0 0 240px;
        }
    }

    .page-content {
        padding: 40px 5%;

        &.is-narrow {
            padding: 40px;
        }

        &.is-extra-narrow {
            padding: 0 !important;
        }
    }

</style>