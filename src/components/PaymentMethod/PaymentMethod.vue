<template>
	<section>
		<div class="methods mb-10">
			<div 
				v-for="{ text, icon, value } in methods" :key="icon" 
				@click="selectedMethod = value" 
				class="elevation-1 d-flex flex-column align-center pa-5 rounded pointer"
				:class="{ 'active': selectedMethod === value }"
			>
				<v-icon x-large color="primary">mdi-{{ icon }}</v-icon>
				<p class="my-0">{{ text }}</p>
			</div>
		</div>

		<h3>Shipping Address</h3>

		<template v-if="selectedMethod === 'card'">
			<v-text-field label="Credit Card Number*"></v-text-field>
			<div class="d-flex">
				<v-text-field label="Expiry*"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="CVV*"></v-text-field>
			</div>
		</template>
		
		<template v-if="selectedMethod === 'cash'">
			<div class="d-flex">
				<v-text-field label="First name*"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="Last name*"></v-text-field>
			</div>
			<v-text-field label="Address line 1*"></v-text-field>
			<v-text-field label="Address line 2*"></v-text-field>
			<v-checkbox label="I consent to your T&C's"></v-checkbox>
		</template>
		
		<template v-if="selectedMethod === 'bank'">
			<v-text-field label="Bank SWIFT code*"></v-text-field>
			<div class="d-flex">
				<v-text-field label="IBAN*"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="Name*"></v-text-field>
			</div>
			<v-text-field label="Ref code*"></v-text-field>
		</template>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PaymentMethod extends Vue {
	private selectedMethod = 'card';

	private methods = [
		{
			text: 'Credit Card',
			icon: 'credit-card',
			value: 'card'
		},
		{
			text: 'Cash on delivery',
			icon: 'cash',
			value: 'cash'
		},{
			text: 'Bank Transfer',
			icon: 'compare-horizontal',
			value: 'bank'
		},
	]
}
</script>

<style scoped>
.methods {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2em;
}

.active {
	background: #F4F6F5;
	color: #000;
}
</style>