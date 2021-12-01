<template>
    <v-container>
            <v-row class="box-textfield">
                <v-col cols="12" lg="8" md="8" xl="8">
                    <v-text-field
                        label="Name of your Image"
                        outlined
                        v-model="params.query"
                    >
                        <template v-slot:append-outer>
                            <v-btn color="info" @click="handleSubmit">Search</v-btn>
                        </template>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row class="row-box">
                <v-col align-self="center" cols="12" lg="6" md="6" xl="4" class="column-box" v-for="image in result" :key="image.id">
                    <v-skeleton-loader
                        class="mx-auto"
                        max-width="300"
                        type="card"
                        v-if="isLoading"
                        ></v-skeleton-loader>
                    <div v-else class="img-box">
                        <img width="100%" :src="image.urls.regular">
                    </div>
                </v-col>
            </v-row>
            <v-row class="box-pagination" justify="center" v-if="result.length > 0">
                <v-col cols="12">
                    <v-container>
                        <v-pagination
                        v-model="params.page"
                        
                        :length="totalPages"
                        @input="handlePaginationClick"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {
    callApiImage,
} from '@/api/product'

export default Vue.extend ({
    name: 'SearchImage',
    data() {
        return {
            // textSearch: '' as string,
            params: {
                client_id: "UsYv4XxcylmAgm_jM6rG-pYup86hdTZ9ExSEiyKU1pg", //Access Key
                per_page: 20,
                query: '',
                page: 1,
            },
            totalPages: 0 as number,
            result: [] as any,
            currentPage: 1,
            isLoading: true as boolean,
        };
    },
    methods: {
        handleSubmit() {
            this.params.page = 1;
            this.isLoading = true;
            this.handleSearch();
        },
        async handleSearch() {
            try {
               let res = await callApiImage(this.params);
               this.result = res.data.results;
               this.totalPages = res.data.total_pages;
               setTimeout(() => {
                   this.isLoading = false;
               }, 700);
            } catch (error) {
                console.log(error);
            }
        },
        handlePaginationClick(){
            this.isLoading = true;
            this.handleSearch();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    },
})
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .box-textfield{
      display: flex;
      justify-content: center !important;
  }
  .row-box{
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
            width: 100%;
            margin: 0;
        }
    }
    
}
</style>