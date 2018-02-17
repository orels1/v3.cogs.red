<template lang="pug">
  div(:class="$style.RepoPage")
    Databar(:source="repo" type="repo")
    Loader(v-if="!loaded")
    div(:class="$style.RepoPage_inner" v-if="loaded")
      Infobar(
        v-if="repo.type === 'unapproved'"
        level="danger"
        title="Use at your own risk!"
      ).
        This is a cog from an unapproved repo, 
        it was not checked by members of either Red-DiscordBot or Cogs-Support staff 
        and it can contain anything.
      CogTitle Description
      VueMarkdown(:class="$style.text" :source="repo.description")
      CogTitle Installation
      p(:class="$style.text").
        Replace [p] with your bot's prefix and use these commands
      CodeBlock(:code="repoAddLine")
      div(v-if="repo.readme")
        CogTitle Readme
        p(:class="$style.text") {{cog.readme}}
      CogTitle Source
      p(:class="$style.text" v-if="loaded").
        If you're interested in this repo's contents, you can #[a(:href='repo.links.github.self' target="_blank") look at the source].
      CogTitle Cogs
      div(:class="$style.list" v-if="loaded")
        Cog(v-for="cog in repoCogs" :key="cog.name" :cog="cog")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import filter from 'lodash/filter';

import Loader from '@/components/singles/Loader';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Databar from '@/components/singles/Databar';
import CodeBlock from '@/components/singles/CodeBlock';
import VueMarkdown from 'vue-markdown';
import Cog from '@/components/singles/Cog';
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
  computed: mapState(['cogs']),
})
export default class RepoPage extends Vue {
  loaded = false;
  error = null;
  repoCogs = [];
  repo = {
    tags: [],
  };

  get repoAddLine() {
    return `[p] cog repo add ${this.$route.params.repo} https://github.com/${this.$route.params.user}/${this.$route.params.repo}`;
  }

  async created() {
    const params = this.$route.params;

    // Load repo data
    try {
      const resp = await fetch(`${c.REPOS}/${params.user}/${params.repo}`);
      const json = await resp.json();
      this.repo = json.results;
    } catch (e) {
      this.error = e;
    }

    // Filter loaded cogs if any
    if (this.cogs.length > 0) {
      const cogs = filter(
        this.cogs,
        i =>
          i.author.username === params.user &&
          i.repo.name === params.repo,
      );
      if (cogs.length > 0) {
        this.repoCogs = cogs;
        this.loaded = true;
        return;
      }
    }

    try {
      // If no cogs are loaded yet - get them
      const resp = await fetch(`${c.COGS}/${params.user}/${params.repo}`);
      const json = await resp.json();
      this.repoCogs = json.results.list;
      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style lang="sass" module>
$mobile: 767px
$tiny: 440px
$darkish: rgba(#000, .7)
$white: #fcfcfc
$lred: #D5413E

.RepoPage
  color: #000

.RepoPage_inner
  max-width: 1000px
  padding: 0 20px
  margin: 0 auto

.text
  color: $darkish

  a
    color: $lred
    text-decoration: underline
    text-decoration-color: rgba($lred, 0)
    transition: text-decoration-color 150ms ease

    &:hover
      text-decoration-color: rgba($lred, .8)

.list
  display: grid
  grid-template: 130px / repeat(3, 1fr)
  @media (max-width: $mobile)
    grid-template: 130px / repeat(2, 1fr)
  @media (max-width: $tiny)
    grid-template: 130px / repeat(1, 1fr)
  grid-gap: 10px 20px

.loader
  font-size: 5em
  margin: 10px auto
  display: block
</style>

