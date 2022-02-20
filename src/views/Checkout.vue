<template>
	<section class="mb-15">
		<v-container>
			<v-row class="mt-15">
				<v-col cols="4" class="mx-auto">
					<h1 class="text-h2 mb-10">Checkout</h1>

					<v-stepper v-model="activeStep" elevation="0" class="mb-9">
						<v-stepper-header>
							<v-stepper-step
								:complete="activeStep >= 1"
								step="1"
								class="pl-0"
							>
								Shipping Address
							</v-stepper-step>

							<v-divider></v-divider>

							<v-stepper-step
								:complete="activeStep >= 2"
								step="2"
							>
								Payment Details
							</v-stepper-step>

							<v-divider></v-divider>

							<v-stepper-step step="3" class="pr-0">
								Review Your order
							</v-stepper-step>
						</v-stepper-header>
					</v-stepper>

					<UserInfoForm 
						v-if="activeStep === 1" 
						:info="shippingDetails"
					>
						<template #header>
							<h3>Shipping Address</h3>
						</template>
						<template #footer>
							<v-checkbox v-model="useAsPaymentDetails" label="Use this address for payment details"></v-checkbox>
						</template>
					</UserInfoForm>

					<PaymentMethod 
						v-if="activeStep === 2"
						:card="card"
						:bank="bank"
						:cash="cash"
						:selectedMethod.sync="selectedPaymentMethod"
						:paymentDetails="useAsPaymentDetails ? shippingDetails : paymentDetails"
						:useShippingDetails.sync="useAsPaymentDetails"
					/>
					<OrderSummary 
						v-if="activeStep === 3" 
						@change-step="goToStep"
						:shippingDetails="shippingDetails"
						:paymentDetails="useAsPaymentDetails ? shippingDetails : paymentDetails"
					/>

					<div class="d-flex">
						<template v-if="activeStep < 3">
							<v-spacer></v-spacer>
							<v-btn color="primary" class="px-4" @click="goToStep(activeStep + 1)">next</v-btn>
						</template>

						<v-btn v-else width="100%" depressed color="primary" @click="placeOrder">place order</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import PaymentMethod from '@/components/PaymentMethod/PaymentMethod.vue';
import OrderSummary from '@/components/OrderSummary/OrderSummary.vue';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm.vue';

import Payment, { PaymentType, CardPayment, BankPayment, CashPayment, ShippingDetails} from '@/types/Payment';
import { createPayment } from '@/store/modules/payments';

@Component({
	components: {
		PaymentMethod,
		OrderSummary,
		UserInfoForm
	}
})
export default class Checkout extends Vue {
	private activeStep = 1;

	private selectedPaymentMethod: PaymentType = PaymentType.CARD;
	private shippingDetails: ShippingDetails = new ShippingDetails;
	private paymentDetails: ShippingDetails = new ShippingDetails;

	private card = new CardPayment;
	private cash = new CashPayment;
	private bank = new BankPayment;
	private useAsPaymentDetails = false;

	private goToStep(step: number) {
		if (step > 3 || step === 0) return;
		this.activeStep = step;
	}

	private placeOrder() {
		const payment: Payment = {
			type: this.selectedPaymentMethod,
			details: this.card
		}

		if (this.selectedPaymentMethod === PaymentType.CASH) payment.details = this.cash;
		if (this.selectedPaymentMethod === PaymentType.BANK) payment.details = this.bank;

		createPayment(this.$store, payment)
	}
}
</script>

<style scoped>
h1 {
	color: var(--color-primary);
}
</style>