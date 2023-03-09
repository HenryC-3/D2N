<template>
	<div class="flex flex-col gap-3 items-center p-3">
		<!-- title -->
		<h1 class="text-[#4EAADC] font-semibold text-lg">Success</h1>
		<!-- message -->
		<div
			class="w-[100%] min-h-[76px] text-sm bg-[#F7F7F5] border-2 p-2 border-blue-300 rounded-sm flex items-center justify-center"
		>
			<div>This Book is saved to Notion</div>
		</div>
		<!-- button -->
		<LoadingButton
			@click="openInNotion"
			button-text="Open In Notion"
			shortcut-text="Enter"
			class="flex-col"
		></LoadingButton>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import LoadingButton from "../components/LoadingButton.vue";

const route = useRoute();
const openInNotion = () => {
	// eslint-disable-next-line no-undef
	chrome.tabs.create({ url: route.query.data as string });
};
</script>

<style scoped></style>
