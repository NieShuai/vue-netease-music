<template>
  <div class="mine">
    <head-bar title="我的音乐"></head-bar>
    <div class="mine__title">
      我创建的歌单({{ listSize }})
    </div>
    <div class="mine__content">
      <van-cell-swipe
        v-for="(list, index) in myList"
        :key="index"
        :right-width="70">
        <div class="mine__content__item">
          <div class="mine__content__item__cover">
            <img :src="list.coverImgUrl" >
          </div>
          <div class="mine__content__item__infor">
            <div class="mine__content__item__infor__name">
              <span>{{ list.name }}</span>
            </div>
            <div class="mine__content__item__infor__counts">{{ list.trackCount }}首</div>
          </div>
        </div>
        <span slot="right">删除</span>
      </van-cell-swipe>
    </div>
  </div>
</template>

<script>
import headBar from 'components/head_bar/head-bar';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'mine',
  computed: {
    ...mapGetters([
      'myList',
    ]),
    listSize() {
      return this.myList.length;
    },
  },
  components: {
    headBar,
  },
};
</script>
