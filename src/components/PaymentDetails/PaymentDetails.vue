<template>
	<section>
		<h3>Review your order</h3>

		<p class="d-flex justify-space-between">
			<span>Shipping address</span>
			<span>Edit</span>
		</p>
		<p class="d-flex justify-space-between">
			<span>Payment Details</span>
			<span>Edit</span>
		</p>

		<v-btn width="100%">place order</v-btn>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PaymentDetails extends Vue {}
</script>

<style scoped>
</style>