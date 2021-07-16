<template>
  <div class="weather_container">
    <span class="weather_label" :style="{visibility: dataFlag ? 'visible' : 'hidden'}">WEATHER</span>
    <span class="weather_value" :style="{visibility: dataFlag ? 'visible' : 'hidden'}">{{ weather.currently.summary }}</span>
    <div class="weather_image_container">
      <div class="weather_image_item">
        <img src="@/assets/images/precipitation.png" alt />
        <span :style="{visibility: dataFlag ? 'visible' : 'hidden'}">{{ Number(100*weather.currently.precipProbability).toFixed() + '%' }} precipitation</span>
      </div>
      <div class="weather_image_item">
        <img src="@/assets/images/morning.png" alt />
        <span :style="{visibility: dataFlag ? 'visible' : 'hidden'}">{{ weather.daily.data[0].sunriseTime | moment('timezone', weather.timezone, 'h:mm a')}}</span>
      </div>
      <div class="weather_image_item">
        <img src="@/assets/images/afternoon.png" alt />
        <span :style="{visibility: dataFlag ? 'visible' : 'hidden'}">{{ weather.daily.data[0].sunsetTime | moment('timezone', weather.timezone, 'h:mm a') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project-search",
  components: {},
  props: {
    weather: Object, 
    dataFlag: Boolean, 
  },
  data() {
    return {};
  },
  computed: {
  },
  mounted: () => {}
};
</script>

<style>
.weather_container {
  position: absolute;
  z-index: 1;
  background: #062135;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 24.8vw;
  height: 32.1vh;
  top: 50.2vh;
}
.weather_label {
  font-family: Gotham Light;
  font-style: normal;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.3vw;
  line-height: 2.78vh;
  margin-left: 2.7vw;
  margin-top: 5.3vh;
}
.weather_value {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #ffffff;
  font-size: 1.87vw;
  line-height: 4vh;
  margin-left: 2.7vw;
}
.weather_image_container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 2.35vw;
  padding-right: 2.35vw;
  margin-top: 6.94vh;
}
.weather_image_item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.weather_image_item > span {
  color: white;
  font-family: "Gotham Pro";
  font-size: 0.83vw;
  line-height: 1.78vh;
  margin-top: 1.6vh;
}
.weather_image_item > img {
  width: 3.3vw;
  bottom: 5.9vh;
}
</style>
