<template>
	<div>
		<div
			v-if="!reverse"
			class="chart_marker_container"
			:style="{
            left: markerMarginLeft + 'px', 
        }"
		>
			<div class="chart_marker_content">
				<span
					class="chart_marker_time"
				>{{data.time[0] == 0 || data.time[0] == 12 ? 12 : data.time[0] > 11 ? data.time[0] - 12 : data.time[0] }}:{{data.time[1] > 9 ? data.time[1] + " " : "0" + data.time[1]}} {{data.time[0] > 11 ? 'pm' : 'am'}}</span>
				<br />
				<span>Voltage: {{data.voltage.measurement}} volts</span>
				<br />
				<span>Charge: {{data.wattage.measurement}} Q</span>
				<br />
				<span>Connectivity: {{data.connectivity.measurement == 0 ? 'None' : data.connectivity.measurement == 1 ? 'Very Low' : data.connectivity.measurement == 2 ? 'Low' : data.connectivity.measurement == 3 ? 'Average' : data.connectivity.measurement == 4 ? 'Good' : 'Excellent'}}</span>
				<br />
				<span>Power Intensity: {{data.power.measurement == 0 ? 'None' : data.power.measurement == 1 ? 'Very Low' : data.power.measurement == 2 ? 'Low' : data.power.measurement == 3 ? 'Average' : data.power.measurement == 4 ? 'Good' : 'Excellent'}}</span>
			</div>
		</div>
		<div
			v-if="reverse"
			class="chart_marker_reverse_container"
			:style="{
            left: (markerMarginLeft - 0.167 * this.screenWidth) + 'px', 
        }"
		>
			<div class="chart_marker_reverse_content">
				<span
					class="chart_marker_time"
				>{{data.time[0] == 0 || data.time[0] == 12 ? 12 : data.time[0] > 11 ? data.time[0] - 12 : data.time[0] }}:{{data.time[1]}} {{data.time[0] > 11 ? 'PM' : 'AM'}}</span>
				<br />
				<span>Voltage: {{data.voltage.measurement}}</span>
				<br />
				<span>Charge: {{data.wattage.measurement}}</span>
				<br />
				<span>Connectivity: {{data.connectivity.measurement == 0 ? 'None' : data.connectivity.measurement == 1 ? 'Very Low' : data.connectivity.measurement == 2 ? 'Low' : data.connectivity.measurement == 3 ? 'Average' : data.connectivity.measurement == 4 ? 'Good' : 'Excellent'}}</span>
				<br />
				<span>Power Intensity: {{data.power.measurement == 0 ? 'None' : data.power.measurement == 1 ? 'Very Low' : data.power.measurement == 2 ? 'Low' : data.power.measurement == 3 ? 'Average' : data.power.measurement == 4 ? 'Good' : 'Excellent'}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "chart-marker",
		props: {
			markerMarginLeft: Number,
			data: Object,
			reverse: Boolean
		},
		data() {
			return {
				screenWidth: window.innerWidth
			};
		}
	};
</script>

<style>
.chart_marker_container {
	position: absolute;
	text-align: left;
	height: 100%;
	width: 16.7vw;
	border-left: 0.104vw solid white;
}
.chart_marker_reverse_container {
	position: absolute;
	text-align: left;
	height: 100%;
	width: 16.7vw;
	border-right: 0.104vw solid white;
}
.chart_marker_content {
	position: relative;
	font-family: Gotham Pro;
	font-size: 0.91vw;
	line-height: 2.27vh;
	color: white;

	padding: 1.6vh 1.8vw;
	margin-top: 3.15vh;
	margin-left: 1vw;
	background: black;
}
.chart_marker_content::before {
	background: linear-gradient(
		30deg,
		rgba(0, 0, 0, 0) 65%,
		rgba(0, 0, 0, 1) 50%,
		rgba(0, 0, 0, 1) 100%
	);
	content: "";
	width: 0.95vw;
	height: 2.06vh;
	left: -0.8vw;
	top: 0;
	position: absolute;
}
.chart_marker_reverse_content {
	font-family: Gotham Pro;
	font-size: 0.91vw;
	line-height: 2.27vh;
	color: white;

	padding: 1.6vh 1.8vw;
	margin-top: 3.15vh;
	margin-right: 1vw;
	background: black;
	position: relative;
}
.chart_marker_reverse_content::before {
	background: linear-gradient(
		330deg,
		rgba(0, 0, 0, 0) 65%,
		rgba(0, 0, 0, 1) 50%,
		rgba(0, 0, 0, 1) 100%
	);
	content: "";
	width: 0.95vw;
	height: 2.06vh;
	right: -0.8vw;
	top: 0;
	position: absolute;
}
.chart_marker_time {
	color: #00aec4;
}
</style>