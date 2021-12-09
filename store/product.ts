import { ProductList } from 'identification';
import {
    callApiGetProduct,
    callApiGetProductID,
    callApiPostProduct,
    callApiPutProduct,
} from '../api/product'

interface collectionState {
  productList:  Array<ProductList>,
  productID: object,
}

export const state = (): collectionState => ({
    productList: [],
    productID: {},
})

export const getters = {
    getProductList: (state: collectionState) => state.productList,
    getProductID: (state: collectionState) => state.productID,
}

export const actions = {
// =============================Product =============================
    async getProducts({ commit }: any) {
        const response = await callApiGetProduct()
        commit('setProducts', response.data);
    },

    async getProductID({ commit }: any, id: any) {
        const response = await callApiGetProductID(id)
        commit('setProductID', response.data);
    },

    async postProducts( data = {}) {
        const response = await callApiPostProduct(data);
        return response;
    },

    async putProducts( data = {}) {
        const response = await callApiPutProduct(data);
        return response;
    },
}

export const mutations = {
    setProducts(state: collectionState, response: any) {
        state.productList = response;
    },
    setProductID(state: collectionState, response: any) {
        state.productID = response;
    },
}
