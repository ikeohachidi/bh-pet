<template>
	<section>
		<v-container>
			<v-row justify="center">
				<v-col cols="3" align-self="center" class="mt-15">
					<h2 class="text-center font-weight-regular">Change Password</h2>
					<p class="mt-8 mb-7">Your new password must be different from previous passwords.</p>
					<v-text-field outlined label="New password" type="password"></v-text-field>
					<v-text-field outlined label="Re-enter your new password" type="password"></v-text-field>

					<v-btn depressed width="100%" color="primary" @click="updatePassword">change password</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class RecoverPassword extends Vue {
	private updatePassword() {
		// TODO
	}
}
</script>

<style scoped>

</style>