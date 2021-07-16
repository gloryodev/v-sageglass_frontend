<template>
  <div v-if="overlay" class="project_panel_container">
    <div style="display:flex;">
      <div class="project_panel_top__item_shadow"></div>
      <div class="project_panel_title" @click="handleShowTable">
        <span style="color: white;">BROWSE PROJECTS</span>
        <b-icon class="project_panel_title_icon" icon="chevron-right"></b-icon>
      </div>
    </div>
    <project-panel-item
      :index="0"
      :title="itemTitleArray[0]"
      :value="overlay.total_projects"
      :icon="itemIconArray[0]"
    />
    <project-panel-item
      :index="1"
      :title="itemTitleArray[1]"
      :value="overlay.total_countries"
      :icon="itemIconArray[1]"
    />
    <project-panel-item
      :index="2"
      :title="itemTitleArray[2]"
      :value="overlay.total_igus"
      :icon="itemIconArray[2]"
    />
    <project-panel-item
      :index="3"
      :title="itemTitleArray[3]"
      :value="overlay.total_sqft"
      :icon="itemIconArray[3]"
    />
  </div>
</template>

<script>
import ProjectPanelItem from "./ProjectPanelItem";

import { mapState } from "vuex";

export default {
  name: "project-panel",
  components: {
    "project-panel-item": ProjectPanelItem
  },
  props: {
    handleShowTable: Function
  },
  data() {
    return {
      itemTitleArray: ["PROJECTS", "COUNTRIES", "IGUs", "SQUARE FEET"],
      itemIconArray: ["flag", "world", "panel", "sqft"]
    };
  },
  methods: {},
  computed: {
    ...mapState(["overlay"])
  }
};
</script>

<style>
.project_panel_container {
  position: absolute;
  right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 23.6vh;
}
.project_panel_title {
  font-family: Gotham Black;
  background: #18384d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 1vw;
  line-height: 2.08vh;
  width: 16.2vw;
  height: 4.9vh;
  margin-bottom: 0.53vh;
  padding-left: 1.7vw;
  padding-right: 1.7vw;
}
.project_panel_title_icon {
  color: #00aec4;
}
.project_panel_top__item_shadow {
  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
  opacity: 0.56;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  width: 1.7vw;
  height: 4.9vh;
}
</style>
