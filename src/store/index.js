import Vue from 'vue';
import Vuex from 'vuex';
import sortBy from 'lodash/sortBy';
import c from '@/constants';

Vue.use(Vuex);

const LOAD_COGS = 'LOAD_COGS';
const LOAD_REPOS = 'LOAD_REPOS';
const LOAD_TAGS = 'LOAD_TAGS';

const store = new Vuex.Store({
  state: {
    cogs: [],
    repos: [],
    tags: [],
  },
  mutations: {
    [LOAD_COGS](state, payload) {
      state.cogs = payload.cogs;
    },
    [LOAD_REPOS](state, payload) {
      state.repos = payload.repos;
    },
    [LOAD_TAGS](state, payload) {
      state.tags = payload.tags;
    },
  },
  actions: {
    async fetchCogs({ commit }) {
      const resp = await fetch(c.COGS);
      const json = await resp.json();
      commit(LOAD_COGS, { cogs: sortBy(json.results.list, i => i.repo.type) });
    },
    async fetchRepos({ commit }) {
      const resp = await fetch(c.REPOS);
      const json = await resp.json();
      commit(LOAD_REPOS, { repos: sortBy(json.results.list, i => i.type) });
    },
    async fetchTags({ commit }) {
      const resp = await fetch(c.TAGS);
      const json = await resp.json();
      commit(LOAD_TAGS, { tags: sortBy(json.results.list, i => i.type) });
    },
  },
});

export default store;
