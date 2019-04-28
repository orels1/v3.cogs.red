<template lang="pug">
  .RepoPage
    Databar(:source="repo" type="repo")
    Loader(v-if="!loaded")
    .RepoPage_inner(v-if="loaded")
      Infobar(
        v-if="repo.type === 'unapproved'"
        level="danger"
        title="Use at your own risk!"
      ).
        This is a cog from an unapproved repo, 
        it was not checked by members of either Red-DiscordBot or Cogs-Support staff 
        and it can contain anything.
      CogTitle Description
      VueMarkdown.text(:source="repo.description")
      CogTitle Installation
      p.text.
        Replace [p] with your bot's prefix and use these commands
      CodeBlock(:code="repoAddLine")
      div(v-if="repo.readme")
        CogTitle Readme
        VueMarkdown.text.readme(:source="repo.readme")
      CogTitle Source
      p.text(v-if="loaded").
        If you're interested in this repo's contents, you can #[a(:href='githubLink' target="_blank") look at the source].
      CogTitle Cogs
      div.list(v-if="loaded")
        Cog(v-for="cog in repoCogs" :key="cog.name" :cog="cog")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import filter from 'lodash/filter';

import Loader from '@/components/Loader';
import Infobar from '@/components/Infobar';
import Title from '@/components/Title';
import Databar from '@/components/Databar';
import CodeBlock from '@/components/CodeBlock';
import VueMarkdown from 'vue-markdown';
import Cog from '@/components/Cog';
import c from '@/constants';

@Component({
  components: {
    Infobar,
    CogTitle: Title,
    Databar,
    CodeBlock,
    VueMarkdown,
    Cog,
    Loader,
  },
  computed: mapState(['cogs', 'settings']),
})
export default class RepoPage extends Vue {
  loaded = false;
  error = null;
  repoCogs = [];
  repo = {
    tags: [],
  };

  get githubLink() {
    return `https://github.com/${this.$route.params.user}/${this.$route.params.repo}`;
  }

  get repoAddLine() {
    return `[p] cog repo add ${this.$route.params.repo} https://github.com/${
      this.$route.params.user
      }/${this.$route.params.repo}`;
  }

  async created() {
    const params = this.$route.params;
    const unapprovedQuery = this.settings.unapproved ? '?showUnapproved=true' : '';

    // Load repo data
    try {
      const resp = await fetch(`${c.REPOS}/${params.user}/${params.repo}/${params.branch}${unapprovedQuery}`);
      const json = await resp.json();
      this.repo = json;
    } catch (e) {
      this.error = e;
    }

    // Filter loaded cogs if any
    if (this.cogs.length > 0) {
      const cogs = filter(
        this.cogs,
        i => i.author.username === params.user && i.repo.name === params.repo,
      );
      if (cogs.length > 0) {
        this.repoCogs = cogs;
        this.loaded = true;
        return;
      }
    }

    try {
      // If no cogs are loaded yet - get them
      const resp = await fetch(`${c.COGS}/${params.user}/${params.repo}/${params.branch}${unapprovedQuery}`);
      const json = await resp.json();
      this.repoCogs = json.results;
      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style scoped>
.RepoPage {
  color: var(--black);
  width: 100%;
}

.RepoPage_inner {
  max-width: 1000px;
  padding: 0 20px;
  margin: 0 auto;
}

.text {
  color: var(--darkish);
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

.list {
  display: grid;
  grid-template: 130px / repeat(3, 1fr);
  grid-gap: 10px 20px;
}

.loader {
  font-size: 5em;
  margin: 10px auto;
  display: block;
}

.readme {
  padding: 1px 15px 1px 15px;
  background-color: hsl(0, 0%, 95%);
}

@media (max-width: var(--tiny)) {
  .list {
    grid-template: 130px / repeat(1, 1fr);
  }
}

@media (max-width: var(--mobile)) {
  .list {
    grid-template: 130px / repeat(2, 1fr);
  }
}
</style>

