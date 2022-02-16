<template>
	<section>
		<admin-title>	
			<template #append>
				<period-chips v-model="activePeriod"></period-chips>
			</template>
		</admin-title>

		<div class="sales-data">
			<v-card v-for="sale in accumulatedSales" :key="sale.icon" class="pa-3">
				<div class="d-flex justify-space-between items-center">
					<h6 class="d-inline-flex text-h6">{{ sale.total }}</h6>
					<v-icon color="primary">mdi-{{ sale.icon }}</v-icon>
				</div>
				<p class="mb-0 mt-3">{{ sale.desc }}</p>
			</v-card>
		</div>

		<div class="mt-10">
			<v-data-table
				:headers="salesHeaders"
				:items="orders"
				:items-per-page="5"
				class="elevation-1"
			>
				<template #top>
					<h3 class="pt-3 px-4 text-h7">Latest Sales</h3>
				</template>
				<template #item.orders="{ item }">
					{{ item.products.length }}
				</template>
				<template #item.status="{ item }">
					<v-chip :color="getStatusColor(item.status)">
						<span class="item-status">{{ item.status }}</span>
					</v-chip>
				</template>
			</v-data-table>
		</div>
	</section>
</template>

<script lang="ts">
import Order, { OrderStatus } from '@/types/Order';
import { Vue, Component } from 'vue-property-decorator';
import { getOrderDashboard, listOrders, orders } from '@/store/modules/orders';

@Component
export default class Dashboard extends Vue {
	private activePeriod = 'today';

	private accumulatedSales = [
		{ total: '$2.403', icon: 'currency-usd', desc: 'Total Earnings' },
		{ total: '$2.403', icon: 'cart', desc: 'Orders this month' },
		{ total: '$1.224', icon: 'currency-usd', desc: 'Potential earnings' }
	];

	private salesHeaders = [
		{ text: 'Order UUID', value: 'uuid' },
		{ text: 'Status', value: 'status' },
		{ text: '# Ordered Products', value: 'orders' },
		{ text: 'Customer', value: 'customer' },
		{ text: 'Amount', value: 'amount' },
	]

	get orders(): Order[] {
		return orders(this.$store);
	}

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

	mounted() {
		getOrderDashboard(this.$store);
	}
}
</script>

<style scoped>
.sales-data {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2.5em;
	background-color: #EEF5F2;
	padding: 24px;
}
</style>