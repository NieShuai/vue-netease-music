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
        getListDetail(list[1].id).then((response) => {
          const { data: listData } = response;
          if (listData.code === 200) {
            commit(types.SET_PLAYING_LIST, {
              param: listData.playlist.trackIds,
            });
            if (listData.playlist.trackIds.length > 0) {
              const songid = listData.playlist.trackIds[0].id;
              getMusicDetail(songid).then((res) => {
                const { data } = res;
                if (data.code === 200) {
                  const songObj = data.songs[0];
                  const obj = {};
                  obj.songId = songid;
                  obj.coverUrl = songObj.al.picUrl;
                  obj.title = songObj.name;
                  obj.artist = songObj.ar[0].name;
                  obj.time = songObj.dt;
                  commit(types.SET_PLAYING_SONG, {
                    param: obj,
                  });
                }
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
