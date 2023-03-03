<template>
	<div
		class="relative flex h-[100%] flex-col box-border p-3 justify-center items-center"
	>
		<button
			@click="openInNotion"
			class="rounded bg-[#4EAADC] text-sm text-white px-3 py-1"
		>
			Open in Notion
		</button>
		<span class="h-0 relative top-2 text-[#B5B4B3]">Enter</span>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const openInNotion = () => {
	// eslint-disable-next-line no-undef
	chrome.tabs.create({ url: route.query.data as string });
};
</script>

<style scoped></style>
