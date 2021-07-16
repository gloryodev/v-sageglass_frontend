<template>
	<div class="bottom_navbar_container">
		<div class="bottom_navbar_left">
			<span class="bottom_navbar_name">{{ currentProject.project_name }}</span>
			<br />
			<span class="bottom_navbar_address">{{ currentProject.address }}</span>
		</div>
		<b-nav class="bottom_navbar_nav">
			<span ref="navbarMark" class="navbar_nav_active_mark"></span>
			<b-nav-item
				class="bottom_navbar_nav_item"
				v-for="(tab, index) in menuOption"
				:key="index"
				:active="index === activeTabIndex"
				@click="() => handleTabClick(index)"
			>{{ tab }}</b-nav-item>
		</b-nav>
		<!-- <div class="bottom_navbar_right"></div> -->
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "bottom-navbar",
		props: {
			handleDetailsLocation: Function,
			handleDetailsTint: Function,
			handleDetailsHealth: Function,
			handleDetailsConfig: Function,
			activeIndex: Number
		},
		methods: {
			handleTabClick(index) {
				const prevIndex = this.activeTabIndex;
				const nextIndex = index;

				var elem = this.$refs.navbarMark;
				var start = this.markLeftList[prevIndex] * 1;
				var end = this.markLeftList[nextIndex] * 1;
				const step = end > start ? 1 : -1;
        let pos = start;
				var id = setInterval(() => {
					if (step > 0 ? pos > end - 1 : pos < end + 1) {
						clearInterval(id);
					} else {
            pos = pos + step;
						elem.style.left = pos + "vw";
					}
				}, nextIndex == prevIndex ? 30 : 30 / Math.abs(nextIndex - prevIndex));

				this.activeTabIndex = index;
				if (index == 0) {
					this.handleDetailsLocation();
				}
				if (index == 1) {
					this.handleDetailsTint();
				}
				if (index == 2) {
					this.handleDetailsHealth();
				}
				if (index == 3) {
					this.handleDetailsConfig();
				}
			}
		},
		data() {
			return {
				menuOption: ["LOCATION", "TINT", "SYSTEM HEALTH", "CONFIG & ZONES"],
				activeTabIndex: this.activeIndex,
				markLeftList: [4.7, 12.2, 21.5, 34.3]
			};
		},
		computed: {
			...mapState(["currentProject"])
		}
	};
</script>

<style>
.bottom_navbar_container {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 89.5vw;
	height: 17.5vh;
	padding-left: 2.5vw;
	padding-right: 2.5vw;
	background: #00aec4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1;
}
.bottom_navbar_left {
	text-align: left;
	max-width: 39vw;
}
.bottom_navbar_name {
	font-size: 1.8vw;
	line-height: 4vh;
	font-family: Gotham Black;
	font-style: normal;
	font-weight: normal;
	text-transform: uppercase;
	color: #ffffff;
}
.bottom_navbar_address {
	font-size: 1.2vw;
	line-height: 2.6vh;
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	color: #18384d;
}
.bottom_navbar_nav {
	position: relative;
	height: 100%;
}
.bottom_navbar_nav_item {
	font-size: 1.2vw;
	line-height: 2.6vh;
	padding-left: 1.3vw;
	padding-right: 1.3vw;
}
.bottom_navbar_nav_item > a.nav-link {
	height: 100%;
	font-family: Gotham Black;
	text-decoration: none;
	color: white !important;
	display: flex;
	align-items: center;
	padding-left: 0;
	padding-right: 0;
}
span.navbar_nav_active_mark {
	position: absolute;
	content: "";
	background: linear-gradient(
		45deg,
		rgba(22, 82, 120, 0) 50%,
		rgba(22, 82, 120, 1) 50%,
		rgba(22, 82, 120, 1) 100%
	);
	transform: translate(-50%, -50%) rotate(135deg);
	left: 4.7vw;
	top: 0;
}
.bottom_navbar_nav_item > a.nav-link.active {
	color: #18384d !important;
}
.bottom_navbar_nav_item > a.nav-link:hover {
	text-decoration: none;
}
.navbar_nav_active_mark {
	width: 1.8vw;
	height: 1.8vw;
}
</style>
