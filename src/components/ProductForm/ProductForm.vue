<template>
	<section>
		<v-dialog v-model="show" @click:outside="close">
			<v-card class="mx-auto pa-7" width="1200px" height="600">
				<div></div>

				<div class="d-flex justify-space-between">
					<h3>Product Name</h3>
					<v-btn depressed>Delete Product</v-btn>
				</div>

				<div class="form-body">
					<div>
						<h4>Product Image</h4>
						<div class="product-image"></div>
					</div>
					<div>
						<v-row>
							<v-col cols="3">
								<v-text-field label="Brand name" outlined></v-text-field>
							</v-col>
							<v-col cols="3">
								<v-text-field label="Product name" outlined></v-text-field>
							</v-col>
							<v-col cols="3">
								<v-text-field label="Category" outlined></v-text-field>
							</v-col>
							<v-col cols="3">
								<v-text-field label="Price" outlined>
									<template #append>
										Kn
									</template>
								</v-text-field>
							</v-col>
						</v-row>
						<v-textarea no-resize rows="12" outlined label="Description"></v-textarea>

						<div class="d-flex justify-end">
							<v-btn depressed color="primary">save changes</v-btn>
						</div>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ProductForm extends Vue {
	@Prop({ default: false }) show!: boolean;

	private close() {
		this.$emit('close');
	}
}
</script>

<style lang="scss" scoped>
.form-body {
	display: grid;
	margin-top: 20px;
	grid-template-columns: repeat(12, 1fr);
	gap: 3em;

	> div:first-of-type {
		grid-column: 1 / 4;
	}

	> div:last-of-type {
		grid-column: 4 / 13;
	}
}
</style>