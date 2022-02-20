<template>
	<section>
		<slot name="header"></slot>
		<div class="d-flex">
			<v-text-field label="First name*" v-model="info.first_name"></v-text-field>
			<v-spacer></v-spacer>
			<v-text-field label="Last name*" v-model="info.last_name"></v-text-field>
		</div>
		<v-text-field label="Address line 1*" v-model="info.address1"></v-text-field>
		<v-text-field label="Address line 2*" v-model="info.address2"></v-text-field>
		<div class="d-flex">
			<v-text-field label="City" v-model="info.city"></v-text-field>
			<v-spacer></v-spacer>
			<v-text-field label="State/Province/Region" v-model="info.state"></v-text-field>
		</div>
		<div class="d-flex">
			<v-text-field label="Zip/Postal Code*" v-model="info.zip_code"></v-text-field>
			<v-spacer></v-spacer>
			<v-text-field label="Country" v-model="info.country"></v-text-field>
		</div>
		<slot name="footer"></slot>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { ShippingDetails } from '@/types/Payment';

@Component
export default class UserInfoForm extends Vue {
	@Prop({ default: () => (new ShippingDetails) }) info!: ShippingDetails;
}
</script>

<style scoped>
</style>