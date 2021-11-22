<template>
    <v-card
      class="mx-auto card-box"
      max-width="344"
      min-height="370"
      outlined
    >
    <div class="del">
      <v-btn
        icon
        color="pink"
        @click="turnOnDialog"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ ProductItem.title }}
        </div>
        <div class="img-box">
          <v-img
              class="img-shadow"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="250"
              max-width="250"
              :src="ProductItem.img"
          ></v-img>
        </div>
        <v-row class="info --modified">
          <v-col>
            <v-list-item-title>
              Type: {{ ProductItem.type }}
            </v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title>
              Price: {{ checkPrice(ProductItem.price) }}
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="btn-box">
          <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            class="add"
          >
            Add To Card
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            outlined
            rounded
            text
            class="detail"
            @click="handleDetail(ProductItem)"
          >
            Detail
          </v-btn>
        </v-card-actions>
    </v-list-item>
    <v-dialog v-model="dialogDelete" max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="handleDelete">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { callApiDelProduct } from '../../api/product';

export default {
    name: 'product-item',
    data(){
      return{
        dialogDelete: false,
      };
    },
    props: ['ProductItem', 'handleDetail', 'onReceiveDelProduct'],
    methods: {
      checkPrice(price) {
        if(Number.isInteger(price % 2)){
          return `$${price}.00`;
        }else{
          return `$${price}`;
        }
      },
      turnOnDialog() {
        this.dialogDelete = true;
        console.log(this.dialogDelete);
      },
      closeDelete() {
        this.dialogDelete = false;
      },
      async handleDelete() {
          try {
            let res = await callApiDelProduct(this.ProductItem.id);
            if(res && res.status == 200){
              this.onReceiveDelProduct();
            }
          } catch (error) {
            console.log(error);
          }
      }
    }
}
</script>

<style lang="css" scoped>
  .btn-box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  .img-box{
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-overline{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    width: 100%;
    height: 40px;
    /* margin-top: 5px; */
  }
  .v-list-item__content{
    padding: 0;
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
    transition: ease 0.5s;
  }
  .card-box:hover{
    transform: translateY(-10px);
    transition: ease 0.5s;
    box-shadow: 0px 2px 2px 1px rgb(0 0 0 / 20%), 0px 1px 5px 1px rgb(0 0 0 / 14%),
            0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  .add{
    background: #ff5252;
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
  .del{
    display: flex;
    justify-content: end;
    top: 20px;
    right: 5px;
  }
  .del span{
    color: #ff5252;
  }
</style>