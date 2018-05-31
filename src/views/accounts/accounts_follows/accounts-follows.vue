<template>
  <div class="accounts__follows">
    <head-bar title="关注" show-back></head-bar>
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
import headBar from 'components/head_bar/head-bar';
import userItem from 'components/user_item/user-item';
import loading from 'components/loading/loading';
import { mapGetters, mapActions } from 'vuex';

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
    this.axios.get('/user/follows', {
      params: {
        uid: this.uid,
      },
    }).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        this.follows = data.follow;
        this.showLoading = false;
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
    headBar,
    userItem,
    loading,
  },
};
</script>
