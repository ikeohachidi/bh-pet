<template>
	<v-app-bar app color="primary" dark>
		<div class="d-flex align-center">
			<v-img
				alt="Pet shop Logo"
				class="shrink mr-2"
				contain
				src="@/assets/logo.svg"
				transition="scale-transition"
				width="30"
			/>
			<span>petson.</span>
		</div>

		<v-spacer></v-spacer>
		<div>
			<v-btn plain>PRODUCTS</v-btn>
			<v-btn plain>PROMOTIONS</v-btn>
			<v-btn plain>BLOG</v-btn>
		</div>
		<v-spacer></v-spacer>
	
		<v-btn class="mr-2" outlined large @click="showCart">
			<v-icon>mdi-cart</v-icon>
			Cart
			(0)
		</v-btn>
		<v-btn class="mr-2" outlined large @click="showLogin">Login</v-btn>
		<v-avatar color="info" size="35" @click="showUserSettings" class="pointer">
			<span>CI</span>
		</v-avatar>
	</v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
	private showCart() {
		this.$emit('show-cart');
	}

	private showLogin() {
		this.$emit('show-login');
	}

	private showUserSettings() {
		this.$emit('show-user-settings');
	}
}
</script>