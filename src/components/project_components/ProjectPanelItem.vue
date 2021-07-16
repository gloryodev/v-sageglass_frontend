<template>
	<div v-if="value" style="display:flex;">
		<div class="project_panel_item_shadow"></div>
		<div
			class="project_panel_item_container"
			:style="{
            width: `${containerWidthArray[index] / 7680 * screenWidth}px`,
        }"
		>
			<div class="project_panel_item_left">
				<span class="project_panel_item_title">{{title}}</span>
				<br />
				<span class="project_panel_item_value">{{numberWithCommas(value)}}</span>
			</div>
			<img :src="require('@/assets/icons/' + icon + '.png')" alt />
		</div>
	</div>
</template>

<script>
	export default {
		name: "project-panel-item",
		components: {},
		props: {
			title: String,
			value: Number,
			icon: String,
			index: Number
		},
		data() {
			return {
				containerWidthArray: [1246, 1490, 1767, 2135],
				screenWidth: window.innerWidth
			};
		},
		methods: {
			numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
		}
	};
</script>

<style>
.project_panel_item_container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: linear-gradient(180deg, #00aec4 0%, #00aec4 100%);
	height: 10.4vh;
	padding-left: 1.7vw;
	padding-right: 1.7vw;
	margin-bottom: 0.53vh;
}
.project_panel_item_left:hover {
	transform: scale(1.3);
}
.project_panel_item_left {
	text-align: left;
}
.project_panel_item_title {
	font-family: Gotham Black;
	font-style: normal;
	font-weight: normal;
	color: #165278;
	font-size: 1vw;
	line-height: 2.08vh;
}
.project_panel_item_value {
	font-family: Gotham Black;
	font-style: normal;
	font-weight: normal;
	color: #ffffff;
	font-size: 1.95vw;
	line-height: 4.17vh;
}
.project_panel_item_shadow {
	background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
	opacity: 0.56;
	transform: matrix(-1, 0, 0, 1, 0, 0);
	width: 1.7vw;
	height: 10.4vh;
}
.project_panel_item_container > img {
	width: 2.34vw;
}
</style>
