<template>
  <div class="accounts__follows" ref="followswrapper">
    <div class="accounts__follows__content">
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <user-item
        v-else
        v-for="(follow, index) in follows"
        :key="index"
        :user-object="follow">
      </user-item>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import userItem from 'components/user_item/user-item';
import loading from 'components/loading/loading';
import { mapGetters, mapActions } from 'vuex';
import { getFollows } from 'api/api';

export default {
  name: 'accountsFollows',
  data() {
    return {
      showLoading: true,
      follows: [],
    };
  },
  mounted() {
    this.showLoading = true;
    getFollows(this.uid).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        this.follows = data.follow;
        this.showLoading = false;
        this.$nextTick(() => {
          const wrapper = document.querySelector('.accounts__follows');
          const scroll = new BScroll(wrapper);
          scroll.refresh();
          console.log(wrapper, scroll);
        });
      }
    });
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
  },
  methods: {},
  components: {
    userItem,
    loading,
  },
};
</script>
