<template>
	<div class="location_carousel_container">
		<b-carousel
			id="carousel-1"
			v-model="slide"
			:interval="4000"
			controls
			indicators
			background="#ababab"
			style="text-shadow: 1px 1px 2px #333;"
			@sliding-start="onSlideStart"
			@sliding-end="onSlideEnd"
		>
			<div v-if="photos[currentProject.project_number] !== undefined">
				<b-carousel-slide v-for="n in photos[currentProject.project_number]" v-bind:key="n">
					<template v-slot:img>
						<div class="location_slider_img_container">
							<img
								class="d-block img-fluid"
								:src="'Images/Projects/' + currentProject.project_number + '/' + n + '.jpg'" 
								alt="image slot"
								:style="{height: '82.5vh'}"
							/>
						</div>
					</template>
				</b-carousel-slide>
			</div>
			<div v-else>
				<b-carousel-slide>
					<template v-slot:img>
						<div class="location_slider_img_container">
							<img
								class="d-block img-fluid"
								:src="'Images/Projects/no-image.png'" 
								alt="image slot"
								:style="{height: '82.5vh'}"
							/>
						</div>
					</template>
				</b-carousel-slide>
			</div>

			<!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
			<!-- <b-carousel-slide>
				<template v-slot:img>
					<img
						class="d-block img-fluid w-100"
						width="1024"
						height="480"
						src="https://picsum.photos/1024/480/?image=55"
						alt="image slot"
					/>
				</template>
			</b-carousel-slide>-->
		</b-carousel>

		<p class="mt-4">
			Slide #: {{ slide }}
			<br />
			Sliding: {{ sliding }}
		</p>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "location-carousel",
		data() {
			return {
				slide: 0,
				sliding: null,
				photos: {
					"20130066": 4,
					"20150258": 3,
					"20150266": 4,
					"20160004": 1,
					"20160031": 4,
					"20160084": 6,
					"20160150": 5,
					"20170021": 2,
					"20170139": 2,
					"20170150": 5,
					"20180125": 3
				}
			};
		},
		methods: {
			onSlideStart() {
				this.sliding = true;
			},
			onSlideEnd() {
				this.sliding = false;
			}
		},
		computed: {
			...mapState(["currentProject"])
		}
	};
</script>

<style>
.location_carousel_container {
	position: absolute;
	width: 100%;
}
.location_slider_img_container {
    width: 100%;
    display: flex;
    justify-content: center;
}
.location_carousel_container .carousel-control-prev-icon, 
.location_carousel_container .carousel-control-next-icon {
    width: 2vw;
    height: 2vw;
}
.location_carousel_container .carousel-indicators > li {
    width: 3vw;
    height: 0.3vw;
    outline: none;
}
.location_carousel_container .carousel-item {
	background: #00355c !important;
}
</style>