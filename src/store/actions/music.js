import * as types from 'store/mutation-types';
import { getPlayList, getListDetail } from 'api/api';

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
              param: listData.playlist.trackIds,
            });
          }
        });
      }
    }
  });
}
