<template>
	<section>
		<v-container>
			<v-row justify="center">
				<v-col cols="3" align-self="center" class="mt-15">
					<h2 class="text-center font-weight-regular">Change Password</h2>
					<p class="mt-8 mb-7">Your new password must be different from previous passwords.</p>
					<v-text-field outlined label="New password" type="password" v-model="password"></v-text-field>
					<v-text-field outlined label="Re-enter your new password" type="password" v-model="passwordConfirmation"></v-text-field>

					<v-btn 
						depressed 
						width="100%" 
						color="primary" 
						@click="updatePassword"
						:loading="isLoading"
						:disabled="isLoading"
					>change password</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { resetPasswordToken } from '@/store/modules/user';

@Component
export default class RecoverPassword extends Vue {
	private password = '';
	private passwordConfirmation = '';
	private isLoading = false;

	get token(): string {
		return this.$route.query['token'] as string
	}

	get email(): string {
		return this.$route.query['email'] as string
	}
	private updatePassword() {
		if (!this.token || !this.email) return;

		this.isLoading = true;
		resetPasswordToken(this.$store, {
			token: this.token,
			email: this.email,
			password: this.password,
			password_confirmation: this.passwordConfirmation
		})
		.finally(() => {
			this.isLoading = false;
		})
	}
}
</script>

<style scoped>

</style>