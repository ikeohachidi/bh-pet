<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="4" class="mx-auto mt-6">
					<v-text-field 
						label="Search Products"
						outlined
					></v-text-field>
				</v-col>
				<v-col cols="12"></v-col>
				<v-col cols="8" class="mx-auto">
					<v-carousel hide-delimiters cycle>
						<v-carousel-item 
							v-for="promotion in promotions" 
							:key="promotion.uuid" 
							:src="`${api}/file/${promotion.metadata.image}`"
						>
							<div class="promotion">
								<h1 class="promotion_title text-h3 mb-2">{{ promotion.title }}</h1>
								<p class="promotion_content">{{ promotion.content }}</p>
							</div>
						</v-carousel-item>
					</v-carousel>

					<div v-for="categoryProduct in categoryProducts" :key="categoryProduct.uuid" class="mt-10">
						<router-link :to="`/shop/${categoryProduct.uuid}`" class="category-link text-h3 mb-6 text-capitalize">
							{{ categoryProduct.title }}
						</router-link>
						<v-slide-group>
							<v-slide-item v-for="product in categoryProduct.products" :key="product.uuid">
								<div class="category-products">
									<ProductCard :product="product"/>
								</div>
							</v-slide-item>
						</v-slide-group>
					</div>

				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ProductCard from '@/components/ProductCard/ProductCard.vue';

import { fetchBlogPosts, fetchPromotions, getPromotions, getPosts } from '@/store/modules/shop';
import { fetchCategories, getCategories } from '@/store/modules/categories';
import { fetchProducts, getProductsByCategoryId } from '@/store/modules/products';

import Promotion from '@/types/Promotion';
import Category from '@/types/Category';
import Product from '@/types/Product';
import { getRandomNumber } from '@/helpers';

@Component({
	components: {
		ProductCard
	}
})
export default class Shop extends Vue {
	private api = process.env.VUE_APP_API;

	get promotions(): Promotion[] {
		return getPromotions(this.$store);
	}

	get posts(): unknown[] {
		return getPosts(this.$store);
	}

	get categories(): Category[] {
		return getCategories(this.$store);
	}

	get randomCategories(): number[] {
		const first = getRandomNumber(this.categories.length, []);
		const second = getRandomNumber(this.categories.length, [first]);

		return [first, second];
	}

	get categoryProducts() {
		const categories = getCategories(this.$store);

		const id = '022b7724-1076-3d4f-95cc-136e9c8e7d63'
		const values: (Category & { products: Product[] })[] = [
			{
				...categories[0],
				products: getProductsByCategoryId(this.$store)(id).slice(0, 5)
			}
		];

		return values;
	}

	mounted(): void {
		Promise.allSettled([
			fetchBlogPosts(this.$store),
			fetchPromotions(this.$store),
			fetchCategories(this.$store),
			fetchProducts(this.$store)
		])
	}
}
</script>

<style lang="scss" scoped>
.promotion {
	padding: 20px;

	.promotion_title, .promotion_content {
		padding: 13px 12px;
		background-color: rgba(0, 0, 0, 0.226);
		color: #fff;
		backdrop-filter: blur(.5px);
		display: inline-block;
	}
}

.category-link {
	text-decoration: none;
	display: inline-block;
	margin-bottom: 10px;
}

.category-products {
	margin: 0 10px;
	width: 288px;

	&:first-of-type {
		margin-left: 0;
	}

	&:last-of-type {
		margin-right: 0;
	}
}
</style>