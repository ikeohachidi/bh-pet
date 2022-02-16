<template>
	<section>
		<admin-title></admin-title>

		<CustomerForm :show="showCustomerForm" @close="showCustomerForm = false" />

		<v-data-table
			:headers="tableHeaders"
			:items="users"
			:items-per-page="8"
			class="elevation-1"
		>
			<template #top>
				<div class="table-header d-flex justify-space-between align-center pl-5">
					<h3 class="text-h7 mr-auto">All customers</h3>

					<v-btn color="primary" depressed dense @click="showCustomerForm = true">
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
			<template #body="{ items }">
				<tbody>
					<tr v-for="item in items" :key="item.name">
						<td>{{ item.first_name }} {{ item.last_name }}</td>
						<td>{{ item.email }}</td>
						<td>{{ item.phone_number }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.created_at }}</td>
						<td>
							<v-chip :color="item.preference ? 'blue' : 'yello'">
								{{ item.preference ? 'Yes' : 'No' }}
							</v-chip>
						</td>
						<td class="actions">
							<v-btn icon depressed @click="showCustomerForm = true" x-small>
								<v-icon>mdi-pencil</v-icon>
							</v-btn>
							<v-btn icon depressed class="mx-3" x-small>
								<v-icon>mdi-delete</v-icon>
							</v-btn>
							<v-btn icon depressed x-small>
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
import CustomerForm from '@/components/CustomerForm/CustomerForm.vue'

import { getAllUsers, users } from '@/store/modules/admin';
import User from '@/types/User';

@Component({
	components: {
		CustomerForm
	}
})
export default class Customers extends Vue {
	private tableHeaders = [
		{ text: 'Name', value: 'name' },
		{ text: 'Email', value: 'email' },
		{ text: 'Phone', value: 'phone' },
		{ text: 'Address', value: 'address' },
		{ text: 'Date Created', value: 'date' },
		{ text: 'Marketing Preferences', value: 'is_marketing' },
		{ text: '', value: 'action' }
	]

	private showTableOptions = false;
	private showCustomerForm = false;

	get users(): User[] {
		return users(this.$store);
	}

	private customers = [
		{
			name: 'Tom Cruise'	,
			email: 'tomcruise@gmail.com',
			phone: '(947) 000 000',
			address: 'Somewhere on earth',
			date: '2020',
			preference: true
		}
	];

	mounted(): void {
		getAllUsers(this.$store)
	}
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

		.actions * {
			opacity: 1;
		}
	}

	.actions {
		width: 9%;
	}

	.actions * {
		opacity: 0;
		transition: .2s;
	}
}
</style>