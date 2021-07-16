<template>
  <div
    class="context_item_container"
    :style="{
      width: `3.6vw`,
      height: `6.4vh`,
      cursor: `${state.tint ? 'pointer' : 'default'}`,
      background: hoverState ? 'black' : state.tint != null ? state.tint != 4
          ? `rgba(0, 0, 0, ${(state.tint + 1) * 0.2})`
          : `linear-gradient( 45deg, rgba(22, 82, 120, 1), rgba(22, 82, 120, 0.8), rgba(22, 82, 120, 1) )`
          : 'transparent', 
      backgroundSize: 'cover', 
      borderWidth: `${hoverState ? 0.0013 * screenWidth : 0}px`,  
      borderStyle: 'solid',
      borderColor: '#FFDC38' 
    }"
    @mouseover="hoverState = true"
    @mouseleave="hoverState = false"
  >
    <img
      v-if="state.event"
      :src="
        state.event.type == 2
          ? require('@/assets/bg/context_items/item_critical.png')
          : null
      "
      alt
      :style="{
        width: `${state.event.type == 2 ? 0.036 * screenWidth : 0}px`,
        height: `${state.event.type == 2 ? 0.064 * screenHeight : 0}px`
      }"
    />
    <img
      v-if="type"
      :src="require('@/assets/bg/context_items/item_' + type + '.png')"
      alt
      :style="{
        width: `3.6vw`,
        height: `6.4vh`
      }"
    />
  </div>
</template>

<script>
export default {
  name: "tint-context-item",
  props: {
    type: String,
    state: Object
  },
  data() {
    return {
      hoverState: false,
      screenWidth: window.innerWidth, 
      screenHeight: window.innerHeight
    };
  },
  computed: {}
};
</script>

<style>
</style>