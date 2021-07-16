<template>
	<div
		class="notification_box_container"
		@click="showNotificationCenter"
		:style="{top: isLocation ? '8vh' : '1.43vh'}"
	>
		<div class="notification_box_content">
			<img src="@/assets/icons/notification.png" alt />
			<span>{{ count > 0 ? count : '' }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "notification-box",
		props: {
			count: Number,
			showNotificationCenter: Function,
			isLocation: Boolean
		},
		components: {},
		data() {
			return {};
		}
	};
</script>

<style>
.notification_box_container {
	width: 4.1vw;
	height: 6.46vh;
	position: absolute;
	right: 0;
	/* top: 1.43vh; */
	background: #141b23;
	z-index: 2;
	cursor: pointer;
}
.notification_box_content {
	position: relative;
	width: 100%;
	height: 100%;
}
.notification_box_content > img {
	width: 1.94vw;
	height: 2.75vh;
	position: absolute;
	left: 0.95vw;
	top: 2.125vh;
}
.notification_box_content > span {
	position: absolute;
	left: 3vw;
	top: 1.3vh;
	font-family: Roboto;
	font-style: normal;
	font-weight: bold;
	font-size: 0.78vw;
	line-height: 1.62vh;
	color: #00aec4;
}
</style>