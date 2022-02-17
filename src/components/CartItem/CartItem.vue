<template>
	<section>
		<div class="d-flex">
			<div class="mr-4">
				<img :src="`${api}/file/${product.metadata.image}`" :alt="product.title">
			</div>

			<div>
				<h2 class="text-h6 font-weight-regular">{{ product.title }}</h2>
				<p>{{ product.brand.title }}</p>
				<h1 class="my-6 text-h5">{{ product.price }} kn</h1>

				<div class="d-flex">
					<div class="d-flex mr-4" style="width: 140px">
						<v-btn icon tile elevation="0">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
						<v-text-field width="20px" dense outlined class="mx-3"></v-text-field>
						<v-btn icon tile elevation="0">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</div>
					<v-btn 
						color="error" 
						elevation="0" 
						@click="removeProductFromCart(product)"
						v-if="isProductInCart"
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
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Product from '@/types/Product';
import { cartItems } from '@/store/modules/products';

@Component
export default class CartItem extends Vue {
	@Prop({ default: () => ({}) }) product!: Product;

	private api = process.env.VUE_APP_API;

	get cartItems() {
		return cartItems(this.$store)
	}

	get itemInCart() {
		return this.cartItems.find(item => item.productUUID === this.product.uuid);
	}

	get isProductInCart(): boolean {
		return this.itemInCart !== undefined;
	}
}
</script>

<style scoped>
.v-btn--icon {
	background-color:  #F4F6F5;
}
</style>