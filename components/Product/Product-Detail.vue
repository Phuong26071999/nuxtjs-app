<template>
    <div class="wrapper">
            <v-card
                class="mx-auto card-box"
                max-width="360"
                min-height="370"
                outlined

            >
                <v-list-item-title class="text-h5 mb-1 pro-title">
                            {{ productData.title }}
                </v-list-item-title>
                <div class="img-box">
                        <v-img
                            lazy-src="https://picsum.photos/id/11/10/6"
                            max-height="250"
                            max-width="250"
                            :src="productData.img"
                        ></v-img>
                </div>
                <!-- <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>{{ productData.type }}</v-list-item-title>
                        <v-list-item-title>{{ productData.price }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->
                <v-row class="info --modified">
                    <v-col>
                        <v-list-item-title>
                        Type: {{ productData.type }}
                        </v-list-item-title>
                    </v-col>
                    <v-col>
                        <v-list-item-title>
                        Price: {{ checkPrice(productData.price) }}
                        </v-list-item-title>
                    </v-col>
                </v-row>
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
            </v-card>
    </div>
</template>

<script>


export default {
    name: 'ProductDetail',
    props: [ 'productData' ],
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

<style lang="css" scoped>
    .wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 700px; 
        width: 100%;
    }
    .pro-title{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0px;
        font-weight: 700;
        font-size: 20px !important;
        padding: 10px;
    }
    .info{
        text-align: center;
        display: flex;
        margin: 0 20px;
        font-weight: 600;
    }
    .info.--modified{
        background-color: unset !important;
    }
    .card-box{
        position: relative;
        box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
                0px 0px 0px 0px rgb(0 0 0 / 12%);
    }
    .img-box{
        display: flex;
        justify-content: center;
        align-items: center;
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
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5px;
    }
</style>