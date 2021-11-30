import {
    callApiGetProduct,
    callApiGetProductID,
    callApiPostProduct,
    callApiPutProduct,
} from '../api/product'
import { ProductList } from 'identification';

// const FETCH = 'fetch'
// const SHOW = 'show'
// const EDIT = 'edit'
// const DELETE = 'delete'
// const ADD = 'add'

export const state = () => ({
    productList: [] as Array<ProductList>,
    productID: {},
})

export const getters = {
    getProductList: (state: any) => state.productList,
    getProductID: (state: any) => state.productID,
    // getProductById: (state) => (id) => {
    //     let result = state.productList.find(product => Number(product.id) === Number(id))
    //     console.log(result);
    //     return result;
    // },
}

export const actions = {
    // async getUsers({ commit }, data = {}) {
    //     let response = await callApiFetch(data)
    //     console.log(response.data);
    //     return commit('setProducts', response.data);
    // },

// =============================Product =============================
    async getProducts({ commit }: any) {
        let response = await callApiGetProduct()
        commit('setProducts', response.data);
    },

    async getProductID({ commit }: any, id: any) {
        let response = await callApiGetProductID(id)
        commit('setProductID', response.data);
    },

    async postProducts({ commit }: any, data = {}) {
        let response = await callApiPostProduct(data);
        return response;
    },

    async putProducts({ commit }: any, data = {}) {
        let response = await callApiPutProduct(data);
        return response;
    },

}

export const mutations = {
    // [FETCH](state, { users }) {
    //     return state.users = users;
    // },
    setProducts(state: any, response: any) {
        state.productList = response;
    },
    setProductID(state: any, response: any) {
        state.productID = response;
    },
}
