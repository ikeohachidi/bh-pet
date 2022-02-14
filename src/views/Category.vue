<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="6" offset="3">
					<h1 class="text-h2 product-header">Dry dog food</h1>
					<div class="d-flex justify-end">
						<v-select label="Sort by"></v-select>
					</div>
				</v-col>

				<v-col cols="12"></v-col>

				<v-col cols="2">
					<v-list>
						<v-list-group>
							<template #activator>
								<v-list-item-title>PRICE</v-list-item-title>
							</template>

							<v-list-item>
								<div class="d-flex flex-column w-100">
									<v-slider></v-slider>
									<v-btn right outlined>5000 KN</v-btn>
								</div>
							</v-list-item>
						</v-list-group>

						<v-list-group>
							<template #activator>
								<v-list-item-title>BRAND</v-list-item-title>
							</template>

							<v-list-item>
								<p class="d-flex justify-space-between w-100">Alleva <span>(7)</span></p>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-col>

				<v-col cols="6" offset="1">
					<div class="products">
						<v-card class="pa-5" v-for="count in 6" :key="count">
							<h4>Brit Care endurance</h4>
							<p>Animoda</p>
							<p>200 kn</p>
							<v-btn class="mt-2" color="primary" elevation="0">
								<v-icon>mdi-cart</v-icon>
								add to cart
							</v-btn>
						</v-card>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Category extends Vue {}
</script>

<style lang="scss" scoped>
.products {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 3em;
}

.product-header {
	color: var(--color-primary);
}

ul {
	list-style: none;
	padding-left: 0;

	li {
		display: flex;
		justify-content: space-between;
	}
}
</style>