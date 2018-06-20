<template>
  <div class="mine" ref="mineWrapper">
    <div class="mine__wrapper">
      <div class="mine__title">
        我创建的歌单({{ listSize }})
      </div>
      <div class="mine__content">
        <van-cell-swipe
          v-for="(list, index) in myList"
          :key="index"
          :right-width="70">
          <div class="mine__content__item" @click="showMusicList">
            <div class="mine__content__item__cover">
              <img :src="list.coverImgUrl" >
            </div>
            <div class="mine__content__item__infor">
              <div class="mine__content__item__infor__name">
                <span>{{ list.name }}</span>
              </div>
              <div class="mine__content__item__infor__counts">{{ list.trackCount }}首</div>
            </div>
            <i
              v-if="index === playingIndex"
              class="icon-volume-on mine__content__item__playing-list"></i>
          </div>
          <span slot="right">删除</span>
        </van-cell-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'mine',
  data() {
    return {
      scroll: null,
    };
  },
  computed: {
    ...mapGetters([
      'myList',
      'playingIndex',
    ]),
    listSize() {
      return this.myList.length;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.mineWrapper, {
        click: true,
      });
    });
  },
  methods: {
    showMusicList() {
      this.$router.push('/list');
    },
  },
  components: {},
};
</script>
