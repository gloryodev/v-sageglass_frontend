<template>
  <div class="search_input_container">
    <span class="search_input_border_left" :style="{
        borderRightWidth: `${borderWidth}px`, 
        height: `${borderLeftHeight}px`
    }"></span>
    <input
      class="project_search_input"
      type="text"
      :name="name"
      :id="`search${name}`"
      v-on:input="handleChange($event)"
      :style="{
        width: `${width}px`,
        borderWidth: `${borderWidth}px`,
        fontSize: `${fontSize}px`
      }"
    />
    <span class="search_input_border_right" :style="{
        borderLeftWidth: `${borderWidth}px`, 
        height: `${borderLeftHeight}px`
    }"></span>
  </div>
</template>

<script>
export default {
  name: 'search-input-text',
  components: {},
  computed: {
  }, 
  props: {
    width: Number,
    borderWidth: Number,
    fontSize: Number,
    borderLeftHeight: Number, 
    name: String,
    // handleChange: Function
  },
  methods: {
    handleChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style>
.project_search_input,
.project_search_input:active {
  font-family: Gotham Pro;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  padding-left: 10px;
  padding-right: 10px;
  color: white;
}
/* .search_input_container::before {
  position: absolute;
  content: "";
  height: 5px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
} */
.search_input_container {
  position: relative;
}
.search_input_border_left {
  position: absolute;
  bottom: 1px;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-right-style: solid;
}
.search_input_border_right {
  position: absolute;
  bottom: 1px;
  border-left-color: rgba(255, 255, 255, 0.5);
  border-left-style: solid;
}
</style>