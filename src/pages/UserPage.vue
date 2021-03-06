<template lang="pug">
  .UserPage
    Databar(:source="user" type="user")
    Loader(v-if="!loaded")
    .UserPage_inner( v-if="loaded")
      CogTitle Repos
      .list(v-if="loaded")
        Cog(v-for="repo in userRepos" :key="repo.name" :cog="repo")
      CogTitle Cogs
      .list(v-if="loaded")
        Cog(v-for="cog in userCogs" :key="cog.name" :cog="cog")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import filter from 'lodash/filter';
import Loader from '@/components/Loader';
import Title from '@/components/Title';
import Databar from '@/components/Databar';
import Cog from '@/components/Cog';

@Component({
  components: {
    CogTitle: Title,
    Databar,
    Cog,
    Loader,
  },
  computed: mapState(['cogs', 'repos']),
  methods: {
    ...mapActions(['fetchCogs', 'fetchRepos']),
  },
})
export default class UserPage extends Vue {
  loaded = false;
  error = null;
  userCogs = [];
  userRepos = [];

  get user() {
    return {
      name: this.$route.params.user,
    };
  }

  async created() {
    const { params } = this.$route;

    try {
      if (this.cogs.length === 0) {
        await this.fetchCogs();
      }
      if (this.repos.length === 0) {
        await this.fetchRepos();
      }
    } catch (e) {
      this.error = e;
    }

    // Filter loaded cogs if any
    if (this.cogs.length > 0) {
      const cogs = filter(this.cogs, i => i.author.username === params.user);
      if (cogs.length > 0) {
        this.userCogs = cogs;
      }
    }

    // Filter loaded repos if any
    if (this.repos.length > 0) {
      const repos = filter(this.repos, i => i.author.username === params.user);
      if (repos.length > 0) {
        this.userRepos = repos;
      }
    }

    if (this.userCogs.length && this.userRepos.length) {
      this.loaded = true;
    }
  }
}
</script>

<style scoped>
.UserPage {
  width: 100%;
  color: #000;
}

.UserPage_inner {
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
}

.text {
  color: var(--lblack);
}

.text a {
  color: var(--lred);
  text-decoration: underline;
  text-decoration-color: rgba(213, 65, 62, 0);
  transition: text-decoration-color 150ms ease;
}

.text a:hover {
  text-decoration-color: rgba(213, 65, 62, 0.8);
}

.list {
  display: grid;
  grid-template: 130px / repeat(3, 1fr);
  grid-gap: 10px 20px;
}

@media (max-width: 440px) {
  .list {
    grid-template: 130px / repeat(1, 1fr);
  }
}

@media (max-width: 767px) {
  .list {
    grid-template: 130px / repeat(2, 1fr);
  }
}
</style>
