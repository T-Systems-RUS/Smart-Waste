<template>
  <div class="container">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          placeholder="Email"
          v-model="username">
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password">
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button
          class="button"
          @click="login">
          Login
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations} from 'vuex';
  import {LOGIN, UPDATE_PASSWORD, UPDATE_USERNAME} from '../../store/modules/auth/mutation-types';
  import {GET_PASSWORD, GET_USERNAME} from '../../store/modules/auth/getter-types';
  import Util from '../../common/classes/Util';

  export default Vue.extend({
    computed: {
      username: Util.mapTwoWay<string>(GET_USERNAME, UPDATE_USERNAME),
      password: Util.mapTwoWay<string>(GET_PASSWORD, UPDATE_PASSWORD)
    },
    methods: {
      ...mapMutations({
        login: LOGIN
      })
    }
  });
</script>
