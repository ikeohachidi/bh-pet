<template>
	<v-container>
		<v-row>
			<v-col cols="6" class="mx-auto">
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
					<router-link :to="`/shop/category/${categoryProduct.uuid}`" class="category-link text-h3 mb-6 text-capitalize">
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ProductCard from '@/components/ProductCard/ProductCard.vue';

import { getPosts, getPromotions } from '@/store/modules/shop';
import { getCategories } from '@/store/modules/categories';
import { getProductsByCategoryId } from '@/store/modules/products';

import Promotion from '@/types/Promotion';
import Category from '@/types/Category';
import Product from '@/types/Product';
import { getRandomNumber } from '@/helpers';

type ProductCategory = (Category & { products: Product[] });

@Component({
	components: {
		ProductCard
	}
})
export default class Index extends Vue {
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

	get categoryProducts(): ProductCategory[] {
		let values: ProductCategory[] = []
		
		if (this.categories.length > 0) {

			const rand1 = getRandomNumber(this.categories.length - 1, []);
			const rand2 = getRandomNumber(this.categories.length - 1, [rand1]);

			[rand1, rand2].forEach(randomInt => {
				const cat = this.categories[randomInt];

				values.push({
					...cat,
					uuid: cat.uuid,
					products: getProductsByCategoryId(this.$store)(cat.uuid!).slice(0, 5)
				})
			})
		}

		return values;
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