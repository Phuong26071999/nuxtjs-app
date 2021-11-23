<template>
    <div class="search-wrapper">
        <div class="search-input">
            <v-text-field  label="Search for product" v-model="searchText"></v-text-field>
        </div>
        <ul class="search-box-list" v-if="searchText">
            <li v-for="result in resultSearch" :key="result.id">
                <v-img 
                    max-height="70"
                    max-width="70"
                    :src="result.img"
                ></v-img>
                <router-link
                :to="`/products/${result.id}`"
                v-html="result.title"
                ></router-link>
            </li>
            <div class="emptysearch" v-if="emptySearch" >
                <p>Not found your product</p>
            </div>
        </ul>
        <div v-show="searchText" class="modal" @click="clearSearchBar"></div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: [ "productList" ],
    data() {
        return{
            searchText: "",
            emptySearch: false,
            resultSearch: [],
        }
    },
    methods: {
        handleSearch() {
            if (this.searchText.length) {
                let filterProduct = this.productList.filter((product) => {
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
            console.log('click');
            this.searchText = "";
        }
    },
    watch: {
        searchText() {
            this.handleSearch();
            console.log(this.searchText);
        }
    },
}
</script>

<style lang="scss"> 
    .search-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .search-input{
            width: 40%;
            z-index: 100;
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
                a{
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                    padding-left: 10px;
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
