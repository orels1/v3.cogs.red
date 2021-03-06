<template lang="pug">
  .Navbar(ref="navbar")
    router-link.logo(to="/") Cogs.red
    .search
      input.search_input(
        type="text"
        placeholder="Search [ ctrl / cmd + shift + p ]"
        v-model.trim="search"
        @keyup="loadSearch"
        v-hotkey="focusShortcut"
        ref="searchField"
      )
    .links
      router-link.link(
        v-for="item in menu"
        :key="item.key"
        active-class="active"
        :to="item.to"
        :href="item.external ? item.to : undefined"
        :exact="item.key === 'cogs' && $route.path.startsWith('/cogs') ? false : true"
      ) {{ item.name }}
      a.link(
        target="_blank"
        href="https://discord.red"
      ) About Red
      a.link(
        target="_blank"
        href="https://discord.gg/red"
      ) Community
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  watch: {
    '$route.name': function watchRouteChange(newName, oldName) {
      if (newName === 'Search') {
        this.search = this.$route.params.search;
      }
      if (oldName === 'Search') {
        this.search = '';
      }
    },
  },
})
export default class Navbar extends Vue {
  menu = [
    { to: '/', key: 'cogs', name: 'Cogs' },
  ];

  search = '';
  prevSearch = '';
  prevPage = null;

  get focusShortcut() {
    return {
      'ctrl+shift+p': this.focusSearch,
      'meta+shift+p': this.focusSearch,
    };
  }

  focusSearch() {
    this.$refs.searchField.focus();
  }

  loadSearch() {
    // initial search field interaction
    if (!this.prevSearch.length && !this.search.length) {
      this.prevPage = this.$route.path;
      return;
    }

    this.prevSearch = this.search;

    // clearing the field
    if (this.search.length === 0) {
      this.$router.push(this.prevPage || '/');
      return;
    }

    // first time navigation
    if (this.search.length < 2) return;
    if (this.$route.name !== 'Search') {
      this.$router.push(`/search/${encodeURIComponent(this.search)}`);
      return;
    }

    // consecutive navigation without polluting the history
    this.$router.replace({ params: { search: encodeURIComponent(this.search) } });
  }

  created() {
    // for direct search page navigation
    if (this.$route.name === 'Search') {
      this.search = decodeURIComponent(this.$route.params.search);
      this.prevSearch = this.$route.params.search;
    }
  }
}
</script>

<style scoped>
.Navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 100px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  text-decoration: none;
  color: var(--grey);
}

.logo:hover {
  color: var(--red);
}

.search {
}

.search_input {
  border: none;
  line-height: 30px;
  margin-top: 10px;
  min-width: 300px;
  outline: none !important;
  padding: 0 10px;
}

.search_input:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.links {
  display: flex;
}

.link {
  line-height: 50px;
  padding: 0 20px;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--grey);
  transition: color 150ms ease;
}

.link:hover {
  color: var(--red);
}

.active {
  color: var(--red);
}

@media (max-width: 767px) {
  .Navbar {
    flex-direction: column;
  }

  .search {
    width: 100%;
    display: none;
  }

  .search_input {
    width: 100%;
    padding: 0 20px;
  }

  .links {
    flex-direction: column;
    display: none;
  }
}
</style>
