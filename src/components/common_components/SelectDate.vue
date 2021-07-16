<template>
  <div class="select_date_content">
    <div class="select_date_button_bar">
      <div class="display_date_button">
        <span>{{new Date(activeYear, activeMonth, activeDay).toLocaleDateString()}}</span>
        <div>
          <b-icon icon="chevron-compact-up" style="cursor:pointer"></b-icon>
          <b-icon icon="chevron-compact-down" style="cursor:pointer"></b-icon>
        </div>
      </div>
      <div class="display_cancel_button" @click="handleCancel">
        <span>CANCEL</span>
      </div>
      <div class="display_update_button" @click="handleUpdate">
        <span>UPDATE</span>
      </div>
    </div>
    <div class="select_date_year_bar">
      <b-nav>
        <b-nav-item
          class="select_date_year_item"
          v-for="(year, index) in getYearsList"
          :key="index"
          :active="year === activeYear"
          :style="{background: `${year === activeYear ? '#033F6B' : 'none'}`}"
          @click="
            () => {
              activeYear = year;
            }
          "
        >{{ year }}</b-nav-item>
      </b-nav>
    </div>

    <div class="select_date_month_bar">
      <b-nav>
        <b-nav-item
          class="select_date_month_item"
          v-for="(month, index) in monthsList"
          :key="index"
          :active="index === activeMonth"
          :style="{
            background: `${index === activeMonth ? '#05538D' : 'none'}`
          }"
          @click="
            () => {
              activeMonth = index;
            }
          "
        >{{ month }}</b-nav-item>
      </b-nav>
    </div>

    <div class="select_date_day_bar">
      <b-nav>
        <b-nav-item
          class="select_date_day_item"
          v-for="(d, index) in Array.from({
            length: getDayCount(activeYear, activeMonth)
          })"
          :key="index"
          :active="index === activeDay - 1"
          :style="{
            background: `${index === activeDay - 1 ? '#033F6B' : 'none'}`
          }"
          @click="
            () => {
              activeDay = index + 1;
            }
          "
        >
          {{ index + 1 }}
          <span v-if="isWarning(new Date(activeYear, activeMonth, index + 1))"></span>
        </b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "select-date",
  components: {},
  props: {
    activeDate: Date,
    handleDayClick: Function,
    handleCancel: Function
  },
  methods: {
    getDayCount(year, month) {
      if (year % 4 === 0 && month === 1) {
        return 29;
      } else {
        return this.dayCountList[month];
      }
    },
    isWarning(date) {
      const strDate = date.toLocaleDateString();
      return this.warningDays.indexOf(strDate) > -1;
    },
    handleUpdate() {
      this.handleDayClick(this.activeYear, this.activeMonth, this.activeDay);
      this.handleCancel();
    }
  },
  data() {
    return {
      monthsList: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      dayCountList: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      activeYear: this.activeDate.getFullYear(),
      activeMonth: this.activeDate.getMonth(),
      activeDay: this.activeDate.getDate(),
      warningDays: ["2/13/2020", "2/20/2020"]
    };
  },
  computed: {
    getYearsList() {
      return Array.from({ length: 10 }).map((i, index) => {
        return new Date().getFullYear() - 9 + index;
      });
    }
  },
  mounted() {
  }
};
</script>

<style>
.select_date_content {
  position: absolute;
  right: 0;
  top: 0;
  background: radial-gradient(
    116.41% 116.41% at 26.68% -16.41%,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 29, 51, 0.95) 100%
  );
  z-index: 7;
  width: 89.5vw;
  height: 100%;
  padding-left: 3vw;
  padding-top: 9.1vh;
}
.display_date_button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #00e0ff;
  background: #022c4a;
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  cursor: pointer;
  font-size: 1vw;
  line-height: 2.2vh;
  width: 13.5vw;
  height: 5.8vh;
  padding: 2vh 1.5vw;
  border-radius: 0.2vw 0.2vw 0 0;
}
.display_date_button > div {
  display: flex;
  flex-direction: column;
  color: #768a89;
}
.display_cancel_button {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.78vw;
  line-height: 1.67vh;
  width: 6.2vw;
  height: 5.8vh;
  padding: 2vh 2.66vw;
}
.display_cancel_button:hover {
  opacity: 0.5;
}
.display_update_button {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.78vw;
  line-height: 1.67vh;
  /* width: 6.2vw; */
  height: 5.8vh;
  padding: 2vh 2.66vw;
  margin-left: 2vw;
  background: #033F6B;
}
.display_update_button:hover {
  opacity: 0.5;
}
.select_date_button_bar {
  display: flex;
}
.select_date_year_bar {
  width: 100%;
  background: #022c4a;
  display: flex;
  align-items: flex-end;
  padding-left: 5.5vw;
  height: 5.7vh;
}
.select_date_year_item {
  padding: 1.3vh 1.7vw;
  padding-bottom: auto;
  border-radius: 0.2vw 0.2vw 0 0;
  font-size: 0.78vw;
}
.select_date_year_item > a {
  padding: 0;
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #34c6cf !important;
}
.select_date_month_bar {
  width: 100%;
  background: #033f6b;
  display: flex;
  align-items: flex-end;
  padding-left: 5.52vw;
  height: 6.25vh;
}
.select_date_month_item {
  padding: 1.36vh 1.7vw;
  padding-bottom: auto;
  border-radius: 0.2vw 0.2vw 0 0;
  font-size: 0.78vw;
}
.select_date_month_item > a {
  padding: 0;
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #34c6cf !important;
}
.select_date_day_bar {
  width: 100%;
  background: #05538d;
  display: flex;
  align-items: flex-end;
  padding-left: 5.5vw;
  height: 6.2vh;
}
.select_date_day_item {
  padding: 1.36vh 0.65vw;
  padding-bottom: auto;
  border-radius: 0.2vw 0.2vw 0 0;
  font-size: 0.78vw;
  position: relative;
}
.select_date_day_item > span {
  width: 0.25vw;
  height: 0.25vw;
  border-radius: 50%;
  background: #fed843;
  position: absolute;
  top: 0.25vw;
  right: 0.25w;
}
.select_date_day_item > a {
  padding: 0;
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #34c6cf !important;
}
.select_date_day_item > a:hover,
.select_date_year_item > a:hover,
.select_date_month_item > a:hover {
  text-decoration: none !important;
}
</style>
