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
	
		<v-btn class="mr-2" outlined large @click="goToCartPage">
			<v-icon>mdi-cart</v-icon>
			Cart
			({{ cartItems.length }})
		</v-btn>
		<v-btn class="mr-2" outlined large @click="showLogin">Login</v-btn>
		<v-avatar color="info" size="35" @click="showUserSettings" class="pointer">
			<span>CI</span>
		</v-avatar>
	</v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { cartItems } from '@/store/modules/products';
import { CartItem } from '@/types/Product';

@Component
export default class Navbar extends Vue {
	private goToCartPage() {
		this.$router.push({ name: 'cart' });
	}

	get cartItems(): CartItem[] {
		return cartItems(this.$store)
	}

	private showLogin() {
		this.$emit('show-login');
	}

	private showUserSettings() {
		this.$emit('show-user-settings');
	}
}
</script>