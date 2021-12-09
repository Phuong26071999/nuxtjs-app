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
          <div :class="isDisplayButton ? 'btn-top active' : 'btn-top'">
            <v-btn
              fab
              dark
              small
              color="info"
              @click="handleSrollToTop(true)"
            >
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
          </div>
          <ImageAuthorRelated :result="result" :handlemodal="handleModal" :handletext="handletext" :isloading="isLoading" :column_size="column_size"/>
          <v-row v-if="result.length > 0" class="box-pagination">
            <v-col cols="6" style="margin: auto">
              <v-btn
                dark
                small
                color="cyan"
                @click="handleView"
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
} from '@/api/images'
import AlertNotificate from "@/components/Notification/Alert.vue";
import ImageAuthorRelated from "@/components/ImageAuthorRelated/index.vue";

export default Vue.extend ({
    name: 'SearchImage',
    components: { AlertNotificate, ImageAuthorRelated },
    data() {
        return {
            params: {
                client_id: "UsYv4XxcylmAgm_jM6rG-pYup86hdTZ9ExSEiyKU1pg",
                per_page: 20,
                query: '',
                page: 1,
            },
            column_size: {
              lg: "6",
              md: "6",
              xl: "4"
            },
            isSubmit: false,
            totalPages: 0,
            result: [],
            currentPage: 1,
            isLoading: true,
            isDisplayButton: false,
        };
    },
    mounted() {
      window.addEventListener('scroll', this.handleDisplayButton)
    },
    methods: {
        ...mapActions({
            handleDisplayAlert: 'image/handleDisplayAlert',
            handleDisplayPopup: 'image/handleDisplayPopup'
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
        handleSrollToTop(button = false) {
            if(!button){
              this.isLoading = true;
              this.handleSearch();
            }
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        handleDisplayButton() {
          if(window.scrollY > 500) {
            this.isDisplayButton = true
          } else {
             this.isDisplayButton = false
          }
        },
        handleView() {
          this.params.page = this.params.page + 1;
          this.isLoading = true;
          this.handleSearch();
        },
        handleModal(image) {
          this.handleDisplayPopup(image);
          document.documentElement.style.overflow = 'hidden'
          this.isDisplayButton = false;
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

