<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<v-card class="mx-auto pa-10" width="1200">

				<h2 class="font-weight-regular text-center mb-10">User Settings</h2>

				<div>
					<v-container>
						<v-row>
							<v-col>
								<div class="d-flex justify-center">
									<v-avatar 
										:src="`${api}/file/${user.avatar}`"
										color="info" 
										:alt="`${user.first_name[0] } ${ user.last_name[0] }`"
										size="118"
									></v-avatar>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Name</small>
									<p>{{ user.first_name }} {{ user.last_name }}</p>
								</div>
								<div>
									<small>Date Joined</small>
									<p>{{ formatDate(user.created_at) }}</p>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Phone Number</small>
									<p>{{ user.phone_number }}</p>
								</div>
								<div>
									<small>Email</small>
									<p>{{ user.email }}</p>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Address</small>
									<p>{{ user.address }}</p>
								</div>
								<div>
									<small>Marketing preferences</small>
									<p>{{ user.is_marketing ? 'Yes' : 'No' }}</p>
								</div>
							</v-col>
						</v-row>
					</v-container>
					
					<div>
						<v-data-table
							:headers="orderHeaders"
							:items="orders"
							:items-per-page="5"
							class="elevation-1"
						>
							<template #top>
								<h3 class="px-4">Latest Orders</h3>
							</template>
							<template #item.status="{ item }">
								<v-chip :color="getStatusColor(item.order_status[0].title)">
									<span class="item-status">{{ item.order_status[0].title }}</span>
								</v-chip>
							</template>
							<template #item.invoice="{ item }">
								<v-btn icon tile class="item-invoice" @click="downloadInvoice(item)">
									<v-icon>mdi-tray-arrow-down</v-icon>
								</v-btn>
							</template>
						</v-data-table>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Order, { OrderStatus } from '@/types/Order';
import User from '@/types/User';

import { getUserData } from '@/store/modules/user';

import { formatTextToDate } from '@/helpers'

@Component
export default class UserSettings extends Vue {
	@Prop({ default: false }) show!: boolean;

	private api = process.env.VUE_APP_API;

	get user(): User {
		return getUserData(this.$store)
	}

	private formatDate(string: string): string {
		return formatTextToDate(string);
	}

	private orderHeaders = [
		{ text: 'Order UUID', value: 'uuid' },
		{ text: 'Status', value: 'status' },
		{ text: 'Download Invoice', value: 'invoice' },
	];

	private orders: Pick<Order, 'uuid' | 'status'>[] = [
		{ uuid: '490293032232', status: 'open' },
		{ uuid: '490293032232', status: 'pending' },
		{ uuid: '490293032232', status: 'paid' },
		{ uuid: '490293032232', status: 'shipped' },
	];

	private getStatusColor(status: OrderStatus): string {
		const statusColor: Record<OrderStatus, string> = {
			'shipped': 'green',
			'paid': 'green',
			'pending payment': 'orange',
			'open': 'blue',
			'canceled': 'gray'
		};

		return statusColor[status];
	}

	private close() {
		this.$emit('close');
	}
}
</script>

<style scoped>
p {
	color: #000;
}

small {
	color: var(--color-text);
}

.item-status {
	color: #fff;
}

.item-invoice {
	background: #DDE3E2;
}
</style>