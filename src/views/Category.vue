<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="6" offset="3">
					<h1 class="text-h2 product-header">Dry dog food</h1>
					<div class="d-flex">
						<v-spacer></v-spacer>
						<v-col cols="4">
							<v-select 
								label="Sort by" 
								v-model="selectedSortOption"
								item-text="text"
								item-value="value"
								:full-width="false"
								:items="sortOptions"
							></v-select>
						</v-col>
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
						<ProductCard v-for="product in products" :product="product" :key="product.uuid">
							<template #bottom>
								<div class="mt-2">
									<v-btn 
										color="error" 
										elevation="0" 
										@click="removeProductFromCart(product)"
										v-if="isProductInCart(product.uuid)"
									>
										<v-icon>mdi-cart-off</v-icon>
										remove from cart	
									</v-btn>
									<v-btn 
										color="primary" 
										elevation="0" 
										@click="addProductToCart(product)"
										v-else
									>
										<v-icon>mdi-cart</v-icon>
										add to cart
									</v-btn>
								</div>
							</template>
						</ProductCard>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ProductCard from '@/components/ProductCard/ProductCard.vue';

import { getProductsByCategoryId, addProductToCart, cartItems, removeProductFromCart } from '@/store/modules/products';

import Product, { CartItem } from '@/types/Product';

@Component({
	components: {
		ProductCard
	}
})
export default class Category extends Vue {
	private selectedSortOption = 'desc';

	private sortOptions = [
		{ text: 'Highest Price First', value: 'desc', },
		{ text: 'Lowest Price First', value: 'asc', }
	]

	get categoryId(): string {
		return this.$route.params['id']
	}

	get products(): Product[] {
		return getProductsByCategoryId(this.$store)(this.categoryId)
			.sort((a, b) => {
				if (this.selectedSortOption === 'desc') return b.price - a.price;
				return a.price - b.price
			})
	}

	get cartItems(): CartItem[] {
		return cartItems(this.$store);
	}

	private isProductInCart(productUUID: string): boolean {
		return this.cartItems.findIndex(item => item.productUUID === productUUID) !== -1;
	}

	private addProductToCart(product: Product): void {
		addProductToCart(this.$store, { amount: 1, productUUID: product.uuid });
	}

	private removeProductFromCart(product: Product): void {
		removeProductFromCart(this.$store, product.uuid);
	}
}
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