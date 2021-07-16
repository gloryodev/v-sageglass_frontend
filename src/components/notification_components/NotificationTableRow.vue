<template>
	<div
		v-if="projects[data.project_no].project_name.toLowerCase().indexOf(filterText.toLowerCase()) > -1"
		class="notification_table_row"
	>
		<div class="notification_row_time_bar">
			<span class="notification_table_row_time">{{deltaTime}} hours ago</span>
			<span v-if="data.critical" class="notification_table_row_critical">Critical error</span>
		</div>
		<div class="notification_row_name_bar">
			<span class="notification_row_name">{{projects[data.project_no].project_name}}</span>
			<span class="notification_row_address">{{projects[data.project_no].address}}</span>
		</div>
		<div class="notification_row_message_bar">
			<div class="notification_row_message">{{data.message}}</div>
			<div class="notification_row_button" @click="handleClick">See Project Page</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		name: "notification-table-row",
		components: {},
		props: {
			data: Object,
			filterText: String,
			handleDetailsLocation: Function
		},
		data: () => {
			return {
				screenHeight: window.innerHeight
			};
		},
		computed: {
			...mapState(["projects"]),
			deltaTime() {
				const current = new Date();
				const dataTime = new Date(this.data.time);
				const delta = current.getHours() - dataTime.getHours();
				return delta;
			}
		},
		methods: {
			handleClick() {
				const project = this.projects[this.data.project_no];
				project.project_number = this.data.project_no;
				this.handleDetailsLocation(project);
			}
		}
	};
</script>

<style>
.notification_table_row {
	cursor: pointer;
	width: 100%;
	margin-bottom: 0.23vh;
	padding-top: 3.33vh;
	padding-right: 5.92vw;
	padding-bottom: 2.75vh;
	padding-left: 3.66vw;
	border-bottom-width: 0.013vw;
	border-bottom-style: solid;
	border-bottom-color: 19272f;
}
.notification_row_time_bar {
	text-align: left;
	margin-bottom: 1vh;
}
.notification_table_row_time {
	font-family: Gotham Light;
	font-style: normal;
	font-weight: 300;
	font-size: 0.93vw;
	line-height: 1.92vh;
	margin-right: 0.97vw;
	color: #ffffff;
}
.notification_table_row_critical {
	font-family: Gotham Black;
	font-style: normal;
	font-weight: normal;
	font-size: 0.937vw;
	line-height: 1.99vh;
	color: #ff303c;
}
.notification_row_name_bar {
	text-align: left;
}
.notification_row_name {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	font-size: 0.976vw;
	line-height: 3.06vh;
	letter-spacing: 0.05em;
	text-transform: uppercase;
	margin-right: 0.97vw;
	color: #ffffff;
}
.notification_row_address {
	font-family: Gotham Light;
	font-style: normal;
	font-weight: 300;
	font-size: 0.937vw;
	line-height: 1.99vh;
	letter-spacing: 0.02em;
	color: #ffffff;
	opacity: 0.6;
}
.notification_row_message_bar {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}
.notification_row_message {
	display: flex;
	align-items: flex-end;
	max-width: 27.16vw;
	min-height: 6.94vh;
	text-align: left;
	border-left-width: 0.21vw;
	border-left-style: solid;
	border-left-color: #00aec4;
	padding-left: 1.23vw;

	font-family: Roboto;
	font-style: normal;
	font-weight: normal;
	font-size: 1.04vw;
	line-height: 2.17vh;
	color: rgba(255, 255, 255, 0.8);
}
.notification_row_button {
	border: 0.026vw solid #56ecff;
	cursor: pointer;
	padding-top: 0.92vh;
	padding-right: 0.84vw;
	padding-bottom: 0.92vh;
	padding-left: 0.84vw;
	background: #05141f;

	font-family: Gotham Light;
	font-style: normal;
	font-weight: 300;
	font-size: 0.937vw;
	line-height: 1.99vh;
	letter-spacing: 0.02em;
	color: #ffffff;
}
</style>