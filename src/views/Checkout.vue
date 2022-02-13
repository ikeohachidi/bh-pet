<template>
	<section class="mb-15">
		<v-container>
			<v-row class="mt-15">
				<v-col cols="4" class="mx-auto">
					<h1 class="text-h2 mb-15">Checkout</h1>

					<h3>Shipping Address</h3>
					<div class="d-flex">
						<v-text-field label="First name*"></v-text-field>
						<v-spacer></v-spacer>
						<v-text-field label="Last name*"></v-text-field>
					</div>
					<v-text-field label="Address line 1*"></v-text-field>
					<v-text-field label="Address line 2*"></v-text-field>
					<div class="d-flex">
						<v-text-field label="City"></v-text-field>
						<v-spacer></v-spacer>
						<v-text-field label="State/Province/Region"></v-text-field>
					</div>
					<div class="d-flex">
						<v-text-field label="Zip/Postal Code*"></v-text-field>
						<v-spacer></v-spacer>
						<v-text-field label="Country"></v-text-field>
					</div>
					<v-checkbox label="Use this address for payment details"></v-checkbox>

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

@Component({
	components: {
		PaymentMethod
	}
})
export default class Checkout extends Vue {}
</script>

<style scoped>
h1 {
	color: var(--color-primary);
}
</style>