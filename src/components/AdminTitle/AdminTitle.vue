<template>
	<div class="title py-4">
		<h1 class="font-weight-bold text-h6">{{ pageTitle }}</h1>

		<div class="d-flex">
			<slot name="append"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AdminTitle extends Vue {
	get pageTitle(): string {
		return this.$route.meta?.title;
	}
}
</script>

<style scoped>
.title {
	display: flex;
	justify-content: space-between;
	width: 100;
	border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	margin-bottom: 10px;
}
</style>