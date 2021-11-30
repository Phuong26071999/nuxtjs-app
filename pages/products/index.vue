<template>
  <div class="wrapper">
      <v-col cols="12" xl="12" md="12" lg="12">
          <SearchBar />
          <v-container class="container-wrap">
            <v-row class="wrapper-row">
                <v-col class="wrapper-row-item pa-3" cols="12" xl="3" md="4" lg="4" sm="6" v-for="product in productList" :key="product.id">
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

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ProductItem from '../../components/Product/Product-Item.vue';
import SearchBar from '../../components/SearchBar.vue';

export default Vue.extend({
    // async fetch() {
    //     await this.getProducts();
    // },
    name: 'product',
    data() {
        return{
            isLoading: true as boolean,
            attrs: {
                class: 'mb-6' as string,
                boilerplate: true as boolean,
                elevation: 2 as number,
            },
        }
    },
    layout: 'products',
    components: { ProductItem, SearchBar },
    computed: {
        ...mapGetters({
            productList: 'product/getProductList'
        }),
    },
    methods: {
        ...mapActions({
            getProducts: 'product/getProducts'
        }),
        handleDetail(product: any): void {
            this.$router.push(`/products/${product.id}`);
        },
        refetchProducts() {
            setTimeout(async() => {
                try {
                    await this.getProducts()
                } catch (error) {
                    console.log(error);
                }
            }, 1000);
        },
        async getProductListFromStore() {
            try {
                await this.getProducts();
            } catch (error) {
                console.log(error);
            }
            this.isLoading = false;
        },
    },
    created() {
        this.getProductListFromStore();
    },
})
</script>

<style lang="scss" scoped>
    .wrapper{
        min-height: 600px;
    }
    @media only screen and (min-width: 1900px)  {
        .container-wrap{
            max-width: 1400px;
        }
    }
</style>