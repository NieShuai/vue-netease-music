import * as types from 'store/mutation-types';

/* eslint-disable */
export function updateUid({ commit }, param) {
  commit(types.UPDATE_UID, { param });
}

export function setUserObject({ commit }, param) {
  commit(types.SET_USEROBJECT, { param });
}
