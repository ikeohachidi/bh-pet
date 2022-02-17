<template>
	<v-card class="pa-5">
		<div class="product">
			<div class="product-img-wrapper">
				<img :src="`${api}/file/${product.metadata.image}`" :alt="product.title">
			</div>
			<h6 class="text-h6" :title="product.title">{{ product.title }}</h6>
			<p class="text-capitalize">{{ product.brand.title }}</p>

			<h6 class="text-h6">{{ product.price }} Kn</h6>
			<slot name="bottom"></slot>
		</div>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Product from '@/types/Product';

@Component
export default class ProductCard extends Vue {
	@Prop({ default: () => ({})}) product!: Product;
	
	private api = process.env.VUE_APP_API;
}
</script>

<style lang="scss" scoped>
.product {
	h6 {
		white-space: nowrap;
		width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.product-img-wrapper {
	display: flex;
	align-items: center;	
	justify-content: center;
	height: 150px;
	width: 100%;

	img {
		width: 90%;
		height: 100%;
		object-fit: scale-down;
		object-position: center;
	}
}
</style>