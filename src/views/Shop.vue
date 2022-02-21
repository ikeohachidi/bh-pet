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
			</v-row>
		</v-container>
		<router-view></router-view>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchBlogPosts, fetchPromotions, getPromotions, getPosts } from '@/store/modules/shop';
import { fetchCategories, getCategories } from '@/store/modules/categories';
import { fetchProducts, getProducts } from '@/store/modules/products';

@Component
export default class Shop extends Vue {
	mounted(): void {
		if (getProducts(this.$store).length === 0) {
			fetchProducts(this.$store)
		}

		if (getCategories(this.$store).length === 0) {
			fetchCategories(this.$store)
		}

		if (getPromotions(this.$store).length === 0) {
			fetchPromotions(this.$store)
		}

		if (getPosts(this.$store).length === 0) {
			fetchBlogPosts(this.$store)
		}
	}
}
</script>
