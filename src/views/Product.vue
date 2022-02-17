<template>
	<v-container>
		<v-row>
			<v-col cols="8" class="mx-auto">
				<CartItem :product="product"/>

				<p class="mt-5">{{ product.description }}</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import CartItem from '@/components/CartItem/CartItem.vue';

import { fetchProductData, getProducts } from '@/store/modules/products';

import ProductType from '@/types/Product';

@Component({
	components: {
		CartItem
	}
})
export default class Product extends Vue {
	get productId(): string {
		return this.$route.params.id;
	}

	get product(): ProductType | undefined {
		return getProducts(this.$store).find(product => {
			return product.uuid === this.productId;
		})
	}

	mounted() {
		if (!this.product) {
			fetchProductData(this.$store, this.productId)
		}
	}
}
</script>

<style scoped>
</style>