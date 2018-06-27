<template>
  <div class="accounts__profile" ref="profileWrapper">
    <div v-if="userObject" class="accounts__profile__content">
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item__container">
          <div class="accounts__profile__content__group__item">
            <span>头像</span>
            <div class="accounts__profile__content__group__item__avatar">
              <img :src="userObject.profile.avatarUrl">
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div class="accounts__profile__content__group__item">
            <span>个人主页背景</span>
            <div class="accounts__profile__content__group__item__background">
              <img :src="userObject.profile.backgroundUrl">
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div class="accounts__profile__content__group__item">
            <span>昵称</span>
            <div class="accounts__profile__content__group__item__text">
              {{ userObject.profile.nickname }}
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div class="accounts__profile__content__group__item">
            <span>性别</span>
            <div class="accounts__profile__content__group__item__text">
              {{ userObject.profile.gender === 1 ? '男' : '女' }}
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div class="accounts__profile__content__group__item">
            <span>二维码</span>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
      </div>
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item__container">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller">
            <span>生日</span>
            <div class="accounts__profile__content__group__item__text">
              {{ formatTime(userObject.profile.birthday) }}
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller">
            <span>地区</span>
            <div class="accounts__profile__content__group__item__text">
              湖南 长沙
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller">
            <span>大学</span>
            <div class="accounts__profile__content__group__item__text">
              未知
            </div>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
      </div>
      <div class="accounts__profile__content__group">
        <div
          class="accounts__profile__content__group__item__container
            accounts__profile__content__group__item__container__text">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller
              accounts__profile__content__group__textarea__label">
            <span>介绍</span>
          </div>
        </div>
        <div
          class="accounts__profile__content__group__item__container
            accounts__profile__content__group__item__container__text">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__textarea">
            <van-field
              v-model="userObject.profile.signature"
              readonly
              type="textarea"/>
          </div>
        </div>
      </div>
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item__container">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller">
            <span>账号绑定设置</span>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
        <div class="accounts__profile__content__group__item__container">
          <div
            class="accounts__profile__content__group__item
              accounts__profile__content__group__item__smaller">
            <span>个人主页展示设置</span>
            <i class="icon-back accounts__profile__content__group__item__arrow"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapGetters, mapActions } from 'vuex';
import { getTime } from 'util/help';

export default {
  name: 'accountsProfile',
  data() {
    return {
      profileScroll: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.profileScroll = new BScroll(this.$refs.profileWrapper, {
        click: true,
      });
    });
  },
  computed: {
    ...mapGetters([
      'userObject',
    ]),
  },
  methods: {
    formatTime(time) {
      const times = getTime(time);
      const { year, month, date } = times;
      return ''.concat(year, '-', month, '-', date);
    },
  },
  components: {},
};
</script>
