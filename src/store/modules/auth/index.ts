import {Module} from 'vuex';
import {LOGIN, LOGOUT, SET_AUTH, UPDATE_PASSWORD, UPDATE_USERNAME} from './mutation-types';
import {CHECK_AUTH} from './action-types';
import {OpenRoutes, ProtectedRoutes, router} from '../../../router';
import {AUTH, IS_AUTHORIZED} from './getter-types';

const AUTH_KEY = 'auth';

interface IAuthState {
  username: string,
  password: string,
  auth: string | null
}

const authState: Module<IAuthState, {}> = {
  state: {
    username: '',
    password: '',
    auth: ''
  },
  actions: {
    [CHECK_AUTH]({commit}) {
      const auth = localStorage.getItem(AUTH_KEY);
      commit(SET_AUTH, auth);
      return Boolean(auth);
    }
  },
  mutations: {
    [LOGIN](state) {
      const encoded = window.btoa(`${state.username}:${state.password}`);
      state.auth = `Basic ${encoded}`;
      localStorage.setItem(AUTH_KEY, state.auth);
      router.push({name: ProtectedRoutes.DeviceGroups});
    },
    [LOGOUT]() {
      localStorage.removeItem(AUTH_KEY);
      router.push({name: OpenRoutes.Login});
    },
    [UPDATE_USERNAME](state, value) {
      state.username = value;
    },
    [UPDATE_PASSWORD](state, value) {
      state.password = value;
    },
    [SET_AUTH](state, value) {
      state.auth = value;
    }
  },
  getters: {
    [AUTH]: state => state.auth,
    [IS_AUTHORIZED]: state => Boolean(state.auth)
  }
};

export default authState;
