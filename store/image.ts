// import { ProductList } from 'identification';
interface collectionState {
  alert: {
    text: string,
    type: string,
    isDisplay: boolean,
  }
  infoImage: object,
  isDisplayPopup: boolean,
}

export const state = (): collectionState => ({
    alert: {
      text: '',
      type: undefined,
      isDisplay: false,
    },
    infoImage: {},
    isDisplayPopup: false,
})

export const getters = {
    getAlert: (state: collectionState) => state.alert,
    getInfoImage: (state: collectionState) => state.infoImage,
    getIsDisplayPopup: (state: collectionState) => state.isDisplayPopup,
}

export const actions = {
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
    showAlert(state: collectionState, data: any) {
      state.alert = {
        ...data,
        isDisplay: true,
      };
    },
    hiddenAlert (state: collectionState) {
      state.alert = {
        text: '',
        type:  undefined,
        isDisplay: false,
      }
    },
    showPopup (state: collectionState, data: any) {
      state.infoImage = data;
      state.isDisplayPopup = true;

    },
    hiddenPopup (state: collectionState) {
      state.isDisplayPopup = false;
    }

}
