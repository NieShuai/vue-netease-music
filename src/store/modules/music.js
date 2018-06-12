import * as types from 'store/mutation-types';
import * as getters from 'store/getters/music';
import * as actions from 'store/actions/music';

const state = {
  // 歌单列表
  myList: [],
  // 当前播放的歌单index
  playingIndex: 0,
  // 当前播放的歌单详情
  playingList: [],
  // 当前播放的音乐index
  musicIndex: 0,
  // 0--列表循环播放；1--列表随机播放； 2--单曲循环
  playingType: 0,
  // 当前播放的音乐信息
  songObj: {},
};

const mutations = {
  [types.SET_MY_LIST](state, payload) {
    state.myList = payload.param;
  },
  [types.SET_PLAYING_LIST](state, payload) {
    state.playingList = payload.param;
  },
  [types.SET_MUSIC_INDEX](state, payload) {
    state.musicIndex = payload.param;
  },
  [types.SET_PLAYING_TYPE](state, payload) {
    state.playingType = payload.param;
  },
  [types.SET_PLAYING_SONG](state, payload) {
    state.songObj = payload.param;
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
