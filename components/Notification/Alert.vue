<template>
  <v-alert
    :class="getAlert.isDisplay ? 'alert --active' : 'alert'"
    dense
    elevation="9"
    prominent
    :type="getAlert.type"
  >{{ getAlert.text }}</v-alert>
</template>

<script lang="ts">
import {  mapGetters } from 'vuex';

export default {
  name: "Alert",
  computed: {
    ...mapGetters({
        getAlert: 'product/getAlert'
    }),
  },
}
</script>

<style lang="scss">
  .alert {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 80px;
    right: -10px;
    z-index: 99;
    max-width: 500px;
    min-width: 300px;
    height: 60px;
    transform: translatex(100%);
    transition: all ease-in-out 0.25s;
      &.--active {
          transform: translatex(0);
          right: 10px;
          height: unset !important;
      }
  }
</style>
