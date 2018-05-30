<template>
  <div class="accounts__follows">
    <head-bar title="关注" show-back></head-bar>
    <div class="accounts__follows__content">
      <user-item
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'accountsFollows',
  data() {
    return {
      follows: [],
    };
  },
  mounted() {
    this.axios.get('/user/follows', {
      params: {
        uid: this.uid,
      },
    }).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        this.follows = data.follow;
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
  },
};
</script>
