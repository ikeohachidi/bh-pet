<template>
	<section>
		<v-container>
			<v-row>
				<v-col>
					<div class="logo">
						<v-img
							alt="Pet shop Logo"
							class="shrink mr-2"
							contain
							src="@/assets/logo-green.svg"
							transition="scale-transition"
							width="50"
						/>
						<p>petson.</p>
					</div>
				</v-col>
				<v-col>
					<ul>
						<li>Petson</li>
						<li>About us</li>
						<li>Blog</li>
						<li>Store Locator</li>
					</ul>
				</v-col>
				<v-col>
					<ul>
						<li>Contact</li>
						<li>contact@petson.com</li>
						<li>+384 000 000</li>
						<li>35 Shnauzer avenue, Dogville AL</li>
					</ul>
				</v-col>
				<v-col>
					<ul>
						<li>Information</li>
						<li>Ordering and shipping</li>
						<li>FAQ</li>
						<li>GDPR Statement</li>
					</ul>
				</v-col>
				<v-col>
					<p>If you can’t find answer to your question, please contact our <span class="link">customer service</span></p>
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
section {
	background-color: #EEF5F2;
	padding: 40px 0;
}

ul {
	list-style: none;
	color: rgba(0, 0, 0, 0.54);

	li {
		margin: 5px 0;
	}

	li:first-of-type {
		color: #000;
		font-size: 20px;
		font-weight: bold;
	}
}

.link {
	color: var(--color-blue);
}

.logo {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	color: var(--color-primary);
}
</style>