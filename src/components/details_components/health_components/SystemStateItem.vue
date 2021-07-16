<template>
	<div class="system_state_item_container" :style="{}">
		<img
			:src="require(`@/assets/bg/health_items/health${index + 1}_${state.status ? 'ok' : 'error'}.png`)"
			alt
			@click="() => showHealthTouch(index)"
		/>
		<span
			class="system_state_item_label"
			:style="{
        marginBottom: index % 2 === 0 ? '3vh' : '0.8vh'
      }"
		>{{ state.count }} {{ state.count == 1 && state.name.substr(state.name.length - 1).toLowerCase() == 's' ? state.name.substring(0, state.name.length - 1) : state.name }}</span>
		<div
			class="system_state_item_bar"
			:style="{
        height: index % 2 === 0 ? '4vh' : '2.6vh'
      }"
		></div>
	</div>
</template>

<script>
	export default {
		name: "system-state-item",
		components: {},
		props: {
			state: Object,
			index: Number,
			showHealthTouch: Function
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
.system_state_item_container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.system_state_item_container > img {
	width: 6.12vw;
	margin-bottom: 1.6vh;
	cursor: pointer;
}
.system_state_item_label {
	font-family: Gotham Pro;
	font-style: normal;
	font-weight: 300;
	color: #ffffff;
	font-size: 0.91vw;
}
.system_state_item_bar {
	background: black;
	width: 0.2vw;
}
</style>
