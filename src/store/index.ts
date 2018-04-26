import Vue from 'vue';
import Vuex from 'vuex';

import language from './modules/language';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    language,
    auth
  }
});
