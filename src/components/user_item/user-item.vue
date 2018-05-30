<template>
  <div class="user__item">
    <!-- {{ userObject }} -->
    <div class="user__item__child user__item__avatar">
      <img :src="userObject.avatarUrl" alt="">
    </div>
    <div class="user__item__child user__item__detail"></div>
    <div class="user__item__child user__item__more">
      <i class="font-awesome-ellipsis-h"></i>
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
}
</script>
