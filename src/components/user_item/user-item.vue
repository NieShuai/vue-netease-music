<template>
  <div class="user__item">
    <div class="user__item__child user__item__avatar">
      <img :src="userObject.avatarUrl" alt="">
    </div>
    <div class="user__item__child user__item__detail">
      <div class="user__item__detail__content">
        <div :class="nickNameClass">
          <span>
            {{ userObject.nickname }}
            <i class="iconfont" :class="userObject.gender === 1 ? 'icon-male' : 'icon-female'"></i>
          </span>
        </div>
        <div
          v-if="userObject.signature && userObject.signature !== ''"
          class="user__item__detail__content__signature">
          {{ userObject.signature }}
        </div>
      </div>
      <div class="user__item__detail__more">
        <i class="iconfont icon-dot-h"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userItem',
  props: {
    userObject: Object,
  },
  date() {
    return {};
  },
  computed: {
    nickNameClass() {
      return {
        'user__item__detail__content__nickname': 1,
        'user__item__detail__content__nickname__single':
          !this.userObject.signature || this.userObject.signature === '',
      };
    },
  },
};
</script>
