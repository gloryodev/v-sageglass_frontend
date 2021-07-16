<template>
  <div class="lux_container">
    <div class="lux_content">
      <span v-if="dataFlag" class="lux_label">LUX</span>
      <span v-if="dataFlag" class="lux_value">{{ lux }}</span>
      <img class="lux_image" src="@/assets/images/lux_image.png" alt />
      <img class="lux_chart" src="@/assets/images/lux_chart.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "project-search",
  components: {},
  props: {
    lux: String, 
    dataFlag: Boolean, 
  },
  methods: {},
  data() {
    return {};
  },
  computed: {},
  mounted: () => {}
};
</script>

<style>
.lux_container {
  position: absolute;
  z-index: 1;
  background: #062135;
  width: 24.8vw;
  height: 32.1vh;
  top: 17.3vh;
  left: 0.26vw;
}
.lux_content {
  position: relative;
}
.lux_label {
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
.lux_value {
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
.lux_image {
  width: 6.1vw;
  height: 6.1vw;
  top: 3.6vh;
  left: 16.8vw;
  position: absolute;
}
.lux_chart {
  width: 100%;
  bottom: -32vh;
  left: 0;
  position: absolute;
}
</style>
