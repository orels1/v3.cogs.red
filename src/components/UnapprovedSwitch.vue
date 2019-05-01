<template lang="pug">
  .switch
    .button(@click="modal = true")
      .text
        span(v-if="settings.unapproved") Showing unapproved repositories
        span(v-if="!settings.unapproved") Show Unapproved repositories and cogs
    .modal(v-if="modal" :class="[modal && 'shown']")
      .modal-bg(@click="modal = false")
      .modal-content(v-if="!settings.unapproved")
        .modal-title You are about to show unapproved repositories
        .modal-text.
          This means that from here on you're personally responsible for using the code that has not
           been screened and approved by Red - Discord Bot QA staff.
        input.modal-input(v-model="agreement" placeholder="Type \"I agree\" to confirm")
        button.proceed(:disabled="agreement !== 'I agree'" @click="toggle") Show unapproved
      .modal-content(v-if="settings.unapproved")
        .modal-title You are about to hide unapproved repositories
        button.proceed(@click="toggle") Hide unapproved
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

@Component({
  computed: mapState(['settings']),
  methods: {
    ...mapActions(['switchUnapproved', 'fetchCogs', 'fetchRepos']),
  },
})
export default class UnapprovedSwitch extends Vue {
  modal = false;
  agreement = '';

  async toggle() {
    this.switchUnapproved(!this.settings.unapproved);
    await this.fetchCogs();
    await this.fetchRepos();
    this.modal = false;
    this.agreement = '';
  }
}
</script>

<style scoped>
.switch {
  --red: rgba(236, 0, 26, 0.8);
}

.button {
  border: 1px solid var(--red);
  padding: 7px 10px;
  text-align: center;
  transition: all 300ms ease;
  cursor: pointer;
}

.button:hover {
  background-color: var(--red);
}

.button:hover .text {
  color: white;
}

.text {
  color: var(--red);
  font-size: 14px;
}

.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsla(0, 0%, 10%, 0.5);
  opacity: 0;
  transition: opacity 300ms ease;
}

.modal.shown {
  opacity: 1;
}

.modal-bg {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background-color: #fcfcfc;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

.modal-title {
  padding: 20px;
  border-bottom: 1px solid var(--red);
  text-transform: uppercase;
  font-size: 16px;
  margin-bottom: 15px;
}

.modal-text {
  padding: 5px 20px 20px 20px;
  font-size: 14px;
  color: hsl(0, 0%, 40%);
}

.modal-input {
  margin: 0 20px 5px 20px;
  padding: 10px 15px;
  font-size: 14px;
  outline: none !important;
}

.proceed {
  padding: 10px 15px;
  margin: 5px 20px 20px 20px;
  border: 1px solid var(--red);
  color: var(--red);
  font-size: 12px;
  text-align: center;
  transition: all 300ms ease;
  outline: none;
  cursor: pointer;
}

.proceed:disabled {
  background-color: hsl(0, 0%, 90%);
  border-color: hsl(0, 0%, 90%);
  color: white;
}

.proceed:hover {
  color: white;
  background-color: var(--red);
}
</style>
