import Vue from 'vue';
import Vuex from 'vuex';
import sortBy from 'lodash/sortBy';
import c from '@/constants';

Vue.use(Vuex);

const LOAD_COGS = 'LOAD_COGS';

const store = new Vuex.Store({
  state: {
    cogs: [],
  },
  mutations: {
    [LOAD_COGS](state, payload) {
      state.cogs = payload.cogs;
    },
  },
  actions: {
    async fetchCogs({ commit }) {
      const resp = await fetch(c.COGS);
      const json = await resp.json();
      commit(LOAD_COGS, { cogs: sortBy(json.results.list, i => i.repo.type) });
    },
  },
});

export default store;
