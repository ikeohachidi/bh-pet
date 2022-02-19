<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<auth-form>
				<h2 class="text-center my-3">Log in</h2>
				<v-text-field outlined label="Email Address *" v-model="user.email"></v-text-field>	
				<v-text-field outlined label="Password*" type="password" v-model="user.password"></v-text-field>	

				<v-btn 
					:loading="isLoading" 
					:disabled="isLoading"
					class="w-100" 
					width="100%" 
					depressed 
					color="primary" 
					@click="logIn"
				>
					Log in
				</v-btn>

				<template #footer>
					<router-link class="link" to="recover">Forgot Password?</router-link>
					<p class="link" @click="showSignup">Don't have an account, Sign up</p>
				</template>
			</auth-form>
		</v-dialog>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AuthForm from '@/components/AuthForm/AuthForm.vue';
import { logIn } from '@/store/modules/user';
import { Credential } from '@/types/User';

@Component({
	components: {
		AuthForm
	}
})
export default class Login extends Vue {
	@Prop({ default: false }) show!: boolean;

	private user = new Credential();
	private isLoading = false;

	private close(): void {
		this.$emit('close');
	}

	private showSignup(): void {
		this.$emit('show-signup');
	}

	private logIn(): void {
		this.isLoading = true;
		logIn(this.$store, this.user)
			.then(() => {
				this.close();
			})
			.finally(() => {
				this.isLoading = false;
			})
	}
}
</script>

<style lang="scss" scoped>
.link {
	text-decoration: none;
	color: var(--color-blue);
}
</style>