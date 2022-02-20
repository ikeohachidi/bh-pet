<template>
	<section>
		<p>Review your order</p>
		<div class="detail-section">
			<div class="header">
				<h3>Shipping address</h3>
				<p @click="moveToStep(1)">Edit</p>
			</div>
		</div>

		<div class="detail-section">
			<div class="header">
				<h3>Payment Details</h3>
				<p @click="moveToStep(2)">Edit</p>
			</div>
		</div>

		<div class="detail-section">
			<div class="header">
				<h3>Your Order</h3>
				<p @click="goToCartPage">Edit</p>
			</div>
		</div>

		<div>
			<CartItem 
				v-for="product in productsInCart" 
				:key="product.uuid" 
				:product="product"
				:canAddToCart="false"
			/>
		</div>

		<div class="detail-section">
			<div class="header">
				<h3>Summary</h3>
			</div>
			<ul>
				<li>
					<p>Subtotal before delievery</p>
					<p>{{ productSum }}</p>
				</li>
				<li>
					<p>Delivery Charge</p>
					<p>{{ deliveryCharge }}</p>
				</li>
				<li>
					<h3>Total</h3>
					<p>{{ totalAmount }}</p>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import CartItem from '@/components/CartItem/CartItem.vue';
import { getProductsInCart } from '@/store/modules/products';

@Component({
	components: {
		CartItem
	}
})
export default class OrderSummary extends Vue {
	private deliveryCharge = 25000;

	get productsInCart() {
		return getProductsInCart(this.$store)
	}

	get productSum() {
		return this.productsInCart.reduce((acc, product) => acc + product.price, 0)
	}

	get totalAmount() {
		return this.productSum + this.deliveryCharge
	}

	private moveToStep(step: number) {
		this.$emit('change-step', step);
	}

	private goToCartPage() {
		this.$router.push({ name: '/cart' });
	}
}
</script>

<style lang="scss" scoped>
.detail-section {
	p {
		margin-bottom: 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background-color: #f8f8f8;
		margin-bottom: 15px;
	
		p:last-child {
			color: var(--color-primary);
		}
	}

	&:last-of-type {
		ul {
			list-style: none;
			padding: 0;
		}

		li	{
			display: flex;
			justify-content: space-between;
				padding: 10px 0;

			&:last-of-type {
				border-top: 1px solid #f8f8f8;
			}
		}
	}
}
</style>