<template>
  <div class="user__item">
    <div class="user__item__child user__item__avatar">
      <img :src="userObject.avatarUrl" alt="">
    </div>
    <div class="user__item__child user__item__detail">
      <div class="user__item__detail__content">
        <div :class="nickNameClass">
          <span>{{ userObject.nickname }} <i :class="userObject.gender === 1 ? 'font-awesome-mars' : 'font-awesome-venus'"></i></span>
        </div>
        <div
          v-if="userObject.signature && userObject.signature !== ''"
          class="user__item__detail__content__signature">
          {{ userObject.signature }}
        </div>
      </div>
      <div class="user__item__detail__more">
        <i class="font-awesome-ellipsis-h"></i>
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
        'user__item__detail__content__nickname__single': !this.userObject.signature || this.userObject.signature === '',
      };
    },
  },
}
</script>
