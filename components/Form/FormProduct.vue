<template>
  <v-container class="wrapper-center">
        <div class="loading" v-if="isLoading">
            <v-progress-circular
                indeterminate
                color="red"
                >
            </v-progress-circular>
            <span>Loading...</span>
        </div>
        <v-col cols="10" xl="4" md="8" lg="8" v-else>
            <v-row class="wrapper-row">
                <v-col cols="12" xl="12" md="12" lg="12">
                    <h1 style="text-align: center">ADD PRODUCT</h1>
                    <v-form ref="form"
                        lazy-validation 
                        @submit.prevent="handleSubmit"
                        v-model="valid"
                    >
                            <v-text-field 
                                :rules="textRules" 
                                :counter="5" 
                                required 
                                type="text" 
                                label="Product ID" 
                                v-model="product.id">
                            </v-text-field>
                            <v-text-field 
                                :counter="40" 
                                :rules="textRules" 
                                required 
                                type="text" 
                                label="Title" 
                                v-model="product.title"></v-text-field>
                            <v-text-field 
                                :counter="20" 
                                :rules="textRules" 
                                required 
                                type="text" 
                                label="Type" 
                                v-model="product.type"></v-text-field>
                            <v-text-field type="number" label="Quantity" v-model="product.quantity"></v-text-field>
                            <v-text-field type="number" label="Price" v-model="product.price"></v-text-field>
                            <v-text-field 
                                :counter="100" 
                                :rules="textRules" 
                                required 
                                type="text" 
                                label="Image" 
                                v-model="product.img"></v-text-field>
                            <v-col class="btn-box">
                                <v-btn outlined rounded text type="submit" class="add">
                                    Submit
                                </v-btn>
                                <v-btn outlined rounded text type="button" class="exit" @click="backList">
                                    Cancel
                                </v-btn>
                            </v-col>
                    </v-form>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
    name: 'FormProduct',
    props:['onReceiveHandleEdit','onReceiveHandleSubmit', 'turnOffLoading'],
    data() {
        return {
            product: {
                id: null,
                title: null,
                type: null,
                quantity: 0,
                price: 0,
                img: null,
            },
            productStore: {} as any,
            isLoading: true as boolean,
            valid: true as boolean,
            textRules: [
                (v: any)  => !! v || 'Input is empty !!!',
            ],
        };
    },
    computed: {
        ...mapGetters({
            productId: 'product/getProductID'
        }),
    },
    methods: {
        ...mapActions({
            postProducts: 'product/postProducts',
            putProducts: 'product/putProducts',
            getProductID: 'product/getProductID',
        }),
        validate () {
            (this.$refs.form as Vue & { validate: () => boolean }).validate()
        },
        reset () {
            (this.$refs.form as Vue & { reset: () => void }).reset()
        },
        resetValidation () {
            (this.$refs.form as Vue & { resetValidation: () => boolean }).resetValidation()
        },
        backList() {
            this.$router.push({name: 'products'});
        },
        async handleSubmit() {
            try{
                if(this.$route.params.id){
                    await this.onReceiveHandleEdit(this.product, this.productStore);
                }else{
                    await this.onReceiveHandleSubmit(this.product);
                }
            }catch(error){
                console.log(error);
            }
        },
        async initialState() {
           if(this.$route.params.id){
                await this.getProductID(this.$route.params.id);
                        this.productStore = this.productId;
                        this.product = {
                            id: this.productId.id,
                            title: this.productId.title,
                            type: this.productId.type,
                            quantity: this.productId.quantity,
                            price: this.productId.price,
                            img: this.productId.img
                        };
                        this.isLoading = false;
            }else{
                setTimeout(() => {
                    this.isLoading = false;
                }, 700);
            }
        }
    },
    created() {
        this.initialState();
        console.log(this.product);
    },

})
</script>

<style lang="scss" scoped>
.wrapper-center{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 700px;
}
  .wrapper-row {
    background: rgb(224, 224, 224);
    box-shadow: 0px 2px 2px 1px rgb(0 0 0 / 20%),
      0px 1px 5px 1px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
    border-radius: 10px;
  }
  .btn-box{
      display: flex;
      justify-content: end;
  }
  .add {
    background: #1a9688;
    box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 5px 1px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
      margin-right: 10px;
  }
  .exit {
    background: #ff5252;
    box-shadow: 0px 1px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 5px 1px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  .add span,
  .exit span {
    color: #ffffff;
    font-weight: 700;
  }
</style>