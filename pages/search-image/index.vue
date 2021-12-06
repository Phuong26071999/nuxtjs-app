<template>
    <v-container class="search-wrap">
            <AlertNotificate />
            <v-row class="box-textfield">
                <v-col cols="12" lg="8" md="8" xl="8">
                    <v-form class="form-wrapper">
                        <v-text-field
                          v-model="params.query"
                          type="text"
                          placeholder="Name of your image"
                          hide-details=true
                          outlined
                          class="custom-input"></v-text-field>
                        <v-btn
                        class="btn-search"
                         type="buttom"
                         color="info"
                         :loading="isSubmit"
                         :disabled="isSubmit"
                         @click.prevent="handleSubmit"
                        >Search</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <v-row class="row-box">
                <v-col v-for="image in result" :key="image.id" align-self="center" cols="12" lg="6" md="6" xl="4" class="column-box">
                    <LoadingSkeleton v-if="isLoading" />
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
                                      <span>{{ image.user.name }}</span>
                                    </div>
                                </div>
                                <div class="download">
                                    <v-btn
                                      class="mx-2"
                                      small
                                    >
                                      <a rel="nofollow" target="_blank"  title="Download photo"
                                        :href="image.links.download+';force=true'">
                                        <v-icon>mdi-cloud-download</v-icon>
                                      </a>
                                    </v-btn>
                                </div>
                            </div>
                            <div class="modal-cover" @click="handleModal(image)"></div>
                          </div>
                      </div>
                      <div class="keyword" >
                          <div v-for="word in image.tags" :key="word.title" >
                            <div class="keyword__item" @click="handletext(word.title)">
                              <span>{{ word.title }}</span>
                            </div>
                          </div>
                      </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="result.length > 0" class="box-pagination">
                <v-col cols="6" style="margin: auto">
                  <v-btn
                    dark
                    small
                    color="cyan"
                   >
                   view more
                   </v-btn>
                </v-col>
            </v-row>
            <ModalPopup />
        </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import {
    callApiImage,
} from '@/api/product'
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import AlertNotificate from "@/components/Notification/Alert.vue";
import ModalPopup from "@/components/ModalPopup/index.vue";

export default Vue.extend ({
    name: 'SearchImage',
    components: { LoadingSkeleton, AlertNotificate, ModalPopup },
    data() {
        return {
            params: {
                client_id: "UsYv4XxcylmAgm_jM6rG-pYup86hdTZ9ExSEiyKU1pg",
                per_page: 20,
                query: '',
                page: 1,
            },
            isSubmit: false,
            totalPages: 0,
            result: [],
            currentPage: 1,
            isLoading: true,
        };
    },
    methods: {
        ...mapActions({
            handleDisplayAlert: 'product/handleDisplayAlert',
            handleDisplayPopup: 'product/handleDisplayPopup'
        }),
        handleSubmit() {
            this.params.page = 1;
            this.isLoading = true;
            this.isSubmit = true;
            this.handleSearch();
        },
        async handleSearch() {
            try {
               const res = await callApiImage(this.params);
                setTimeout(() => {
                   this.isLoading = false;
                   this.isSubmit = false;
               }, 500);
               switch (true) {
                 case res.data.results.length > 0:
                    if (this.params.page > 1) {
                      this.result = [...this.result, ...res.data.results];
                      // this.result.push(...res.data.results);
                      this.handleDisplayAlert( {text: `You added ${res.data.results.length} results` as string, type: 'success' as string} );
                    } else {
                      this.result = res.data.results;
                      this.totalPages = res.data.total_pages;
                      this.handleDisplayAlert( {text: `${res.data.total_pages} results were found` as string, type: 'success' as string} );
                    }
                  break;
                 default:
                   this.result = [];
                   this.handleDisplayAlert( {text:'No result' as string, type: 'error' as string} );
                   break;
               }
            } catch (error) {
                this.isLoading = false;
                this.isSubmit = false;
                // console.log(error);
            }
        },
        handleSrollToTop() {
            this.isLoading = true;
            this.handleSearch();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        handleView() {
          this.params.page = this.params.page + 1;
          this.isLoading = true;
          this.handleSearch();
        },
        handleModal(image) {
          this.handleDisplayPopup(image);
        },
        handletext(word) {
          this.params.page = 1;
          this.params.query = word;
          this.isLoading = true;
          this.isSubmit = true;
          this.handleSrollToTop();
          this.handleSearch();
        }
    },
})
</script>

<style lang="scss" src="./style.scss"></style>

