<template lang="pug">
  router-link.Cog(:to="{ path: `/cogs${cog.links.self}` }" append)
    .name {{ cog.name }}
    .description {{ short }}
    .tags
      .tag( v-for="tag in cog.tags.slice(0,3)") \#{{ tag }}
    .info
      .author {{ cog.author.username }}
      .extra_info
        small.version(v-if="cog.version || cog.botVersion") [v{{cog.version || cog.botVersion[0]}}]
        Badge.type(
          v-if="cog.repo ? cog.repo.type : cog.type"
          :type="cog.repo ? cog.repo.type : cog.type"
        )
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
    cog: {
      type: Object,
      default: () => ({
        name: 'cog',
        repo: {
          type: 'approved',
          name: 'repo',
        },
        short: '',
        description: '',
        tags: [],
        author: {
          name: 'Author',
          username: 'Author_gh',
        },
        links: {
          self: '/',
        },
      }),
    },
  },
})
export default class Cog extends Vue {
  get short() {
    if (!this.cog.short) return '';
    if (this.cog.short.split('').length > 40) {
      return `${this.cog.short.split('').slice(0, 40).join('')}...`;
    }
    return this.cog.short;
  }
}
</script>

<style scoped>
.Cog {
  color: var(--black);
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  transition: border 150ms ease;
  text-decoration: none;
}

.Cog:hover {
  border: 1px solid rgba(34, 37, 42, 0.6);
}

.name {
  font-weight: bold;
}

.description {
  color: var(--light);
  font-size: 14px;
}

.tags {
  display: flex;
  margin: 10px 0 0 0;
  justify-content: space-between;
  min-height: 16px;
}

.tag {
  font-size: 12px;
  color: var(--light);
}

.info {
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0 0;
  color: var(--light);
}

.author {
  font-size: 14px;
}

.type {
  align-self: center;
}

.extra_info {
  display: flex;
}

.version {
  padding-right: 15px;
  color: hsl(0, 0%, 50%);
}
</style>

<style>
.fadeIn {
  animation-duration: 300ms !important;
}

.fadeOut {
  animation-duration: 300ms !important;
}
</style>
