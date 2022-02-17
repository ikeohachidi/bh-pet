<template>
	<section>
		<div class="product">
			<div class="product-image">
				<img :src="`${api}/file/${product.metadata.image}`" :alt="product.title">
			</div>

			<div>
				<h2 class="text-h6 font-weight-regular">{{ product.title }}</h2>
				<p>{{ product.brand.title }}</p>
				<h1 class="my-6 text-h5">{{ product.price }} kn</h1>

				<div class="d-flex">
					<div class="d-flex mr-4" style="width: 140px">
						<v-btn icon tile elevation="0" @click="amount--">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
						<v-text-field width="20px" :value="amount" disabled dense outlined class="mx-3"></v-text-field>
						<v-btn icon tile elevation="0" @click="amount++">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</div>
					<v-btn 
						color="error" 
						elevation="0" 
						@click="removeProductFromCart(product)"
						v-if="itemInCart"
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

import Product, { CartItem as CartItemType } from '@/types/Product';

import { 
	cartItems, 
	setItemAmount,
	addProductToCart,
	removeProductFromCart
} from '@/store/modules/products';

@Component
export default class CartItem extends Vue {
	@Prop({ default: () => ({}) }) product!: Product;

	private api = process.env.VUE_APP_API;

	private itemAmount = 0;
	get amount() {
		if (this.itemInCart) {
			return this.itemInCart.amount;
		}
		return this.itemAmount;
	}

	set amount(value: number) {
		if (this.itemInCart) {
			setItemAmount(this.$store, { productUUID: this.product.uuid, amount: value })
			this.itemAmount = value;

			return
		}
		this.itemAmount = value;
	}

	private addProductToCart() {
		addProductToCart(this.$store, {
			productUUID: this.product.uuid,
			amount: this.itemAmount || 1
		});
	}

	private removeProductFromCart(): void {
		removeProductFromCart(this.$store, this.product.uuid);
	}

	get cartItems(): CartItemType[] {
		return cartItems(this.$store)
	}

	get itemInCart(): CartItemType | undefined {
		return this.cartItems.find(item => item.productUUID === this.product.uuid);
	}
}
</script>

<style lang="scss" scoped>
.v-btn--icon {
	background-color:  #F4F6F5;
}

.product {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 2em;

	&-image {
		display: flex;
		justify-content: center;
	}
}
</style>