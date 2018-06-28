<template>
  <div class="event-item">
    <div class="event-item__child event-item__avatar-container">
      <div class="event-item__avatar">
        <img :src="user.avatarUrl">
      </div>
    </div>
    <div class="event-item__child event-item__share">
      <div class="event-item__share__item event-item__share__item__user">
        <span class="event-item__share__item__nickname">
          {{ user.nickname }}
        </span>分享{{ getShareType(event.type) }}:
      </div>
      <div class="event-item__share__item event-item__share__item__time">
        {{ formatTime(event.eventTime) }}
      </div>
      <div
        v-if="event.parsedJson.msg.length > 0"
        class="event-item__share__item event-item__share__item__msg">
        {{ event.parsedJson.msg }}
      </div>
      <div class="event-item__share__item event-item__share__item__detail">
        detail
      </div>
      <div class="event-item__share__item event-item__share__item__buttons">
        <div class="event-item__share__item__buttons__item">
          <i class="icon-good"></i> 赞
        </div>
        <div class="event-item__share__item__buttons__item">
          <i class="icon-comment"></i> 评论
        </div>
        <div class="event-item__share__item__buttons__item">
          <i class="icon-share"></i> 分享
        </div>
        <div class="event-item__share__item__buttons__item">
          <i class="icon-dot-h"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTime } from 'util/help';

export default {
  name: 'eventItem',
  props: {
    user: Object,
    event: Object,
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
      const times = getTime(time);
      const { year, month, date } = times;
      return ''.concat(year, '年', month, '月', date, '日');
    },
  },
};
</script>

