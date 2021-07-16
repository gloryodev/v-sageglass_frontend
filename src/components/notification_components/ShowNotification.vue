<template>
  <div class="show_notification_container">
    <div class="show_notification_content">
      <div class="show_notification_context">
        <img src="@/assets/icons/notification_black.png" alt />
        <span>{{ count }}</span>
        <p v-if="count > 0">{{ alert[count-1].message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "show-notification",
  components: {},
  props: {
    count: Number,
    alert: Array
  }
};
</script>

<style>
.show_notification_container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  background: rgba(0, 0, 0, 0.8);
}
.show_notification_content {
  position: absolute;
  width: 34.9vw;
  height: 8.15vh;
  right: 0;
  top: 1.43vh;

  background: #00aec4;
}
.show_notification_context {
  position: relative;
  width: 100%;
  height: 100%;
}
.show_notification_context > img {
  width: 1.94vw;
  height: 2.75vh;
  position: absolute;
  left: 1.62vw;
  top: 2.15vh;
}
.show_notification_context > span {
  position: absolute;
  left: 4vw;
  top: 0.97vh;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 0.78vw;
  line-height: 1.62vh;
  color: #000000;
}
.show_notification_context > p {
  position: absolute;
  width: 23.8vw;
  height: 4.2vh;
  left: 6.1vw;
  top: 1.57vh;
  margin-bottom: 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 1.04vw;
  line-height: 2.17vh;
  text-align: left;
  color: #000000;
  overflow: auto;
}
</style>