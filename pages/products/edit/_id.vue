<template>
  <div class="wrapper">
      <v-alert type="success" v-if="isNotificat">
                Bạn đã sửa sản phẩm thành công !!!
        </v-alert>
        <FormProduct  :onReceiveHandleEdit="handleEditProduct" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { callApiPutProduct } from '../../../api/product'
import FormProduct from '@/components/Form/FormProduct.vue';

export default Vue.extend({
    name: 'editProduct',
    layout: 'products',
    data() {
        return{
            isNotificat: false as boolean,
        }
    },
    components: { FormProduct },
    methods:{
        async handleEditProduct(product: any, productStore: any){
            try {
                const res: any = await callApiPutProduct({
                    ...productStore, 
                    title: product.title, 
                    type: product.type, 
                    quantity: product.quantity, 
                    price: Number(product.price), 
                    img: product.img
                });
                if(res.status === 200){
                    this.isNotificat = true;
                    setTimeout(() => {
                        this.isNotificat = false;
                        this.$router.push({name: 'products'});
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
})
</script>

<style lang="scss" scoped>

</style>