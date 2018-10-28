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

      CogTitle Related Cogs
      div(:class="$style.list" v-if="loaded")
        Cog(v-for="cog in relatedCogs" :key="cog._id" :cog="cog")

</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import { find, uniqBy } from 'lodash';
import Loader from '@/components/Loader';
import Infobar from '@/components/Infobar';
import Title from '@/components/Title';
import Databar from '@/components/Databar';
import CodeBlock from '@/components/CodeBlock';
import Cog from '@/components/Cog';
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
    Cog,
  },
  methods: {
    ...mapActions(['fetchCogs', 'shuffleCogs']),
  },
  computed: mapState(['cogs']),
})
export default class CogPage extends Vue {
  loaded = false;
  error = null;
  cog = {
    tags: {},
  };
  relatedCogs = [];

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

      // finding related cogs based on tags
      const relres = this.cog.tags.map(async (tag) => {
        const searchResp = await fetch(`${c.SEARCH}/${tag}`);
        const searchJson = await searchResp.json();
        return searchJson.results.list;
      });
      this.relatedCogs = await Promise.all(relres).then((completed) => {
        let merged = [];
        completed.map((arr) => {
          merged = merged.concat(arr);
        });
        return merged;
      });
      this.relatedCogs = uniqBy(this.relatedCogs, "_id").slice(0, 3);

      if (this.relatedCogs.length < 3) {
        if (this.cogs.length === 0) {
          await this.fetchCogs();
        }
        this.relatedCogs = this.relatedCogs.concat(this.cogs.slice(0, 3 - this.relatedCogs.length));
      }

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

.list
  display: grid
  grid-template: 130px / repeat(3, 1fr)
  @media (max-width: $mobile)
    grid-template: 130px / repeat(2, 1fr)
  @media (max-width: $tiny)
    grid-template: 130px / repeat(1, 1fr)
  grid-gap: 10px 20px

</style>

