<template>
    <div class="wrapper">
        <div class="loading" v-if="isLoading">
            <v-progress-circular
                indeterminate
                color="red"
                >
            </v-progress-circular>
            <span>Loading...</span>
        </div>
        <div v-else>
            <ProductDetail :productData="product"/>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import ProductDetail from '../../components/Product/Product-Detail';

export default {

    name: "productID",
    layout: 'products',
    components: { ProductDetail },
    // async fetch(){
    //     this.getProductFromStore();
    // },
    data(){
        return{
            product: {},
            isLoading: true,
        }
    },
    computed: {
        ...mapGetters({
            ProductID: 'product/getProductID'
        }),
    },
    methods: {
        ...mapActions({
            getProductID: 'product/getProductID'
        }),
        async getProductFromStore(){
            await this.getProductID(this.$route.params.id);
            this.product = this.ProductID;
            this.isLoading = false;
        },
    },
    created(){
        this.getProductFromStore();
    }
}
</script>

<style lang='css' scoped>
    .wrapper{
        min-height: calc(100vh - 224px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loading{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading span{
        margin-left: 10px;
    }
</style>