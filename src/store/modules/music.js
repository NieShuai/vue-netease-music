import * as types from 'store/mutation-types';
import * as getters from 'store/getters/music';
import * as actions from 'store/actions/music';

const state = {
  myList: [],
  playingList: [],
  playingIndex: 0,
  musicIndex: 0,
};

const mutations = {
  [types.SET_MY_LIST](state, payload) {
    state.myList = payload.param;
  },
  [types.SET_PLAYING_LIST](state, payload) {
    state.playingList = payload.param;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
