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
					<router-link to="/shop/dog-food" class="category text-h2">Dry dog food</router-link>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchBlogPosts, fetchPromotions, getPromotions, getPosts } from '@/store/modules/shop';
import Promotion from '@/types/Promotion';

@Component
export default class Shop extends Vue {
	private api = process.env.VUE_APP_API;

	get promotions(): Promotion[] {
		return getPromotions(this.$store);
	}

	get posts(): unknown[] {
		return getPosts(this.$store);
	}

	mounted(): void {
		Promise.allSettled([
			fetchBlogPosts(this.$store),
			fetchPromotions(this.$store)
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
</style>