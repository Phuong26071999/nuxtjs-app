<template>
    <v-app>
        <Header class="header"/>
        <nuxt class="component"/>
        <Footer class="footer"/>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '../components/HeaderProduct.vue';
import Footer from '../components/FooterProduct.vue';

export default Vue.extend({
    name: 'Products',
    components: {
        Header,
        Footer
    },
})
</script>
