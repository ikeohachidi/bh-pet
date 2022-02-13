<template>
	<section>
		<v-dialog v-model="show">
			<auth-form>
				<h2 class="text-center my-3">Log in</h2>
				<v-text-field outlined label="Email Address *"></v-text-field>	
				<v-text-field outlined label="Password*" type="password"></v-text-field>	

				<v-btn class="w-100" width="100%" depressed color="primary">Log in</v-btn>

				<template #footer>
					<router-link class="link" to="recover">Forgot Password?</router-link>
					<router-link class="link" to="signup">Don't have an account, Sign up</router-link>
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
export default class Login extends Vue {
	@Prop({ default: false }) show!: boolean;
}
</script>

<style lang="scss" scoped>
.link {
	text-decoration: none;
	color: var(--color-blue);
}
</style>