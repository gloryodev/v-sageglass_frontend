<template>
	<div class="project_search_container">
		<div class="project_search_shadow">
			<navigation-button icon="x" :handleClick="handleReset" />
		</div>
		<div class="project_search_content">
			<div class="project_search_title">
				<span>SEARCH PROJECTS</span>
			</div>
			<vue-custom-scrollbar
				v-if="screenHeight"
				class="project_search_scroll-area"
				:settings="settings"
				@ps-scroll-y="scrollHandle"
			>
				<div class="project_search_form_container">
					<div class="flex_justify">
						<span class="project_search_form_label">PROJECT NAME</span>
						<search-input-text
							:width="0.258 * screenWidth"
							:borderWidth="
                0.0004 * screenWidth > 1 ? 0.0004 * screenWidth : 1
              "
							:fontSize="0.01 * screenWidth"
							:borderLeftHeight="0.0088 * screenWidth"
							name="name"
							v-on:input="
                e => {
                  projectName = e.target.value;
                }
              "
						/>
					</div>
					<div class="flex_justify">
						<span class="project_search_form_label">PROJECT MANAGER</span>
						<search-input-text
							:width="0.258 * screenWidth"
							:borderWidth="
                0.0004 * screenWidth > 1 ? 0.0004 * screenWidth : 1
              "
							:fontSize="0.01 * screenWidth"
							:borderLeftHeight="0.0088 * screenWidth"
							name="manager"
							v-on:input="
                e => {
                  projectManager = e.target.value;
                }
              "
						/>
					</div>
					<div class="project_result_location_container">
						<span class="project_search_form_label">LOCATION</span>
						<div class="flex_justify">
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="Asia"
							>Asia</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="Europe"
							>Europe</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="North America"
							>North America</checkbox>
						</div>
						<div class="flex_justify">
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="Africa"
							>Africa</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="Oceanic"
							>Oceanic</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="location"
								value="South America"
							>South America</checkbox>
						</div>
					</div>
					<div class="flex_justify">
						<span class="project_search_form_label">ADDRESS</span>
						<search-input-text
							:width="0.258 * screenWidth"
							:borderWidth="
                0.0004 * screenWidth > 1 ? 0.0004 * screenWidth : 1
              "
							:fontSize="0.01 * screenWidth"
							:borderLeftHeight="0.0088 * screenWidth"
							name="address"
							v-on:input="
                e => {
                  projectAddress = e.target.value;
                }
              "
						/>
					</div>
					<div class="project_search_products_container">
						<span class="project_search_form_label">PRODUCTS</span>
						<div class="flex_justify">
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="products"
								value="sageglass"
							>SageGlass</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="products"
								value="harmony"
							>Harmony</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="products"
								value="lightzone"
							>LightZone</checkbox>
						</div>
					</div>
					<div class="project_search_status_container">
						<span class="project_search_form_label">STATUS</span>
						<div class="flex_justify">
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="status"
								:value="0"
							>Connected</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="status"
								:value="1"
							>Non-connected</checkbox>
						</div>
						<div class="flex_justify">
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="status"
								:value="2"
							>Upcoming</checkbox>
							<checkbox
								class="form_search_check"
								:size="0.021 * screenHeight"
								:fontSize="0.023 * screenHeight"
								color="#165278"
								v-model="status"
								:value="3"
							>Opportunities</checkbox>
						</div>
					</div>
					<div class="project_search_igus_container">
						<span class="project_search_form_label">IGUS</span>
						<slider
							v-model="sliderValue"
							:data="sliderData"
							:enable-cross="false"
							:width="0.31 * screenWidth"
							:height="0.052 * screenHeight"
							tooltip="always"
							tooltipPlacement="bottom"
							:processStyle="{
                background: '#00aec4',
                height: `${0.0092 * screenHeight}px`,
                top: `-${0.0092 * screenHeight / 2}px`,
                opacity: 0.5
              }"
							:tooltipStyle="{
                fontSize: `${0.0078 * screenWidth}px`,
                height: `${0.037 * screenHeight}px`,
                color: 'white',
                fontFamily: 'Gotham Light',
                display: `flex`,
                alignItems: `flex-end`
              }"
							:dotStyle="{
                background: '#165278',
                height: `${0.024 * screenHeight}px`,
                width: `${0.0075 * screenWidth}px`,
                marginTop: `-${0.024 * screenHeight / 2}px`,
                border: `${0.00065 * screenWidth}px solid #00aec4`
              }"
							:railStyle="{
                height: `${0.0013 * screenHeight}px`,
                background: `rgba(255, 255, 255, 0.5)`
              }"
						/>
					</div>
					<div class="search_apply_button" @click="handleApply">
						<span
							:style="{
                fontFamily: `Gotham Black`,
                color: `white`
              }"
						>APPLY & SEARCH</span>
						<b-icon icon="chevron-right" :style="{
                color: `#00AEC4`
              }"></b-icon>
					</div>
				</div>
			</vue-custom-scrollbar>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import VueCustomScrollbar from "vue-custom-scrollbar";
	import Checkbox from "vue-material-checkbox";
	import VueSlider from "vue-slider-component";
	import "@/assets/css/scrollbar.css";
	import NavigationButton from "../common_components/NavigationButton";
	import SearchInputText from "../common_components/SearchInputText";
	import continents from "@/data/map_view_data/continents";
	import constants from "@/data/constants";

	import { mapState } from "vuex";

	export default {
		name: "project-search",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"search-input-text": SearchInputText,
			checkbox: Checkbox,
			slider: VueSlider
		},
		props: {
			handleShowResult: Function,
			handleReset: Function,
			kindIndex: Number
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.innerHeight,
				screenWidth: window.innerWidth,
				projectName: "",
				projectManager: "",
				projectAddress: "",
				projectProduct: "",
				sliderValue: ["0", "100,000"],
				maxSliderValue: 100000,
				sliderData: [],
				products: [],
				location: [],
				status: []
			};
		},
		computed: {
			...mapState([
				"connectedData",
				"nonConnectedData",
				"upcomingData",
				"mapData"
			])
		},
		methods: {
			scrollHandle: () => {},
			handleApply() {
				let allData = [
					this.connectedData,
					this.nonConnectedData,
					this.upcomingData
				];
				let searchData = [];
				if (this.status.length > 0) {
					this.status.forEach(index => {
						searchData = [...searchData, ...allData[index]];
					});
				} else {
					allData.forEach(data => {
						searchData = [...searchData, ...data];
					});
				}
				let resData = [];
				let count = 0;

				if (this.location.length > 0) {
					searchData.forEach(data => {
						axios
							.get(
								`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${constants.GOOGLE_MAP_API_KEY}`
							)
							.then(response => {
								const address_arr = response.data.results[0].address_components;
								let country = "";
								address_arr.forEach(comp => {
									if (comp.types[0] == "country") {
										country = comp.short_name;
									}
								});
								if (
									data.project_name
										.toLowerCase()
										.indexOf(this.projectName.toLowerCase()) > -1 &&
									data.address
										.toLowerCase()
										.indexOf(this.projectAddress.toLowerCase()) > -1 &&
									(this.products.length > 0
										? this.products.indexOf(data.product.toLowerCase()) > -1
										: true) &&
									data.igus > parseInt(this.sliderValue[0].replace(",", "")) &&
									data.igus < parseInt(this.sliderValue[1].replace(",", "")) &&
									this.location.indexOf(continents[country]) > -1
								) {
									resData.push(data);
								}
								count++;
								if (count == searchData.length) {
									this.handleShowResult(resData);
								}
							});
					});
				} else {
					resData = searchData.filter(data => {
						return (
							data.project_name
								.toLowerCase()
								.indexOf(this.projectName.toLowerCase()) > -1 &&
							data.address
								.toLowerCase()
								.indexOf(this.projectAddress.toLowerCase()) > -1 &&
							(this.products.length > 0
								? this.products.indexOf(data.product.toLowerCase()) > -1
								: true) &&
							data.igus > parseInt(this.sliderValue[0].replace(",", "")) &&
							data.igus < parseInt(this.sliderValue[1].replace(",", ""))
						);
					});
					this.handleShowResult(resData);
				}
			},
			numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		},
		mounted() {
			this.sliderData = Array.from({ length: this.maxSliderValue + 1 }).map(
				(elem, index) => {
					return this.numberWithCommas(index);
				}
			);
		}
	};
</script>

<style>
.project_search_container {
	position: absolute;
	display: flex;
	align-items: center;
	z-index: 1;
	right: 0;
}
.project_search_shadow {
	height: 99.8vh;
	background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
	transform: matrix(-1, 0, 0, 1, 0, 0);
	z-index: 1;
	width: 8.4vw;
}
.project_search_title {
	width: 100%;
	background: #00aec4;
	display: flex;
	align-items: center;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	color: #ffffff;
	height: 10.1vh;
	padding-left: 1.67vw;
	padding-right: 1.67vw;
}
.project-search_title > span {
	font-size: 1.3vw;
	line-height: 2.78vh;
}
.project_search_scroll-area {
	/* position: absolute; */
	z-index: 1;
	top: 1px;
	/* height: 99.8vh; */
	width: 100%;
	background: #05151f;
	height: 89.9vh;
}
.project_search_form_container {
	background: linear-gradient(180deg, #18384d 0%, #165278 100%);
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 5.78vh 3.77vw;
}
.project_search_form_label {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	text-transform: uppercase;
	color: #ffffff;
	font-size: 1vw;
}
.flex_justify {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.form_search_check {
	color: white;
	font-family: Gotham Light;
}
.form_search_check label {
	margin-bottom: 0;
}
.form_search_check.m-chckbox--container {
	line-height: 0;
}
.form_search_check .m-chckbox--group {
	background: #165278;
	border-style: solid;
	border-color: #00aec4;
	box-sizing: border-box;
}
.search_apply_button {
	background: #18384d;
	cursor: pointer;
	padding-left: 1.4vw;
	padding-right: 1.4vw;
	height: 4.8vh;
	width: 14.28vw;
	font-size: 0.97vw;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.project_search_content {
	width: 50vw;
	height: 100vh;
}
.project_result_location_container {
	text-align: left;
	height: 12.5vh;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}
.project_search_products_container {
	text-align: left;
	height: 7.47vh;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}
.project_search_status_container {
	text-align: left;
	height: 12.54vh;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
}
.project_search_igus_container {
	height: 5.78vh;
	display: flex;
	justify-content: space-between;
}
</style>
