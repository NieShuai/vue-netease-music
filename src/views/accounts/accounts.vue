<template>
  <div class="accounts" ref="accountsWrapper">
    <div class="accounts__content">
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <div
        v-else
        class="accounts__content__item accounts__content__card">
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
            <i class="icon-gold-coin accounts__content__card__infor__sign__item"></i>
            <span class="accounts__content__card__infor__sign__item">签到</span>
          </div>
        </div>
        <div class="accounts__content__card__detail">
          <div
            class="accounts__content__card__detail__item__container"
            v-for="(item, index) in detailItems"
            :key="index"
            @click="toDetailPage(item)">
            <div class="accounts__content__card__detail__item">
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
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import loading from 'components/loading/loading';
import { mapGetters, mapActions } from 'vuex';
import { getUserDetail } from 'api/api';

export default {
  name: 'accounts',
  data() {
    return {
      scroll: null,
      showLoading: true,
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
        key: 'icon-pencil',
        value: '我的资料',
        router: '/profile',
      }],
    };
  },
  mounted() {
    this.showLoading = true;
    getUserDetail(this.uid).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        this.setUserObject(data);
        const { profile, level } = data;
        this.avatar = profile.avatarUrl;
        this.nickName = profile.nickname;
        this.level = level;
        this.detailItems[0].value = profile.eventCount;
        this.detailItems[1].value = profile.follows;
        this.detailItems[2].value = profile.followeds;
        this.showLoading = false;
        this.$nextTick(() => {
          if (this.$refs.accountsWrapper) {
            this.scroll = new BScroll(this.$refs.accountsWrapper, {
              click: true,
            });
          }
        });
      }
    });
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
  },
  methods: {
    ...mapActions([
      'setUserObject',
    ]),
    toDetailPage(item) {
      this.isChild = true;
      this.$router.push(item.router);
    },
  },
  components: {
    loading,
  },
};
</script>
