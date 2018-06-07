<template>
  <div class="accounts__events">
    <div class="accounts__events__content">
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <div
        v-else
        v-for="(event, index) in events"
        :key="index"
        class="accounts__events__content__item">
        <div
          class="accounts__events__content__item__child
            accounts__events__content__item__avatar-container">
          <div class="accounts__events__content__item__avatar">
            <img :src="user.avatarUrl">
          </div>
        </div>
        <div
          class="accounts__events__content__item__child
            accounts__events__content__item__share">
          <div
            class="accounts__events__content__item__share__item
              accounts__events__content__item__share__item__user">
            <span class="accounts__events__content__item__share__item__nickname">
              {{ user.nickname }}
            </span>分享{{ getShareType(event.type) }}:
          </div>
          <div
            class="accounts__events__content__item__share__item
              accounts__events__content__item__share__item__time">
            {{ formatTime(event.eventTime) }}
          </div>
          <div
            v-if="event.parsedJson.msg.length > 0"
            class="accounts__events__content__item__share__item
              accounts__events__content__item__share__item__msg">
            {{ event.parsedJson.msg }}
          </div>
          <div
            class="accounts__events__content__item__share__item
              accounts__events__content__item__share__item__detail">
            detail
          </div>
          <div
            class="accounts__events__content__item__share__item
              accounts__events__content__item__share__item__buttons">
            <div class="accounts__events__content__item__share__item__buttons__item">
              <i class="font-awesome-thumbs-o-up"></i> 赞
            </div>
            <div class="accounts__events__content__item__share__item__buttons__item">
              <i class="font-awesome-commenting-o"></i> 评论
            </div>
            <div class="accounts__events__content__item__share__item__buttons__item">
              <i class="font-awesome-share-square-o"></i> 分享
            </div>
            <div class="accounts__events__content__item__share__item__buttons__item">
              <i class="font-awesome-ellipsis-h"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loading from 'components/loading/loading';
import { mapGetters, mapActions } from 'vuex';
import { getEvent } from 'api/api';

export default {
  name: 'accountsEvents',
  data() {
    return {
      showLoading: true,
      user: null,
      events: [],
    };
  },
  mounted() {
    this.showLoading = true;
    getEvent(this.uid).then((res) => {
      const { data } = res;
      if (data.code === 200) {
        if (data.events.length > 0) {
          this.user = data.events[0].user;
          data.events.forEach((eve) => {
            eve.parsedJson = JSON.parse(eve.json);
            this.events.push(eve);
          });
        }
        this.showLoading = false;
      }
    });
  },
  computed: {
    ...mapGetters([
      'uid',
    ]),
  },
  methods: {
    getShareType(code) {
      let type = '';
      switch (code) {
        case 18:
          type = '单曲';
          break;
        case 21:
          type = '视频';
          break;
        default:
          type = '';
          break;
      }
      return type;
    },
    formatTime(time) {
      const da = new Date(time);
      const year = da.getFullYear() + '年';
      const month = da.getMonth() + 1 + '月';
      const date = da.getDate() + '日';
      return year + month + date;
    },
  },
  components: {
    loading,
  },
};
</script>
