<template>
  <v-sheet class="pa-3">
    <v-skeleton-loader
        class="mx-auto"
        max-width="530"
        height="350"
        type="image"
      ></v-skeleton-loader>
  </v-sheet>
</template>

<script lang="ts">
export default {
  name: 'LoadingSkeleton',
};
</script>

<style lang="scss">
.v-skeleton-loader.mx-auto.v-skeleton-loader--is-loading.theme--light {
    .v-skeleton-loader__image {
      height: 100%;
      border-radius: 10px;
    }
  }
</style>