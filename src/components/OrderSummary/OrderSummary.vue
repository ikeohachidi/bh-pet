<template>
	<section>
		<p>Review your order</p>
		<div class="detail-section">
			<div class="header">
				<h3>Shipping address</h3>
				<p @click="moveToStep(1)">Edit</p>
			</div>
			<ul>
				<li>{{ shippingDetails.first_name }} {{ shippingDetails.last_name }}</li>
				<li>{{ shippingDetails.address1 }}</li>
				<li>{{ shippingDetails.address2 }}</li>
				<li>{{ shippingDetails.city }}, {{ shippingDetails.state }}</li>
				<li>{{ shippingDetails.zip_code }}, {{ shippingDetails.country }}</li>
			</ul>
		</div>

		<div class="detail-section">
			<div class="header">
				<h3>Payment Details</h3>
				<p @click="moveToStep(2)">Edit</p>
			</div>
			<ul>
				<li>{{ paymentDetails.first_name }} {{ paymentDetails.last_name }}</li>
				<li>{{ paymentDetails.address1 }}</li>
				<li>{{ paymentDetails.address2 }}</li>
				<li>{{ paymentDetails.city }}, {{ paymentDetails.state }}</li>
				<li>{{ paymentDetails.zip_code }}, {{ paymentDetails.country }}</li>
			</ul>
		</div>

		<div class="detail-section">
			<div class="header">
				<h3>Your Order</h3>
				<p @click="goToCartPage">Edit</p>
			</div>
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
					<span>Subtotal before delievery</span>
					<span>{{ productSum }}</span>
				</li>
				<li>
					<span>Delivery Charge</span>
					<span>{{ deliveryCharge }}</span>
				</li>
				<li>
					<h3>Total</h3>
					<span>{{ totalAmount }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import CartItem from '@/components/CartItem/CartItem.vue';
import { getProductsInCart } from '@/store/modules/products';
import { ShippingDetails } from '@/types/Payment';

@Component({
	components: {
		CartItem
	}
})
export default class OrderSummary extends Vue {
	@Prop({ default: () => (new ShippingDetails) }) shippingDetails!: ShippingDetails;
	@Prop({ default: () => (new ShippingDetails) }) paymentDetails!: ShippingDetails;

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
ul {
	list-style: none;
	padding: 0;
}

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