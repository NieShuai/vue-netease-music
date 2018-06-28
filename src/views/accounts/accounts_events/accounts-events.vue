<template>
  <div class="accounts__events" ref="eventsWrapper">
    <div class="accounts__events__content">
      <loading
        v-if="showLoading"
        show-in-middle></loading>
      <div
        v-else
        v-for="(event, index) in events"
        :key="index">
        <event-item
          :user="user"
          :event="event"></event-item>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import loading from 'components/loading/loading';
import eventItem from 'components/event_item/event-item';
import { mapGetters, mapActions } from 'vuex';
import { getEvent } from 'api/api';

export default {
  name: 'accountsEvents',
  data() {
    return {
      showLoading: true,
      user: null,
      events: [],
      scroll: null,
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
            const tmp = eve;
            tmp.parsedJson = JSON.parse(eve.json);
            this.events.push(tmp);
          });
        }
        this.showLoading = false;
        this.$nextTick(() => {
          if (this.$refs.eventsWrapper) {
            this.scroll = new BScroll(this.$refs.eventsWrapper);
          }
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
    loading,
    eventItem,
  },
};
</script>
