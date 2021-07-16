<template>
	<div class="notification_center_container">
		<div class="project_table_shadow">
			<navigation-button icon="x" :handleClick="handleReset" />
		</div>
		<div class="notification_center_content">
			<div class="notification_center_title">
				<span>NOTIFICATIONS CENTER ({{ alerts.length }})</span>
			</div>
			<div class="notification_center_navbar_container">
				<div class="notification_center_left_sort_container">
					<span>Search:{{" "}}</span>
					<input type="text" class="notification_search_text" v-model="searchText" />
				</div>
				<div class="notification_center_right_sort_container">
					<span>Sort by:{{ " " }}</span>
					<dropdown
						class="notification_table_sort_dropdown"
						:visible="rVisible"
						:position="['right', 'bottom', 'right', 'top']"
						@clickout="rVisible = false"
					>
						<span class="link" @click="rVisible = !rVisible">
							{{ rightSortList[activeSortIndex] }}
							<b-icon icon="chevron-down" />
						</span>
						<div slot="dropdown" class="dialog no-padding">
							<aside class="menu">
								<ul class="menu-list notification_table_dropdown_menu-list">
									<li
										class="notification_table_dropdown_item"
										v-for="(sort, index) in rightSortList"
										:key="index"
										@click="() => handleRightDropdownItemClick(index)"
										:class="index === activeSortIndex ? 'active' : ''"
									>{{ sort }}</li>
								</ul>
							</aside>
						</div>
					</dropdown>
				</div>
			</div>
			<vue-custom-scrollbar
				v-if="screenHeight"
				class="notification_table_scroll-area"
				:settings="settings"
				@ps-scroll-y="scrollHandle"
			>
				<div v-if="alerts.length" class="notification_table">
					<notification-table-row
						v-for="(row, index) in alerts"
						:key="index"
						:data="row"
						:filterText="searchText"
            :handleDetailsLocation="handleDetailsLocation"
					/>
				</div>
			</vue-custom-scrollbar>
		</div>
	</div>
</template>

<script>
	import VueCustomScrollbar from "vue-custom-scrollbar";
	// import axios from "axios";
	import VueMyDropDown from "vue-my-dropdown";
	import "@/assets/css/scrollbar.css";
	import NavigationButton from "../common_components/NavigationButton";
	import NotificationTableRow from "./NotificationTableRow";
	// import constants from "@/data/constants.js";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "notification-center",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"notification-table-row": NotificationTableRow,
			dropdown: VueMyDropDown
		},
		props: {
			handleShowSearch: Function,
			handleReset: Function,
      setTabIndex: Function,
      handleDetailsLocation: Function, 
			tableData: Array
		},
		methods: {
			...mapActions([]),
			scrollHandle: () => {},
			handleLeftDropdownItemClick(index) {
				this.activeLeftSortIndex = index;
				this.lVisible = false;
			},
			handleRightDropdownItemClick(index) {
				this.activeSortIndex = index;
				this.rVisible = false;
			}
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.screen.availHeight,
				activeSortIndex: 0,
				rightSortList: ["Timestamp", "Critically", "Name"],
				lVisible: false,
				rVisible: false,
				searchText: ""
				// tableData: [
				//   {
				//     timestamp: "10:30 AM",
				//     critical: true,
				//     project_name: "Tria Rink",
				//     address: "Treasure Island, Michigan",
				//     message:
				//       "Roof sensor is experiencing technical issues Wall Switch UI is turned off."
				//   },
				//   {
				//     timestamp: "9:30 AM",
				//     critical: false,
				//     project_name: "Carters",
				//     address: "Treasure Island, Michigan",
				//     message:
				//       "Roof sensor is experiencing technical issues Wall Switch UI is turned off."
				//   },
				//   {
				//     timestamp: "8:30 AM",
				//     critical: false,
				//     project_name: "ST Minea",
				//     address: "Treasure Island, Michigan",
				//     message:
				//       "Roof sensor is experiencing technical issues Wall Switch UI is turned off."
				//   },
				//   {
				//     timestamp: "5:30 AM",
				//     critical: false,
				//     project_name: "Boston Inc.",
				//     address: "Treasure Island, Michigan",
				//     message:
				//       "Roof sensor is experiencing technical issues Wall Switch UI is turned off."
				//   },
				//   {
				//     timestamp: "4:30 AM",
				//     critical: false,
				//     project_name: "Tria Rink",
				//     address: "Treasure Island, Michigan",
				//     message:
				//       "Roof sensor is experiencing technical issues Wall Switch UI is turned off."
				//   }
				// ]
			};
		},
		computed: {
			...mapState(["projects"]),
			alerts() {
				let alerts = this.tableData;
				if (this.activeSortIndex == 0) {
					alerts.sort((a, b) => {
						if (new Date(a.time) > new Date(b.time)) {
							return 1;
						} else {
							return -1;
						}
					});
				} else if (this.activeSortIndex == 1) {
					(a, b) => {
						return a.critical - b.critical;
					};
				} else if (this.activeSortIndex == 2) {
					(a, b) => {
						var nameA = this.projects(a.project_no).project_name.toUpperCase();
						var nameB = this.projects(b.project_no).project_name.toUpperCase();
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					};
				}
				return alerts;
			}
			// tableData() {
			//   return [this.connectedData, this.nonConnectedData, this.upcomingData];
			// }
		},
		mounted() {}
	};
</script>

<style>
.notification_center_container {
	position: absolute;
	display: flex;
	align-items: center;
	z-index: 10;
	right: 0;
	overflow: hidden;
}
.project_table_shadow {
	height: 99.8vh;
	background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
	transform: matrix(-1, 0, 0, 1, 0, 0);
	z-index: 1;
	width: 8.4vw;
}
.notification_center_title {
	width: 100%;
	background: #00aec4;
	display: flex;
	align-items: center;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	color: #ffffff;
	height: 10.1vh;
	padding-left: 1.66vw;
	padding-right: 1.66vw;
}
.notification_center_title > span {
	font-size: 1.3vw;
	line-height: 2.77vh;
}
.notification_table_scroll-area {
	/* position: absolute; */
	z-index: 1;
	top: 1px;
	/* height: 99.8vh; */
	width: 100%;
	background: #05151f;
	height: 83.47vh;
}
.notification_center_navbar_container {
	background: #18384d;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 3.36vw;
	padding-right: 4.94vw;
	padding-top: 2.17vh;
	padding-bottom: 2.17vh;
}
.notification_title_navbar {
	background: #18384d;
	display: flex;
}
.notification_title_navbar > .nav-item > .nav-link {
	color: #817f7f;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	padding: 0;
	text-decoration: none;
}
.notification_title_navbar > .nav-item > .nav-link:hover {
	color: #00aec4;
}
.notification_title_navbar > .nav-item > .nav-link.active {
	color: white;
}
.notification_center_left_sort_container {
	color: #c5cdd3;
	font-size: 0.93vw;
}
.notification_center_right_sort_container {
	color: #c5cdd3;
	font-size: 0.93vw;
}
.notification_table {
	width: 100%;
}
.notification_table_sort_dropdown {
	cursor: pointer;
}
.my-dropdown-dd {
	z-index: 2;
	background: white;
}
.my-dropdown-dd .menu-list {
	margin-bottom: 0;
	padding-left: 0;
}
.my-dropdown-dd .menu-list li {
	list-style: none;
	color: black;
}
.my-dropdown-dd .menu-list li.active {
	background: lightgrey;
}
.notification_center_content {
	width: 49.96vw;
	height: 100vh;
	background: #05141f;
}
.notification_title_navbar_item {
	font-size: 0.93vw;
	padding: 1.96vh 1.01vw;
}
.notification_table_dropdown_menu-list {
	padding-top: 1.15vh;
}
.notification_table_dropdown_item {
	margin-bottom: 1.15vh;
	padding: 1.15vh 2.3vh;
	font-size: 0.93vw;
}
.notification_search_text {
	background: #00aec4;
	border: none;
	padding-left: 0.5vw;
	padding-right: 0.5vw;
}
.notification_search_text:focus {
	outline: none;
}
</style>
