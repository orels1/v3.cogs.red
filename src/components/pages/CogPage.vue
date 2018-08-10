<template lang="pug">
  div(:class="$style.CogPage")
    Databar(:source="cog" type="cog")
    Loader(v-if="!loaded")
    div(:class="$style.CogPage_inner" v-if="loaded")
      Infobar(
        v-if="cog.repo && cog.repo.type === 'unapproved'"
        level="danger"
        title="Use at your own risk!"
      ).
        This is a cog from an unapproved repo, 
        it was not checked by members of either Red-DiscordBot or Cogs-Support staff 
        and it can contain anything.
      CogTitle Description
      VueMarkdown(:class="$style.text" :source="cog.description")
      CogTitle Installation
      p(:class="$style.text").
        Replace [p] with your bot's prefix and use these commands
      CodeBlock(:code="repoAddLine")
      br
      CodeBlock(:code="cogAddLine")
      div(v-if="cog.readme")
        CogTitle Readme
        p(:class="$style.text") {{cog.readme}}
      CogTitle Source
      p(:class="$style.text").
        If you're interested in how this cog works, you can #[a(:href='cog.links.github.self' target="_blank") look at the source].
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import find from 'lodash/find';
import Loader from '@/components/singles/Loader';
import Infobar from '@/components/singles/Infobar';
import Title from '@/components/singles/Title';
import Databar from '@/components/singles/Databar';
import CodeBlock from '@/components/singles/CodeBlock';
import VueMarkdown from 'vue-markdown';
import c from '@/constants';

@Component({
  components: {
    Infobar,
    CogTitle: Title,
    Databar,
    CodeBlock,
    VueMarkdown,
    Loader,
  },
  computed: mapState(['cogs']),
})
export default class CogPage extends Vue {
  loaded = false;
  error = null;
  cog = {
    tags: {},
  };

  get repoAddLine() {
    return `[p]cog repo add ${this.$route.params.repo} https://github.com/${
      this.$route.params.user
    }/${this.$route.params.repo}`;
  }

  get cogAddLine() {
    return `[p]cog install ${this.$route.params.repo} ${this.$route.params.cog}`;
  }

  async created() {
    const params = this.$route.params;
    try {
      if (this.cogs.length > 0) {
        const cog = find(
          this.cogs,
          i =>
            i.name === params.cog &&
            i.author.username === params.user &&
            i.repo.name === params.repo,
        );
        if (cog) {
          this.cog = cog;
          this.loaded = true;
          return;
        }
      }
      const resp = await fetch(`${c.COGS}/${params.user}/${params.repo}/${params.cog}`);
      const json = await resp.json();
      this.cog = json.results;
      this.loaded = true;
    } catch (e) {
      this.error = e;
    }
  }
}
</script>

<style lang="sass" module>
$darkish: rgba(#000, .7)
$white: #fcfcfc
$lred: #D5413E

.CogPage
  color: #000
  width: 100%;

.CogPage_inner
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
</style>

