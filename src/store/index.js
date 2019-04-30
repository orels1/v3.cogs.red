/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import sortBy from 'lodash/sortBy';
import shuffle from 'lodash/shuffle';
import c from '@/constants';

Vue.use(Vuex);

const formattedUrl = (url, state) => {
  let newUrl = url;
  if (!state.settings) {
    return newUrl;
  }
  newUrl += '?';
  if (state.settings.unapproved) {
    newUrl += 'showUnapproved=true&';
  }
  if (state.settings.hidden) {
    newUrl += 'showHidden=true&';
  }
  return newUrl;
};

const LOAD_COGS = 'LOAD_COGS';
const LOAD_REPOS = 'LOAD_REPOS';
const LOAD_TAGS = 'LOAD_TAGS';
const SHUFFLE_COGS = 'SHUFFLE_COGS';
const TOGGLE_UNAPPROVED = 'TOGGLE_UNAPPROVED';

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['settings'],
    }),
  ],
  state: {
    settings: {},
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
      state.tags = payload.tags || [];
    },
    [SHUFFLE_COGS](state, payload) {
      state.cogs = payload.cogs;
    },
    [TOGGLE_UNAPPROVED](state, payload) {
      state.settings.unapproved = payload;
    },
  },
  actions: {
    async fetchCogs({ commit, state }) {
      try {
        const resp = await fetch(formattedUrl(c.COGS, state));
        const json = await resp.json();
        commit(LOAD_COGS, { cogs: shuffle(json.results) });
      } catch (e) {
        console.log(e);
        commit(LOAD_COGS, { cogs: [] });
      }
    },
    async fetchRepos({ commit, state }) {
      try {
        const resp = await fetch(formattedUrl(c.REPOS, state));
        const json = await resp.json();
        commit(LOAD_REPOS, { repos: sortBy(json.results, i => i.type) });
      } catch (e) {
        console.log(e);
        commit(LOAD_REPOS, { repos: [] });
      }
    },
    async fetchTags({ commit }) {
      try {
        const resp = await fetch(c.TAGS);
        const json = await resp.json();
        commit(LOAD_TAGS, { tags: json.results });
      } catch (e) {
        console.log(e);
        commit(LOAD_TAGS, { tags: [] });
      }
    },
    shuffleCogs({ commit }, cogs) {
      commit(SHUFFLE_COGS, { cogs: shuffle(cogs) });
    },
    switchUnapproved({ commit }, value) {
      commit(TOGGLE_UNAPPROVED, value);
    },
  },
});

export default store;
