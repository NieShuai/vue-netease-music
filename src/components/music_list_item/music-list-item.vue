<template>
  <div class="music__list__item">
    <div class="music__list__item__indexing" v-if="activing">
      <i class="icon-volume-on"></i>
    </div>
    <div class="music__list__item__indexing" v-else>
      {{ indexing }}
    </div>
    <div class="music__list__item__detail">
      <div class="music__list__item__infor">
        <div
          :class="{
            'music__list__item__infor__up': 1,
            'music__list__item__infor__up--activing': activing,
          }">
          {{ itemObject.name }}
        </div>
        <div class="music__list__item__infor__bottom">
          {{ itemObject.ar[0].name }} - {{ itemObject.al.name }}
        </div>
      </div>
      <div class="music__list__item__more">
        <i class="icon-dot-h"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'musicListItem',
  props: {
    itemObject: Object,
    indexing: Number,
    activing: Boolean,
  },
  date() {
    return {};
  },
  computed: {},
};
</script>
