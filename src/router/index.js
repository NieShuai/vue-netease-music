import Vue from 'vue';
import Router from 'vue-router';
import discovery from 'views/discovery/discovery';
import videos from 'views/videos/videos';
import mine from 'views/mine/mine';
import friends from 'views/friends/friends';
import accounts from 'views/accounts/accounts';
import accountsEvents from 'views/accounts/accounts_events/accounts-events';
import accountsFollows from 'views/accounts/accounts_follows/accounts-follows';
import accountsFolloweds from 'views/accounts/accounts_followeds/accounts-followeds';
import accountsProfile from 'views/accounts/accounts_profile/accounts-profile';
import musicList from 'views/music_list/music-list';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/discovery',
    name: 'discovery',
    component: discovery,
  }, {
    path: '/videos',
    name: 'videos',
    component: videos,
  }, {
    path: '/mine',
    name: 'mine',
    component: mine,
  }, {
    path: '/friends',
    name: 'friends',
    component: friends,
  }, {
    path: '/accounts',
    name: 'accounts',
    component: accounts,
  }, {
    path: '/events',
    name: 'events',
    component: accountsEvents,
  }, {
    path: '/follows',
    name: 'follows',
    component: accountsFollows,
  }, {
    path: '/followeds',
    name: 'followeds',
    component: accountsFolloweds,
  }, {
    path: '/profile',
    name: 'profile',
    component: accountsProfile,
  }, {
    path: '/list',
    name: 'list',
    component: musicList,
  }],
});

export default router;
