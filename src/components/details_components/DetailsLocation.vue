<template>
	<div v-if="location" class="project_table_container">
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
		<div class="details_location_content">
			<div
				class="details_location_content_left"
				:style="{
					visibility: showDataFlag ? 'visible' : 'hidden', 
				}"
			>
				<div class="location_lightzone_up" v-if="showDataFlag">
					<div class="location_lightzone_up_content">
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<span class="location_lightzone_up_content_title_large">{{ currentProject.product}}</span>
							<span class="location_lightzone_up_content_title_small">PRODUCT USED</span>
						</div>
						<p
							class="location_lightzone_up_content_context"
							:style="{
								borderBottomWidth: `${
								0.0005 * screenWidth < 1
									? 1
									: 0.0005 * screenWidth
								}px`,
							}"
						> {{ currentProject.product == "LightZone" ?
							"SageGlass LightZone® provides you with the ability to create up to three tint zones within a single pane of glass to let in exactly the right amount of light and block the sun as needed."
							: currentProject.product == "Harmony" ?
							"SageGlass Harmony™ is a totally unique glazing solution that provides precise glare and daylight control and a smooth visual aesthetic through a natural, seamless in-pane tint transition."
							: "By dynamically changing tint in response to the sun, SageGlass® increases occupant comfort while maintaining a connection to the outdoors without the need for blinds or shades."
						}}
						</p>
						<div class="location_lightzone_up_content_bottom_container">
							<div class="location_lightzone_up_content_bottom_left">
								<span>PROJECT NO.</span>
								<span>{{ currentProject.project_number }}</span>
							</div>
							<div class="location_lightzone_up_content_bottom_right">SEE ORDERS</div>
						</div>
					</div>
				</div>
				<div class="location_lightzone_down" v-if="showDataFlag">
					<div class="location_lightzone_down_content">
						<span>PROJECT MANAGER</span>
						<div class="location_lightzone_personal_info">
							<img :src="photos[currentProject.manager.name]" style="border-radius: 1000px;" />
							<div class="location_lightzone_down_userinfo">
								<span>{{ currentProject.manager.name.split(" ")[0] + " " }}</span>
								<span>{{ currentProject.manager.name.split(/ (.+)/)[1] }}</span>
								<br />
								<p>
									{{ 8 }} years at SageGlass
									<br />
									Executed over
									{{ 30 }} projects.
									<br />
									Contact: {{ currentProject.manager.phone ? currentProject.manager.phone : "507-331-4848" }}
								</p>
							</div>
						</div>
						<div
							class="location_personal_info_divider"
							:style="{
                borderBottomWidth: `${
                  0.00052 * screenWidth < 1
                    ? 1
                    : 0.00052 * screenWidth
                }px`,
              }"
						></div>
						<div class="location_project_status_title">
							<span>PROJECT STATUS</span>
							<span>{{ Date.parse(currentProject.finish_date) &lt; Date.now() ? "Complete" : 
							currentProject.completed == 100 ? "Awaiting Commissioning" : "In Production" }}</span>
						</div>
						<div
							class="details_location_project_status_content"
							:style="{
                borderBottomWidth: `${
                  0.00052 * screenWidth < 1
                    ? 1
                    : 0.00052 * screenWidth
                }px`,
              }"
						>
							<div class="details_location_project_status_item">
								<span>IGUs</span>
								<span>{{ numberWithCommas(currentProject.igus) }}</span>
							</div>
							<div
								class="status_devider"
								:style="{
                  borderLeft: `${
                    0.00092 * screenHeight < 1
                      ? 1
                      : 0.00092 * screenHeight
                  }px solid rgba(237, 237, 237, 0.2)`,
                  height: '100%'
                }"
							></div>
							<div class="details_location_project_status_item">
								<span>Sq. Ft.</span>
								<span>{{ numberWithCommas(currentProject.sqft) }}</span>
							</div>
							<div
								class="status_devider"
								:style="{
                  borderLeft: `${
                    0.00092 * screenHeight < 1
                      ? 1
                      : 0.00092 * screenHeight
                  }px solid rgba(237, 237, 237, 0.2)`,
                  height: '100%'
                }"
							></div>
							<div class="details_location_project_status_item">
								<span>Product</span>
								<span>{{ currentProject.product }}</span>
							</div>
							<div
								class="status_devider"
								:style="{
                  borderLeft: `${
                    0.00092 * screenHeight < 1
                      ? 1
                      : 0.00092 * screenHeight
                  }px solid rgba(237, 237, 237, 0.2)`,
                  height: '100%'
                }"
							></div>
							<div class="details_location_project_status_item">
								<span>Signal Strength</span>
								<span>{{currentProject.signal == null ? 'N/A' : currentProject.signal == 0 ? 'Low' : currentProject.signal == 1 ? 'Good' : 'Excellent'}}</span>
							</div>
						</div>
						<div class="details_location_project_status_date">
							<span>Purchased: {{ formatDate(new Date(currentProject.purchase_date)) }}</span>
							<span
								style="display: inline-block; width: 2vw"
							></span>
							<span v-if="currentProject.finish_date">Finished: {{ formatDate(new Date(currentProject.finish_date)) }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="details_location_content_right">
				<div class="details_location_content_right_title_bar">
					<span
						v-if="showDataFlag"
						:style="{
              borderBottomWidth: `${
                0.0007 * screenHeight < 1
                  ? 1
                  : 0.0007 * screenHeight
              }px`
            }"
					>LOCATION STATS</span>
					<div
						class="details_location_arrow_button"
						:style="{
              borderLeftWidth: `${
                0.0007 * screenHeight < 1
                  ? 1
                  : 0.0007 * screenHeight
              }px`,
            }"
						@click="handleArrowClick"
					>
						<b-icon icon="chevron-right"></b-icon>
					</div>
				</div>
				<div class="location_stats_date_bar" v-if="showDataFlag">
					<span @click="selectDateFlag = true">{{ formatDate(activeDate) }}</span>
					<div class="location_stats_date_bar_updown_button" @click="selectDateFlag = true">
						<b-icon icon="chevron-compact-up" style="cursor:pointer"></b-icon>
						<b-icon icon="chevron-compact-down" style="cursor:pointer"></b-icon>
					</div>
					<div
						class="location_stats_date_bar_live"
						:style="{
              borderWidth: `${
                0.00065 * screenWidth < 1
                  ? 1
                  : 0.00065 * screenWidth
              }px`
            }"
					>
						<span class="location_stats_date_bar_live_label">LIVE</span>
						<span class="location_stats_date_bar_live_button blinking"></span>
					</div>
				</div>

            <lux :lux="this.lux.toLocaleString()" :dataFlag="showDataFlag" v-if="showDataFlag" />
            <temperature :temperature="String(location.currently.temperature)" :dataFlag="showDataFlag" v-if="showDataFlag" />
            <radiance :radiance="String(this.rad)" :dataFlag="showDataFlag" v-if="showDataFlag" />
            <weather :weather="location" :dataFlag="showDataFlag" v-if="showDataFlag" />
			</div>
			<location-carousel v-if="!showDataFlag" />
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import NavigationButton from "../common_components/NavigationButton";
	import Lux from "./location_components/Lux";
	import Temperature from "./location_components/Temperature";
	import Radiance from "./location_components/Radiance";
	import Weather from "./location_components/Weather";
	import SelectDate from "../common_components/SelectDate";
	import LocationCarousel from "./location_components/LocationCarousel";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";
	var moment = require('moment');

	export default {
		name: "details-location",
		components: {
			"navigation-button": NavigationButton,
			// "bottom-navbar": BottomNavbar,
			"select-date": SelectDate,
			lux: Lux,
			temperature: Temperature,
			radiance: Radiance,
			weather: Weather,
			"location-carousel": LocationCarousel
		},
		props: {
			handleReset: Function,
			handleDetailsTint: Function,
			handleDetailsLocation: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function
		},
		methods: {
			...mapActions(["setLocation"]),
			scrollHandle: () => {},
			handleDayClick(year, month, day) {
				this.activeDate = new Date(year, month, day);
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
			},
			numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},
			// getProjectData() {
			//   let allData = [
			//     ...this.connectedData,
			//     ...this.nonConnectedData,
			//     ...this.upcomingData
			//   ];
			//   let currentData = {};
			//   allData.forEach(data => {
			//     if (data.project_number === this.currentProject.project_number)
			//       currentData = data;
			//   });

			//   if (Object.values(currentData).length === 0) {
			//     const projectName = this.currentProject.project_name;
			//     axios
			//       .post(constants.GET_PROJECT_URL, {
			//         name: projectName
			//       })
			//       .then(res => {
			//         this.projectData = res.data;
			//       });
			//   }
			//   return currentData;
			// },
			handleArrowClick() {
				this.showDataFlag = !this.showDataFlag;
			},
			calcLuxAndRad() {
				let hour = moment.tz(new Date(this.location.currently.time*1000), this.location.timezone).hour();
				let cover = this.location.currently.cloudCover;
				let luxMax = 65000;
				let radRatio = .0079;
				if(cover <= .33) {
					cover = 'clear';
				}
				else if(cover <= .67) {
					cover = 'partial';
				}
				else {
					cover = 'cloudy';
				}
				let table = {
					'clear': [
						8.4,
						8.4,
						8.4,
						8.4,
						8.4,
						8.4,
						8.4,
						8.4,
						24.8,
						55.2,
						76.6,
						91.0,
						98.8,
						100.0,
						94.4,
						82.2,
						63.2,
						36.5,
						10.5,
						8.4,
						8.4,
						8.4,
						8.4,
						8.4
					],
					'partial': [
						1.9,
						1.9,
						1.9,
						1.9,
						1.9,
						1.9,
						1.9,
						1.9,
						7.4,
						16.9,
						24.5,
						29.1,
						30.8,
						30.9,
						29.9,
						26.4,
						19.7,
						10.8,
						2.8,
						2.8,
						2.8,
						2.8,
						2.8,
						2.8
					],
					'cloudy': [
						.7,
						.7,
						.7,
						.7,
						.7,
						.7,
						.7,
						.7,
						3.3,
						6.2,
						8.5,
						10.3,
						11.2,
						11.4,
						10.7,
						9.2,
						7.1,
						4.4,
						1.3,
						1.3,
						1.3,
						1.3,
						1.3,
						1.3
					]
				};
				this.lux = Number((luxMax*table[cover][hour]/100).toFixed(0));
				this.rad = (this.lux*radRatio).toFixed(1);
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
				// projectData: null,
				showDataFlag: true,
				photos: {
					"Alexandre Richard": "Images/PMs/None.jpg",
					"Betsy Podbelski": "Images/PMs/Betsy.jpg",
					"Cory Sisler": "Images/PMs/Cory.jpg",
					"Dragos-Victor Lancu": "Images/PMs/None.jpg",
					"Greg Brown": "Images/PMs/Greg.jpg",
					"Jean Sebastien Charge": "Images/PMs/None.jpg",
					"Khalifa Nyande": "Images/PMs/None.jpg",
					"Phil Spande": "Images/PMs/Phil.jpg",
					"Pryia Paul": "Images/PMs/Priya.jpg",
					"Terry Kubat": "Images/PMs/Terry.jpg",
					"Troy Neirby": "Images/PMs/Troy.jpg",
					"Yann Le Goarant": "Images/PMs/Yann.jpg"
				},
				lux: 0,
				rad: 0
			};
		},
		computed: {
			...mapState([
				"connectedData",
				"nonConnectedData",
				"upcomingData",
				"currentProject",
				"location"
			])
		},
		mounted() {
			axios.get(constants.GET_LOCATION_URL, {params: this.$store.state.currentProject}).then(res => {
				this.setLocation({data: res.data});
				this.calcLuxAndRad();
			});
			/*axios.get(constants.GET_LOCATION_URL).then(res => {
				this.location = res.data;
			});
			// this.projectData = this.getProjectData();*/
		},
		created() {}
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
.details_location_content {
	position: relative;
	background: linear-gradient(
		180deg,
		rgba(24, 56, 77, 0.95) 0%,
		rgba(22, 82, 120, 0.95) 100%
	);

	height: 100vh;
	display: flex;
	width: 89.5vw;
}
.details_location_content_left {
	background: url("../../assets/bg/bg-location.jpg");
	height: 100%;
	background-size: cover;
	position: relative;
	width: 39.18vw;
}
.location_lightzone_up,
.location_lightzone_down {
	position: absolute;
	right: 0;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #104262;
}
.location_lightzone_up {
	top: 26.55vh;
	width: 26vw;
	height: 23.05vh;
}
.location_lightzone_down {
	top: 50vh;
	width: 26.04vw;
	height: 32.2vh;
}
.details_location_project_status_content {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.details_location_content_right {
	height: 100%;
	position: relative;
	width: 50.32vw;
}
.details_location_content_right_title_bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 8.7vh;
	position: relative;
}
.details_location_content_right_title_bar > span {
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
}
.details_location_content_right_title_bar > div {
	font-size: 1.5vw;
	padding: 1.56vw;
	border-left-style: solid;
	border-left-color: #768a89;
	color: #00aec4;
	cursor: pointer;
	top: 0;
	right: 0;
	position: absolute;
}
.location_stats_date_bar {
	display: flex;
	align-items: center;
	height: 8.7vh;
}
.location_stats_date_bar > span {
	font-size: 1.25vw;
	line-height: 2.66vh;
	margin-left: 3.72vw;
	margin-right: 1vw;
	color: #768a89;
	font-family: Gotham Pro;
	cursor: pointer;
}
.location_stats_date_bar > div:nth-child(2) {
	display: flex;
	flex-direction: column;
	font-size: 1vw;
	color: #768a89;
	margin-right: 1.56vw;
	cursor: pointer;
}
.location_stats_date_bar > div:nth-child(3) {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 3.38vw;
	height: 2.3vh;
	border-radius: 0.13vw;
	border-style: solid;
	border-color: #ffdc38;
}
.location_stats_date_bar_live_label {
	font-size: 0.65vw;
	font-family: Gotham Pro;
	margin-right: 0.5vw;
	color: #ffd32f;
}
.location_stats_date_bar_live_button {
	background: #ffd32f;
	width: 0.5vw;
	height: 0.5vw;
	border-radius: 50%;
}
.location_lightzone_up_content_title_large {
	font-size: 1.3vw;
	line-height: 2.78vh;
	font-family: Gotham Black;
	color: white;
}
.location_lightzone_up_content_title_small {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Light;
	color: white;
}
.location_lightzone_up_content_context {
	font-size: 0.65vw;
	line-height: 1.6vh;
	font-family: Gotham Light;
	color: white;
	width: 19.26vw;
	border-bottom-style: solid;
	border-bottom-color: rgba(237, 237, 237, 0.2);
	padding-bottom: 3vh;
	margin-bottom: 2.06vh;
}
.location_lightzone_up_content_bottom_container {
	width: 19.25vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.location_stats_date_bar_updown_button {
	font-size: 0.78vw;
	line-height: 1.5vh;
	margin-right: 0.39vw;
	font-family: Gotham Pro;
	color: white;
}
.location_stats_date_bar_live {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Light;
	color: rgba(255, 255, 255, 0.8);
	display: flex;
	justify-content: center;
}
.location_lightzone_up_content_bottom_right {
	font-size: 0.71vw;
	line-height: 1.5vh;
	width: 6.6vw;
	height: 3.26vh;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Gotham Black;
	background: #18384d;
	cursor: pointer;
}
.location_lightzone_down_content {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Pro;
	color: white;
}
.location_lightzone_personal_info {
	margin-top: 2vh;
	display: flex;
	align-items: center;
}
.location_lightzone_personal_info > img {
	margin-right: 1.5vw;
	width: 4.3vw;
	height: 4.3vw;
}
.location_lightzone_down_userinfo > span:first-child {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Light;
	color: white;
}
.location_lightzone_down_userinfo > span:nth-child(2) {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Black;
	color: white;
}
.location_lightzone_down_userinfo > p {
	font-size: 0.65vw;
	line-height: 1.8vh;
	color: white;
	margin-bottom: 0;
}
.location_personal_info_divider {
	width: 19.25vw;
	border-bottom-style: solid;
	border-bottom-color: rgba(237, 237, 237, 0.2);
	margin-top: 1.52vh;
	margin-bottom: 2.6vh;
}
.location_project_status_title > span:first-child {
	font-size: 0.78vw;
	line-height: 1.5vh;
	margin-right: 0.39vw;
	font-family: Gotham Pro;
	color: white;
}
.location_project_status_title > span:nth-child(2) {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Light;
	color: rgba(255, 255, 255, 0.8);
}
.details_location_project_status_content {
	height: 4.3vh;
	margin-top: 1vh;
	margin-bottom: 2.15vh;
	border-bottom-style: solid;
	border-bottom-color: rgba(237, 237, 237, 0.2);
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.details_location_project_status_item {
	display: flex;
	flex-direction: column;
}
.details_location_project_status_item > span:first-child {
	font-size: 0.65vw;
	line-height: 1.4vh;
	color: rgba(255, 255, 255, 0.6);
	font-family: Gotham Light;
}
.details_location_project_status_item > span:nth-child(2) {
	font-size: 0.78vw;
	line-height: 1.67vh;
	color: white;
	font-family: Gotham Light;
}
.details_location_project_status_date {
	font-size: 0.78vw;
	line-height: 1.67vh;
	color: rgba(255, 255, 255, 0.8);
	font-family: Gotham Light;
}
.location_lightzone_up_content_bottom_left > span:first-child {
	font-size: 0.78vw;
	line-height: 1.5vh;
	margin-right: 0.4vw;
	font-family: Gotham Pro;
	color: white;
}
.location_lightzone_up_content_bottom_left > span:nth-child(2) {
	font-size: 0.78vw;
	line-height: 1.5vh;
	font-family: Gotham Light;
	color: rgba(255, 255, 255, 0.8);
}
.details_location_arrow_button {
	z-index: 3;
	background: rgba(24, 56, 77, 0.95);
}
</style>
