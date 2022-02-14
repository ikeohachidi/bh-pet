<template>
	<section>
		<v-container>
			<v-row>
				<v-col cols="4" class="mx-auto mt-6">
					<v-text-field 
						label="Search Products"
						outlined
					></v-text-field>

					<router-link to="/shop/dog-food" class="category text-h2">Dry dog food</router-link>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>

<style scoped>
</style>