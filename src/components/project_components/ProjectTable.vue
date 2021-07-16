<template>
	<div class="project_table_container">
		<div class="project_table_shadow">
			<navigation-button icon="search" :handleClick="handleShowSearch" />
		</div>
		<div class="project_table_content">
			<div class="project_table_title">
				<span>BROWSE ALL PROJECTS ({{ overlay.total_projects }})</span>
			</div>
			<div class="project_table_navbar_container">
				<b-nav class="project_title_navbar">
					<b-nav-item
						class="project_table_navbar_item"
						v-for="(tab, index) in tabLabels"
						:key="index"
						:active="index === activeTabIndex"
						@click="() => handleTabClick(index)"
						:style="{
              background: index === activeTabIndex ? '#05141F' : '#18384D',
            }"
					>{{ tab.label }}</b-nav-item>
				</b-nav>
				<div class="project_table_sort_container">
					<span>Sort by:{{ " " }}</span>
					<dropdown
						class="project_table_sort_dropdown"
						:visible="visible"
						:position="['right', 'bottom', 'right', 'top']"
						@clickout="visible = false"
					>
						<span class="link" @click="visible = !visible">
							{{ sortList[activeSortIndex] }}
							<b-icon icon="chevron-down" />
						</span>
						<div slot="dropdown" class="dialog no-padding">
							<aside class="menu">
								<ul class="menu-list project_table_dropdown_menu-list">
									<li
										class="project_table_dropdown_item"
										v-for="(sort, index) in sortList"
										:key="index"
										@click="() => handleDropdownItemClick(index)"
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
				class="project_table_scroll-area"
				:settings="settings"
				@ps-scroll-y="scrollHandle"
			>
				<div v-if="tableData.length" class="project_table" :style="{}">
					<project-table-row
						v-for="(row, index) in tableData[activeTabIndex]"
						:key="index"
						:data="row"
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
	import ProjectTableRow from "./ProjectTableRow";
	// import constants from "@/data/constants.js";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "project-table",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"project-table-row": ProjectTableRow,
			dropdown: VueMyDropDown
		},
		props: {
			handleShowSearch: Function,
			handleDetailsLocation: Function,
			setTabIndex: Function
		},
		methods: {
			...mapActions([
				"setConnectedData",
				"setNonConnectedData",
				"setUpcomingData"
			]),
			scrollHandle: () => {},
			handleTabClick(index) {
				this.setTabIndex(index);
				this.activeTabIndex = index;
				this.activeSortIndex = 0;
			},
			handleDropdownItemClick(index) {
				this.activeSortIndex = index;
				if (index == 0) {
					this.tableData[this.activeTabIndex].sort((a, b) => {
						var nameA = a.project_name.toUpperCase();
						var nameB = b.project_name.toUpperCase();
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					});
				} else if (index == 1) {
					this.tableData[this.activeTabIndex].sort((a, b) => {
						return b.sqft - a.sqft;
					});
				} else if (index == 2) {
					this.tableData[this.activeTabIndex].sort((a, b) => {
						if (new Date(a.purchase_date) > new Date(b.purchase_date)) {
							return 1;
						} else {
							return -1;
						}
					});
				}
				this.visible = false;
			}
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 60
				},
				screenHeight: window.screen.availHeight,
				activeTabIndex: 0,
				activeSortIndex: 0,
				tabLabels: [
					{
						label: "CONNECTED",
						active: true
					},
					{
						label: "NON-CONNECTED",
						active: false
					},
					{
						label: "UPCOMING",
						active: false
					}
				],
				sortList: ["Name", "Sqft", "Date"],
				visible: false,
				connected: [],
				nonConnected: [],
				upcoming: []
			};
		},
		computed: {
			...mapState([
				"connectedData",
				"nonConnectedData",
				"upcomingData",
				"overlay",
				"projects"
			]),
			tableData() {
				return [this.connectedData, this.nonConnectedData, this.upcomingData];
			}
		},
		mounted() {
			Object.keys(this.projects).forEach(key => {
				let project = this.projects[key];
				if (typeof project == "object") {
					project.project_number = key;
					if (project.connected == true) {
						this.connected.push(project);
					} else if (project.connected == false && project.completed == 100) {
						this.nonConnected.push(project);
					} else {
						this.upcoming.push(project);
					}
				}
			});
			this.setConnectedData({
				data: this.connected.sort((a, b) => {
					var nameA = a.project_name.toUpperCase();
					var nameB = b.project_name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				})
			});
			this.setNonConnectedData({
				data: this.nonConnected.sort((a, b) => {
					var nameA = a.project_name.toUpperCase();
					var nameB = b.project_name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				})
			});
			this.setUpcomingData({
				data: this.upcoming.sort((a, b) => {
					var nameA = a.project_name.toUpperCase();
					var nameB = b.project_name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				})
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
	overflow: hidden;
}
.project_table_shadow {
	height: 99.8vh;
	background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
	transform: matrix(-1, 0, 0, 1, 0, 0);
	z-index: 1;
	width: 8.4vw;
}
.project_table_title {
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
.project_table_title > span {
	font-size: 1.3vw;
	line-height: 2.77vh;
}
.project_table_scroll-area {
	/* position: absolute; */
	z-index: 1;
	top: 1px;
	/* height: 99.8vh; */
	width: 100%;
	background: #05151f;
	height: 83.47vh;
}
.project_table_navbar_container {
	background: #18384d;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 0.91vw;
	padding-right: 4.94vw;
}
.project_title_navbar {
	background: #18384d;
	display: flex;
}
.project_title_navbar > .nav-item > .nav-link {
	color: #817f7f;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	padding: 0;
	text-decoration: none;
}
.project_title_navbar > .nav-item > .nav-link:hover {
	color: #00aec4;
}
.project_title_navbar > .nav-item > .nav-link.active {
	color: white;
}
.project_table_sort_container {
	color: #c5cdd3;
	font-size: 0.93vw;
}
.project_table {
	width: 100%;
}
.project_table_sort_dropdown {
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
.project_table_content {
	width: 49.96vw;
	height: 100vh;
	background: #05141f;
}
.project_table_navbar_item {
	font-size: 0.93vw;
	padding: 1.96vh 1.01vw;
}
.project_table_dropdown_menu-list {
	padding-top: 1.15vh;
}
.project_table_dropdown_item {
	margin-bottom: 1.15vh;
	padding: 1.15vh 2.3vh;
	font-size: 0.93vw;
}
</style>
