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
  componentName: 'appFooter',
  data() {
    return {
      backClicked: false,
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
      handler(newVal, oldVal) {
        if (newVal !== oldVal && !this.backClicked) {
          const currentTab = this.columns[newVal];
          this.$emit('tab-change', newVal);
          this.$router.push(currentTab.router);
        }
        this.backClicked = false;
      },
    },
    $route(to, from) {
      const preActive = this.active;
      const { name } = to;
      if (['discovery'].indexOf(name) !== -1) {
        this.active = 0;
      } else if (['videos'].indexOf(name) !== -1) {
        this.active = 1;
      } else if (['mine'].indexOf(name) !== -1) {
        this.active = 2;
      } else if (['friends'].indexOf(name) !== -1) {
        this.active = 3;
      } else if (['accounts', 'events', 'follows', 'followeds', 'profile'].indexOf(name) !== -1) {
        this.active = 4;
      }
      if (preActive === this.active) {
        this.backClicked = false;
      }
    },
  },
  methods: {
    onRouteBack() {
      this.backClicked = true;
    },
  },
  created() {
    this.$on('route-back', this.onRouteBack);
  },
};
</script>
