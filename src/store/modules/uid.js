import * as types from 'store/mutation-types';
import * as getters from 'store/getters/uid';
import * as actions from 'store/actions/uid';

const state = {
  uid: 88653873,
};

const mutations = {
  [types.UPDATE_UID](state, payload) {
    state.uid = payload.param;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
