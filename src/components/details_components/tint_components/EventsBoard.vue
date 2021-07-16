<template>
  <div class="events_board_container">
    <div class="events_board_header">
      <toggle-button
        @change="handleSwitch"
        :width="90 / 7680 * screenWidth"
        :height="58 / 4320 * screenHeight"
        :color="{
          checked: '#0B84DD',
          unchecked: 'rgba(11, 132, 221, 0.66)',
          disabled: '#CCCCCC'
        }"
        :switch-color="{
          checked: 'white',
          unchecked: 'rgba(11, 132, 221, 0.66)'
        }"
        :margin="0"
      />
      <span class="event_board_title_label">{{ getEvents.length }} EVENTS</span>
      <b-icon class="event_board_title_icon" icon="chevron-up" />
    </div>
    <vue-custom-scrollbar class="events_board_scrollarea">
      <div v-for="(event, index) in getEvents" :key="index" style="display: flex;">
        <div class="events_board_icon_div">
          <div
            class="events_board_item_line"
            :style="{
              borderLeftWidth: 
                `${0.0005 * screenWidth < 1
                  ? 1
                  : 0.0005 * screenWidth}px`
            }"
          ></div>
          <img
            :src="imgSrcs[event.type]"
            alt
            :style="{
              width: `0.52vw`,
              zIndex: 1
            }"
          />
        </div>
        <div
          :style="{
            textAlign: 'left',
            width: `11.6vw`
          }"
        >
          <span
            class="event_table_date"
            :style="{
              fontSize: `0.52vw`
            }"
          >{{ event.timestamp }}</span>
          <p
            class="event_table_text"
            :style="{
              fontSize: `0.65vw`
            }"
          >{{ event.desc }}</p>
        </div>
      </div>
    </vue-custom-scrollbar>
  </div>
</template>

<script>
import VueCustomScrollbar from "vue-custom-scrollbar";

export default {
  name: "events_board",
  components: {
    "vue-custom-scrollbar": VueCustomScrollbar
  },
  props: {
    tints: Array
  },
  data() {
    return {
      imgSrcs: [
        require("@/assets/icons/normal_table.png"),
        require("@/assets/icons/man_table.png"),
        require("@/assets/icons/critical_table.png")
      ], 
      screenWidth: window.innerWidth, 
      screenHeight: window.innerHeight
    };
  },
  computed: {
    getEvents() {
      let res = [];
      this.tints.forEach(tint => {
        tint.states.forEach(state => {
          if (state.event) {
            res.push(state.event);
          }
        });
      });
      return res;
    }
  },
  methods: {
    handleSwitch(event) {
      console.log(event.value);
    }
  }
};
</script>

<style>
.events_board_container {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.events_board_header {
  border-bottom: 1px solid #0b84dd;
  display: flex;
  align-items: center;
  height: 6.16vh;
  padding-left: 1.25vw;
  font-size: 0.78vw;
}
.vue-js-switch {
  margin-bottom: 0;
}
.events_board_header {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #0b84dd;
}
.event_board_title_label {
  margin-left: 1.16vw;
  margin-right: 0.77vw;
}
.event_board_title_icon {
  cursor: pointer;
}
.event_table_date {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.4);
}
.event_table_text {
  font-family: Gotham;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
  color: #ffffff;
}
.avatar_right_text {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  font-size: 60px;
  line-height: 150%;
  color: #00e0ff;
  background: #095186;
}
.critical_error_text {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #ff5555;
}
.events_board_scrollarea {
  width: 100%;
  height: 44.56vh;
  padding-top: 1.64vh;
  padding-bottom: 1.64vh;
}
.events_board_icon_div {
  width: 3vw;
  position: relative;
}
.events_board_item_line {
  position: absolute;
  border-left-style: solid;
  border-left-color: rgba(7, 105, 177, 0.4);
  height: 80%;
  left: 49%;
  top: 30%;
  z-index: 0;
}
</style>