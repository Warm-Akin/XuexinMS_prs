import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

const state = {
  menuIndex: '',
  companyMenuIndex: '',
  informationMenuIndex: ''
};

const mutations = {
  setMenuIndex: (state, data) => {
    state.menuIndex = data;
  },
  setCompanyMenuIndex: (state, data) => {
    state.companyMenuIndex = data;
  },
  setInformationMenuIndex: (state, data) => {
    state.informationMenuIndex = data;
  }
};

const actions = {
  commitMenuIndex: ({ commit }, menuIndex) => {
    commit('setMenuIndex',menuIndex)
  },
  commitCompanyMenuIndex: ({ commit }, companyMenuIndex) => {
    commit('setCompanyMenuIndex',companyMenuIndex)
  },
  commitInformationMenuIndex: ({ commit }, informationMenuIndex) => {
    commit('setInformationMenuIndex',informationMenuIndex)
  }
};

export default new vuex.Store({
  state,
  mutations,
  actions
});
