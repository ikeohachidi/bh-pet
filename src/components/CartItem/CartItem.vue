<template>
	<section>
		<div class="d-flex">
			<div class="elevation-1 mr-4 rounded">
			</div>

			<div>
				<h2 class="text-h6 font-weight-regular">Brit Care</h2>
				<p>Animod</p>
				<h1 class="my-6 text-h5">200 kn</h1>

				<div class="d-flex">
					<div class="d-flex" style="width: 140px">
						<v-btn icon tile elevation="0">
							<v-icon>mdi-minus</v-icon>
						</v-btn>
						<v-text-field width="20px" dense outlined class="mx-3"></v-text-field>
						<v-btn icon tile elevation="0">
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</div>
					<v-btn color="warning" outlined class="ml-5">
						<v-icon>mdi-cart-off</v-icon>
						remove from cart
					</v-btn>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Product } from '@/types/Cart';

@Component
export default class CartItem extends Vue {
	@Prop({ default: () => ({}) }) item!: Product;
}
</script>

<style scoped>
.v-btn--icon {
	background-color:  #F4F6F5;
}
</style>