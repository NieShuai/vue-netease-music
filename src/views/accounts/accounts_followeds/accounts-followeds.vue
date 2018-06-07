<template>
  <div class="accounts__followeds">
    <div class="accounts__followeds__content">
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <user-item
        v-else
        v-for="(followed, index) in followeds"
        :key="index"
        :user-object="followed">
      </user-item>
    </div>
  </div>
</template>

<script>
import userItem from 'components/user_item/user-item';
import loading from 'components/loading/loading';
import { mapGetters, mapActions } from 'vuex';
import { getFolloweds } from 'api/api';

export default {
  name: 'accountsFolloweds',
  data() {
    return {
      showLoading: true,
      followeds: [],
    };
  },
  mounted() {
    this.showLoading = true;
    getFolloweds(this.uid).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        this.followeds = data.followeds;
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
    userItem,
    loading,
  },
};
</script>
