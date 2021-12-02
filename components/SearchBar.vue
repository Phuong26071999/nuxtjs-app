<template>
    <div class="search-wrapper">
        <div class="search-input">
            <v-text-field v-model="searchText"  label="Search for product" ></v-text-field>
            <v-btn @click="getSearch">Search</v-btn>
        </div>
        <ul v-if="searchText" class="search-box-list">
            <li v-for="result in resultSearch" :key="result.id">
                <router-link
                :to="`/products/${result.id}`">
                    <v-img 
                        max-height="70"
                        max-width="70"
                        :src="result.img"
                    ></v-img>
                    <span>{{ result.title }}</span>
                </router-link>
            </li>
            <div v-if="emptySearch" class="emptysearch"  >
                <p>Not found your product !</p>
            </div>
        </ul>
        <div v-show="searchText" class="modal" @click="clearSearchBar"></div>
    </div>
</template>

<script lang="ts">
/* eslint-disable array-callback-return */
/* eslint-disable vue/order-in-components */
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    name: 'SearchBar',
    data() {
        return{
            searchText: "" as string,
            emptySearch: false as boolean,
            resultSearch: [] as any,
            // resultList: [] as any,
        }
    },
    computed: {
        ...mapGetters({
            productList: 'product/getProductList'
        }),
        // column1(){
        //     return this.resultList.slice(0, Math.floor(this.resultList.length / 2) 
        // },
    },
    methods: {
        ...mapActions({
            getProducts: 'product/getProducts'
        }),
        async getProductListFromStore() {
            await this.getProducts();
        },
        handleSearch() {
            if (this.searchText.length) {
                const filterProduct = this.productList.filter((product: any) => {
                    if (
                        (product.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
                        product.type
                            .toLowerCase()
                            .includes(this.searchText.toLowerCase()))
                    ) {
                        return product;
                    }
                });
                if (filterProduct.length) {
                    this.emptySearch = false;
                    this.resultSearch = filterProduct;
                } else {
                    this.emptySearch = true;
                    this.resultSearch = [];
                }
            } else {
                this.resultSearch = [];
                this.emptySearch = false;
            }
        },
        clearSearchBar(){
            this.searchText = "";
        },
        getSearch() {
            this.$router.push({path: "/products", query: { wordsearch: this.searchText } });
            this.searchText = "";
        }
    },
    created() {
        this.getProductListFromStore();
    },
    watch: {
        searchText() {
            this.handleSearch();
        }
    },
})
</script>

<style lang="scss" scoped> 
    .search-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .search-input{
            width: 40%;
            z-index: 100;
            display: flex;
        }
        .search-box-list{
            position: absolute;
            z-index: 99;
            top: 300px;
            //height:500px;
            max-height: 500px;
            min-height:100px;
            width: 40%;
            overflow: auto;
            background-color: white;
            border-radius: 5px;
            box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
            0px 0px 0px 0px rgb(0 0 0 / 12%);
            padding: 0 10px;
            li{
                display: flex;
                padding: 10px;
                &:not(:first-of-type){
                    border-top: 1px solid rgb(0, 0, 0, 0.5);
                }
                .v-image__image{
                    border-radius: 5px;
                }
                a, span{
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                    padding-left: 10px;
                    width: 100%;
                }
                &:hover{
                    cursor: pointer;
                    background-color: rgba(226, 223, 223, 0.863);
                }
            }
            .emptysearch{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100px;
            }
        }
        .modal {
          position: fixed;
          z-index: 50;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
        }
    }
    @media only screen and (max-width: 1023px) {
        .search-wrapper{
            .search-input{
                width: 60%;
            }
            .search-box-list{
                width: 60%;
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .search-wrapper{
            .search-input{
                width: 100%;
            }
            .search-box-list{
                width: 95%;
            }
        }
    }
</style>
