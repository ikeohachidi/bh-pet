<template>
	<section class="admin-page">
		<div>
			<v-navigation-drawer class="elevation-1">
				<v-list nav>
					<v-list-item link v-for="route in adminRoutes" :key="route.text">
						<v-list-item-icon>
							<v-icon>mdi-{{ route.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title>{{ route.text }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</div>
		<div class="admin-sub-pages">
			<v-container>
				<v-row>
					<v-col cols="8" class="mx-auto">
						<router-view></router-view>
					</v-col>
				</v-row>
			</v-container>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AdminIndex extends Vue {
	private adminRoutes = [
		{ text: 'Dashboard', icon: 'tune', path: '/admin' },
		{ text: 'All Tickets', icon: 'subtitles', path: '/tickets' },
		{ text: 'Shipment Locator', icon: 'map-marker', path: '/locator' },
		{ text: 'Customers', icon: 'account-multiple-outline', path: '/customers' },
		{ text: 'Products', icon: 'folder-outline', path: '/products' },
	]
}
</script>

<style lang="scss" scoped>
section.admin-page {
	display: grid;
	height: 100%;
	grid-template-columns: repeat(12, 1fr);

	& > div:last-of-type {
		grid-column: 2 / 13;
	}
}

.admin-sub-pages {
	background-color: #FAFAFA;
}
</style>