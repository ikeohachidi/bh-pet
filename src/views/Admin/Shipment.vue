<template>
	<section>
		<admin-title></admin-title>
		
		<v-data-table
			:headers="salesHeaders"
			:items="sales"
			:items-per-page="5"
			class="elevation-1"
		>
			<template #top>
				<div class="d-flex justify-space-between pt-3 px-4">
					<h3 class="text-h7">Sales</h3>
					<div class="d-flex">
						<v-text-field label="Order UUID" outlined dense>
							<template #append>
								<v-icon>mdi-search</v-icon>
							</template>
						</v-text-field>
						<v-text-field label="Customer" outlined dense class="mx-3">
							<template #append>
								<v-icon>mdi-search</v-icon>
							</template>
						</v-text-field>
						<period-chips v-model="activePeriod"/>
					</div>
				</div>
			</template>
			<template #item.status="{ item }">
				<v-chip :color="getStatusColor(item.status)">
					<span class="item-status">{{ item.status }}</span>
				</v-chip>
			</template>
		</v-data-table>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Shipment extends Vue {
	private activePeriod = 'today';

	private salesHeaders = [
		{ text: 'Order UUID', value: 'uuid' },
		{ text: 'Category', value: 'category' },
		{ text: 'Customer', value: 'customer' },
		{ text: 'Amount', value: 'amount' },
		{ text: 'Shipped at', value: 'shipped' },
		{ text: 'Download', value: '' },
	]

	private sales = [];
}
</script>

<style scoped>
</style>