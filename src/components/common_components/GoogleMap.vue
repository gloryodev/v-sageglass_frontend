<template>
	<div @click="handleReset">
		<br />
		<div>
			<gmap-map
				ref="gmap"
				@center_changed="handleChange"
				@zoom_changed="handleZoom"
				:center="center"
				:zoom="expandFlag ? expandZoom : contractZoom"
				:style="{
							width: '100vw',
							height: '100vh',
							position: 'absolute',
							left: 0,
							top: 0,
							zIndex: 0
						}"
				:options="{
							styles: map_expand_styles,
							mapTypeControl: false,
							fullscreenControl: false,
							streetViewControl: false,
							zoomControl: true,
							disableDoubleClickZoom: true,
							scrollwheel: true, 
							minZoom: 4, 
						}"
				map_type_id="terrian"
			>
				<!-- <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @mouseover="toggleInfoWindow(m, index)"
          @mouseleave="infoWinOpen=false"
				></gmap-marker>-->
				<gmap-cluster
					position="center"
					:zoomOnClick="true"
					:styles="clusterStyles"
					:averageCenter="true"
					:gridSize="150"
				>
					<gmap-custom-marker
						class="map_custom_marker"
						:key="index"
						v-for="(m, index) in markers"
						:marker="m"
						alignment="center"
						@click.native="handleMarkerClick(m)"
						@mouseover.native="toggleInfoWindow(m, index)"
						@mouseleave.native="handleMarkerLeave()"
					>
						<img
							:style="{
										width: `${0.0157 * screenHeight}px`,
										height: `${0.0157 * screenHeight}px`
									}"
							src="@/assets/icons/map_expand_marker.png"
						/>
					</gmap-custom-marker>
				</gmap-cluster>
				<gmap-info-window
					:options="infoOptions"
					:position="infoWindowPos"
					:opened="infoWinOpen"
					@closeclick="infoWinOpen = false"
				>
					<div>
						<div class style="height:100%; overflow:auto">
							<span class="marker_triangle"></span>
							<div class="marker_info_up" style="display:flex;align-items:center;justify-content:center"></div>
							<div class="marker_info_down" style="display:flex;align-items:center;justify-content:center"></div>
						</div>
					</div>
				</gmap-info-window>
			</gmap-map>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import mapStyles from "@/data/map_view_data/map_styles";
	import mapExpandStyles from "@/data/map_view_data/map_expand_styles";
	import GmapCustomMarker from "vue2-gmap-custom-marker";
	import GmapCluster from "vue2-google-maps/dist/components/cluster";
	// import GmapRectangle from "vue2-google-maps/dist/components/rectangle";
	import constants from "@/data/constants";

	import { mapState, mapActions } from "vuex";

	// Vue.component('GmapCluster', GmapCluster);

	export default {
		name: "GoogleMap",
		components: {
			"gmap-custom-marker": GmapCustomMarker,
			"gmap-cluster": GmapCluster
			// "gmap-rectangle": GmapRectangle
		},
		props: {
			handleReset: Function,
			handleExpand: Function,
			handleDetailsLocation: Function,
			handleGoogleMapTitle: Function
		},
		computed: {
			...mapState(["expandFlag", "projects"])
		},
		data() {
			return {
				markers: [],
				center: { lat: 32.008114, lng: 20.948618 },
				handleCenter: { lat: 32.008114, lng: 20.948618 },
				places: [],
				currentPlace: null,
				map_styles: mapStyles,
				map_expand_styles: mapExpandStyles,
				infoOptions: {
					pixelOffset: {
						width: 0,
						height: -35
					}, 
					disableAutoPan: true
				},
				infoWindowPos: {
					lat: 0,
					lng: 0
				},
				infoWinOpen: true,
				infoContent: "",
				expandZoom: 7,
				contractZoom: 4,
				clusterStyles: [
					{
						textColor: "#4b6878",
						url: require("../../assets/icons/map_marker.png"),
						height: 89,
						width: 89,
						textSize: 15,
						fontFamily: "Gotham Black"
					}
				],
				screenWidth: window.innerWidth,
				screenHeight: window.innerHeight
			};
		},
		mounted() {
			// this.geolocate();
			Object.keys(this.projects).forEach(key => {
				let project = this.projects[key];
				if (typeof project == "object") {
					if (project.lat && project.lng) {
						project.project_number = key;
						this.markers.push(project);
					}
				}
			});
		},

		methods: {
			...mapActions(["setExpandFlag", "setMarkerClickFlag"]),
			handleMarkerClick(marker) {
				this.setMarkerClickFlag({ flag: true });
				this.handleDetailsLocation(marker);
			},
			setPlace(place) {
				this.currentPlace = place;
			},
			addMarker() {
				if (this.currentPlace) {
					const marker = {
						lat: this.currentPlace.geometry.location.lat(),
						lng: this.currentPlace.geometry.location.lng()
					};
					this.markers.push({ position: marker });
					this.places.push(this.currentPlace);
					this.center = marker;
					this.currentPlace = null;
				}
			},
			geolocate: function() {
				navigator.geolocation.getCurrentPosition(position => {
					this.center = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
				});
			},
			handleMarkerLeave() {
				document.querySelector(".gm-style .gm-style-iw-c").style.visibility =
					"hidden";
				document.querySelector(".marker_triangle").style.visibility = "hidden";
			},
			toggleInfoWindow: function(marker, idx) {
				const deltaLat = marker.lat - this.handleCenter.lat;
				const deltaLng = marker.lng - this.handleCenter.lng;
				let leftStyle = "16px";
				let topStyle = "-5px";
				let bottomStyle = "auto";
				let contentLeftStyle = "0px";
				let contentTopStyle = "74px";
				let contentTransform = "none";
				let transformStyle = "translate(-50%, -50%) rotate(1deg)";
				let backgroundStyle =
					"linear-gradient(30deg, rgba(254, 216, 67, 1) 58%, rgba(254, 216, 67, 0) 50%, rgba(254, 216, 67, 0) 100%)";
				if (deltaLat > 0 && deltaLng > 0) {
					transformStyle = "translate(-50%, -50%) rotate(1deg)";
					backgroundStyle =
						"linear-gradient(-30deg, rgba(254, 216, 67, 1) 58%, rgba(254, 216, 67, 0) 50%, rgba(254, 216, 67, 0) 100%)";
					contentLeftStyle = "-270px";
					leftStyle = "252px";
				} else if (deltaLat < 0 && deltaLng > 0) {
					transformStyle = "translate(-50%, -50%) rotate(180deg)";
					backgroundStyle =
						"linear-gradient(30deg, rgba(254, 216, 67, 1) 58%, rgba(254, 216, 67, 0) 50%, rgba(254, 216, 67, 0) 100%)";
					contentTransform = "translate(-50%,-100%)";
					contentLeftStyle = "-135px";
					contentTopStyle = "21px";
					topStyle = "auto";
					bottomStyle = "-34px";
					leftStyle = "252px";
				} else if (deltaLat < 0 && deltaLng < 0) {
					transformStyle = "translate(-50%, -50%) rotate(180deg)";
					backgroundStyle =
						"linear-gradient(-30deg, rgba(254, 216, 67, 1) 58%, rgba(254, 216, 67, 0) 50%, rgba(254, 216, 67, 0) 100%)";
					contentTransform = "translate(-50%,-100%)";
					contentLeftStyle = "133px";
					contentTopStyle = "21px";
					topStyle = "auto";
					bottomStyle = "-34px"
				}

				this.infoWindowPos = { lat: marker.lat, lng: marker.lng };
				// this.infoContent = this.getInfoWindowContent(marker);

				// this.infoWinOpen = true;
				this.currentMidx = idx;

				var content = document.querySelector(".gm-style .gm-style-iw-c");
				var spanTriangle = document.querySelector(".marker_triangle");
				document.querySelector(
					".marker_info_up"
				).textContent = `Project ${marker.project_number}`;
				document.querySelector(
					".marker_info_down"
				).textContent = `${marker.project_name}`;

				spanTriangle.style.left = leftStyle;
				spanTriangle.style.top = topStyle;
				if (topStyle == "auto") {
					spanTriangle.style.bottom = bottomStyle;
				}
				spanTriangle.style.transform = transformStyle;
				spanTriangle.style.background = backgroundStyle;
				spanTriangle.style.visibility = "visible";
				content.style.left = contentLeftStyle;
				content.style.top = contentTopStyle;
				content.style.transform = contentTransform;
				content.style.visibility = "visible";
			},
			getInfoWindowContent: function(marker) {
				return `<div class="" style="height:100%; overflow:auto">
							<span class="marker_triangle"></span>
							<div class="marker_info_up" style="display:flex;align-items:center;justify-content:center">
								Project ${marker.project_number}
							</div>
							<div class="marker_info_down" style="display:flex;align-items:center;justify-content:center">
								${marker.project_name}
							</div>
						</div>`;
			},
			handleZoom(value) {
				if (value >= this.expandZoom) {
					this.handleExpand();
					this.setExpandFlag({ flag: true });
				} else {
					this.handleReset();
					this.setExpandFlag({ flag: false });
				}
			},
			handleChange(e) {
				this.handleCenter.lat = e.lat();
				this.handleCenter.lng = e.lng();
				axios
					.get(
						`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.lat()},${e.lng()}&key=${
							constants.GOOGLE_MAP_API_KEY
						}`
					)
					.then(response => {
						if (response.data.results.length > 0) {
							const address_arr = response.data.results[0].address_components;
							let country = "";
							let area1 = "";
							// let area2 = "";
							address_arr.forEach(elem => {
								if (elem.types[0] == "country") {
									country = elem.long_name;
								} else if (elem.types[0] == "political") {
									area1 = elem.long_name;
								} else if (elem.types[0] == "locality") {
									area1 = elem.long_name;
								} else if (elem.types[0] == "administrative_area_level_2") {
									area1 = elem.long_name;
								} else if (elem.types[0] == "administrative_area_level_1") {
									area1 = elem.long_name;
								}
							});
							this.handleGoogleMapTitle([country, area1]);
						}
					});
			}
		}
	};
</script>

<style>
.map_custom_marker {
	cursor: pointer;
}
.gm-style .gm-style-iw-c {
	visibility: hidden;
	background: #fed843;
	border-radius: 0;
	padding: 10px !important;
	width: 268px !important;
	transform: none;
	top: 74px;
	overflow: visible;
}
.gm-style .gm-style-iw-t::after {
	display: none;
}
.marker_triangle {
	visibility: hidden;
	background: linear-gradient(
		30deg,
		rgba(254, 216, 67, 1) 58%,
		rgba(254, 216, 67, 0) 50%,
		rgba(254, 216, 67, 0) 100%
	);
	box-shadow: 0px 0px 0px 0 rgba(178, 178, 178, 0);
	content: "";
	height: 28px;
	left: 16px;
	top: -5px;
	position: absolute;
	transform: translate(-50%, -50%) rotate(1deg);
	width: 32px;
}
.gm-style-iw.gm-style-iw-c button {
	display: none !important;
}
.gm-style-iw-d {
	overflow: auto !important;
}
.gm-style-iw-d,
.gm-style-iw-d > div,
.gm-style-iw-d > div > div {
	height: 100% !important;
}
.marker_info_up {
	font-family: Titillium Web;
	font-style: normal;
	font-weight: normal;
	font-size: 28px;
	line-height: 42px;
	color: #000000;
}
.marker_info_down {
	font-family: Titillium Web;
	font-style: normal;
	font-weight: bold;
	font-size: 24px;
	line-height: 36px;
	color: #000000;
}
</style>
