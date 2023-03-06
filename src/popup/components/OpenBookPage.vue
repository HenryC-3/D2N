<template>
	<div class="flex flex-col gap-3 items-center p-3">
		<!-- title -->
		<h1 class="text-blue-400 font-semibold">Success</h1>
		<!-- message -->
		<div
			class="w-[100%] text-sm bg-[#F7F7F5] border-2 p-2 border-blue-300 rounded-sm text-center"
		>
			This Book is saved to Notion
		</div>
		<!-- button -->
		<LoadingButton
			@click="openInNotion"
			button-text="Open In Notion"
			shortcut-text="Enter"
			class="pb-3 flex-col"
		></LoadingButton>
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
