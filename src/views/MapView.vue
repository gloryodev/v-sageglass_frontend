<template>
	<div class="map-view">
		<home v-if="homeFlag" :handleHomeClose="handleHomeClose" />
		<live-state />

		<expand-title v-if="expandFlag" :handleReset="handleTitleClick" :title="panelTitleWords" />

		<notification-box
			v-if="notificationBoxFlag"
			:count="alerts.length"
			:showNotificationCenter="showNotificationCenter"
			:isLocation="detailsLocationFlag"
		/>

		<show-notification :count="alerts.length" :alert="alerts" />

		<notification-center
			v-if="notificationCenterFlag"
			:handleReset="closeNotificationCenter"
			:tableData="alerts"
			:handleDetailsLocation="handleDetailsLocation"
		/>

		<project-panel
			v-if="!(projectTableFlag || projectSearchFlag || projectResultFlag || detailsLocationFlag || 
      detailsTintFlag || detailsHealthFlag || detailsConfigFlag || healthTouchFlag) && !expandFlag"
			:handleShowTable="handleShowTable"
		/>

		<project-table
			v-if="projectTableFlag"
			:handleShowSearch="handleShowSearch"
			:handleDetailsLocation="handleDetailsLocation"
			:setTabIndex="setTableTabIndex"
		/>

		<project-search
			v-if="projectSearchFlag"
			:handleReset="clearFlags"
			:handleShowResult="handleShowResult"
			:kindIndex="tableTabIndex"
		/>

		<project-result
			v-if="projectResultFlag"
			:mapData="resultMapData"
			:handleResultReset="handleResultReset"
			:handleDetailsLocation="handleDetailsLocation"
		/>

		<details-location
			v-if="detailsLocationFlag"
			:handleReset="clearFlags"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
		/>

		<details-tint
			v-if="detailsTintFlag"
			:handleReset="clearFlags"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
		/>

		<details-health
			v-if="detailsHealthFlag"
			:handleReset="clearFlags"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
			:showHealthTouch="showHealthTouch"
		/>

		<health-wall-touch
			v-if="healthTouchFlag"
			:handleReset="clearFlags"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
			:wallIndex="healthTouchIndex"
		/>

		<details-config
			v-if="detailsConfigFlag"
			:handleReset="clearFlags"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
		/>

		<bottom-navbar
			v-if="bottomNavbarFlag"
			:activeIndex="activeDetailsIndex"
			:handleDetailsLocation="handleDetailsLocation"
			:handleDetailsTint="handleDetailsTint"
			:handleDetailsHealth="handleDetailsHealth"
			:handleDetailsConfig="handleDetailsConfig"
		/>
		<!-- <select-date :styleValues="getSelectDateValues" :activeDate="new Date()" :handleDayClick="handleExam" /> -->

		<google-map
			v-if="googleMapFlag"
			:handleReset="handleReset"
			:handleExpand="handleExpand"
			:handleDetailsLocation="handleDetailsLocation"
			:handleGoogleMapTitle="setGoogleMapTitle"
		/>
	</div>
</template>

<script>
	import LiveState from "../components/common_components/LiveState";
	import ExpandTitle from "../components/common_components/ExpandTitle";
	import GoogleMap from "../components/common_components/GoogleMap";
	import ProjectPanel from "../components/project_components/ProjectPanel";
	import ProjectTable from "../components/project_components/ProjectTable";
	import ProjectSearch from "../components/project_components/ProjectSearch";
	import ProjectResult from "../components/project_components/ProjectResult";
	import DetailsLocation from "../components/details_components/DetailsLocation";
	import DetailsTint from "../components/details_components/DetailsTint";
	import DetailsHealth from "../components/details_components/DetailsHealth";
	import DetailsConfig from "../components/details_components/DetailsConfig";
	import NotificationBox from "../components/notification_components/NotificationBox";
	import ShowNotification from "../components/notification_components/ShowNotification";
	import NotificationCenter from "../components/notification_components/NotificationCenter";
	import HealthWallTouch from "../components/details_components/health_components/HealthWallTouch";
	import BottomNavbar from "../components/common_components/BottomNavbar";
	import Home from "./Home";
	import "@/assets/sass/font_styles.scss";
	import constants from "../data/constants";

	import { mapState, mapActions } from "vuex";

	export default {
		name: "map-view",
		components: {
			home: Home,
			"google-map": GoogleMap,
			"live-state": LiveState,
			"expand-title": ExpandTitle,
			"project-panel": ProjectPanel,
			"project-table": ProjectTable,
			"project-search": ProjectSearch,
			"project-result": ProjectResult,
			"details-location": DetailsLocation,
			"details-tint": DetailsTint,
			"details-health": DetailsHealth,
			"details-config": DetailsConfig,
			"notification-box": NotificationBox,
			"show-notification": ShowNotification,
			"notification-center": NotificationCenter,
			"health-wall-touch": HealthWallTouch,
			"bottom-navbar": BottomNavbar
		},
		data() {
			return {
				homeFlag: true,
				googleMapFlag: false,
				panelFlag: false,
				projectTableFlag: false,
				projectSearchFlag: false,
				projectResultFlag: false,
				detailsLocationFlag: false,
				detailsTintFlag: false,
				detailsHealthFlag: false,
				detailsConfigFlag: false,
				// showNotificationFlag: false,
				notificationCenterFlag: false,
				healthTouchFlag: false,
				bottomNavbarFlag: false,
				notificationBoxFlag: false,
				screenWidthValue: 7680,
				resultMapData: [],
				panelTitleWords: [],
				tableTabIndex: 0,
				notificationCount: 5,
				healthTouchIndex: null,
				alerts: [],
				activeDetailsIndex: 0
			};
		},
		methods: {
			...mapActions(["setExpandFlag", "setMarkerClickFlag", "setCurrentProject"]),
			closeNotificationCenter() {
				this.notificationCenterFlag = false;
			},
			showHealthTouch(index) {
				this.detailsHealthFlag = false;
				this.healthTouchFlag = true;
				this.panelFlag = false;
				this.healthTouchIndex = index;
				console.log(index);
				this.activeDetailsIndex = 2;
			},
			handleExam(y, m, d) {
				console.log(y + m + d);
			},
			handleHomeClose() {
				this.homeFlag = false;
				this.googleMapFlag = true;
				this.panelFlag = true;
			},
			handleReset() {
				if (
					!this.markerClickFlag &&
					(this.projectTableFlag ||
						this.projectSearchFlag ||
						this.projectResultFlag ||
						this.detailsLocationFlag ||
						this.detailsTintFlag ||
						this.detailsHealthFlag ||
						this.detailsConfigFlag ||
						this.healthTouchFlag)
				) {
					this.clearFlags();
				}
				this.setMarkerClickFlag({ flag: false });
			},
			clearFlags() {
				this.panelFlag = true;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.detailsLocationFlag = false;
				this.detailsTintFlag = false;
				this.detailsHealthFlag = false;
				this.detailsConfigFlag = false;
				this.notificationCenterFlag = false;
				this.healthTouchFlag = false;
				this.bottomNavbarFlag = false;
				this.setExpandFlag({ flag: false });
			},
			handleTitleClick() {
				this.panelFlag = true;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.setExpandFlag({ flag: false });
			},
			handleExpand() {
				this.panelFlag = false;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
			},
			handleShowTable() {
				this.panelFlag = false;
				this.projectTableFlag = true;
			},
			handleShowSearch() {
				this.projectTableFlag = false;
				this.projectSearchFlag = true;
			},
			handleShowResult(data) {
				this.projectSearchFlag = false;
				this.projectResultFlag = true;
				this.resultMapData = data;
			},
			handleResultReset() {
				this.projectResultFlag = false;
				this.projectTableFlag = true;
			},
			handleDetailsLocation(project) {
				if (project) {
					this.setCurrentProject({ data: project });
				}
				this.panelFlag = false;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.detailsLocationFlag = true;
				this.detailsTintFlag = false;
				this.detailsHealthFlag = false;
				this.detailsConfigFlag = false;
				this.healthTouchFlag = false;
				this.notificationCenterFlag = false;
				this.bottomNavbarFlag = true;
				this.activeDetailsIndex = 0;
			},
			handleDetailsTint() {
				this.panelFlag = false;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.detailsLocationFlag = false;
				this.detailsTintFlag = true;
				this.detailsHealthFlag = false;
				this.detailsConfigFlag = false;
				this.healthTouchFlag = false;
				this.activeDetailsIndex = 1;
			},
			handleDetailsHealth() {
				this.panelFlag = false;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.detailsLocationFlag = false;
				this.detailsTintFlag = false;
				this.detailsHealthFlag = true;
				this.detailsConfigFlag = false;
				this.healthTouchFlag = false;
				this.activeDetailsIndex = 2;
			},
			handleDetailsConfig() {
				this.panelFlag = false;
				this.projectTableFlag = false;
				this.projectSearchFlag = false;
				this.projectResultFlag = false;
				this.detailsLocationFlag = false;
				this.detailsTintFlag = false;
				this.detailsHealthFlag = false;
				this.detailsConfigFlag = true;
				this.healthTouchFlag = false;
				this.activeDetailsIndex = 3;
			},
			setGoogleMapTitle(title_arr) {
				this.panelTitleWords = title_arr;
			},
			setTableTabIndex(index) {
				this.tableTabIndex = index;
			},
			showNotificationCenter() {
				this.notificationCenterFlag = true;
				this.panelFlag = false;
			}
		},
		computed: {
			...mapState(["mapData", "markerClickFlag", "expandFlag", "currentProject"])
		},
		mounted() {
			const events = new EventSource(constants.GET_EVENTS_URL);
			events.onmessage = event => {
				const parsedData = JSON.parse(event.data);
				this.alerts = [...this.alerts, ...parsedData];
				var x = document.getElementsByClassName(
					"show_notification_container"
				)[0];
				x.className += " show";
				setTimeout(() => {
					x.className = x.className.replace(" show", "");
					this.notificationBoxFlag = true;
				}, 3000);

				//events.close();
			};
		}
	};
</script>

<style>
.show_notification_container {
	visibility: hidden;
}
.show_notification_container.show {
	visibility: visible;
	animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@keyframes fadein {
	from {
		left: 100vw;
		opacity: 0;
	}
	to {
		left: 0;
		opacity: 1;
	}
}
@keyframes fadeout {
	from {
		left: 0;
		opacity: 1;
	}
	to {
		left: 100vw;
		opacity: 0;
	}
}
</style>
