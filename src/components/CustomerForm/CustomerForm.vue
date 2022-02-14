<template>
	<v-dialog v-model="show" @click:outside="close">
		<v-card class="pa-10 mx-auto" width="500px">
			<div></div>
			<div class="d-flex justify-center mb-6">
				<v-avatar size="100" color="primary"></v-avatar>
			</div>
			<div class="d-flex">
				<v-text-field label="First Name" outlined></v-text-field>
				<v-spacer class="mx-1"></v-spacer>
				<v-text-field label="Last Name" outlined></v-text-field>
			</div>
			<v-text-field label="Email" outlined></v-text-field>
			<v-text-field label="Phone Number" outlined></v-text-field>
			<v-text-field label="Location" outlined>
				<template #append>
					<v-icon>mdi-map-marker</v-icon>
				</template>
			</v-text-field>
			<v-text-field
				label="Password"
				outlined
				:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showPassword ? 'text' : 'password'"
				@click:append="showPassword = !showPassword"
			></v-text-field>
			<v-text-field
				label="Confirm Password"
				 outlined
				:append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
				:type="showConfirmPassword ? 'text' : 'password'"
				@click:append="showConfirmPassword = !showConfirmPassword"
			></v-text-field>

			<v-btn width="100%" color="primary" depressed>Add New customer</v-btn>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CustomerForm extends Vue {
	@Prop({ default: false }) show!: boolean;

	private close() {
		this.$emit('close');
	}

	private showPassword = false;
	private showConfirmPassword = false;
}
</script>

<style scoped>
</style>