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
			<div class="health_touch_title_bar">
				<span>SYSTEM HEALTH</span>
				<div class="health_touch_chevron">
					<b-icon icon="chevron-right"></b-icon>
				</div>
				<span class="health_touch_wall_name">{{health.components[wallIndex].name}}</span>
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
			<div class="health_touch_time_bar">
				<span>{{ new Date().getHours() > 11 ? "PM" : "AM" }}</span>
				<div class="health_touch_time_item" v-for="(time, index) in getTimeBarValues" :key="index">
					{{ time[0] == 0 || time[0] == 12 ? 12 :time[0] > 11 ? time[0] - 12 : time[0] }}:{{
					time[1] > 9 ? time[1] + " " : "0" + time[1]
					}}
				</div>
			</div>
			<div class="health_touch_context">
				<div class="health_touch_bar_chart_container">
					<bar-chart
						v-if="wallPanelData && state.indexOf(3) > -1"
						class="health_touch_bar_chart"
						:chartdata="powerBarChartData"
						:options="powerBarChartOptions"
					/>
				</div>
				<div class="health_touch_line_chart_container">
					<line-chart
						v-if="wallPanelData && state.indexOf(3) > -1"
						class="health_touch_line_chart"
						:chartdata="powerChartData"
						:options="powerChartOptions"
					/>
				</div>
				<div class="health_touch_line_chart_container">
					<line-chart
						v-if="wallPanelData && state.indexOf(0) > -1"
						class="health_touch_line_chart"
						:chartdata="voltageChartData"
						:options="voltageChartOptions"
					/>
				</div>
				<div class="health_touch_line_chart_container">
					<line-chart
						v-if="wallPanelData && state.indexOf(1) > -1"
						class="health_touch_line_chart"
						:chartdata="connectivityChartData"
						:options="connectivityChartOptions"
					/>
				</div>
				<div class="health_touch_line_chart_container">
					<line-chart
						v-if="wallPanelData && state.indexOf(2) > -1"
						class="health_touch_line_chart"
						:chartdata="wattageChartData"
						:options="wattageChartOptions"
					/>
				</div>
				<div class="health_touch_line_chart_container">
					<div
						v-if="wallPanelData"
						class="health_touch_chart_marker"
						@mousemove="handleChartMarker"
						@mouseleave="chartMarkerFlag=false"
					>
						<chart-marker
							v-if="chartMarkerFlag"
							:markerMarginLeft="chartMarkerLeft"
							:data="getMarkerData"
							:reverse="chartMarkerIndex > wallPanelData.voltage.length - 4"
						/>
					</div>
				</div>
				<div class="health_touch_bar_background"></div>
				<div class="health_touch_devider"></div>

				<div v-if="wallPanelData" class="health_touch_quote_bar">
					<div v-for="(item, index) in wallPanelData.voltage" :key="'voltage' + index">
						<div
							v-if="item.error"
							class="health_touch_quote_item"
							:style="{
                  left: `${4 + index * 5.9}vw`, 
              }"
						>
							<span>{{getTimeBarValues[index][0] == 0 || getTimeBarValues[index][0] == 12 ? 12 : getTimeBarValues[index][0] > 12 ? getTimeBarValues[index][0] - 12 : getTimeBarValues[index][0] }}:{{getTimeBarValues[index][1] > 9 ? getTimeBarValues[index][1] + " " : "0" + getTimeBarValues[index][1]}} {{getTimeBarValues[index][0] > 11 ? 'PM' : 'AM'}}</span>
							<p>{{item.error}}</p>
						</div>
					</div>
					<div v-for="(item, index) in wallPanelData.connectivity" :key="'connectivity' + index">
						<div
							v-if="item.error"
							class="health_touch_quote_item"
							:style="{
                  left: `${4 + index * 5.9}vw`, 
              }"
						>
							<span>{{getTimeBarValues[index][0] == 0 || getTimeBarValues[index][0] == 12 ? 12 : getTimeBarValues[index][0] > 12 ? getTimeBarValues[index][0] - 12 : getTimeBarValues[index][0] }}:{{getTimeBarValues[index][1] > 9 ? getTimeBarValues[index][1] + " " : "0" + getTimeBarValues[index][1]}} {{getTimeBarValues[index][0] > 11 ? 'PM' : 'AM'}}</span>
							<p>{{item.error}}</p>
						</div>
					</div>
					<div v-for="(item, index) in wallPanelData.wattage" :key="'wattage' + index">
						<div
							v-if="item.error"
							class="health_touch_quote_item"
							:style="{
                  left: `${4 + index * 5.9}vw`, 
              }"
						>
							<span>{{getTimeBarValues[index][0] == 0 || getTimeBarValues[index][0] == 12 ? 12 : getTimeBarValues[index][0] > 12 ? getTimeBarValues[index][0] - 12 : getTimeBarValues[index][0] }}:{{getTimeBarValues[index][1] > 9 ? getTimeBarValues[index][1] + " " : "0" + getTimeBarValues[index][1]}} {{getTimeBarValues[index][0] > 11 ? 'PM' : 'AM'}}</span>
							<p>{{item.error}}</p>
						</div>
					</div>
					<div v-for="(item, index) in wallPanelData.power" :key="'power' + index">
						<div
							v-if="item.error"
							class="health_touch_quote_item"
							:style="{
                  left: `${4 + index * 5.9}vw`, 
              }"
						>
							<span>{{getTimeBarValues[index][0] == 0 || getTimeBarValues[index][0] == 12 ? 12 : getTimeBarValues[index][0] > 12 ? getTimeBarValues[index][0] - 12 : getTimeBarValues[index][0] }}:{{getTimeBarValues[index][1] > 9 ? getTimeBarValues[index][1] + " " : "0" + getTimeBarValues[index][1]}} {{getTimeBarValues[index][0] > 11 ? 'PM' : 'AM'}}</span>
							<p>{{item.error}}</p>
						</div>
					</div>
				</div>
				<div class="health_touch_checkbox_container">
					<div class="health_touch_checkbox_bar">
						<checkbox
							class="health_touch_check"
							:size="0.03356 * screenHeight"
							:fontSize="0.0162 * screenHeight"
							color="#FFD32F"
							v-model="state"
							:value="0"
						>Voltage</checkbox>
						<checkbox
							class="health_touch_check"
							:size="0.03356 * screenHeight"
							:fontSize="0.0162 * screenHeight"
							color="#FF5555"
							v-model="state"
							:value="1"
						>Connectivity</checkbox>
						<checkbox
							class="health_touch_check"
							:size="0.03356 * screenHeight"
							:fontSize="0.0162 * screenHeight"
							color="#A1EB42"
							v-model="state"
							:value="2"
						>Wattage</checkbox>
						<checkbox
							class="health_touch_check"
							:size="0.03356 * screenHeight"
							:fontSize="0.0162 * screenHeight"
							color="#19B8D7"
							v-model="state"
							:value="3"
						>Power Intensity</checkbox>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Checkbox from "vue-material-checkbox";
	import NavigationButton from "../../common_components/NavigationButton";
	import DetailsTimeLine from "../../details_components/DetailsTimeLine";
	import SelectDate from "../../common_components/SelectDate";
	import LineChart from "./LineChart";
	import BarChart from "./BarChart";
	import ChartMarker from "./ChartMarker";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";
	var moment = require('moment');

	export default {
		name: "health-wall-touch",
		components: {
			"navigation-button": NavigationButton,
			"details-timeline": DetailsTimeLine,
			"select-date": SelectDate,
			checkbox: Checkbox,
			"line-chart": LineChart,
			"bar-chart": BarChart,
			"chart-marker": ChartMarker
		},
		props: {
			handleReset: Function,
			handleDetailsTint: Function,
			handleDetailsLocation: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function,
			wallIndex: Number
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
			handleChartMarker(e) {
				if (
					e.screenX - (806 / 7680) * window.innerWidth >
						(3.5 * window.innerWidth) / 100 &&
					e.screenX - (806 / 7680) * window.innerWidth < 0.86 * window.innerWidth
				) {
					const coordX = e.screenX - (806 / 7680) * window.innerWidth;
					const coordDelta =
						(0.825 * window.innerWidth) / (this.wallPanelData.voltage.length - 1);
					this.chartMarkerIndex = Math.round(
						(coordX - 0.035 * window.innerWidth) / coordDelta
					);
					this.chartMarkerLeft =
						this.chartMarkerIndex * coordDelta + 0.035 * window.innerWidth;
				}
				this.chartMarkerFlag = true;
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
				state: [0, 1, 2, 3],
				chartMarkerLeft: (3.5 * window.innerWidth) / 100,
				chartMarkerIndex: 0,
				chartMarkerFlag: false,
				currentTime: [
					moment.tz(new Date(), this.$store.state.location.timezone).hour(),
					Math.round(moment.tz(new Date(), this.$store.state.location.timezone).minute() / 10) * 10
				],
				voltageChartData: {
					labels: [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15"
					],
					datasets: [
						{
							label: "",
							curve: false,
							backgroundColor: "rgba(0, 0, 0, 0)",
							borderColor: "#FFDC38",
							borderWidth: (10 / 7680) * window.innerWidth,
							data: [],
							steppedLine: false,
							pointBackgroundColor: "rgba(0, 0, 0, 0)",
							pointBorderColor: "rgba(0, 0, 0, 0)",
							cubicInterpolationMode: "monotone",
							tension: 0.4
						}
					]
				},
				voltageChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: false,
								ticks: {
									min: 15,
									max: 35
								}
							}
						]
					}
				},
				connectivityChartData: {
					labels: [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15"
					],
					datasets: [
						{
							label: "",
							curve: false,
							backgroundColor: "rgba(0, 0, 0, 0)",
							borderColor: "#ff6969",
							borderWidth: (10 / 7680) * window.innerWidth,
							data: [],
							steppedLine: false,
							pointBackgroundColor: "rgba(0, 0, 0, 0)",
							pointBorderColor: "rgba(0, 0, 0, 0)",
							cubicInterpolationMode: "monotone",
							tension: 0
						}
					]
				},
				connectivityChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: false,
								ticks: {
									min: 0,
									max: 10
								}
							}
						]
					}
				},
				wattageChartData: {
					labels: [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15"
					],
					datasets: [
						{
							label: "",
							curve: false,
							backgroundColor: "rgba(0, 0, 0, 0)",
							borderColor: "#2FCA5A",
							borderWidth: (10 / 7680) * window.innerWidth,
							data: [],
							steppedLine: false,
							pointBackgroundColor: "rgba(0, 0, 0, 0)",
							pointBorderColor: "rgba(0, 0, 0, 0)",
							cubicInterpolationMode: "monotone",
							tension: 0.4
						}
					]
				},
				wattageChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: false,
								ticks: {
									min: 30,
									max: 50
								}
							}
						]
					}
				},
				powerChartData: {
					labels: [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15"
					],
					datasets: [
						{
							label: "",
							curve: false,
							backgroundColor: "rgba(0, 0, 0, 0)",
							borderColor: "rgba(0, 0, 0, 0)",
							borderWidth: 1,
							data: [],
							steppedLine: false,
							pointBackgroundColor: "rgba(0, 0, 0, 0)",
							pointBorderColor: "rgba(0, 0, 0, 0)",
							cubicInterpolationMode: "monotone",
							tension: 0.4
						}
					]
				},
				powerChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: false,
								ticks: {
									min: 0,
									max: 10
								}
							}
						]
					}
				},
				powerBarChartData: {
					labels: [
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9",
						"10",
						"11",
						"12",
						"13",
						"14",
						"15"
					],
					datasets: [
						{
							label: "",
							curve: false,
							backgroundColor: "#165278",
							borderColor: "#165278",
							borderWidth: 1,
							data: [],
							steppedLine: false,
							pointBackgroundColor: "rgba(0, 0, 0, 0)",
							pointBorderColor: "rgba(0, 0, 0, 0)",
							cubicInterpolationMode: "monotone",
							tension: 0.4
						}
					]
				},
				powerBarChartOptions: {
					responsive: true,
					maintainAspectRatio: false,
					legend: false,
					scales: {
						xAxes: [
							{
								display: false
							}
						],
						yAxes: [
							{
								display: false,
								ticks: {
									min: 0,
									max: 10
								}
							}
						]
					}
				},
				wallPanelData: null
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
			},
			getMarkerData() {
				return {
					time: this.getTimeBarValues[this.chartMarkerIndex],
					voltage: this.wallPanelData.voltage[this.chartMarkerIndex],
					connectivity: this.wallPanelData.connectivity[this.chartMarkerIndex],
					wattage: this.wallPanelData.wattage[this.chartMarkerIndex],
					power: this.wallPanelData.power[this.chartMarkerIndex]
				};
			}
		},
		mounted() {
			axios.get(constants.GET_WALLPANEL_URL).then(res => {
				const errorImage = new Image();
				errorImage.src = require("@/assets/bg/health_items/health_error.png");
				errorImage.width = (252 / 7680) * window.innerWidth;
				errorImage.height = (252 / 7680) * window.innerWidth;
				this.voltageChartData.datasets[0].data = res.data.voltage.map(elem => {
					return elem.measurement;
				});
				this.voltageChartData.datasets[0].pointStyle = res.data.voltage.map(
					elem => {
						if (elem.error) {
							return errorImage;
						} else {
							return "";
						}
					}
				);
				this.connectivityChartData.datasets[0].data = res.data.connectivity.map(
					elem => {
						return elem.measurement;
					}
				);
				this.connectivityChartData.datasets[0].pointStyle = res.data.connectivity.map(
					elem => {
						if (elem.error) {
							return errorImage;
						} else {
							return "";
						}
					}
				);
				this.wattageChartData.datasets[0].data = res.data.wattage.map(elem => {
					return elem.measurement;
				});
				this.wattageChartData.datasets[0].pointStyle = res.data.wattage.map(
					elem => {
						if (elem.error) {
							return errorImage;
						} else {
							return "";
						}
					}
				);
				this.powerChartData.datasets[0].data = res.data.power.map(elem => {
					return elem.measurement;
				});
				this.powerBarChartData.datasets[0].data = res.data.power.map(elem => {
					return elem.measurement;
				});
				this.powerChartData.datasets[0].pointStyle = res.data.power.map(elem => {
					if (elem.error) {
						return errorImage;
					} else {
						return "";
					}
				});
				this.wallPanelData = res.data;
				// console.log(res.data);
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
.health_touch_title_bar {
	display: flex;
	align-items: center;
	width: 100%;
	height: 8.7vh;
	border-bottom-style: solid;
	border-bottom-color: #768a89;
	border-bottom-width: 0.04vw;
}
.health_touch_title_bar > span {
	font-size: 1.25vw;
	line-height: 2.66vh;
	padding-top: 3vh;
	padding-bottom: 2.4vh;
	padding-left: 3.72vw;
	padding-right: 1.3vw;
	color: white;
	font-family: Gotham Pro;
	text-align: left;
}
.health_touch_chevron {
	color: #00aec4;
	display: flex;
}
.health_touch_title_bar > .health_touch_wall_name {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	font-size: 1.25vw;
	line-height: 2.66vh;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.6);
	display: flex;
	padding-left: 2.6vw;
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
.health_touch_time_bar {
	font-family: Gotham Light;
	width: 100%;
	background: #00477b;
	display: flex;
	align-items: center;
	height: 6.67vh;
	padding-left: 1vw;
}
.health_touch_time_bar > span:first-child {
	margin-right: 0.91vw;
	font-size: 0.91vw;
	color: rgba(255, 255, 255, 0.5);
}
.health_touch_context {
	width: 100%;
	position: relative;
	height: 74.5vh;
	display: contents;
}
.health_touch_bar_background {
	width: 100%;
	height: 8.07vh;
	margin-top: 14.49vh;
	/* background-image: url("../../../assets/images/radiance_chart.png"); */
	background-repeat: repeat-x;
	background-size: contain;
}
.health_touch_devider {
	width: 100%;
	height: 0.88vh;
	margin-top: 1.55vh;
	margin-bottom: 2.13vh;
	background: #17435e;
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
.health_touch_time_item {
	display: flex;
	margin-right: 2.8vw;
	font-size: 0.91vw;
	min-width: 3vw;
	color: white;
}
.health_touch_quote_bar {
	width: 100%;
	height: 12.85vh;
	position: relative;
}
.health_touch_quote_item {
	position: absolute;
	text-align: left;
	top: 0;
	width: 8.5vw;
	height: 100%;
	border-left: 0.065vw solid black;
	padding-top: 1.45vh;
	padding-left: 1.04vw;
}
.health_touch_quote_item > span {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	font-size: 0.91vw;
	color: rgba(255, 255, 255, 0.5);
	margin-bottom: 1.6vh;
}
.health_touch_quote_item > p {
	font-family: Gotham pro;
	font-style: normal;
	font-weight: 300;
	font-size: 0.91vw;
	line-height: 2.26vh;
	color: #ffffff;
	margin-bottom: 0;
}
.health_touch_checkbox_container {
	margin-top: 10.68vh;
	width: 100%;
	height: 7.8vh;
	display: flex;
	justify-content: center;
}
.health_touch_checkbox_bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 55.23vw;
	height: 100%;
	padding-left: 2.6vw;
	padding-right: 2.6vw;
	border-top: 0.052vw solid #040404;
}
.health_touch_check {
	color: white;
	font-family: Gotham Light;
}
.health_touch_check label {
	margin-bottom: 0;
}
.health_touch_check.m-chckbox--container {
	line-height: 0;
}
.health_touch_check:first-child .m-chckbox--group {
	background: #ffd32f;
	border-style: solid;
	/* border-color: #00aec4; */
	box-sizing: border-box;
}
.health_touch_check:nth-child(2) .m-chckbox--group {
	background: #ff5555;
	border-style: solid;
	/* border-color: #00aec4; */
	box-sizing: border-box;
}
.health_touch_check:nth-child(3) .m-chckbox--group {
	background: #a1eb42;
	border-style: solid;
	/* border-color: #00aec4; */
	box-sizing: border-box;
}
.health_touch_check:nth-child(4) .m-chckbox--group {
	background: #19b8d7;
	border-style: solid;
	/* border-color: #00aec4; */
	box-sizing: border-box;
}
.health_touch_check .m-chckbox--group path {
	fill: black;
}
.health_touch_bar_chart_container {
	position: absolute;
	width: 100%;
	height: 23.6vh;
	display: flex;
}
.health_touch_bar_chart {
	width: 100%;
	height: 100%;
	padding-left: 1vw;
	padding-right: 0.8vw;
}
.health_touch_line_chart_container {
	position: absolute;
	width: 100%;
	height: 23.6vh;
	display: flex;
}
.health_touch_line_chart {
	width: 100%;
	height: 100%;
	padding-left: 3.5vw;
	padding-right: 3vw;
}
.health_touch_chart_marker {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
