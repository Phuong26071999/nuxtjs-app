<template>
  <div>
      <v-row class="row-box">
        <v-col v-for="image in result" :key="image.id" align-self="center" cols="12" :lg="column_size.lg" :md="column_size.md" :xl="column_size.xl" class="column-box">
            <LoadingSkeleton v-if="isloading" />
            <div v-else>
                <div class="image">
                  <img class="image__img" width="100%" :src="image.urls.regular">
                  <div class="modal">
                    <div class="modal__header">
                        <div class="btn-group">
                            <v-btn
                                class="mx-2"
                                small
                            >
                                <v-icon>
                                    mdi-heart
                                </v-icon>
                            </v-btn>
                            <v-btn
                                class="mx-2"
                                small
                            >
                                <v-icon>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </div>
                    </div>
                    <div class="modal__footer">
                        <div class="author">
                            <div class="author__avatar">
                                <img ref="author__avatar" :src="image.user.profile_image.small" />
                            </div>
                            <div class="author__name">
                              <a target="_blank" :href="image.user.links.html">{{ image.user.name }}</a>
                            </div>
                        </div>
                        <div class="download">
                            <v-btn
                              class="mx-2"
                              small
                            >
                              <a rel="nofollow" target="_self" title="Download photo"
                                :href="image.links.download+';force=true'">
                                <v-icon>mdi-cloud-download</v-icon>
                              </a>
                            </v-btn>
                        </div>
                    </div>
                    <div class="modal-cover" @click="handlemodal(image)"></div>
                  </div>
              </div>
              <div class="keyword">
                  <div v-for="word in image.tags" :key="word.title" >
                    <div class="keyword__item" @click="handletext(word.title)">
                      <span>{{ word.title }}</span>
                    </div>
                  </div>
              </div>
            </div>
        </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

export default Vue.extend({
  name: 'ImageAuthorRelated',
  components: { LoadingSkeleton },
  props: [ 'result', 'handlemodal', 'handletext', 'isloading', 'column_size' ],
  data() {
    return {

    }
  },
  methods: {

  }
})
</script>

<style lang='scss' src="./style.scss"></style>
