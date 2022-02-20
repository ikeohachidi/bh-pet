<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<auth-form>
				<h2 class="text-center my-3">Signup</h2>
				<v-row>
					<v-col>
						<v-text-field outlined label="First Name *" v-model="user.first_name"></v-text-field>	
					</v-col>
					<v-col>
						<v-text-field outlined label="Last Name*" v-model="user.last_name"></v-text-field>	
					</v-col>
				</v-row>
				<v-text-field outlined label="Email Address *" v-model="user.email"></v-text-field>	
				<v-text-field outlined label="Password*" type="password" v-model="user.password"></v-text-field>	
				<v-text-field outlined label="Confirm Password*" type="password" v-model="user.password_confirmation"></v-text-field>	

				<v-checkbox 
					label="I want to receive inspiration, marketing promotions and updates via email"
					v-model="user.is_marketing"
				></v-checkbox>

				<v-btn 
					class="w-100" 
					width="100%" 
					depressed 
					color="primary" 
					:disabled="isLoading"
					:loading="isLoading"
					@click="signUp"
				>sign up</v-btn>

				<template #footer>
					<p class="link mx-auto mb-0" @click="showLogin">Already have an account? Login</p>
				</template>
			</auth-form>
		</v-dialog>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import AuthForm from '@/components/AuthForm/AuthForm.vue';
import User from '@/types/User';
import { createUser } from '@/store/modules/user';

@Component({
	components: {
		AuthForm
	}
})
export default class Signup extends Vue {
	@Prop({ default: false }) show!: boolean;

	private user: User = new User();
	private isLoading = false;

	private close(): void {
		this.$emit('close');
	}

	private showLogin(): void {
		this.$emit('show-login');
	}

	private signUp(): void {
		this.isLoading = true;
		createUser(this.$store, this.user)
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