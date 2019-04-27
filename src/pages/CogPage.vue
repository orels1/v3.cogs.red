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
        VueMarkdown(:class="[$style.text, $style.readme]" :source="cog.readme")
      CogTitle Source
      p(:class="$style.text").
        If you're interested in how this cog works, you can #[a(:href='githubLink' target="_blank") look at the source].
      CogTitle(id="report") Report cog
      p(:class="$style.text")
        |If you think this cog abuses discord api, performs malicious actions or breaks a license, 
        span(@click="showReportModal" :class="$style.interactive") please report it to our QA team by clicking here.
      transition(name="fade")
        div(:class="$style.report_block" v-if="reportModal")
          p(:class="$style.text") Please select the report type
          div(:class="$style.report_types")
            div(
              v-for="reportType in reportTypes"
              :class="[$style.report_type, reportType.value === selectedType && $style.active]"
              :key="reportType.value"
              @click="selectType(reportType.value)"
            ) {{reportType.label}}
          transition(name="fade")
            textarea(:class="$style.report_comment" v-model="reportComment" v-if="selectedType" placeholder="Add a comment to help QA team identify the issue")
          transition(name="fade")
            div(:class="$style.report_buttons" v-if="selectedType")
              div(:class="$style.report_confirm" @click="report")
                FontAwesomeIcon(
                  :class="$style.confirm_icon"
                  :icon="checkIcon"
                )
                div(:class="$style.confirm_text") Confirm
              div(:class="[$style.report_confirm, $style.report_cancel]" @click="reportCancel")
                FontAwesomeIcon(
                  :class="[$style.confirm_icon, $style.cancel_icon]"
                  :icon="cancelIcon"
                )
                div(:class="$style.confirm_text") Cancel
      transition(name="fade")
        p(:class="$style.text" v-if="reportResult") {{reportResult}}

</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import find from 'lodash/find';
import VueMarkdown from 'vue-markdown';
import Loader from '@/components/Loader';
import Infobar from '@/components/Infobar';
import Title from '@/components/Title';
import Databar from '@/components/Databar';
import CodeBlock from '@/components/CodeBlock';
import c from '@/constants';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faCheck from '@fortawesome/fontawesome-pro-light/faCheck';
import faTimes from '@fortawesome/fontawesome-pro-light/faTimes';

@Component({
  components: {
    Infobar,
    CogTitle: Title,
    Databar,
    CodeBlock,
    VueMarkdown,
    Loader,
    FontAwesomeIcon,
  },
  computed: mapState(['cogs', 'settings']),
})
export default class CogPage extends Vue {
  checkIcon = faCheck;
  cancelIcon = faTimes;
  loaded = false;
  error = null;
  cog = {
    tags: {},
  };
  reportTypes = [
    { label: 'Api abuse', value: 'api_abuse' },
    { label: 'Malware', value: 'malware' },
    { label: 'License infringement', value: 'license' },
  ]
  reportModal = false;
  selectedType = null;
  reportResult = null;
  reportComment = '';

  get githubLink() {
    return `https://github.com/${this.$route.params.user}/${this.$route.params.repo}/tree/${this.$route.params.branch}/${this.$route.params.cog}`;
  }

  get repoAddLine() {
    return `[p]cog repo add ${this.$route.params.repo} https://github.com/${
      this.$route.params.user
      }/${this.$route.params.repo}`;
  }

  get cogAddLine() {
    return `[p]cog install ${this.$route.params.repo} ${this.$route.params.cog}`;
  }

  showReportModal() {
    this.reportModal = true;
  }

  async report() {
    const params = this.$route.params;
    const resp = await fetch(`${c.COGS}/${params.user}/${params.repo}/${params.cog}/${params.branch}/report`, {
      method: 'POST',
      body: JSON.stringify({
        type: this.selectedType,
        comment: this.reportComment,
      }),
    });
    this.reportModal = false;
    this.selectedType = null;
    this.reportComment = '';
    if (resp.status === 200) {
      this.reportResult = 'Thank you for the feedback!';
    } else {
      const json = await resp.json();
      this.reportResult = json.error;
    }

    setTimeout(() => {
      this.reportResult = null;
    }, 2000);
  }

  selectType(type) {
    this.selectedType = type;
  }

  reportCancel() {
    this.reportModal = false;
    this.selectedType = null;
  }

  async created() {
    const params = this.$route.params;
    const unapprovedQuery = this.settings.unapproved ? '?showUnapproved=true' : '';
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
      const resp = await fetch(`${c.COGS}/${params.user}/${params.repo}/${params.branch}/${params.cog}${unapprovedQuery}`);
      const json = await resp.json();
      this.cog = json;
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
$green: #25a85c
$mobile: 767px

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

.readme
  padding: 1px 15px 1px 15px
  background-color: hsl(0, 0%, 95%)

.interactive
  color: $lred
  cursor: pointer

.report_types
  display: flex
  flex-wrap: wrap
  @media (max-width: $mobile)
    flex-direction: column

.report_type
  padding: 10px 15px
  border: 1px solid $lred
  color: $lred
  transition: all 300ms ease
  cursor: pointer
  margin-right: 20px
  width: 200px
  box-sizing: border-box
  margin-bottom: 20px
  position: relative
  @media (max-width: $mobile)
    width: 100%

  &.active
    background-color: $lred
    color: $white

  &:hover
    background-color: $lred
    color: $white

.report_comment
  padding: 10px 15px
  border: 1px solid hsl(0, 0%, 80%)
  width: 100%
  box-sizing: border-box
  margin: 0 0 20px 0
  transition: border-color 300ms ease

  &:focus
    border-color: $lred
    outline: none


.report_buttons
  display: flex;
  flex-wrap: wrap
  @media (max-width: $mobile)
    flex-direction: column

.report_confirm
  border: 1px solid $lred
  width: 200px
  box-sizing: border-box
  cursor: pointer
  display: flex
  transition: all 300ms ease
  margin-right: 20px
  @media (max-width: $mobile)
    width: 100%
    margin-right: 0
    margin-bottom: 20px

  &.report_cancel
    border-color: hsl(0, 0%, 20%)
    margin-right: 0

  &:hover
    
    .confirm_text
      background: $lred
      color: $white

    &.report_cancel
      .confirm_text
        background: hsl(0, 0%, 20%)        

.confirm_icon
  padding: 10px 15px
  color: $white
  background: $lred
  height: 19px
  width: 0.875em !important

  &.cancel_icon
    background: hsl(0, 0%, 20%)

.confirm_text
  padding: 10px 15px 10px 15px
  width: 100%
  box-sizing: border-box
  transition: all 300ms ease
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>

