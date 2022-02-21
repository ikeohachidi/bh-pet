<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="6" offset="3">
					<h1 class="text-h2 product-header text-capitalize">
						<span v-if="selectedCategory">{{ selectedCategory.title }}</span>
						<span v-else>All</span>
					</h1>
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
								<v-list-item-title class="font-weight-bold">PRICE</v-list-item-title>
							</template>

							<v-list-item>
								<div class="d-flex flex-column w-100">
									<v-slider 
										:max="mostExpensiveProduct" 
										:min="0"
										v-model="priceRange"
									></v-slider>
									<v-btn class="ml-auto" max-width="800px" right outlined>{{ priceRange }} KN</v-btn>
								</div>
							</v-list-item>
						</v-list-group>

						<v-list-group>
							<template #activator>
								<v-list-item-title class="font-weight-bold">BRAND</v-list-item-title>
							</template>

							<v-list-item dense @click="selectedBrandId = 'all'" >
								<span :class="(selectedBrandId == 'all') && 'active-text'">All</span>
							</v-list-item>

							<v-list-item 
								dense
								v-for="brand in brands" 
								:key="brand.uuid"
								@click="selectedBrandId = brand.uuid"
							>
								<p 
									class="d-flex justify-space-between w-100 text-capitalize mb-0"
									:class="(selectedBrandId == brand.uuid) && 'active-text'"
								>
									<span>{{ brand.title }}</span>
									<span>({{ getBrandProducts(brand.uuid).length }})</span>
								</p>
							</v-list-item>
						</v-list-group>

						<v-list-group>
							<template #activator>
								<v-list-item-title class="font-weight-bold">CATEGORY</v-list-item-title>
							</template>

							<v-list-item dense @click="updateActiveCategory('all')">
								<span :class="(categoryId == 'all') && 'active-text'">All</span>
							</v-list-item>

							<v-list-item
								dense
								v-for="category in categories" 
								:key="category.uuid" 
								@click="updateActiveCategory(category.uuid)"
							>
								<p 
									class="d-flex justify-space-between w-100 text-capitalize mb-0"
									:class="(categoryId == category.uuid) && 'active-text'"
								>
									<span>{{ category.title }}</span>
									<span>({{ category.uuid === 'all' ? categories.length : getCatgoriesProducts(category.uuid).length }})</span>
								</p>
							</v-list-item>
						</v-list-group>
					</v-list>
				</v-col>

				<v-col cols="6" offset="1">
					<div class="products">
						<ProductCard v-for="product in sortedProducts" :product="product" :key="product.uuid">
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

import { addProductToCart, cartItems, removeProductFromCart, getProducts } from '@/store/modules/products';
import { fetchBrands, getBrands } from '@/store/modules/brands';
import { fetchCategories, getCategories } from '@/store/modules/categories';

import Product, { CartItem } from '@/types/Product';
import Brand from '@/types/Brand';
import CategoryType from '@/types/Category';

@Component({
	components: {
		ProductCard
	}
})
export default class Category extends Vue {
	private selectedSortOption = 'desc';
	private selectedBrandId = 'all';

	private sortOptions = [
		{ text: 'Highest Price First', value: 'desc', },
		{ text: 'Lowest Price First', value: 'asc', }
	];

	private priceRange = 5000;

	get categoryId(): string {
		return this.$route.params['id']
	}

	get selectedCategory(): CategoryType {
		return this.categories.find(category => category.uuid === this.$route.params['id']) as CategoryType;
	}

	get products(): Product[] {
		return getProducts(this.$store) 
	}

	get sortedProducts(): Product[] {
		return this.products
			.filter(product => {
				return product.price <= this.priceRange
				&& (this.categoryId === 'all' ? true : product.category_uuid === this.categoryId)
				&& (this.selectedBrandId === 'all' ? true : product.brand.uuid === this.selectedBrandId)
			})
			.sort((a, b) => {
				if (this.selectedSortOption === 'desc') return b.price - a.price;
				return a.price - b.price
			})
	}

	get brands(): Brand[] {
		return getBrands(this.$store);
	}

	get categories(): CategoryType[] {
		return getCategories(this.$store);
	}

	get mostExpensiveProduct(): number {
		return Math.max(...this.products.map(product => product.price)) || 5000;
	} 

	get cartItems(): CartItem[] {
		return cartItems(this.$store);
	}

	private updateActiveCategory(categoryUUID: string): void {
		this.$router.push({ path: `/shop/category/${categoryUUID}` })
	}

	private isProductInCart(productUUID: string): boolean {
		return this.cartItems.findIndex(item => item.productUUID === productUUID) !== -1;
	}

	private getBrandProducts(brandUUID: string) {
		return this.products.filter(product => product.brand.uuid === brandUUID);
	}

	private getCatgoriesProducts(categoryUUID: string) {
		return this.products.filter(product => product.category_uuid === categoryUUID);
	}

	private addProductToCart(product: Product): void {
		addProductToCart(this.$store, { amount: 1, productUUID: product.uuid });
	}

	private removeProductFromCart(product: Product): void {
		removeProductFromCart(this.$store, product.uuid);
	}

	mounted(): void {
		if (this.brands.length === 0) {
			fetchBrands(this.$store);
		}
		
		if (this.categories.length === 0) {
			fetchCategories(this.$store)
		}
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