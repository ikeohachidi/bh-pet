<template>
	<v-container>
		<v-row>
			<v-col cols="4" class="mx-auto">
				<router-link to="/dog-food" class="category text-h2">Dry dog food</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CategoryListing extends Vue {}
</script>

<style scoped>
.category {
	text-decoration: none;
}
</style>