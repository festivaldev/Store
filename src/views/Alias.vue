<script lang="ts">

    import { Component, Vue } from "vue-property-decorator";

    import Axios from "axios";

    @Component({
        components: {},
    })
    export default class Alias extends Vue {

        beforeMount(): void {
            if (this.$route.params["alias"]) {
                Axios.get(`${this.$store.state.serverUrl}/alias/${this.$route.params["alias"]}`).then((res) => {
                    this.$router.replace("/sku/" + res.data.packageId);
                }).catch((err) => {
                    this.$router.replace("/");
                });
            } else {
                this.$router.replace("/");
            }
        }

    }

</script>

<template>

    <section class="myy-alias">
    </section>

</template>

<style lang="scss" scoped>

    @import "../style/sivu";

    @import "../style/_breakpoints";
    @import "../style/_colors";

</style>
