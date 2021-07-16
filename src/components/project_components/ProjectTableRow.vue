<template>
	<div class="project_table_row" @click="handleDetailsLocation(data)">
		<div class="project_table_row_data">
			<div v-if="data.signal != undefined" class="project_signal">
				<img
					:src="
            data.signal == 0
              ? require('@/assets/icons/signal_danger.png')
              : data.signal == 1
              ? require('@/assets/icons/signal_warning.png')
              : require('@/assets/icons/signal_success.png')
          "
					alt
				/>
			</div>
			<div v-if="data.signal != undefined" class="project_table_row_devider"></div>
			<div class="project_name_address_date">
				<span class="project_name">{{ data.project_name }}</span>
				{{ " " }}
				<span class="project_address">{{ data.address }}</span>
				<br />
				<span class="project_date">Purchased: {{ formatDate(new Date(data.purchase_date)) }}</span>
				<span style="display: inline-block; width: 2vw"></span>
				<span
					class="project_date"
					v-if="!(!data.connected && data.completed < 100)"
				>Finished: {{ formatDate(new Date(data.finish_date)) }}</span>
			</div>
			<div class="project_table_row_devider"></div>
			<div class="project_igus">
				<span class="project_igus_label">IGUs</span>
				<br />
				<span class="project_igus_value">{{ numberWithCommas(data.igus) }}</span>
			</div>
			<div class="project_table_row_devider"></div>
			<div class="project_sqft">
				<span class="project_sqft_label">Sq.Ft.</span>
				<br />
				<span class="project_sqft_value">{{ numberWithCommas(data.sqft) }}</span>
			</div>
			<div class="project_table_row_devider"></div>
			<div class="project_product">
				<span class="project_product_label">Product</span>
				<br />
				<span class="project_product_value">{{ data.product }}</span>
			</div>
			<div v-if="!data.connected && data.completed < 100" class="project_table_row_devider"></div>

			<div v-if="!data.connected && data.completed < 100" class="project_completion">
				<span class="project_completion_label">Completion</span>
				<br />
				<span class="project_completion_value">{{ data.completed }}%</span>
			</div>
		</div>
		<b-progress
			v-if="!(!data.connected && data.completed < 100)"
			class="full_row_progress"
			:height="`${0.0037 * screenHeight}px`"
			:value="100"
			style="width:100%;"
		></b-progress>
		<b-progress
			v-if="!data.connected && data.completed < 100"
			class="row_progress"
			variant="warning"
			:height="`${0.0037 * screenHeight}px`"
			:value="data.completed"
			style="width:100%"
		></b-progress>
	</div>
</template>

<script>
	export default {
		name: "project-table-row",
		components: {},
		props: {
			data: Object,
			handleDetailsLocation: Function
		},
		data: () => {
			return {
				screenHeight: window.innerHeight
			};
		},
		methods: {
			numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}, 
			formatDate(date) {
				let month = date.getMonth();
				let year = date.getFullYear();
				if(month < 9) {
					return "0" + (month + 1) + "/" + year;
				} else {
					return (month + 1) + "/" + year;
				}
			}
		}
	};
</script>

<style>
.project_table_row {
	cursor: pointer;
	width: 100%;
	margin-bottom: 0.23vh;
}
.project_table_row_data {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.39vh 1.67vw;
}
.project_signal > img {
	width: 3.3vw;
}
.project_table_row_devider {
	height: 4.07vh;
	opacity: 0.2;
	border-right-width: 0.065vw;
	border-right-color: #18384d;
	border-right-style: solid;
}
.project_name_address_date {
	text-align: left;
	width: 22.6vw;
}
.project_name {
	font-size: 0.97vw;
	line-height: 1.96vh;
	font-family: Gotham Black;
	color: white;
}
.project_address {
	font-size: 0.93vw;
	line-height: 1.96vh;
	font-family: Gotham Pro;
	color: white;
	opacity: 0.6;
}
.project_date {
	font-size: 0.78vw;
	font-family: Gotham Black;
	color: white;
	opacity: 0.8;
}
.project_igus {
	width: 5.4vw;
}
.project_igus_label {
	font-size: 0.65vw;
	line-height: 1.38vh;
	font-family: Gotham Pro;
	color: white;
	opacity: 0.6;
}
.project_igus_value {
	font-size: 0.937vw;
	line-height: 1.967vh;
	font-family: Gotham Pro;
	color: white;
}
.project_sqft,
.project_product,
.project_completion {
	width: 5.4vw;
}
.project_sqft_label,
.project_product_label,
.project_completion_label {
	font-size: 0.65vw;
	line-height: 1.38vh;
	font-family: Gotham Pro;
	color: white;
	opacity: 0.6;
}
.project_sqft_value,
.project_product_value,
.project_completion_value {
	font-size: 0.937vw;
	line-height: 1.967vh;
	font-family: Gotham Pro;
	color: white;
}
.full_row_progress > div {
	background: #18384d;
}
</style>