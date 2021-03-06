<template lang="pug">
  .Databar
    .Databar_inner
      .header
        .breadcrumbs
          .crumb(
            v-for="(path, index) in $route.path.split('/').slice(1, crumbsDepth[type])"
            :key="path"
          )
            router-link.crumb_link(
              :to="'/' + $route.path.split('/').slice(1, index + (index > 1 ? 3 : 2)).join('/')"
            ) {{path}}
            .separator
              font-awesome-icon(
                v-show="index !== (crumbsDepth[type] - 2)"
                :icon="['fal', 'angle-right']"
              )
        Badge.type(
          v-if="type !== 'user' && (source.repo || source.type)"
          :type="type === 'cog' ? source.repo.type : source.type"
        )
      .infoblock
        .title
          |{{source.name}}
          |{{' '}}
          small(v-if="source.version || source.botVersion")
            |[v{{source.version || source.botVersion[0]}}]
        .tags(v-if="type !== 'user' && source.tags.length > 0")
          .report(@click="scrollToReport")
            .report_text(:class="reportVisible && 'shown'") {{reportText}}
            font-awesome-icon.tags_icon.report_icon(
              v-if="type === 'cog'"
              :icon="['fal', 'comment-alt-exclamation']"
              @mouseenter="reportVisible = true"
              @mouseleave="reportVisible = false"
            )
          font-awesome-icon.tags_icon(:icon="['fal', 'tags']")
          .tag(v-for="tag in source.tags.slice(0, 3)" :key="tag")
            router-link.tag_link(:to="'/search/' + tag") {{tag}}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Badge from '@/components/Badge';

@Component({
  components: {
    Badge,
  },
  props: {
    source: Object,
    type: String,
    onReportClick: Function,
  },
})
export default class Databar extends Vue {
  reportVisible = false;
  reportClicked = false;

  crumbsDepth = {
    cog: 4,
    repo: 3,
    user: 2,
  }

  get renderTags() {
    return this.type !== 'user' && this.source.tags.length > 0;
  }

  get reportText() {
    return this.reportClicked ? 'see below' : 'report cog';
  }

  /* eslint-disable class-methods-use-this */
  scrollToReport() {
    this.reportClicked = true;
    const reportBlock = document.querySelector('#report');
    if (reportBlock) {
      window.scrollTo({
        top: reportBlock.offsetTop,
        behavior: 'smooth',
      });
    }
    if (this.onReportClick) {
      this.onReportClick();
    }
    setTimeout(() => {
      this.reportClicked = false;
    }, 2000);
  }
  /* eslint-enable class-methods-use-this */
}
</script>

<style scoped>
.Databar {
  background: var(--blueish);
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 110px;
}

.Databar_inner {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template: 30px 70px / 1fr;
  grid-gap: 10px 20px;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
}

.crumb {
  color: var(--dwhite);
  display: flex;
}

.separator {
  font-size: 10px;
  line-height: 30px;
  margin: 0 5px;
}

.crumb_link {
  font-size: 20px;
  line-height: 30px;
  color: var(--dwite);
  text-transform: uppercase;
  text-decoration: none;
  transition: color 150ms ease;
}

.crumb_link:hover {
  color: rgba(255, 255, 255, 1);
}

.infoblock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.title {
  color: var(--white);
  font-size: 50px;
  line-height: 70px;
  text-transform: lowercase;
  font-weight: 600;
}

.title small {
  font-size: 16px;
  color: hsla(0, 0%, 90%, 0.5);
}

.tags {
  display: flex;
  align-items: center;
}

.tags_icon {
  color: var(--dwhite);
  align-self: center;
  margin: 0 5px 0 0;
}

.tag {
  margin: 0 5px;
}

.tag::after {
  content: ",";
  color: var(--dwhite);
}

.tag:last-child::after {
  display: none;
}

.tag_link {
  color: var(--dwhite);
  text-decoration: none;
  transition: color 150ms ease;
}

.tag_link:hover {
  color: rgba(255, 255, 255, 1);
}

.report {
  display: flex;
}

.report_text {
  opacity: 0;
  font-size: 16px;
  color: var(--dwhite);
  transition: opacity 300ms ease;
  margin-right: 10px;
}

.report_text {
  opacity: 0;
  font-size: 16px;
  color: var(--dwhite);
  transition: opacity 300ms ease;
  margin-right: 10px;
}

.report_text.shown {
  opacity: 1;
}

.report_icon {
  margin-right: 10px;
  transition: color 300ms ease;
  cursor: pointer;
}

.report_icon:hover {
  color: rgba(255, 255, 255, 1);
}

@media (max-width: 767px) {
  .Databar_inner {
    grid-template: 1fr / 1fr;
  }

  .header {
    flex-direction: column;
  }

  .infoblock {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .type {
    margin-top: 10px;
  }

  .report_text {
    display: none;
  }
}

@media (min-width: 768px) {
  .type {
    margin-left: 20px;
    align-self: center;
    position: relative;
    top: -1px;
  }
}
</style>
