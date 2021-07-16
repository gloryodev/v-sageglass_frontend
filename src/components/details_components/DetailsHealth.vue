<template>
	<div v-if="health" class="project_table_container">
		<select-date
			v-if="selectDateFlag"
			:activeDate="activeDate"
			:handleDayClick="handleDayClick"
			:handleCancel="
        () => {
          selectDateFlag = false;
        }
      "
		/>
		<div class="project_table_shadow">
			<navigation-button icon="x" :handleClick="handleReset" />
		</div>
		<div class="details_tint_content">
			<div class="details_health_content_title_bar">
				<span
					:style="{
            borderBottomWidth: `${
              0.0004 * screenWidth < 1
                ? 1
                : 0.0004 * screenWidth
            }px`,
          }"
				>SYSTEM HEALTH</span>
			</div>
			<div
				class="health_stats_date_bar"
				:style="{
          borderBottomWidth: `${
            0.0004 * screenWidth < 1
              ? 1
              : 0.0004 * screenWidth
          }px`
        }"
			>
				<span @click="selectDateFlag = true">{{ activeDate.toDateString() }}</span>
				<div class="health_stats_date_updown" @click="selectDateFlag = true">
					<b-icon icon="chevron-compact-up" style="cursor:pointer"></b-icon>
					<b-icon icon="chevron-compact-down" style="cursor:pointer"></b-icon>
				</div>
				<div
					class="health_stats_date_live"
					:style="{
            borderWidth: `${
              0.00065 * screenWidth < 1
                ? 1
                : 0.00065 * screenWidth
            }px`
            }"
				>
					<span>LIVE</span>
					<span class="blinking"></span>
				</div>
				<div
					class="tint_date_timeline"
					:style="{
            borderLeftWidth: `${
              0.00065 * screenWidth < 1
                ? 1
                : 0.00065 * screenWidth
            }px`
          }"
				>
					<details-timeline
						:handleCriticalClick="handleTimeLineCriticalClick"
						:handleIndicatorClick="handleTimeLineIndicatorClick"
						:handleCurrentTime="handleCurrentTime"
					/>
				</div>
			</div>
			<div class="tint_time_bar">
				<span>{{ currentTime[0] > 11 ? "PM" : "AM" }}</span>
				<span class="tint_time_item" v-for="(time, index) in getTimeBarValues" :key="index">
					{{ time[0] == 0 || time[0] == 12 ? 12 : time[0] > 11 ? time[0] - 12 : time[0] }}:{{
					time[1] > 9 ? time[1] + " " : "0" + time[1]
					}}
				</span>
			</div>
			<div class="details_health_context">
				<div class="system_state_container">
					<system-state-item
						v-for="(component, index) in health.components"
						:key="index"
						:index="index"
						:state="component"
						:showHealthTouch="showHealthTouch"
					/>
				</div>
				<div v-if="health.events" class="details_health_context_bottom">
					<div class="details_health_context_bottom_left">
						<img
							:src="
                health.events.length == 0
                  ? require('@/assets/bg/health_items/health_ok.png')
                  : require('@/assets/bg/health_items/health_error.png')
              "
							alt
						/>
						<div>
							<div class="details_health_context_bottom_left_label_up">
								{{
								health.events.length == 0
								? "ALL SYSTEMS OK"
								: "CRITICAL ERROR"
								}}
							</div>
							<span class="details_health_context_bottom_left_label_down">
								{{
								health.events.length == 0
								? "NO ISSUES DETECTED"
								: health.events.length + " ISSUES DETECTED"
								}}
							</span>
						</div>
					</div>
					<div v-if="health.events.length > 0" class="details_health_context_bottom_right">
						<vue-custom-scrollbar class="health_scrollview">
							<div class="health_scroll_item" v-for="(event, index) in health.events" :key="index">
								<div class="health_event_table_date">{{ event.timestamp }}</div>
								<div class="health_event_table_type">
									<div
										:style="{
                      borderLeftWidth: `${
                        0.00065 * screenWidth < 1
                          ? 1
                          : 0.00065 * screenWidth
                      }px`,
                    }"
									></div>
									<img :src="imgSrcs[event.type]" alt />
								</div>
								<div class="health_event_table_text_container">
									<p class="health_event_table_text">{{ event.desc }}</p>
								</div>
							</div>
						</vue-custom-scrollbar>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import VueCustomScrollbar from "vue-custom-scrollbar";
	import NavigationButton from "../common_components/NavigationButton";
	import DetailsTimeLine from "../details_components/DetailsTimeLine";
	import SystemStateItem from "../details_components/health_components/SystemStateItem";
	import SelectDate from "../common_components/SelectDate";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";
	var moment = require('moment');

	export default {
		name: "details-health",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"details-timeline": DetailsTimeLine,
			"select-date": SelectDate,
			"system-state-item": SystemStateItem
		},
		props: {
			handleReset: Function,
			handleDetailsTint: Function,
			handleDetailsLocation: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function,
			showHealthTouch: Function
		},
		methods: {
			...mapActions(["setHealth"]),
			handleTimeLineCriticalClick() {
				// this.healthValue = this.health;
			},
			handleTimeLineIndicatorClick() {
				// this.healthValue = healthOk;
			},
			handleDayClick(year, month, day) {
				this.activeDate = new Date(year, month, day);
			},
			handleCurrentTime(time) {
				this.currentTime = time;
			}
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.innerHeight,
				screenWidth: window.innerWidth,
				// healthValue: this.health,
				imgSrcs: [
					require("@/assets/icons/normal_table.png"),
					require("@/assets/icons/man_table.png"),
					require("@/assets/icons/critical_table.png")
				],
				selectDateFlag: false,
				activeDate: new Date(),
				currentTime: [
					moment.tz(new Date(), this.$store.state.location.timezone).hour(),
					Math.round(moment.tz(new Date(), this.$store.state.location.timezone).minute() / 10) * 10
				]
			};
		},
		computed: {
			...mapState(["health"]),
			getTimeBarValues() {
				let resValues = [];
				let d = new Date();
				d.setHours(this.currentTime[0]);
				d.setMinutes(this.currentTime[1] - 10);
				let firstTime = d;
				firstTime.setMinutes(
					firstTime.getMinutes() - (firstTime.getMinutes() % 10) - 140
				);
				resValues.push([firstTime.getHours(), firstTime.getMinutes()]);
				for (let i = 0; i < 14; i++) {
					firstTime.setMinutes(firstTime.getMinutes() + 10);
					resValues.push([firstTime.getHours(), firstTime.getMinutes()]);
				}
				return resValues;
			}
		},
		mounted() {
			axios.get(constants.GET_HEALTH_URL).then(res => {
				this.setHealth({ data: res.data });
			});
		}
	};
</script>

<style>
.project_table_container {
	position: absolute;
	display: flex;
	align-items: center;
	z-index: 1;
	right: 0;
}
.project_table_shadow {
	height: 99.8vh;
	background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
	transform: matrix(-1, 0, 0, 1, 0, 0);
	z-index: 1;
	width: 8.4vw;
}
.details_tint_content {
	background: linear-gradient(
		180deg,
		rgba(24, 56, 77, 0.95) 0%,
		rgba(22, 82, 120, 0.95) 100%
	);
	height: 100vh;
	position: relative;
	width: 89.5vw;
}
.details_health_content_title_bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 8.7vh;
}
.details_health_content_title_bar > span {
	font-size: 1.25vw;
	line-height: 2.66vh;
	padding-top: 3vh;
	padding-bottom: 2.4vh;
	padding-left: 3.72vw;
	padding-right: 1.3vw;
	color: white;
	font-family: Gotham Pro;
	border-bottom-style: solid;
	border-bottom-color: #768a89;
	width: 100%;
	text-align: left;
}
.health_stats_date_bar {
	display: flex;
	align-items: center;
	height: 8.7vh;
	border-bottom-style: solid;
	border-bottom-color: #768a89;
}
.health_stats_date_bar > span {
	font-size: 1.25vw;
	line-height: 2.66vh;
	margin-left: 3.72vw;
	margin-right: 1vw;
	color: #00aec4;
	font-family: Gotham Pro;
	cursor: pointer;
}
.tint_time_bar {
	font-family: Gotham Light;
	width: 100%;
	background: #00477b;
	display: flex;
	align-items: center;
	height: 6.67vh;
	padding-left: 5.2vw;
}
.tint_time_bar > span:first-child {
	margin-right: 0.91vw;
	font-size: 0.91vw;
	color: rgba(255, 255, 255, 0.5);
}
.details_health_context {
	width: 100%;
	background-size: contain;
	position: relative;
	height: 74.5vh;
}
.system_state_container {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	padding-left: 1.95vw;
	padding-right: 1.95vw;
	padding-top: 2.6vh;
	padding-bottom: 2.6vh;
}
.details_health_context_bottom_left {
	display: flex;
	align-items: center;
	width: 40vw;
	height: 32.2vh;
	padding-left: 2.65vw;
	padding-right: 2.65vw;
}
.details_health_context_bottom_left > img {
	margin-right: 0.71vw;
	width: 9.3vw;
}
.details_health_context_bottom_left_label_up {
	font-family: Gotham Black;
	font-style: normal;
	font-weight: normal;
	font-size: 144px;
	line-height: 173px;
	color: #ffffff;
	font-size: 1.87vw;
	line-height: 4vh;
}
.details_health_context_bottom_left_label_down {
	font-family: Gotham Light;
	font-style: normal;
	font-weight: 300;
	font-size: 90px;
	line-height: 108px;
	color: #ffffff;
	font-size: 1.17vw;
	line-height: 2.5vh;
}
.details_health_context_bottom {
	display: flex;
}
.health_event_table_text {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	line-height: 140%;
	color: #ffffff;
	font-size: 0.91vw;
}
.health_event_table_date {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	text-align: right;
	color: #ffffff;
	opacity: 0.4;
	width: 5.06vw;
	font-size: 0.65vw;
	text-align: right;
}
.details_health_context_bottom_right {
	display: flex;
	justify-content: center;
	width: 49.5vw;
	height: 32.17vh;
	padding-top: 4.3vh;
	padding-bottom: 4.3vh;
}
.health_stats_date_updown {
	display: flex;
	flex-direction: column;
	font-size: 1vw;
	color: #768a89;
	margin-right: 1.56vw;
}
.health_stats_date_live {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.4vw;
	height: 2.31vh;
	border-radius: 0.13vw;
	margin-right: 1.56vw;
	border-style: solid;
	border-color: #ffdc38;
}
.health_stats_date_live > span:first-child {
	font-size: 0.65vw;
	font-family: Gotham Pro;
	margin-right: 0.5vw;
	color: #ffd32f;
}
.health_stats_date_live > span:nth-child(2) {
	background: #ffd32f;
	width: 0.5vw;
	height: 0.5vw;
	border-radius: 50%;
}
.tint_date_timeline {
	height: 100%;
	border-left-style: solid;
	border-left-color: #768a89;
	width: 61.9vw;
}
.tint_time_item {
	margin-right: 1.75vw;
	font-size: 0.91vw;
	color: white;
}
.health_scrollview {
	width: 38.7vw;
	height: 100%;
}
.health_scroll_item {
	display: flex;
	margin-bottom: 3vh;
}
.health_event_table_type {
	width: 2.35vw;
	position: relative;
}
.health_event_table_type > div {
	position: absolute;
	border-left-style: solid;
	border-left-color: rgba(197, 197, 197, 0.66);
	height: 160%;
	left: 49%;
	top: 30%;
}
.health_event_table_type > img {
	z-index: 1;
	width: 0.52vw;
}
.health_event_table_text_container {
	text-align: left;
	width: 26.36vw;
}
</style>
