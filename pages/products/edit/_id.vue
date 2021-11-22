<template>
  <div class="wrapper">
      <v-alert type="success" v-if="isNotificat">
                Bạn đã sửa sản phẩm thành công !!!
        </v-alert>
        <FormProduct  :onReceiveHandleEdit="handleEditProduct" :turnOffLoading="turnOffLoading" />
  </div>
</template>

<script>
import FormProduct from '../../../components/Form/FormProduct';
import { callApiPutProduct } from '../../../api/product'

export default {
    name: 'editProduct',
    layout: 'products',
    data() {
        return{
            isNotificat: false,
        }
    },
    components: { FormProduct },
    methods:{
        async handleEditProduct(product, productStore){
            try {
                let res = await callApiPutProduct({
                    ...productStore, 
                    title: product.title, 
                    type: product.type, 
                    quantity: product.quantity, 
                    price: product.price, 
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
}
</script>

<style lang="css" scoped>

</style>