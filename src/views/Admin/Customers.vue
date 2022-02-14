<template>
	<section>
		<admin-title></admin-title>

		<v-data-table
			:headers="tableHeaders"
			:items="customers"
			:items-per-page="8"
			class="elevation-1"
		>
			<template #top>
				<div class="table-header d-flex justify-space-between align-center pl-5">
					<h3 class="text-h7 mr-auto">All customers</h3>

					<v-btn color="primary" depressed dense>
						<v-icon>mdi-plus</v-icon>
						add new customer
					</v-btn>
					<v-divider vertical class="ml-4"></v-divider>	
					<div class="pa-5">
						<p class="mb-0 pointer" @click="showTableOptions = !showTableOptions;">
							Filter
							<v-icon :class="{ 'rotate': showTableOptions }">mdi-chevron-down</v-icon>
						</p>
					</div>
					<div class="table-header-options" v-if="showTableOptions">
						<v-row>
							<v-col cols="4">
								<v-text-field label="Customer name" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field label="Customer Email" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field label="Customer Phone" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field label="Customer Address" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="3">
								<v-select label="Marketing Preference" outlined dense />
							</v-col>
							<v-col cols="1">
								<v-btn depressed>reset</v-btn>
							</v-col>
						</v-row>
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

	private showTableOptions = false;

	private customers = [];
}
</script>

<style lang="scss" scoped>
.table-header {
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	position: relative;

	&-options {
		padding: 20px;
		background-color: #FAFAFA;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 10;
		width: 100;
	}
}

.rotate {
	transform: rotateZ(180deg);
}
</style>