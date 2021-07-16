<template>
  <div class="temperature_container" @click="changeTempType">
    <div class="temperature_content">
      <span v-if="dataFlag" class="temperature_label">TEMPERATURE</span>
      <span v-if="dataFlag" class="temperature_value">{{ fahrenheit ? (Number(temperature).toFixed(1) + ' °F') : ((((temperature - 32) * (5/9)).toFixed(1)) + ' °C') }}</span>
      <img class="temperature_image" src="@/assets/images/temp_image.png" alt />
      <img class="temperature_chart" src="@/assets/images/temp_chart.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "project-search",
  components: {},
  props: {
    temperature: String,
    dataFlag: Boolean, 
  },
  methods: {
    changeTempType() {
      this.fahrenheit = !this.fahrenheit;
    }
  },
  data() {
    return {
      fahrenheit: true
    };
  },
  computed: {},
  mounted: () => {}
};
</script>

<style>
.temperature_container {
  position: absolute;
  z-index: 1;
  right: 0;
  background: #062135;
  width: 24.8vw;
  height: 32.1vh;
  top: 17.3vh;
}
.temperature_content {
  position: relative;
}
.temperature_label {
  font-family: Gotham Light;
  font-style: normal;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  font-size: 1.3vw;
  line-height: 2.78vh;
  left: 2.7vw;
  top: 5.3vh;
}
.temperature_value {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: 300;
  color: #ffffff;
  position: absolute;
  font-size: 1.87vw;
  line-height: 4vh;
  left: 2.7vw;
  top: 8.1vh;
}
.temperature_image {
  width: 6.1vw;
  height: 6.1vw;
  top: 3.6vh;
  left: 16.8vw;
  position: absolute;
}
.temperature_chart {
  width: 100%;
  bottom: -32.1vh;
  left: 0;
  position: absolute;
}
</style>
