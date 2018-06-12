import * as types from 'store/mutation-types';

/* eslint-disable */
export function updateUid({ commit }, param) {
  commit(types.UPDATE_UID, { param });
}
