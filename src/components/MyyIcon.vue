<script lang="ts">

    import { Component, Prop, Vue } from "vue-property-decorator";

    @Component
    export default class MyyIcon extends Vue { }

</script>

<template>

    <span class="myy-icon"><slot /></span>

</template>

<style lang="scss" scoped>

    .myy-icon {
        font-family: 'Segoe MDL2 Assets';
        font-weight: 400 !important;
    }

</style>