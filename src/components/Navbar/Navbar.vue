<template>
	<nav>
		<ul>
			<li id="logo">
				<img src="@/assets/logo.svg" alt="Logo">
				petson.
			</li>

			<li class="ml-auto">Products</li>
			<li>Promotions</li>
			<li class="mr-auto">Blog</li>

			<li class="action-btn">
				<i class="ri-shopping-cart-2-fill"></i>
				Cart
			</li>
			<li class="action-btn">Logout</li>
		</ul>
	</nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {

}
</script>

<style lang="scss" scoped>
#logo {
	display: flex;
	align-items: center;
}

nav {
	display: flex;
	padding: 10px 0;
	background-color: var(--color-primary);
	color: #fff;
}

ul {
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
	list-style: none;

	li {
		padding: 10px 20px;
		
		&.action-btn {
			border: 1px solid white;
			border-radius: 6px;
		}
	}
}
</style>