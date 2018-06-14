import * as types from 'store/mutation-types';
import { getPlayList, getListDetail, getMusicDetail } from 'api/api';

export function setMyList({ commit }, uid) {
  getPlayList(uid).then((res) => {
    const { data } = res;
    if (data.code === 200) {
      const list = data.playlist;
      list.splice(0, 1);
      commit(types.SET_MY_LIST, {
        param: list,
      });
      if (list.length > 0) {
        getListDetail(list[0].id).then((response) => {
          const { data: listData } = response;
          if (listData.code === 200) {
            commit(types.SET_PLAYING_LIST, {
              param: listData.playlist.tracks,
            });
            if (listData.playlist.tracks.length > 0) {
              const defaultSongObj = listData.playlist.tracks[0];
              const obj = {};
              obj.songId = defaultSongObj.id;
              obj.coverUrl = defaultSongObj.al.picUrl;
              obj.title = defaultSongObj.name;
              obj.artist = defaultSongObj.ar[0].name;
              obj.time = defaultSongObj.dt;
              commit(types.SET_PLAYING_SONG, {
                param: obj,
              });
            }
          }
        });
      }
    }
  });
}

export function setMusicIndex({ commit }, param) {
  commit(types.SET_MUSIC_INDEX, { param });
}

export function setPlayingType({ commit }, param) {
  commit(types.SET_PLAYING_TYPE, { param });
}

export function setPlayingSong({ commit }, param) {
  commit(types.SET_PLAYING_SONG, { param });
}

export function setPlayingIndex({ commit }, param) {
  commit(types.SET_PLAYING_INDEX, { param });
}
