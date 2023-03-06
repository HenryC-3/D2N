<template>
	<div
		class="relative flex h-[100%] flex-col box-border p-3 justify-center items-center"
	>
		<loading-button
			@click="openInNotion"
			buttonText="Open Notion"
			:loading="false"
			shortcut-text="Enter"
			class="flex-col"
		></loading-button>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import LoadingButton from "./LoadingButton.vue";

const route = useRoute();
const openInNotion = () => {
	// eslint-disable-next-line no-undef
	chrome.tabs.create({ url: route.query.data as string });
};
</script>

<style scoped></style>
