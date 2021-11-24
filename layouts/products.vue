<template>
    <v-app>
        <Header class="header"/>
        <nuxt class="component"/>
        <Footer class="footer"/>
    </v-app>
</template>

<script>
import Vue from 'vue';
import Header from '../components/HeaderProduct.vue';
import Footer from '../components/FooterProduct.vue';

export default {
    name: 'products',
    components: {
        Header,
        Footer
    },
}
</script>

<style>
/* .product-wrapper{
    min-height: 700px;
} */

/* .footer{
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
} */
</style>