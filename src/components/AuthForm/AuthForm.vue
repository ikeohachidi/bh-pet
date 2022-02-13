<template>
	<v-card max-width="500" elevation="0" class="mx-auto pa-7">
		<div></div>
		<div class="logo">
			<img src="@/assets/logo.svg" alt="Logo">
			<p>petson.</p>
		</div>

		<slot></slot>

		<p class="footer mt-5 mb-0 d-flex">
			<slot name="footer"></slot>
		</p>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class AuthForm extends Vue {
}
</script>

<style lang="scss" scoped>
.logo {
	background-color: var(--color-primary);
	border-radius: 9999px;
	height: 80px;
	width: 80px;
	color: white;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	p {
		margin-bottom: 0;
	}
}

.footer {
	display: flex;
	justify-content: space-between;
	cursor: pointer;
}

h2 {
	font-weight: normal;
}
</style>