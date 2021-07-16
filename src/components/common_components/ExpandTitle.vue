<template>
	<div v-if="title.length > 0" class="expand_title_container" @click="handleTitleClick">
		<div class="expand_title_left">
			<span>{{title[0]}}</span>
		</div>
		<div class="expand_title_mid"></div>
		<div class="expand_title_right">
			<span>{{title[1]}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "expand-title",
		props: {
			handleReset: Function,
			title: Array
		},
		data() {
			return {};
		},
		methods: {
			handleTitleClick() {
				this.handleReset();
				setTimeout(() => {
					document
						.querySelectorAll(
							".gmnoprint.gm-bundled-control.gm-bundled-control-on-bottom > .gmnoprint > div > button"
						)[1]
						.click();
				}, 1000);
			}
		}
	};
</script>

<style>
.expand_title_container {
	position: absolute;
	left: 3vw;
	top: 4.5vh;
	font-size: 0.6vw;
	z-index: 1;
	color: black;
	font-family: Gotham Light;
	display: flex;
	cursor: pointer;
}
.expand_title_left,
.expand_title_right {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 0.74vw;
	padding-right: 0.74vw;
}
.expand_title_left {
	background: #fed843;
	/* width: 7.1vw; */
	height: 2.7vh;
}
.expand_title_mid {
	background: url("../../assets/bg/bg-title.png");
	background-size: cover;
	width: 0.75vw;
	height: 2.7vh;
}
.expand_title_right {
	background: #fed843;
	background-size: cover;
	/* width: 9.6vw; */
	height: 2.7vh;
}
.expand_title_right > span {
	padding-left: 0.09vw;
}
</style>
