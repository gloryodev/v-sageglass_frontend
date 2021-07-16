<template>
	<div class="timeline_container">
		<span class="timeline_am">AM</span>
		<span class="timeline_pm">PM</span>
		<div class="timeline_labels">
			<span
				class="timeline_label"
				v-for="(label, index) in timeLabels"
				:key="index"
				:style="{
          left: `${0.0586 * screenWidth * (index + 1 - 1 / 3)}px`,
        }"
			>{{ label }}</span>
		</div>
		<div class="timeline_criticals">
			<span
				class="timeline_critical"
				v-for="(critical, index) in eventTimes"
				:key="index"
				:style="{
          left: `${0.0586 * screenWidth +
            (0.0586 * screenWidth / 3) *
              (critical.getHours() + critical.getMinutes() / 60)}px`,
        }"
				@click="handleCriticalClick"
			></span>
		</div>
		<div
			class="timeline_bar"
			:style="{
        borderBottomWidth: `${
          0.00065 * screenWidth < 1 ? 1 : 0.00065 * screenWidth
        }px`,
      }"
		></div>
		<div class="timeline_current_time_indicator">
			<slider
				id="time_slider"
				v-model="sliderValue"
				@change="handleSliderChange"
				:max="maxSliderValue"
				:enable-cross="false"
				tooltip="always"
				tooltipPlacement="top"
				:processStyle="{
                opacity: 0
              }"
				:tooltipStyle="{
                fontSize: `0px`,
                color: 'white',
                fontFamily: 'Gotham Light',
                display: `flex`,
                alignItems: `flex-end`
              }"
				:dotStyle="{
              }"
				:railStyle="{
                background: `rgba(255, 255, 255, 0)`, 
              }"
			/>
			<span
				v-if="!((currentTime[0] == 0 && currentTime[1] == 59) || (currentTime[0] == 24 && currentTime[1] == 59))"
				class="timeline_current_time_label"
				:style="{
          left: `${0.045 * screenWidth +
            (0.0586 * screenWidth / 3) *
              (currentTime[0] + currentTime[1] / 60)}px`,
        }"
			>
				{{ currentTime[0] == 24 ? 12 : currentTime[0] == 0 ? 12 : currentTime[0] > 12 ? currentTime[0] - 12 : currentTime[0] }}:{{ currentTime[1] > 9
				? (currentTime[1]) + " "
				: "0" + (currentTime[1]) + " "
				}}{{ currentTime[0] == 24 ? "AM" : currentTime[0] > 11 ? "PM" : "AM" }}
			</span>
			<!-- <span
        class="timeline_current_time_square"
        :style="{
          left: `${0.0586 * screenWidth +
            (0.0586 * screenWidth / 3) *
              (currentTime[0] + currentTime[1] / 60) -
            0.0349 * screenWidth}px`,
          borderRightWidth: `${
            0.001 * screenWidth < 1
              ? 1
              : 0.001 * screenWidth
          }px`
        }"
        @click="handleIndicatorClick"
      >
        <img src="@/assets/bg/indicator.png" alt />
			</span>-->
		</div>
	</div>
</template>

<script>
	import VueSlider from "vue-slider-component";
	var moment = require('moment');
	export default {
		name: "details-timeline",
		components: {
			slider: VueSlider
		},
		props: {
			handleCriticalClick: Function,
			handleIndicatorClick: Function,
			eventTimes: Array,
			handleCurrentTime: Function
		},
		data() {
			return {
				timeLabels: [0, 3, 6, 9, 12, 3, 6, 9, 12],
				screenWidth: window.innerWidth,
				screenHeight: window.innerHeight,
				/*sliderValue: Math.round(
					(new Date().getHours() * 60 + new Date().getMinutes()) / 10
				),*/
				sliderValue: Math.round(
					(moment.tz(new Date(), this.$store.state.location.timezone).hour() * 60 + moment(new Date(), this.$store.state.location.timezone).minute()) / 10
				),
				maxSliderValue: 144
			};
		},
		computed: {
			currentTime() {
				const hour = Math.floor((this.sliderValue * 10) / 60);
				const minutes = this.sliderValue * 10 - hour * 60;
				return [hour, minutes];
			}
		},
		mounted() {
			document
				.querySelector("#time_slider .vue-slider-dot-handle")
				.addEventListener("click", this.handleIndicatorClick);
			let img_node = document.createElement("img");
			img_node.src = require("@/assets/bg/indicator.png");
			img_node.style.width = "1.12vw";
			img_node.style.height = "3.77vh";
			document
				.querySelector("#time_slider .vue-slider-dot-handle")
				.appendChild(img_node);
		},
		methods: {
			handleSliderChange(value) {
				const h = Math.floor(value / 6);
				const m = (value - h * 6) * 10;
				this.handleCurrentTime([h, m]);
			}
		}
	};
</script>

<style>
#time_slider {
	position: absolute;
	top: -0.1vh;
	left: 0.3vw;
	width: 47vw !important;
	padding: 0 !important;
}
#time_slider .vue-slider-rail {
	height: 0;
}
#time_slider .vue-slider-dot {
	top: 0 !important;
	width: 0 !important;
	height: 0 !important;
}
#time_slider .vue-slider-dot-handle {
	background: linear-gradient(90deg, #00477b 0%, #00477b 47.4%, #00477b 100%);
	border: 2px solid #768a89;
	border-bottom: none;
	position: absolute;
	height: 8.75vh;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 3.5vw;
	border-right-style: solid;
	border-right-color: #ffdc38;
	display: flex;
	align-items: center;
	justify-content: center;
}
.timeline_container {
	height: 100%;
	position: relative;
}
.timeline_bar {
	width: 100%;
	position: absolute;
	left: 0;
	border-bottom-style: dashed;
	border-bottom-color: #1c5b89;
	bottom: 1.83vh;
}
.timeline_label {
	position: absolute;
	color: #276796;
	font-family: Gotham Pro;
	top: 5vh;
	font-size: 0.78vw;
}
.timeline_critical {
	background: #ff5555;
	border-radius: 50%;
	position: absolute;
	z-index: 2;
	cursor: pointer;
	bottom: 1.62vh;
	width: 0.29vw;
	height: 0.29vw;
}
.timeline_current_time_label {
	color: #ffdc38;
	position: absolute;
	font-family: Gotham Pro;
	top: -1.3vw;
	font-size: 0.65vw;
}
.timeline_current_time_square {
	background: linear-gradient(90deg, #00477b 0%, #00477b 47.4%, #00477b 100%);
	border: 2px solid #768a89;
	border-bottom: none;
	position: absolute;
	height: 103%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 3.5vw;
	border-right-style: solid;
	border-right-color: #ffdc38;
}
.timeline_current_time_square > img {
	width: 1.12vw;
	height: 3.77vh;
}
.timeline_am {
	left: 3.91vw;
	top: 2.43vh;
	font-size: 0.65vw;
	font-family: Gotham Pro;
	color: rgba(255, 255, 255, 0.5);
	position: absolute;
}
.timeline_pm {
	left: 27.35vw;
	top: 2.43vh;
	font-size: 0.65vw;
	font-family: Gotham Pro;
	color: rgba(255, 255, 255, 0.5);
	position: absolute;
}
.timeline_current_time_indicator {
	height: 100%;
}
</style>