<template>
    <v-app>
        <div class="product-wrapper">
            <Header />
            <nuxt />
            <Footer />
        </div>
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
.product-wrapper{
    min-height: 700px;
}
</style>