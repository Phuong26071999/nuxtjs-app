<template>
    <v-container>
        <v-card
            class="mx-auto card-box justify-center"
            max-width="1000"
            min-height="200"
            outlined
        >
            <v-col cols="12" xl="12" md="12" lg="12">
                <v-row class="card-box">
                    <v-col class="text-center" cols="12" xl="4" md="4" lg="4">
                        <v-avatar
                            class="ma-3"
                            size="250"
                            tile
                        >
                            <v-img
                                lazy-src="https://picsum.photos/id/11/10/6"
                                :src="productData.img"
                            ></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="product-des" cols="12" xl="8" md="8" lg="8">
                        <v-card-title
                            class="text-h5 pro-title"
                            v-text="productData.title"
                        ></v-card-title>
                        <v-card-subtitle>
                            Whey Protein là sản phẩm phát triển cơ bắp cung cấp 100% Whey Isolate và Hydrolyzed hấp thu nhanh. 
                            Whey protein nhập khẩu chính hãng, cam kết chất lượng, giá rẻ nhất tại Hà Nội và Tp.HCM.
                        </v-card-subtitle>
                        <v-col class="info --modified">
                            <v-list-item-title>
                                Type: {{ productData.type }}
                                </v-list-item-title>
                                <v-list-item-title>
                                Price: {{ checkPrice(productData.price) }}
                                </v-list-item-title>
                        </v-col>
                        <v-col>
                            <v-rating
                                v-model="rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                half-increments
                                hover
                                large
                            ></v-rating>
                        </v-col>
                        <v-card-actions class="btn-box">
                            <v-btn
                                depressed
                                color="primary"
                                @click="edit"
                            >
                                Edit
                            </v-btn>
                            <v-btn
                                depressed
                                color="error"
                                @click="back"
                            >
                                Back
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-col>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ProductDetail',
    props: [ 'productData' ],
    data() {
        return{
            rating: 4.5 as number,
        }
    },
    methods: {
        back(): void {
            this.$router.push({name: 'products'});
        },
        edit(): void {
            this.$router.push(`/products/edit/${this.productData.id}`);
        },
        checkPrice(price: number) {
            if (Number.isInteger(price % 2)) {
            return `$${price}.00`;
            } else {
            return `$${price}`;
            }
      },
    }
})
</script>

<style lang="scss" scoped>
    .info{
        display: flex;
        padding: 10px;
    }
    .info.--modified{
        background-color: unset !important;
    }
    .v-card__subtitle{
        text-align: justify;
        text-align-last: left;
    }
    .pro-title{
        margin: 10px 0px;
        font-weight: 900;
    }
    .card-box{
        position: relative;
        box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
                0px 0px 0px 0px rgb(0 0 0 / 12%);
    }
    @media only screen and (max-width: 768px) {
        .product-des{
            margin: 0 auto;
            .pro-title{
                font-size: 16px !important;
            }
            .v-card__subtitle{
                font-size: 13px !important;
            }
            .info{
                text-align: center;
            }
            .v-rating{
                display: flex;
                justify-content: center;
            }
            .btn-box{
                align-items: center;
                justify-content: center;
            }
        }
        .v-card__text{
            font-size: 12px;
        }
    }
</style>