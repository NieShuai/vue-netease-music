<template>
  <div class="accounts">
    <head-bar title="帐号"></head-bar>
    <div class="accounts__content">
      <div class="accounts__content__item accounts__content__card">
        <div class="accounts__content__card__infor">
          <div class="accounts__content__card__infor__avatar">
            <img :src="avatar" alt="">
          </div>
          <div class="accounts__content__card__infor__general">
            <div class="accounts__content__card__infor__general__nick-name">
              {{ nickName }}
            </div>
            <div class="accounts__content__card__infor__general__lv">
              <div class="accounts__content__card__infor__general__lv__container">
                Lv.{{ level }}
              </div>
            </div>
          </div>
          <div class="accounts__content__card__infor__sign">
            签到
          </div>
        </div>
        <div class="accounts__content__card__detail">
          <div
            class="accounts__content__card__detail__item"
            v-for="(item, index) in detailItems"
            :key="index"
            @click="toDetailPage(item)">
            <div
              v-if="item.isIcon"
              class="accounts__content__card__detail__item__up
                accounts__content__card__detail__item__up__is-icon">
              <i :class="item.key"></i>
            </div>
            <div
              v-else
              class="accounts__content__card__detail__item__up">
              {{ item.key }}
            </div>
            <div
              v-if="item.isIcon"
              class="accounts__content__card__detail__item__bottom
                accounts__content__card__detail__item__bottom__is-icon">
              {{ item.value }}
            </div>
            <div
              v-else
              class="accounts__content__card__detail__item__bottom">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headBar from 'components/head_bar/head-bar';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'accounts',
  data() {
    return {
      isChild: false,
      avatar: '',
      nickName: 'nickName',
      level: 0,
      detailItems: [{
        key: '动态',
        value: 0,
        router: '/events',
      }, {
        key: '关注',
        value: 0,
        router: '/follows',
      }, {
        key: '粉丝',
        value: 0,
        router: '/followeds',
      }, {
        isIcon: true,
        key: 'font-awesome-pencil',
        value: '我的资料',
        router: '/profile',
      }],
    };
  },
  mounted() {
    // this.updateUid(0);
    this.axios.get('/user/detail', {
      params: {
        uid: this.uid,
      },
    }).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        const { profile, level } = data;
        this.avatar = profile.avatarUrl;
        this.nickName = profile.nickname;
        this.level = level;
        this.detailItems[0].value = profile.eventCount;
        this.detailItems[1].value = profile.follows;
        this.detailItems[2].value = profile.followeds;
      }
    });
  },
  watch: {
    $router(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
  },
  methods: {
    ...mapActions([
      'updateUid',
    ]),
    toDetailPage(item) {
      this.isChild = true;
      this.$router.push(item.router);
    },
  },
  components: {
    headBar,
  },
};
</script>
