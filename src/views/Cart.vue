<template>
	<section>
		<v-container>
			<v-row class="mt-15">
				<v-col cols="4" class="mx-auto">
					<h1 class="text-h2 mb-15">Your Cart</h1>

					<cart-item class="my-5"/>

					<v-btn width="100%" color="primary" to="checkout">proceed to checkout</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CartItem from '@/components/CartItem/CartItem.vue';

@Component({
	components: {
		CartItem
	}
})
export default class Cart extends Vue {}
</script>

<style scoped>
h1 {
	color: var(--color-primary);
	font-weight: normal;
}
</style>