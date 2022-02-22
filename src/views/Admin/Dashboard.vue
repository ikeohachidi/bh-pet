<template>
	<section>
		<admin-title>	
			<template #append>
				<period-chips v-model="activePeriod"></period-chips>
			</template>
		</admin-title>

		<div style="height: 300px">
			<div id="curve_chart" style="width: 100%; height: 100%"></div>
		</div>

		<div class="sales-data">
			<v-card v-for="(sale, index) in accumulatedSales" :key="index" class="pa-3">
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
				<template #item.status="{ item }">
					<v-chip :color="getStatusColor(item.order_status[0].title)">
						<span class="item-status">{{ item.order_status[0].title }}</span>
					</v-chip>
				</template>
				<template #item.orders="{ item }">
					{{ item.products.length }}
				</template>
				<template #item.customer="{ item }">
					{{ item.user.first_name }} {{ item.user.last_name }}
				</template>
			</v-data-table>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchOrders, getOrders } from '@/store/modules/orders';
import Order, { OrderStatus } from '@/types/Order';
import { getMonth, getYear } from '@/helpers';

interface SaleSummary {
	total: number;
	icon: string;
	desc: string;
}

@Component
export default class Dashboard extends Vue {
	private activePeriod = 'today';

	get accumulatedSales(): SaleSummary[] {
		return [
			{ 
				total: this.orders.reduce((acc, { order_status, amount }) => {
					if (order_status[0].title === OrderStatus.PAID || order_status[0].title === OrderStatus.SHIPPED) {
						acc += amount;
					}
					return acc;
				}, 0),
				icon: 'currency-usd', 
				desc: 'Total Earnings' 
			},
			{ 
				total: this.orders.reduce((acc, order) => {
					if (getMonth(order.created_at) === new Date().getMonth()) {
						acc += order.amount;
					}
					return acc
				}, 0), 
				icon: 'cart', 
				desc: 'Orders this month' 
			},
			{
				total: this.orders.reduce((acc, { order_status, amount }) => {
					if (order_status[0].title !== OrderStatus.PAID && order_status[0].title !== OrderStatus.SHIPPED) {
						acc += amount;
					}
					return acc;
				}, 0),
				icon: 'currency-usd', 
				desc: 'Potential earnings'
			}
		]
	}

	private salesHeaders = [
		{ text: 'Order UUID', value: 'uuid' },
		{ text: 'Status', value: 'status' },
		{ text: '# Ordered Products', value: 'orders' },
		{ text: 'Customer', value: 'customer' },
		{ text: 'Amount', value: 'amount' },
	]

	get orders(): Order[] {
		return getOrders(this.$store);
	}

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

	get chartData() {
		const data: Array<[string, string | number]> = [['Year', 'Sales']];

		this.orders.forEach(order => {
			data.push([getYear(order.created_at).toString(), order.amount])
		})
		return data;
	}

	private drawChart() {
		var data = window.google.visualization.arrayToDataTable(this.chartData);

		var options = {
			title: 'Monthly Sales',
			curveType: 'function',
			legend: { position: 'bottom' }
		};

		var chart = new window.google.visualization.LineChart(document.getElementById('curve_chart'));

		chart.draw(data, options);
	}

	mounted(): void {
		if (this.orders.length === 0) {
			fetchOrders(this.$store)
				.then(() => {
					this.drawChart()
				})
		}

		window.google.charts.setOnLoadCallback(this.drawChart);
		this.drawChart()
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