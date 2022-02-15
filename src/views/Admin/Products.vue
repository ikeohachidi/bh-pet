<template>
	<section>
		<admin-title></admin-title>

		<v-data-table
			:headers="tableHeaders"
			:items="products"
			:items-per-page="8"
			class="elevation-1"
		>
			<template #top>
				<div class="table-header d-flex justify-space-between align-center pl-5">
					<h3 class="text-h7 mr-auto">All Products</h3>

					<v-btn color="primary" depressed dense>
						<v-icon>mdi-plus</v-icon>
						add new product
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
								<v-text-field label="Product name" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="2">
								<v-select label="Category" outlined dense />
							</v-col>
							<v-col cols="4">
								<v-text-field label="Product UUID" outlined dense>
									<template #append>
										<v-icon>mdi-magnify</v-icon>
									</template>
								</v-text-field>
							</v-col>
							<v-col cols="2">
								<v-btn depressed>reset</v-btn>
							</v-col>
						</v-row>
					</div>
				</div>
			</template>
			<template #body="{ items }">
				<tbody>
					<tr v-for="item in items" :key="item.name">
						<td>{{ item.image }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.brand }}</td>
						<td>{{ item.category }}</td>
						<td>{{ item.date }}</td>
						<td class="actions">
							<v-btn icon depressed @click="showCustomerForm = true">
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-btn icon depressed class="mx-3">
								<v-icon>mdi-delete</v-icon>
							</v-btn>
							<v-btn icon depressed>
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</td>
					</tr>
				</tbody>
			</template>
		</v-data-table>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Products extends Vue {
	private showTableOptions = false;

	private tableHeaders = [
		{ text: 'Image', value: 'image' },
		{ text: 'Name', value: 'name' },
		{ text: 'Brand', value: 'brand' },
		{ text: 'Category', value: 'category' },
		{ text: 'Date Created', value: 'date' },
		{ text: '', value: 'action' }
	];

	private products = []
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
		width: 100%;
	}
}

.rotate {
	transform: rotateZ(180deg);
}

tr {
	&:hover {
		background-color: var(--color-primary-highlight) !important;

		.actions {
			opacity: 1;
		}
	}

	.actions {
		opacity: 0;
		transition: .2s;
	}
}
</style>