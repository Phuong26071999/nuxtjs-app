<template>
  <div
    :class="getIsDisplayPopup ? 'popup-wrap active' : 'popup-wrap'"
  >
    <div class="overlay" @click="handleClosePopup"></div>
    <div v-if="getIsDisplayPopup" class="popup">
        <div class="popup__header">
          <div class="author">
            <div class="author__avatar">
              <img :src="getInfoImage.user.profile_image.small" alt="author__avatar">
            </div>
            <div class="author__textbox">
              <p>{{ getInfoImage.user.name }}</p>
              <span>Available for hire</span>
            </div>
          </div>
          <div class="btn-group">
            <v-btn small>
                <v-icon>
                    mdi-heart
                </v-icon>
            </v-btn>
            <v-btn small>
                <v-icon>
                    mdi-plus
                </v-icon>
            </v-btn>
            <v-btn class="download" dark color="teal" small>
              <a rel="nofollow" target="_blank"  title="Download photo"
                :href="getInfoImage.links.download+';force=true'">
                Download
              </a>
            </v-btn>
          </div>
        </div>
        <div class="popup__main-img">
          <div class="img-box">
            <img :src="getInfoImage.urls.regular" alt="popup__main-img">
          </div>
        </div>
        <div class="popup__footer">
          <div class="info-User">
            <div class="info-User__count">
              <div class="view">
                <h4>Views</h4><span>{{ getInfoImage.likes }}</span>
              </div>
              <div class="download">
                <h4>Download</h4><span>7,388,958</span>
              </div>
            </div>
            <div class="info-User__featured">
              <h4>Featured in</h4><span>Editorial</span>
            </div>
            <div class="info-User__btn">
              <v-btn small>
                Share
              </v-btn>
              <v-btn small>
                Info
              </v-btn>
              <v-btn small>
                ...
              </v-btn>
            </div>
          </div>
          <div class="time">
            <div class="time__publish">
              <svg width="16" height="16" class="ywnoU" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                <path d="M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2
                2zM5 8h14V6H5v2zm14 12V10H5v10h14z"></path>
              </svg>
              <span>Published on September 16, 2019</span>
            </div>
            <div class="time__camera"></div>
            <div class="time__free">
              <svg width="16" height="16" class="ywnoU" viewBox="0 0 32 32" version="1.1" aria-hidden="false">
                <path d="M13.3333 18.9333l8.8-8.8L24 12 13.3333 22.6667 8 17.3333l1.86667-1.8666 3.46663 3.4666zM28
                6.66668v8.00002c0 7.3333-5.0667 14.2666-12 16-6.93333-1.7334-12-8.6667-12-16V6.66668l12-5.33334 12 5.33334zm-2.6667
                1.73333L16 4.26668 6.66667 8.40001v6.26669c0 6 4.00003 11.6 9.33333 13.2 5.3333-1.6 9.3333-7.2 9.3333-13.2V8.40001z"></path>
              </svg>
              <span>Free to use under the Unsplash License</span>
            </div>
          </div>
        </div>
        <div class="btn-close" @click="handleClosePopup">
          <span >X</span>
        </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import Vue from 'vue';
import {  mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  name: 'ModelPopup',
  computed: {
    ...mapGetters({
      getIsDisplayPopup: 'product/getIsDisplayPopup',
      getInfoImage: 'product/getInfoImage',
    })
  },
  methods: {
    ...mapActions({
      handleHiddenPopup: 'product/handleHiddenPopup'
    }),
    handleClosePopup() {
      this.handleHiddenPopup();
    }
  }
})
</script>

<style lang="scss" src="./style.scss" scoped>
</style>
