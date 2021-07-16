<template>
	<div class="live_container">
		<img src="@/assets/bg/bg-sageglass.png" width="100%" alt />
		<div
			class="live_state_container"
			:style="{ borderWidth: 0.06 * screenWidth > 5 ? '0.06vw' : '1px' }"
		>
			<span class="live_state_label">LIVE</span>
			<input class="btn_live_state btn blinking" type="button" value />
		</div>
	</div>
</template>

<script>
	export default {
		name: "live-state",
		props: {},
		methods: {},
		data() {
			return {
				screenWidth: window.innerWidth
			};
		}
	};
</script>

<style>
.live_container {
	position: absolute;
	z-index: 1;
	left: 4.2vw;
	bottom: 5.4vh;
	width: 4.7vw;
}
.live_state_container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1;
	box-sizing: border-box;
	padding: 0.4vw;
	border-style: solid;
	border-color: #ffd32f;
	border-radius: 0.13vw;
	margin-top: 0.6vh;
}
.live_state_label {
	font-family: Titillium Web;
	font-style: normal;
	font-weight: bold;
	color: #ffffff;
	font-size: 0.65vw;
	line-height: 1.4vh;
}
.btn_live_state {
	background: #fed843;
	border-radius: 50%;
	padding: 0;
	width: 0.5vw;
	height: 0.5vw;
}
.blinking {
	animation: blinkingText 1.2s infinite;
}
@keyframes blinkingText {
	0% {
		background: #fed843;
	}
	49% {
		background: #fed843;
	}
	60% {
		background: transparent;
	}
	99% {
		background: transparent;
	}
	100% {
		background: #fed843;
	}
}
</style>
