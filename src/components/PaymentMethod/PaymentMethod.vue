<template>
	<section>
		<UserInfoForm :info="paymentDetails">
			<template #header>
				<h3>Payment Details</h3>
			</template>
			<template #footer>
				<v-checkbox :value="useShippingDetails" @change="onShippingDetailsChange" label="Payment details are same as shipping details"></v-checkbox>
			</template>
		</UserInfoForm>

		<h3 class="mb-4">Type of Payment</h3>

		<div class="methods mb-10">
			<div 
				v-for="{ text, icon, value } in methods" :key="icon" 
				@click="updateSelectedMethod(value)" 
				class="elevation-1 d-flex flex-column align-center pa-5 rounded pointer"
				:class="{ 'active': selectedMethod === value }"
			>
				<v-icon x-large color="primary">mdi-{{ icon }}</v-icon>
				<p class="my-0">{{ text }}</p>
			</div>
		</div>

		<template v-if="selectedMethod === paymentType.CARD">
			<v-text-field label="Credit Card Number*" v-model="card.number"></v-text-field>
			<div class="d-flex">
				<v-text-field label="Expiry*" v-model="card.expire_date"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="CVV*" v-model="card.ccv"></v-text-field>
			</div>
		</template>
		
		<template v-if="selectedMethod === paymentType.CASH">
			<div class="d-flex">
				<v-text-field label="First name*" v-model="cash.first_name"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="Last name*" v-model="cash.last_name"></v-text-field>
			</div>
			<v-text-field label="Address line 1*" v-model="cash.address"></v-text-field>
			<v-text-field label="Address line 2*" v-model="cash.address"></v-text-field>
			<v-checkbox label="I consent to your T&C's"></v-checkbox>
		</template>
		
		<template v-if="selectedMethod === paymentType.BANK">
			<v-text-field label="Bank SWIFT code*" v-model="bank.swift"></v-text-field>
			<div class="d-flex">
				<v-text-field label="IBAN*" v-model="bank.iban"></v-text-field>
				<v-spacer></v-spacer>
				<v-text-field label="Name*" v-model="bank.name"></v-text-field>
			</div>
			<v-text-field label="Ref code*"></v-text-field>
		</template>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import UserInfoForm from '@/components/UserInfoForm/UserInfoForm.vue';

import { PaymentType, CardPayment, BankPayment, CashPayment, ShippingDetails} from '@/types/Payment';

@Component({
	components: {
		UserInfoForm
	}
})
export default class PaymentMethod extends Vue {
	@Prop({ default: () => (new CardPayment) }) card!: CardPayment;
	@Prop({ default: () => (new CashPayment) }) cash!: CashPayment;
	@Prop({ default: () => (new BankPayment) }) bank!: BankPayment;
	@Prop({ default: () => (new ShippingDetails) }) paymentDetails!: ShippingDetails;
	@Prop({ default: PaymentType.CARD }) selectedMethod!: PaymentType;
	@Prop({ default: false }) useShippingDetails!: boolean;

	onShippingDetailsChange(value: boolean) {
		this.$emit('update:useShippingDetails', value);
	}

	updateSelectedMethod(value: PaymentType): void {
		this.$emit('update:selectedMethod', value)
	}

	get paymentType(): typeof PaymentType {
		return PaymentType; 
	}

	private methods = [
		{
			text: 'Credit Card',
			icon: 'credit-card',
			value: PaymentType.CARD 
		},
		{
			text: 'Cash on delivery',
			icon: 'cash',
			value: PaymentType.CASH
		},{
			text: 'Bank Transfer',
			icon: 'compare-horizontal',
			value: PaymentType.BANK 
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