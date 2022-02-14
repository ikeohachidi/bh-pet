<template>
	<section>
		<v-chip 
			v-for="period in timePeriod"
			:key="period"
			class="mx-2 text-capitalize"
			@click="changeActiveChip"
			:color="value.toLowerCase() === period ? 'blue' : ''"
		>{{ period }}</v-chip>
	</section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type Period = 'today' | 'monthly' | 'yearly';

@Component
export default class PeriodChips extends Vue {
	@Prop({ default: 'today' }) value!: string; 

	private timePeriod: Period[] = ['today', 'monthly', 'yearly'];

	private changeActiveChip(item: Period) {
		this.$emit('input', item);
	}
}
</script>

<style scoped>
</style>