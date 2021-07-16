<template>
	<div class="project_table_container">
		<div class="project_table_shadow" :style="{ width: `8.4vw` }">
			<navigation-button icon="x" :handleClick="handleReset" />
		</div>
		<div class="details_config_content" :style="{
        width: `89.5vw`
      }">
			<div class="details_config_content_title_bar">
				<span
					:style="{
            borderBottomWidth: `${
              0.0007 * screenHeight < 1
                ? 1
                : 0.0007 * screenHeight
            }px`,
          }"
				>CONFIGURATION & ZONES</span>
				<!-- <div
          :style="{
            borderLeftWidth: `${
              0.0007 * screenHeight < 1
                ? 1
                : 0.0007 * screenHeight
            }px`,
          }"
        >
          <b-icon icon="chevron-right"></b-icon>
				</div>-->
			</div>
			<div class="details_config_context">
				<div class="details_config_context_left">
					<div v-if="tints.length > 0" class="config_stats_date_bar">
						<!-- <span>CANTEEN AREA</span> -->
						<dropdown
							class="config_dropdown"
							:visible="cdVisible"
							:position="['right', 'bottom', 'right', 'top']"
							@clickout="cdVisible = false"
						>
							<span class="link" @click="cdVisible = !cdVisible">{{ tintZoneLabels[activeDropdownIndex] }}</span>
							<div slot="dropdown" class="dialog no-padding">
								<aside class="menu">
									<ul class="menu-list project_table_dropdown_menu-list">
										<li
											class="project_table_dropdown_item"
											v-for="(sort, index) in tintZoneLabels"
											:key="index"
											@click="() => handleDropdownItemClick(index)"
											:class="index === activeDropdownIndex ? 'active' : ''"
										>{{ sort }}</li>
									</ul>
								</aside>
							</div>
						</dropdown>
						<div @click="cdVisible = !cdVisible">
							<b-icon icon="chevron-compact-up" style="cursor:pointer"></b-icon>
							<b-icon icon="chevron-compact-down" style="cursor:pointer"></b-icon>
						</div>
					</div>
					<div class="details_config_context_left_configuration">
						<h5 class="details_config_configuration_title">CONFIGURATION</h5>
						<div>
							<div
								class="details_config_configuration_title_item_container"
								v-for="(data, index) in getConfigData"
								:key="index"
							>
								<span
									v-if="currentProject.makeup[data.key]"
									class="details_config_configuration_title_item"
								>{{ String.fromCharCode(65 + index) }}</span>
							</div>
						</div>
						<!-- <img src="@/assets/bg/config/configuration.png" alt /> -->
					</div>
					<div class="details_config_context_left_zone">
						<h5 class="details_config_zone_title">ZONES</h5>
						<img src="@/assets/bg/config/zone.png" alt />
					</div>
				</div>
				<div class="details_config_context_right">
					<div
						class="config_items_container"
						:style="{
              borderLeftWidth: `${
                0.0013 * screenWidth < 1
                  ? 1
                  : 0.0013 * screenWidth
              }px`,
				marginTop: currentProject.makeup.ml == null && currentProject.makeup.s2 == null ? '10vh' : '', 
            }"
					>
						<span
							:style="{
                borderTopWidth: `${
                  0.0013 * screenWidth < 1
                    ? 1
                    : 0.0013 * screenWidth
                }px`,
              }"
						></span>
						<span
							:style="{
                borderTopWidth: `${
                  0.0013 * screenWidth < 1
                    ? 1
                    : 0.0013 * screenWidth
                }px`,
              }"
						></span>
						<div
							class="config_item_content"
							v-for="(data, index) in getConfigData"
							:key="index"
							:style="{
                marginBottom: `${index === getConfigData.length - 1 ? 0 : 0.0065 * screenWidth}px`
              }"
						>
							<!-- <div v-if="currentProject.makeup[data.key]"> -->
							<div
								v-if="currentProject.makeup[data.key]"
								class="details_config_right_label"
							>{{ data.name }}</div>
							<div v-if="currentProject.makeup[data.key]" class="details_config_right_mid">
								<span>{{ String.fromCharCode(65 + index) }}</span>
							</div>
							<div v-if="currentProject.makeup[data.key]" class="details_config_right_value_container">
								<p
									class="details_config_right_value"
								>{{ currentProject.makeup[data.key] == null ? "N/A" : currentProject.makeup[data.key] }}</p>
							</div>
							<!-- </div> -->
						</div>
					</div>
					<div
						class="zone_items_container"
						:style="{
              borderLeftWidth: `${
                0.0013 * screenWidth < 1
                  ? 1
                  : 0.0013 * screenWidth
              }px`,
            }"
					>
						<span
							:style="{
                borderTopWidth: `${
                  0.0013 * screenWidth < 1
                    ? 1
                    : 0.0013 * screenWidth
                }px`,
              }"
						></span>
						<span
							:style="{
                borderTopWidth: `${
                  0.0013 * screenWidth < 1
                    ? 1
                    : 0.0013 * screenWidth
                }px`,
              }"
						></span>
						<div
							class="zone_item_content"
							v-for="(zone, index) in config.zones"
							:key="zoneLabels[index]"
							:style="{
                marginBottom: `${index === config.zones.length - 1 ? 0 : 0.0116 * screenHeight}px`
              }"
						>
							<div class="details_config_right_label">{{ zoneLabels[index] }}</div>
							<div class="details_config_right_mid">
								<span>{{ String.fromCharCode(65 + index) }}</span>
							</div>
							<div class="details_config_right_value_container">
								<p class="details_config_right_value">{{ zone.name }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import VueMyDropDown from "vue-my-dropdown";
	import NavigationButton from "../common_components/NavigationButton";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";

	export default {
		name: "details-config",
		components: {
			"navigation-button": NavigationButton,
			dropdown: VueMyDropDown
		},
		props: {
			handleReset: Function,
			handleDetailsTint: Function,
			handleDetailsLocation: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function
		},
		methods: {
			...mapActions(["setConfig", "setTints"]),
			handleDropdownItemClick(index) {
				this.activeDropdownIndex = index;
				this.cdVisible = false;
			}
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.innerHeight,
				screenWidth: window.innerWidth,
				imgSrcs: [
					require("@/assets/icons/normal_table.png"),
					require("@/assets/icons/man_table.png"),
					require("@/assets/icons/critical_table.png")
				],
				configLabels: [
					"Support Lite",
					"Interlayer",
					"Spacer 1",
					"Middle Lite",
					"Spacer 2",
					"Cover Lite",
					"Gas Type"
				],
				zoneLabels: ["Zone1", "Zone2", "Zone3"],
				configData: [],
				cdVisible: false,
				activeDropdownIndex: 0
			};
		},
		computed: {
			...mapState(["config", "tints", "currentProject"]),
			tintZoneLabels() {
				return this.tints.map(tint => {
					return tint.zone_name.toUpperCase();
				});
			},
			getTimeBarValues() {
				let resValues = [];
				let firstTime = new Date();
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
			getConfigData() {
				return [
					{
						key: "sl",
						name: this.configLabels[0]
					},
					{
						key: "il",
						name: this.configLabels[1]
					},
					{
						key: "s1",
						name: this.configLabels[2]
					},
					{
						key: "ml",
						name: this.configLabels[3]
					},
					{
						key: "s2",
						name: this.configLabels[4]
					},
					{
						key: "cl",
						name: this.configLabels[5]
					},
					{
						key: "gas",
						name: this.configLabels[6]
					}
				];
			}
		},
		mounted() {
			axios.get(constants.GET_CONFIG_URL).then(res => {
				this.setConfig({ data: res.data });
			});
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
}
.details_config_content {
	background: linear-gradient(
		180deg,
		rgba(24, 56, 77, 0.95) 0%,
		rgba(22, 82, 120, 0.95) 100%
	);
	height: 100vh;
	position: relative;
}
.details_config_content_title_bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 8.7vh;
}
.details_config_content_title_bar > span {
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
	text-align: left;
}
.details_config_content_title_bar > div {
	font-size: 1.5vw;
	padding: 1.56vw;
	border-left-style: solid;
	border-left-color: #768a89;
	color: #00aec4;
	cursor: pointer;
}
.config_stats_date_bar {
	display: flex;
	align-items: center;
	width: 100%;
	height: 8.7vh;
	width: 44.66vw;
}
.config_stats_date_bar .config_dropdown > span > span {
	font-size: 1.25vw;
	line-height: 2.66vh;
	margin-left: 3.72vw;
	margin-right: 1vw;
	color: #768a89;
	font-family: Gotham Pro;
}
.config_stats_date_bar > div {
	display: flex;
	flex-direction: column;
	font-size: 1vw;
	color: #768a89;
	margin-right: 1.56vw;
}
.details_config_context {
	width: 100%;
	display: flex;
	height: 73.8vh;
	padding-bottom: 6.9vh;
}
.details_config_context_left {
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 44.66vw;
}
.details_config_context_right {
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 44.66vw;
}
.details_config_configuration_title,
.details_config_zone_title {
	font-family: Gotham Light;
	font-style: normal;
	font-weight: 300;
	text-transform: uppercase;
	color: #ffffff;
	opacity: 0.6;
	transform: rotate(-90deg);
	font-size: 0.78vw;
	width: 10vw;
}
.details_config_context_left_configuration {
	display: flex;
	align-items: center;
}
.details_config_context_left_configuration > div {
	width: 31.5vw;
	height: 27.3vh;
	background: url("../../assets/bg/config/configuration.png");
	background-size: cover;
	background-repeat: no-repeat;
	position: relative;
}
/* .details_config_context_left_configuration > img {
	width: 31.6vw;
} */
.details_config_context_left_zone {
	display: flex;
	align-items: center;
}
.details_config_context_left_zone > img {
	width: 30vw;
}
.details_config_right_value {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	letter-spacing: 0.05em;
	color: #ffffff;
	margin-bottom: 0;
	font-size: 1.04vw;
}
.details_config_right_label {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	text-align: right;
	letter-spacing: 0.05em;
	color: #ffffff;
	opacity: 0.6;
	width: 7.9vw;
	font-size: 1.04vw;
	line-height: 4.63vh;
}
.config_items_container {
	padding-top: 0.92vh;
	padding-bottom: 0.92vh;
	border-left-style: solid;
	border-left-color: #ffd32f;
	position: relative;
}
.config_items_container > span:first-child {
	position: absolute;
	border-top-style: solid;
	border-top-color: #ffd32f;
	width: 0.9vw;
	left: -0.13vw;
	top: 0;
}
.config_items_container > span:nth-child(2) {
	position: absolute;
	border-top-style: solid;
	border-top-color: #ffd32f;
	width: 0.9vw;
	left: -0.13vw;
	bottom: 0;
}
.config_item_content {
	display: flex;
	align-items: center;
}
.details_config_right_mid {
	width: 4.3vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
.details_config_right_mid > span {
	width: 0.86vw;
	height: 0.86vw;
	font-size: 0.52vw;
	background: linear-gradient(180deg, #ffdc38 0%, #fff8b9 100%);
	border-radius: 50%;
	color: black;
	display: flex;
	align-items: center;
	justify-content: center;
}
.details_config_right_value_container {
	text-align: left;
	width: 19.2vw;
}
.zone_items_container {
	padding-top: 0.92vh;
	padding-bottom: 0.92vh;
	border-left-style: solid;
	border-left-color: #ffd32f;
	position: relative;
}
.zone_items_container > span:first-child {
	position: absolute;
	border-top-style: solid;
	border-top-color: #ffd32f;
	width: 0.9vw;
	left: -0.13vw;
	top: 0;
}
.zone_items_container > span:nth-child(2) {
	position: absolute;
	border-top-style: solid;
	border-top-color: #ffd32f;
	width: 0.9vw;
	left: -0.13vw;
	bottom: 0;
}
.zone_item_content {
	display: flex;
	align-items: center;
}
.config_dropdown {
	cursor: pointer;
}
.details_config_configuration_title_item {
	width: 0.86vw;
	height: 0.86vw;
	font-size: 0.52vw;
	background: linear-gradient(180deg, #ffdc38 0%, #fff8b9 100%);
	border-radius: 50%;
	color: black;
	display: flex;
	align-items: center;
	justify-content: center;
}
.details_config_configuration_title_item_container {
	position: absolute;
}
.details_config_configuration_title_item_container:first-child {
	right: 2.3vw;
	top: 8.4vh;
}
.details_config_configuration_title_item_container:nth-child(2) {
	right: 8.6vw;
	top: 11.7vh;
}
.details_config_configuration_title_item_container:nth-child(3) {
	right: 12.3vw;
	top: 15.3vh;
}
.details_config_configuration_title_item_container:nth-child(4) {
	right: 7.8vw;
	top: 5.3vh;
}
.details_config_configuration_title_item_container:nth-child(5) {
	right: 5.9vw;
	top: 15.2vh;
}
.details_config_configuration_title_item_container:nth-child(6) {
	right: 2.7vw;
	top: 17vh;
}
.details_config_configuration_title_item_container:nth-child(7) {
	right: 4.6vw;
	top: 7vh;
}
</style>
