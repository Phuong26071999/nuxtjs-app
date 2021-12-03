import { ProductList } from 'identification';
import {
    callApiGetProduct,
    callApiGetProductID,
    callApiPostProduct,
    callApiPutProduct,
} from '../api/product'

export const state = () => ({
    productList: [] as Array<ProductList>,
    productID: {},
    alert: {
      text: '' as string,
      type: undefined as string,
      isDisplay: false as boolean,
    },
    infoImage: {},
    isDisplayPopup: false as boolean,
})

export const getters = {
    getProductList: (state: any) => state.productList,
    getProductID: (state: any) => state.productID,
    getAlert: (state: any) => state.alert,
    getInfoImage: (state: any) => state.infoImage,
    getIsDisplayPopup: (state: any) => state.isDisplayPopup,
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

    handleDisplayAlert({ commit }: any, data: any) {
        commit('showAlert', data);
        setTimeout(() => {
          commit('hiddenAlert');
        }, 1000);
    },

    handleDisplayPopup ({ commit }: any, data: any) {
      commit('showPopup', data);
    },

    handleHiddenPopup ({ commit }: any) {
      commit('hiddenPopup');
    }
}

export const mutations = {
    setProducts(state: any, response: any) {
        state.productList = response;
    },
    setProductID(state: any, response: any) {
        state.productID = response;
    },
    showAlert(state: any, data: any) {
      state.alert = {
        ...data,
        isDisplay: true,
      };
    },
    hiddenAlert (state: any) {
      state.alert = {
        text: '',
        type:  undefined,
        isDisplay: false,
      }
    },
    showPopup (state: any, data: any) {
      state.infoImage = data;
      state.isDisplayPopup = true;

    },
    hiddenPopup (state: any) {
      state.isDisplayPopup = false;
    }

}
