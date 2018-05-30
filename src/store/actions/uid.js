import * as types from 'store/mutation-types';

export function updateUid({ commit }, param) {
  commit(types.UPDATE_UID, { param });
}
