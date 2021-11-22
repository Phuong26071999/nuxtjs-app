<template>
  <div class="wrapper">
      <v-col cols="12" xl="12" md="12" lg="12">
          <v-container>
            <v-row class="wrapper-row">
                <v-col class="wrapper-row-item pa-3" cols="12" xl="3" md="4" lg="4" sm="6" xs="12" v-for="product in productList" :key="product.id">
                    <v-skeleton-loader
                        v-bind="attrs"
                        type="card-avatar, actions"
                        v-if="isLoading"
                        height="400px"
                        width="350px"
                    ></v-skeleton-loader>
                    <div v-else>
                        <ProductItem :ProductItem="product" :handleDetail="handleDetail" :onReceiveDelProduct="refetchProducts"/>
                    </div>
                </v-col>
            </v-row>
          </v-container>
      </v-col>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ProductItem from '../../components/Product/Product-Item.vue';

export default {
    // async fetch() {
    //     await this.getProducts();
    // },
    name: 'product',
    data() {
        return{
            isLoading: true,
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2,
            },
        }
    },
    layout: 'products',
    components: { ProductItem },
    computed: {
        ...mapGetters({
            productList: 'product/getProductList'
        }),
    },
    methods: {
        ...mapActions({
            getProducts: 'product/getProducts'
        }),
        handleDetail(product) {
            this.$router.push(`/products/${product.id}`);
        },
        refetchProducts() {
            setTimeout(async() => {
                await this.getProducts()
            }, 1000);
        },
        async getProductListFromStore() {
            await this.getProducts();
            this.isLoading = false;
        }
    },
    created() {
        this.getProductListFromStore();
    },
}
</script>

<style lang="css" scoped>
    .wrapper{
        min-height: 700px;
    }
    .title{
    text-align: center;
    font-size: 40px;
    font-weight: bold ; 
}
.wrapper-row-item{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>