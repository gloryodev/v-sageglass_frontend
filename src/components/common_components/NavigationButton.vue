<template>
	<div class="icon_tool_container" variant="primary" @click="handleButtonClick">
		<span v-if="badgeNumber > 0">{{ badgeNumber }}</span>
		<b-icon :icon="icon"></b-icon>
	</div>
</template>

<script>
	export default {
		name: "navigation-button",
		props: {
			icon: String,
			handleClick: Function,
			badgeNumber: Number
		},
		methods: {
			handleButtonClick() {
				this.handleClick();
				if (this.icon == "x") {
					setTimeout(() => {
						document
							.querySelectorAll(
								".gmnoprint.gm-bundled-control.gm-bundled-control-on-bottom > .gmnoprint > div > button"
							)[1]
							.click();
					}, 1000);
				}
			}
		},
		data() {
			return {};
		}
	};
</script>

<style>
.icon_tool_container {
	cursor: pointer;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	background: #00aec4;
	border-radius: 0;
	border: none;
	transform: matrix(-1, 0, 0, 1, 0, 0);
	left: 0;
	top: 1.8vh;
	width: 4.55vw;
	height: 4.55vw;
	font-size: 2vw;
	position: relative;
}
.icon_tool_container > span {
	border-radius: 50%;
	width: 1vw;
	height: 1vw;
	background: #165278;
	color: white;
	font-size: 0.78vw;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 20%;
	left: 50%;
}
</style>
