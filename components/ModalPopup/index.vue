<template>
  <div :class="getIsDisplayPopup ? 'popup-wrap active' : 'popup-wrap'">
    <div class="overlay" @click="handleClosePopup"></div>
    <div :class=" isDisplayPopupTop ? 'popup-top active' : 'popup-top'">
      <v-btn
        fab
        dark
        small
        color="info"
        @click="handleSrollToTop"
      >
        <v-icon>mdi-arrow-up-bold</v-icon>
      </v-btn>
    </div>
    <div ref="popupSrollToTop" class="popup">
      <div v-if="getIsDisplayPopup" >
          <div class="popup__header">
            <div class="author">
              <div class="author__avatar">
                <img :src="getInfoImage.user.profile_image.small" alt="author__avatar">
              </div>
              <div class="author__textbox">
                <a target="_blank" :href="getInfoImage.user.links.html">{{ getInfoImage.user.name }}</a><br>
                <span>Available for hire</span>
              </div>
            </div>
            <div class="btn-group">
              <div class="plus">
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
              </div>
              <div class="download-wrap">
                <v-btn class="download" dark color="teal" small>
                  <a rel="nofollow" target="_self" title="Download photo"
                    :href="getInfoImage.links.download+';force=true'">
                    Download
                  </a>
                </v-btn>
                <v-menu left nudge-top="-40">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="arrow-drop"
                      small
                      color="teal" dark v-on="on"
                    >
                      <v-icon>
                        mdi-chevron-down
                      </v-icon>
                    </v-btn>
                  </template>

                  <v-list class="dowload-size">
                    <div>
                      <a
                        rel="nofollow"
                        target="_self"
                        :href="getInfoImage.links.download+';force=true&w=640'"
                      >
                        <v-list-item>
                          Small
                          <span>(640x413)</span>
                        </v-list-item>
                      </a>
                    </div>
                    <a
                      rel="nofollow"
                      target="_self"
                      :href="getInfoImage.links.download+';force=true&w=1920'"
                    >
                      <v-list-item>
                        Medium
                        <span>(1920x1240)</span>
                      </v-list-item>
                    </a>
                    <a
                      rel="nofollow"
                      target="_self"
                      :href="getInfoImage.links.download+';force=true&w=2400'"
                    >
                      <v-list-item>
                        Large
                        <span>(2400x1550)</span>
                      </v-list-item>
                    </a>
                    <hr class="line">
                    <a
                      rel="nofollow"
                      target="_self"
                      :href="getInfoImage.links.download+';force=true'"
                    >
                      <v-list-item>
                        Original Size
                        <span>(5184x3348)</span>
                      </v-list-item>
                      </a>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
          <div class="popup__main-img">
            <div :class="isZoom ? 'img-box-in' : 'img-box-out'">
                <div>
                  <v-icon v-if="isZoom" dark class="arrow-zoom">mdi-arrow-expand-all</v-icon>
                  <v-icon v-else dark class="arrow-zoom">mdi-arrow-collapse-all</v-icon>
                  <img class="zoom" :src="getInfoImage.urls.regular" alt="popup__main-img" @click="handleZoomImg">
                </div>
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
                  <v-icon>mdi-share</v-icon>
                  <span>Share</span>
                </v-btn>
                <v-btn small>
                  <v-icon>mdi-information</v-icon>
                  <span>Info</span>
                </v-btn>
                <v-btn small>
                  <v-icon>mdi-dots-horizontal </v-icon>
                </v-btn>
              </div>
            </div>
            <div v-if="getInfoImage.description != null" class="description" >
              <h4>Description</h4>
              <span>{{ getInfoImage.description }}</span>
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
            <v-icon>mdi-close</v-icon>
          </div>
          <v-container class="related-wrap">
            <h4 style="text-align: start;">Other Photos</h4>
            <ImageAuthorRelated :result="result" :handlemodal="handleModal" :isloading="isLoading" :column_size="column_size"/>
          </v-container>
      </div>
    </div>
    <!-- <div v-else></div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {  mapGetters, mapActions } from 'vuex';
import ImageAuthorRelated from "@/components/ImageAuthorRelated/index.vue";
import {
    callApiImageRelated,
} from '@/api/images'

export default Vue.extend({
  name: 'ModelPopup',
  components: { ImageAuthorRelated },
  data() {
    return{
        client_id: "UsYv4XxcylmAgm_jM6rG-pYup86hdTZ9ExSEiyKU1pg",
        isZoom: true,
        isLoading: true,
        result: [],
        isDisplayPopupTop: false,
        column_size: {
          lg: "6",
          md: "6",
          xl: "4"
        }
    }
  },

  computed: {
    ...mapGetters({
      getIsDisplayPopup: 'image/getIsDisplayPopup',
      getInfoImage: 'image/getInfoImage',
    })
  },
  watch: {
    getIsDisplayPopup() {
       if (this.getIsDisplayPopup === false) {
         this.isZoom = true;
       } else {
          this.handleCallRelated()
       }
    }
  },
  mounted() {
    this.$refs.popupSrollToTop.addEventListener('scroll', this.handleDisplayPopuptop);
  },
  methods: {
    ...mapActions({
      handleHiddenPopup: 'image/handleHiddenPopup',
      handleDisplayPopup: 'image/handleDisplayPopup'
    }),
    handleDisplayPopuptop() {
      if(this.$refs.popupSrollToTop.scrollTop > 100) {
        this.isDisplayPopupTop = true
      } else {
          this.isDisplayPopupTop = false
      }
    },
    handleClosePopup() {
      this.handleHiddenPopup();
      document.documentElement.style.overflow = 'auto';
    },
    handleZoomImg() {
      if (window.innerWidth > 1024) {
        this.isZoom = !this.isZoom;
      }
    },
    handleModal(image) {
      this.handleSrollToTop();
      this.handleDisplayPopup(image);
      this.handleCallRelated();
    },
    async handleCallRelated() {
      this.isLoading = true;
      try {
          const res = await callApiImageRelated(this.client_id, this.getInfoImage.user.username);
          setTimeout(() => {
              this.isLoading = false;
          }, 500);
        this.result = res.data;
      } catch (error) {
          // console.log(error);
      }
    },
    handleSrollToTop() {
      this.$refs.popupSrollToTop.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
    },
  },
})
</script>

<style lang="scss" src="./style.scss">
</style>
