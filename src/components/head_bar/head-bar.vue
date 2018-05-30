<template>
  <div class="head-bar">
    <i
      v-if="showBack"
      class="font-awesome-angle-left head-bar__back"
      @click="back"></i>
    <span class="head-bar__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'headBar',
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
}
</script>

