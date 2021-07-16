<template>
	<div v-if="tints" class="project_table_container">
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
			<div class="details_tint_content_title_bar">
				<span
					:style="{
            borderBottomWidth: `${
              0.0007 * screenHeight < 1
                ? 1
                : 0.0007 * screenHeight
            }px`,
          }"
				>TINT STATS</span>
			</div>
			<div
				class="tint_stats_date_bar"
				:style="{
          borderBottomWidth: `${
            0.0007 * screenHeight < 1
              ? 1
              : 0.0007 * screenHeight
          }px`
        }"
			>
				<span class="tint_date_label" @click="selectDateFlag = true">{{ formatDate(activeDate) }}</span>
				<div class="tint_date_updown_button" @click="selectDateFlag = true">
					<b-icon icon="chevron-compact-up" style="cursor:pointer"></b-icon>
					<b-icon icon="chevron-compact-down" style="cursor:pointer"></b-icon>
				</div>
				<div
					class="tint_date_live_div"
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
								borderLeft: `${
								0.00065 * screenWidth < 1
									? 1
									: 0.00065 * screenWidth
								}px`,
							}"
				>
					<details-timeline
						:eventTimes="criticalEventTimes"
						:handleCriticalClick="() => {}"
						:handleIndicatorClick="() => {}"
						:handleCurrentTime="handleCurrentTime"
					/>
				</div>
			</div>
			<div class="tint_time_bar">
				<span>{{ currentTime[0] > 11 ? "PM" : "AM" }}</span>
				<div class="tint_time_bar_item" v-for="(time, index) in getTimeBarValues" :key="index">
					{{ time[0] == 0 || time[0] == 12 ? 12 : time[0] > 11 ? time[0] - 12 : time[0] }}:{{
					time[1] > 9 ? time[1] + " " : "0" + time[1]
					}}
				</div>
			</div>
			<div class="details_tint_context">
				<vue-custom-scrollbar class="tint_items_scrollarea">
					<div class="tint_context_title" :style="{height: `${6.6 * tints.length}vh`}">
						<span
							class="tint_context_title_item"
							v-for="(title, index) in tintContextTitleList"
							:key="index"
						>{{ title }}</span>
					</div>
					<div class="tint_context_container">
						<div v-for="(tint, index) in tints" :key="index" class="tint_context_row">
							<tint-context-item
								v-for="(state, index) in tint.states"
								:key="index"
								:state="state"
								:type="
									state.manual
									? !tint.states[index - 1].manual &&
										!tint.states[index + 1].manual
										? 'man'
										: !tint.states[index - 1].manual &&
										tint.states[index + 1].manual
										? 'start'
										: tint.states[index - 1].manual &&
										!tint.states[index + 1].manual
										? 'end'
										: 'mid'
									: null
								"
							/>
						</div>
					</div>
				</vue-custom-scrollbar>
				<div class="context_bottom_border_div"></div>
				<div class="context_right_border_div"></div>
				<div v-if="tints" class="context_event_board">
					<events-board :tints="tints" />
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
	import TintContextItem from "../details_components/tint_components/TintContextItem";
	import EventsBoard from "../details_components/tint_components/EventsBoard";
	import SelectDate from "../common_components/SelectDate";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";
	var moment = require("moment");

	export default {
		name: "details-tint",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"details-timeline": DetailsTimeLine,
			"tint-context-item": TintContextItem,
			"events-board": EventsBoard,
			"select-date": SelectDate
		},
		props: {
			handleReset: Function,
			handleDetailsTint: Function,
			handleDetailsLocation: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function
		},
		methods: {
			...mapActions(["setTints"]),
			handleDayClick(year, month, day) {
				this.activeDate = new Date(year, month, day);
			},
			handleCurrentTime(time) {
				this.currentTime = time;
			},
			formatDate(date) {
				var monthNames = [
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
				];

				var day = date.getDate();
				var monthIndex = date.getMonth();
				var year = date.getFullYear();

				return monthNames[monthIndex] + " " + day + " " + year;
			}
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.innerHeight,
				screenWidth: window.innerWidth,
				selectDateFlag: false,
				activeDate: new Date(),
				currentTime: [
					moment.tz(new Date(), this.$store.state.location.timezone).hour(),
					Math.round(
						moment.tz(new Date(), this.$store.state.location.timezone).minute() /
							10
					) * 10
				]
			};
		},
		computed: {
			...mapState(["tints"]),
			tintContextTitleList() {
				return this.tints.map(tint => tint.zone_name);
			},
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
			},
			criticalEventTimes() {
				let eventTimes = [];
				this.tints.forEach(zoneTints => {
					zoneTints.states.forEach(tint => {
						if (tint.event) {
							const tintTime = new Date(tint.event.timestamp);
							if (
								tintTime.getFullYear() == this.activeDate.getFullYear() &&
								tintTime.getMonth() == this.activeDate.getMonth() &&
								tintTime.getDate() == this.activeDate.getDate()
							) {
								eventTimes.push(tintTime);
							}
						}
					});
				});
				return eventTimes;
			}
		},
		mounted() {
			axios.get(constants.GET_TINTS_URL).then(res => {
				this.setTints({ data: res.data });
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
.details_tint_content_title_bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 8.7vh;
}
.details_tint_content_title_bar > span {
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
.tint_stats_date_bar {
	display: flex;
	align-items: center;
	height: 8.7vh;
	border-bottom-style: solid;
	border-bottom-color: #768a89;
}
.tint_time_bar {
	font-family: Gotham Light;
	width: 100%;
	background: #00477b;
	display: flex;
	align-items: center;
	height: 6.7vh;
	padding-left: 5.2vw;
}
.tint_time_bar > span:first-child {
	margin-right: 0.91vw;
	font-size: 0.91vw;
	color: rgba(255, 255, 255, 0.5);
}
.details_tint_context {
	width: 100%;
	background-image: url("../../assets/bg/bg-tint.png");
	background-size: contain;
	position: relative;
	height: 74.5vh;
}
.tint_context_title {
	/* position: absolute; */
	background: #00477b;
	/* display: flex;
	flex-direction: column;
	justify-content: space-between; */
	color: white;
	width: 6vw;
	/* height: 46vh; */
	/* left: 2.5vw; */
	padding-left: 1.04vw;
	padding-right: 1.04vw;
	/* padding-top: 1.62vh;
	padding-bottom: 1.62vh; */
}
.tint_context_container {
	/* position: absolute; */
	top: 0;
	/* display: flex;
	flex-direction: column;
	justify-content: space-between; */
	width: 56.12vw;
	height: 45.8vh;
	/* left: 8.6vw; */
}
.tint_context_row {
	margin-bottom: 0.2vh;
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.context_bottom_border_div {
	position: absolute;
	background: #00477b;
	width: 65vw;
	height: 4.65vh;
	left: 2.46vw;
	top: 46vh;
}
.context_right_border_div {
	position: absolute;
	background: #00477b;
	width: 2.63vw;
	height: 46.83vh;
	left: 64.8vw;
}
.context_event_board {
	position: absolute;
	background: #00355c;
	width: 16.74vw;
	height: 50.7vh;
	left: 67.45vw;
	border-top-right-radius: 0.2vw;
	border-bottom-right-radius: 0.2vw;
}
.tint_date_label {
	font-size: 1.25vw;
	line-height: 2.66vh;
	margin-left: 3.72vw;
	margin-right: 1vw;
	color: #00aec4;
	font-family: Gotham Pro;
	cursor: pointer;
}
.tint_date_updown_button {
	display: flex;
	flex-direction: column;
	font-size: 1vw;
	color: #768a89;
	margin-right: 1.56vw;
}
.tint_date_live_div {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.38vw;
	height: 2.31vh;
	border-radius: 0.13vw;
	margin-right: 1.56vw;
	border-style: solid;
	border-color: #ffdc38;
}
.tint_date_live_div > span:first-child {
	font-size: 0.65vw;
	font-family: Gotham Pro;
	margin-right: 0.5vw;
	color: #ffd32f;
}
.tint_date_live_div > span:nth-child(2) {
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
.tint_time_bar_item {
	margin-right: 1.75vw;
	font-size: 0.91vw;
	color: white;
	width: 2vw;
}
.tint_context_title_item {
	margin-bottom: 0.2vh;
	font-size: 0.5vw;
	line-height: 1.1vh;
	height: 6.4vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tint_items_scrollarea {
	position: absolute !important;
	display: flex;
	left: 2.5vw;
	width: 62.12vw;
	height: 46vh;
}
</style>
