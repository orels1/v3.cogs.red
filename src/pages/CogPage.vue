<template lang="pug">
  .CogPage
    Databar(:source="cog" type="cog")
    Loader(v-if="!loaded")
    .CogPage_inner(v-if="loaded")
      Infobar(
        v-if="cog.repo && cog.repo.type === 'unapproved'"
        level="danger"
        title="Use at your own risk!"
      ).
        This is a cog from an unapproved repo, 
        it was not checked by members of either Red-DiscordBot or Cogs-Support staff 
        and it can contain anything.
      CogTitle Description
      VueMarkdown.text(:source="cog.description")
      CogTitle Installation
      p.text.
        Replace [p] with your bot's prefix and use these commands
      CodeBlock(:code="repoAddLine")
      br
      CodeBlock(:code="cogAddLine")
      div(v-if="cog.readme")
        CogTitle Readme
        VueMarkdown.text.readme(:class="[$style.text, $style.readme]" :source="cog.readme")
      CogTitle Source
      p.text.
        If you're interested in how this cog works, you can #[a(:href='githubLink' target="_blank") look at the source].
      CogTitle(id="report") Report cog
      p.text
        |If you think this cog abuses discord api, performs malicious actions or breaks a license, 
        span.interactive(@click="showReportModal" ) please report it to our QA team by clicking here.
      transition(name="fade")
        .report_block(v-if="reportModal")
          p.text Please select the report type
          .report_types
            .report_type(
              v-for="reportType in reportTypes"
              :class="reportType.value === selectedType && 'active'"
              :key="reportType.value"
              @click="selectType(reportType.value)"
            ) {{reportType.label}}
          transition(name="fade")
            textarea.report_comment(v-model="reportComment" v-if="selectedType" placeholder="Add a comment to help QA team identify the issue")
          transition(name="fade")
            .report_buttons(v-if="selectedType")
              .report_confirm(@click="report")
                FontAwesomeIcon.confirm_icon(
                  :icon="checkIcon"
                )
                .confirm_text Confirm
              .report_confirm.report_cancel(:class="[$style.report_confirm, $style.report_cancel]" @click="reportCancel")
                FontAwesomeIcon.confirm_icon.cancel_icon(
                  :class="[$style.confirm_icon, $style.cancel_icon]"
                  :icon="cancelIcon"
                )
                .confirm_text Cancel
      transition(name="fade")
        p.text(v-if="reportResult") {{reportResult}}

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

<style scoped>
.CogPage {
  color: #000;
  width: 100%;
}

.CogPage_inner {
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

.readme {
  padding: 1px 15px 1px 15px;
  background-color: hsl(0, 0%, 95%);
}

.interactivecolor: var(--lred);
cursor: pointer;

.report_types {
  display: flex;
  flex-wrap: wrap;
}

.report_type {
  padding: 10px 15px;
  border: 1px solid var(--lred);
  color: var(--lred);
  transition: all 300ms ease;
  cursor: pointer;
  margin-right: 20px;
  width: 200px;
  box-sizing: border-box;
  margin-bottom: 20px;
  position: relative;
}

.report_type.active {
  background-color: var(--lred);
  color: var(--white);
}

.report_type:hover {
  background-color: var(--lred);
  color: var(--white);
}

.report_comment {
  padding: 10px 15px;
  border: 1px solid hsl(0, 0%, 80%);
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 20px 0;
  transition: border-color 300ms ease;
}

.report_comment:focus {
  border-color: var(--lred);
  outline: none;
}

.report_buttons {
  display: flex;
  flex-wrap: wrap;
}

.report_confirm {
  border: 1px solid var(--lred);
  width: 200px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  transition: all 300ms ease;
  margin-right: 20px;
}

.report_confirm.report_cancel {
  border-color: hsl(0, 0%, 20%);
  margin-right: 0;
}

.report_confirm:hover .confirm_text {
  background: var(--lred);
  color: var(--white);
}

.report_confirm.report_cancel:hover .confirm_text {
  background: hsl(0, 0%, 20%);
}

.confirm_icon {
  padding: 10px 15px;
  color: var(--white);
  background: var(--lred);
  height: 19px;
  width: 0.875em !important;
}

.confirm_icon.cancel_icon {
  background: hsl(0, 0%, 20%);
}

.confirm_text {
  padding: 10px 15px 10px 15px;
  width: 100%;
  box-sizing: border-box;
  transition: all 300ms ease;
}

@media (max-width: var(--mobile)) {
  .report_types {
    flex-direction: column;
  }

  .report_type {
    width: 100%;
  }

  .report_buttons {
    flex-direction: column;
  }

  .report_confirm {
    width: 100%;
    margin-right: 0;
    margin-bottom: 20px;
  }
}

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

