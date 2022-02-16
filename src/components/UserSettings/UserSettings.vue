<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<v-card class="mx-auto pa-10" width="1200">
				<div></div>

				<h2 class="font-weight-regular text-center mb-10">User Settings</h2>

				<div>
					<v-container>
						<v-row>
							<v-col>
								<div class="d-flex justify-center">
									<v-avatar color="info" size="118"></v-avatar>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Name</small>
									<p>John Rollingston</p>
								</div>
								<div>
									<small>Date Joined</small>
									<p>14.9.2020</p>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Phone Number</small>
									<p>(559) 979-6096</p>
								</div>
								<div>
									<small>Email</small>
									<p>j.sharp@thamail.com</p>
								</div>
							</v-col>
							<v-col>
								<div>
									<small>Address</small>
									<p>1285 Fallen Pioneer Heights, Dallas, TX</p>
								</div>
								<div>
									<small>Marketing preferences</small>
									<p>No</p>
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
								<v-chip :color="getStatusColor(item.status)">
									<span class="item-status">{{ item.status }}</span>
								</v-chip>
							</template>
							<template #item.invoice>
								<v-btn icon tile class="item-invoice">
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

@Component
export default class UserSettings extends Vue {
	@Prop({ default: false }) show!: boolean;

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
			'pending': 'orange',
			'open': 'blue',
			'cancelled': 'gray'
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