<template>
	<div class="project_table_container">
		<div class="project_table_shadow">
			<navigation-button icon="search" :handleClick="handleNav" :badgeNumber="mapData.length" />
		</div>
		<div class="project_table_content">
			<div class="project_table_title">
				<span>MATCHING PROJECTS ({{mapData.length}})</span>
				<a
					class="project_table_reset_button"
					href="javascript:void(0);"
					@click="handleResultReset"
				>RESET</a>
			</div>
			<div class="project_table_navbar_container">
				<b-nav class="project_title_navbar">
					<b-nav-item
						class="project_title_navbar_item"
						v-for="(tab, index) in tabLabels"
						:key="index"
						:active="index === activeTabIndex"
						@click="activeTabIndex = index"
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
				class="project_result_scroll-area"
				:settings="settings"
				@ps-scroll-y="scrollHandle"
			>
				<div class="project_table">
					<project-table-row
						v-for="(row, index) in mapData"
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
	import VueMyDropDown from "vue-my-dropdown";
	import "@/assets/css/scrollbar.css";
	import NavigationButton from "../common_components/NavigationButton";
	import ProjectTableRow from "./ProjectTableRow";

	export default {
		name: "project-result",
		components: {
			"vue-custom-scrollbar": VueCustomScrollbar,
			"navigation-button": NavigationButton,
			"project-table-row": ProjectTableRow,
			dropdown: VueMyDropDown
		},
		props: {
			mapData: Array,
			handleShowSearch: Function,
			handleResultReset: Function,
			handleDetailsLocation: Function
		},
		methods: {
			scrollHandle: () => {},
			handleNav: () => {},
			handleDropdownItemClick(index) {
				this.activeSortIndex = index;
				if (index == 0) {
					this.mapData.sort((a, b) => {
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
					this.mapData.sort((a, b) => {
						return a.sqft - b.sqft;
					});
				} else if (index == 2) {
					this.mapData.sort((a, b) => {
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
						label: "ALL RESULTS",
						active: true
					}
				],
				sortList: ["Name", "Sqft", "Date"],
				visible: false
			};
		},
		computed: {},
		mounted() {
			this.mapData.sort((a, b) => {
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
.project_table_title {
	width: 100%;
	background: #00aec4;
	display: flex;
	align-items: center;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	color: #ffffff;
	height: 10vh;
	padding-left: 1.67vw;
	padding-right: 1.67vw;
}
.project_table_title > span {
	font-size: 1.3vw;
	line-height: 2.78vh;
}
a.project_table_reset_button {
	font-size: 0.78vw;
	margin-left: 1.3vw;
	text-decoration: underline;
	color: white !important;
}
.project_result_scroll-area {
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
	padding-right: 4.95vw;
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
}
.project_title_navbar > .nav-item > .nav-link.active {
	color: white;
}
.project_table_sort_container {
	color: #c5cdd3;
	font-size: 0.94vw;
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
	width: 50vw;
	height: 100vh;
	background: #05141f;
}
.project_title_navbar_item {
	font-size: 0.94vw;
	padding: 1.97vh 1.01vw;
}
.project_result_dropdown_item {
	margin-bottom: 1.15vh;
	padding: 1.15vh 2.3vh;
	font-size: 0.93vw;
}
</style>
