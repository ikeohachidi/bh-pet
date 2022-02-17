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

import { fetchBlogPosts, fetchPromotions } from '@/store/modules/shop';
import { fetchCategories } from '@/store/modules/categories';
import { fetchProducts } from '@/store/modules/products';

@Component
export default class Shop extends Vue {
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
