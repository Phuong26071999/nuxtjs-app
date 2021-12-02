<template>
    <div class="wrapper">
        <FormProduct :onReceiveHandleSubmit="handleSubmit"/>
    </div>
</template>

<script>
import FormProduct from '../../components/Form/FormProduct';
import { callApiPostProduct } from '../../api/product'

export default {
  name: "create",
  components: { FormProduct },
  layout: 'products',
  methods: {
    async handleSubmit(product){
      try {
          const response = await callApiPostProduct(product);
          console.log(response);
          if (response) {
              alert('Bạn đã thêm sản phẩm thành công !!!');
              this.$router.push({name: 'products'});
          } else {
              alert('error');
          }
      } catch (error) {
        console.log(error);
      }
    }   
  },
  created() {
      console.log(this.$route.query.plan);
  }
};
</script>

<style lang="scss" scoped>

</style>