<template>
    <v-container>
            <v-alert                 
                :class="alerts.isDisplay ? 'alert --active' : 'alert'"
                dense
                elevation="9"
                prominent
                :type="alerts.type"
            >{{ alerts.text }}</v-alert>
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
                         @click.prevent="handleSubmit"
                         :loading="isSubmit"
                         :disabled="isSubmit"
                        >Search</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <v-row class="row-box">
                <v-col v-for="image in result" :key="image.id" align-self="center" cols="12" lg="6" md="6" xl="4" class="column-box">
                    <LoadingSkeleton v-if="isLoading" />
                    <div v-else class="img-box">
                        <img width="100%" :src="image.urls.regular">
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
                            <div class="modal__footer"></div>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="result.length > 0" class="box-pagination">
                <v-col cols="6" style="margin: auto"> 
                    <v-pagination
                        v-model="params.page"
                        :length="totalPages"
                        @input="handlePaginationClick"
                    ></v-pagination>
                </v-col>
            </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    callApiImage,
} from '@/api/product'
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

export default Vue.extend ({
    name: 'SearchImage',
    components: { LoadingSkeleton },
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
            alerts: {
                isDisplay: false,
                text: '',
                type: '',
            }
        };
    },
    methods: {
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
               if (res.data.results.length > 0 ) {
                   this.result = res.data.results;
                   this.totalPages = res.data.total_pages;
                   this.handleAlert(`there have ${res.data.results.length} result`, 'success');
               } else {
                   this.result = [];
                   this.handleAlert('No result', 'error');
               }
            } catch (error) {
                this.isLoading = false;
                this.isSubmit = false;
                // console.log(error);
            }
        },

        handleAlert(text, type) {
            this.alerts = {
                isDisplay: true,
                text: text,
                type: type,
            }
            setTimeout(()=> {
                this.alerts = {
                    isDisplay: false,
                    text: text,
                    type: '',
                }   
            }, 1000);
        },

        handlePaginationClick() {
            this.isLoading = true;
            this.handleSearch();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    },
})
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
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

  .box-textfield {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      .form-wrapper.v-form{
          display: flex;
          justify-content: center;
          input {
              width: 500px;
              border: 1px solid rgb(56, 56, 56);
              border-radius: 5px;
              padding: 5px 20px;
              outline-color: dodgerblue;
          }
          .btn-search{
              margin-left: 10px;
          }
        }
  }
  .row-box {
      height: auto;
    .column-box{
      height: 100%;
       width: 100%;
       .img-box{
           overflow: hidden;
           border-radius: 10px;
           height: 350px;
           filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.2));
            img {
                border-radius: 10px;
                height: 100%;
                object-fit: cover;
                transition: ease 0.5s;
                &:hover{
                    transform: scale(1.1);
                    transition: ease 0.5s;
                    cursor: pointer;
                }
            }
       }
    }
  }
}
@media only screen and (max-width: 767px) {
    .container{
        .row-box{
            .img-box{
                height: auto !important;
            }
        }
        .box-pagination{
            // width: 310px;
            // margin: 0;
            // v-col{
            //     display: flex;
            //     justify-content: center;
            //     ul{
            //         width: 100%;
            //     }
            // }
        }
    } 
}
</style>

<style lang="scss" >
    .box-textfield {
        .form-wrapper > .v-text-field--outlined > .v-input__control > .v-input__slot {
            min-height: 36px !important;
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        }
    }
</style>