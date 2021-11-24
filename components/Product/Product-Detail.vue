<template>
    <v-container>
        <div class="wrapper">
            <v-card
                class="mx-auto card-box"
                max-width="1000"
                min-height="200"
                outlined
            >
                <v-col cols="12">
                    <div class="d-flex flex-no-wrap justify-space-between wrapper-responsive">
                        <v-col class="product-img" cols="12" xl="4" md="4" lg="4" sm="4">
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
                        <v-col class="product-des" cols="12" xl="8" md="8" lg="8" sm="7">
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
                            <div class="rating-box">
                                <v-rating
                                    v-model="rating"
                                    color="yellow darken-3"
                                    background-color="grey darken-1"
                                    empty-icon="$ratingFull"
                                    half-increments
                                    hover
                                    large
                                ></v-rating>
                            </div>
                            <v-card-actions class="btn-box">
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    class="detail"
                                    @click="edit"
                                >
                                    Edit
                                </v-btn>
                                <v-btn
                                    outlined
                                    rounded
                                    text
                                    class="add"
                                    @click="back"
                                >
                                    Back
                                </v-btn>
                            </v-card-actions>
                        </v-col>
                    </div>
                </v-col>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'ProductDetail',
    props: [ 'productData' ],
    data() {
        return{
            rating: 4.5,
        }
    },
    methods: {
        back() {
            this.$router.push({name: 'products'});
        },
        edit() {
            this.$router.push(`/products/edit/${this.productData.id}`);
        },
        checkPrice(price) {
            if(Number.isInteger(price % 2)){
            return `$${price}.00`;
            }else{
            return `$${price}`;
            }
      },
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .wrapper-card{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 700px;
    }
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
    .add{
        background: #db3939;
        color: white;
        box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
                0px 0px 0px 0px rgb(0 0 0 / 12%);
        
    }
    .add span, .detail span{
        color: #ffffff;
        font-weight: 700;
    }
    .detail{
        background: #1a9688;
        color: white;
        box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
                0px 0px 0px 0px rgb(0 0 0 / 12%);
    }
    .btn-box{
        display: flex;
        margin-bottom: 5px;
    }
    @media only screen and (max-width: 670px) {
        .wrapper-responsive{
            display: initial !important;
            .product-img{
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
            }
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
            v-avatar{
                v-img{
                    width: 100%;
                }
            }
        }
        .v-card__text{
            font-size: 12px;
        }
        
    }
</style>