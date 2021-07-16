<template>
	<div class="home">
		<div class="btn_sageglass"></div>
		<span class="connecting_label">Connecting...</span>
		<b-progress class="home_progress" variant="warning" :value="value"></b-progress>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapActions } from "vuex";
	import constants from "@/data/constants.js";

	export default {
		name: "home",
		components: {},
		props: {
			handleHomeClose: Function
		},
		methods: {
			...mapActions(["setOverlay", "setProjects"])
		},
		data() {
			return {
				value: 0
			};
		},
		mounted() {
			axios.get(constants.GET_PROJECTS_URL).then(res => {
				const projects = res.data;
				this.setProjects({ data: projects });
				const totalProjects = Object.keys(projects).length - 1;
				let arrayCountries = [];
				let totalCountries = 0;
				let totalIgus = 0;
				let totalSqft = 0;
				let projectCount = 0;
				Object.keys(projects).forEach(key => {
					let project = projects[key];
					if (typeof project == "object") {
						totalIgus += project.igus;
						totalSqft += project.sqft;
						projectCount++;
						if (project.lat && project.lng) {
							axios
								.get(
									`https://maps.googleapis.com/maps/api/geocode/json?latlng=${project.lat},${project.lng}&key=${constants.GOOGLE_MAP_API_KEY}`
								)
								.then(response => {
									if (response.data.results.length > 0) {
										const address_arr =
											response.data.results[0].address_components;
										let country = "";
										address_arr.forEach(elem => {
											if (elem.types[0] == "country") {
												country = elem.short_name;
											}
										});
										if (arrayCountries.indexOf(country) == -1) {
											arrayCountries.push(country);
											totalCountries++;
										}
									}
									if (projectCount == Object.keys(projects).length - 1) {
										const overlay = {
											total_projects: totalProjects,
											total_countries: totalCountries,
											total_igus: totalIgus,
											total_sqft: totalSqft
										};
										this.setOverlay({ data: overlay });
									}
								});
						}
					}
				});
			});

			this.timer = setInterval(() => {
				this.value++;
				if (this.value === 100) {
					// this.$router.push('map-view')
					this.handleHomeClose();
				}
			}, 100);
		}
	};
</script>

<style>
.home {
	width: 100%;
	height: 100%;
	background-image: url("../assets/bg/bg-home.png");
	background-size: cover;
	z-index: 20;
	position: absolute;
}
.home::after {
	content: "";
	width: 100%;
	background: radial-gradient(
		95.25% 169.34% at 11.72% -12.84%,
		#00101a 0%,
		#143e59 100%
	);
	position: absolute;
	left: 0;
	top: 0;
	mix-blend-mode: screen;
	height: 100%;
}
.btn_sageglass {
	z-index: 1;
	left: 2.2vw;
	bottom: 11vh;
	width: 15.6vw;
	height: 15.6vw;
	background-image: url("../assets/bg/bg-sageglass.png");
	background-size: cover;
	border-radius: 0;
	position: absolute;
	box-shadow: 0px 50px 50px #18384d;
}
.connecting_label {
	position: absolute;
	left: 6.5vw;
	bottom: 6vh;
	font-size: 1.3vw;
	line-height: 2.7vh;
	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	color: #ffffff;
	z-index: 2;
}
.home_progress {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 1.1vh;
}
</style>
