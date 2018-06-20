<template>
  <div class="music__list__item">
    <div class="music__list__item__indexing">
      {{ indexing }}
    </div>
    <div class="music__list__item__detail">
      <div class="music__list__item__infor">
        <div class="music__list__item__infor__up">
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
  },
  date() {
    return {};
  },
  computed: {},
};
</script>
