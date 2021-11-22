import {
    callApiFetch,
    callApiAdd,
    callApiEdit,
    callApiDelete,
    callApiShow,
    callApiGetProduct,
    callApiGetProductID,
    callApiPostProduct,
    callApiPutProduct,
} from '../api/product'

const FETCH = 'fetch'
const SHOW = 'show'
const EDIT = 'edit'
const DELETE = 'delete'
const ADD = 'add'

export const state = () => ({
    users: [],
    user: {},
    productList: [],
    productID: {},
    test: 'string'
})

export const getters = {
    getProductList: (state) => state.productList,
    getProductID: (state) => state.productID,
    // getProductById: (state) => (id) => {
    //     let result = state.productList.find(product => Number(product.id) === Number(id))
    //     console.log(result);
    //     return result;
    // },
}

export const actions = {
    async getUsers({ commit }, data = {}) {
        let response = await callApiFetch(data)
        console.log(response.data);
        return commit('setProducts', response.data);
    },

    async addUser({ commit }, data = {}) {
        let response = await callApiAdd(data)
        return response;
    },
    async getUser({ commit }, data = {}) {
        let response = await callApiShow(data)
        
        return commit(SHOW, { user: response.data })
    },
    async editUser({ commit }, data) {
        let response = await callApiEdit(data.id, data)
        
        return commit(EDIT, { user: response.data })
    },
    async deleteUser({ commit }, data) {
        let response = await callApiDelete(data)
        return response;
    },

// =============================Product =============================
    async getProducts({ commit }) {
        let response = await callApiGetProduct()
        commit('setProducts', response.data);
    },

    async getProductID({ commit }, id) {
        let response = await callApiGetProductID(id)
        commit('setProductID', response.data);
    },

    async postProducts({ commit }, data = {}) {
        let response = await callApiPostProduct(data);
        return response;
    },

    async putProducts({ commit }, data = {}) {
        let response = await callApiPutProduct(data);
        return response;
    },

}

export const mutations = {
    [FETCH](state, { users }) {
        return state.users = users;
    },
    setProducts(state, response) {
        state.productList = response;
    },
    setProductID(state, response) {
        state.productID = response;
    },
    [SHOW](state, { user }) {
        return state.user = user;
    },
    [EDIT](state, { user }) {
        return state.user = user;
    },
}
