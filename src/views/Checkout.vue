<template>
	<section class="mb-15">
		<v-container>
			<v-row class="mt-15">
				<v-col cols="4" class="mx-auto">
					<h1 class="text-h2 mb-15">Checkout</h1>


					<UserInfoForm v-if="activeStep === 1" :info="shippingDetails">
						<template #header>
							<h3>Shipping Address</h3>
						</template>
						<template #footer>
							<v-checkbox label="Use this address for payment details"></v-checkbox>
						</template>
					</UserInfoForm>

					<PaymentMethod/>

					<div class="d-flex">
						<v-spacer></v-spacer>
						<v-btn color="primary" class="px-4">next</v-btn>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import PaymentMethod from '@/components/PaymentMethod/PaymentMethod.vue';
import UserInfoForm from '@/components/UserInfoForm/UserInfoForm.vue';

import { ShippingDetails } from '@/types/Payment';
@Component({
	components: {
		UserInfoForm
	}
})
	private shippingDetails: ShippingDetails = new ShippingDetails;
</script>

<style scoped>
h1 {
	color: var(--color-primary);
}
</style>