<template>
  <div class="radiance_container">
    <div class="radiance_content">
      <span v-if="dataFlag" class="radiance_label">RADIANCE</span>
      <span v-if="dataFlag" class="radiance_value">{{ radiance + ' L'}}</span>
      <img class="radiance_image" src="@/assets/images/radiance_image.png" alt />
      <img class="radiance_chart" src="@/assets/images/radiance_chart.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "project-search",
  components: {},
  props: {
    radiance: String, 
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
.radiance_container {
  position: absolute;
  z-index: 1;
  background: #062135;
  width: 24.8vw;
  height: 32.1vh;
  top: 50.2vh;
  left: 0.26vw;
}
.radiance_content {
  position: relative;
}
.radiance_label {
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
.radiance_value {
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
.radiance_image {
  width: 6.1vw;
  height: 6.1vw;
  top: 3.6vh;
  left: 16.8vw;
  position: absolute;
}
.radiance_chart {
  width: 100%;
  bottom: -32.1vh;
  left: 0;
  position: absolute;
}
</style>
