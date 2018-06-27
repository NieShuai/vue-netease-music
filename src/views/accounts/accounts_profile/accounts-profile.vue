<template>
  <div class="accounts__profile" ref="profileWrapper">
    <div class="accounts__profile__content">
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item">
          <span>头像</span>
          <div class="accounts__profile__content__group__item__avatar">
            <img :src="userObject.profile.avatarUrl">
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>个人主页背景</span>
          <div class="accounts__profile__content__group__item__background">
            <img :src="userObject.profile.backgroundUrl">
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>昵称</span>
          <div class="accounts__profile__content__group__item__text">
            {{ userObject.profile.nickname }}
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>性别</span>
          <div class="accounts__profile__content__group__item__text">
            {{ userObject.profile.gender === 1 ? '男' : '女' }}
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>二维码</span>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
      </div>
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item">
          <span>生日</span>
          <div class="accounts__profile__content__group__item__text">
            {{ userObject.profile.birthday }}
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>地区</span>
          <div class="accounts__profile__content__group__item__text">
            {{ userObject.profile.province }} {{ userObject.profile.city }}
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>大学</span>
          <div class="accounts__profile__content__group__item__text">
            未知
          </div>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
      </div>
      <div class="accounts__profile__content__group"></div>
      <div class="accounts__profile__content__group">
        <div class="accounts__profile__content__group__item">
          <span>账号绑定设置</span>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
        <div class="accounts__profile__content__group__item">
          <span>个人主页展示设置</span>
          <i class="icon-back accounts__profile__content__group__item__arrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapGetters, mapActions } from 'vuex';

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
  methods: {},
  components: {},
};
</script>
