<template>
	<section>
		<v-data-table
			:headers="tableHeaders"
			:items="customers"
			:items-per-page="8"
			class="elevation-1"
		>
			<template #top>
				<div class="d-flex justify-space-between pt-3 px-4">
					<h3 class="text-h7">All customers</h3>
					<div class="d-flex">
						<v-btn color="primary" dense>
							<v-icon>mdi-plus</v-icon>
							add new customer
						</v-btn>
						
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
export default class Customers extends Vue {
	private tableHeaders = [
		{ text: 'Name', value: 'name' },
		{ text: 'Email', value: 'email' },
		{ text: 'Phone', value: 'phone' },
		{ text: 'Address', value: 'address' },
		{ text: 'Date Created', value: 'date' },
		{ text: 'Marketing Preferences', value: 'preference' }
	]

	private customers = [];
}
</script>

<style scoped>
</style>