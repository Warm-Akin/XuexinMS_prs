import vue from 'vue';
import vuex from 'vuex';
vue.use(vuex);

const state = {
  menuIndex: ''
};

const mutations = {
  setMenuIndex: (state, data) => {
    state.menuIndex = data;
  }
};

const actions = {
  commitMenuIndex: ({ commit }, menuIndex) => {
    commit('setMenuIndex',menuIndex)
  }
};

export default new vuex.Store({
  state,
  mutations,
  actions
});
