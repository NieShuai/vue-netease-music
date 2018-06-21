import axios from 'axios';

axios.defaults.baseURL = 'http://184.170.218.177:3000';

export function getUserDetail(uid) {
  return axios.get('/user/detail', {
    params: {
      uid,
    },
  });
}

export function getEvent(uid) {
  return axios.get('/user/event', {
    params: {
      uid,
    },
  });
}

export function getFolloweds(uid) {
  return axios.get('/user/followeds', {
    params: {
      uid,
    },
  });
}

export function getFollows(uid) {
  return axios.get('/user/follows', {
    params: {
      uid,
    },
  });
}

export function getPlayList(uid) {
  return axios.get('/user/playlist', {
    params: {
      uid,
    },
  });
}

export function getListDetail(id) {
  return axios.get('/playlist/detail', {
    params: {
      id,
    },
  });
}

export function getMusicDetail(ids) {
  return axios.get('/song/detail', {
    params: {
      ids,
    },
  });
}

export function getLyric(id) {
  return axios.get('/lyric', {
    params: {
      id,
    },
  });
}
