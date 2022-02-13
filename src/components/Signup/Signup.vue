<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<auth-form>
				<h2 class="text-center my-3">Signup</h2>
				<v-row>
					<v-col>
						<v-text-field outlined label="Email Address *"></v-text-field>	
					</v-col>
					<v-col>
						<v-text-field outlined label="Last Name*"></v-text-field>	
					</v-col>
				</v-row>
				<v-text-field outlined label="Email Address *"></v-text-field>	
				<v-text-field outlined label="Password*" type="password"></v-text-field>	
				<v-text-field outlined label="Confirm Password*" type="password"></v-text-field>	

				<v-btn class="w-100" width="100%" depressed color="primary">sign up</v-btn>

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

@Component({
	components: {
		AuthForm
	}
})
export default class Signup extends Vue {
	@Prop({ default: false }) show!: boolean;

	private close() {
		this.$emit('close');
	}

	private showLogin() {
		this.$emit('show-login');
	}
}
</script>

<style lang="scss" scoped>
.link {
	text-decoration: none;
	color: var(--color-blue);
}
</style>