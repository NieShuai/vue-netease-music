<template>
  <div class="app-footer">
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="(column, index) in columns"
        :key="index">
        <span>{{ column.name }}</span>
        <template slot="icon" slot-scope="props">
          <i :class="`font-awesome-${column.iconClass}`"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'appFooter',
  data() {
    return {
      active: 0,
      columns: [{
        name: '发现',
        iconClass: 'paper-plane',
        router: '/discovery',
      }, {
        name: '视频',
        iconClass: 'youtube-play',
        router: '/videos',
      }, {
        name: '我的',
        iconClass: 'music',
        router: '/mine',
      }, {
        name: '朋友',
        iconClass: 'users',
        router: '/friends',
      }, {
        name: '帐号',
        iconClass: 'user',
        router: '/accounts',
      }],
    };
  },
  watch: {
    active: {
      immediate: true,
      handler(newVal) {
        const currentTab = this.columns[newVal];
        this.$router.push(currentTab.router);
      },
    },
  },
  methods: {},
};
</script>
