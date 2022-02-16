<template>
	<section>
		<v-row>
			<v-col cols="6" class="mx-auto mt-6">
				<auth-form>
					<h2 class="text-center my-3">Log in</h2>
					<v-text-field outlined label="Email Address *" v-model="credential.email"></v-text-field>	
					<v-text-field
						v-model="credential.password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						outlined
						label="Password"
						:type="showPassword ? 'text' : 'password'"
						@click:append="showPassword = !showPassword"
					></v-text-field>

					<v-btn 
						class="w-100" 
						width="100%" 
						depressed 
						color="primary" 
						:loading="isLoading"
						:disabled="isLoading"
						@click="logIn"
					>Log in</v-btn>
				</auth-form>
			</v-col>
		</v-row>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import AuthForm from '@/components/AuthForm/AuthForm.vue';

import { logIn } from '@/store/modules/admin';
import Credential from '@/models/Credential';

@Component({
	components: {
		AuthForm
	}
})
export default class Login extends Vue {
	private credential: Credential = {
		email: '',
		password: ''
	}
	private showPassword = false;
	private isLoading = false;

	private logIn() {
		this.isLoading = true;
		logIn(this.$store, this.credential)	
			.then(() => {
				this.$router.push({ path: '/admin' })
			})
			.finally(() => {
				this.isLoading = false;
			})
	}
}
</script>

<style scoped>
</style>