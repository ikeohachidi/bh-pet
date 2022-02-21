<template>
	<section>
		<v-dialog v-model="showRecoveryLink" width="500">
			<v-card class="pa-10">
				<div>
					<v-alert dense text type="info"> For demo purposes, we are using a URL token </v-alert>
					<p class="mb-0 mt-9">Click on the URL and change password</p>
					<router-link :to="`change-password?token=${recoveryLink}&email=${email}`" class="link">
						http://yourdomain.tld?token=1441307151_4492f25946a2e8e1414a8bb53dab8a6ba1cf4615
					</router-link>
				</div>
			</v-card>
		</v-dialog>

		<v-container>
			<v-row justify="center">
				<v-col cols="3" align-self="center" class="mt-15">
					<h2 class="text-center font-weight-regular">Recover Password</h2>
					<p class="mt-8 mb-7">Enter the email associated with your account and we’ll send an email with instructions to reset your password.</p>
					<v-text-field outlined label="Email Address *" v-model="email"></v-text-field>

					<v-btn 
						depressed 
						width="100%" 
						color="primary" 
						@click="recoverPassword"
						:loading="isLoading"
						:disabled="isLoading"
					>get recovery link</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { forgotPassword } from '@/store/modules/user';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RecoverPassword extends Vue {
	private showRecoveryLink = false;
	private recoveryLink = '';
	private email = '';
	private isLoading = false;

	private recoverPassword() {
		this.isLoading = true;
		forgotPassword(this.$store, this.email)
			.then(({ reset_token }) => {
				this.recoveryLink = reset_token;
				this.showRecoveryLink = true; 
			})
			.finally(() => {
				this.isLoading = false;
			})
	}
}
</script>

<style scoped>

</style>