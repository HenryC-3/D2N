<template>
	<div class="flex flex-col gap-3 items-center p-3">
		<!-- title -->
		<h1 class="text-red-400 font-semibold text-lg">Error {{ errName }}</h1>
		<!-- message -->
		<div
			:class="{ hidden: !errMessage }"
			class="w-[100%] text-sm bg-[#F7F7F5] border-2 p-2 border-red-300 rounded-sm text-center"
		>
			{{ errMessage }}
		</div>
		<!-- button -->
		<LoadingButton
			@click="handleClick"
			button-text="Try Again"
			shortcut-text="Enter"
			:shortcutTextVisibility="false"
			:loading="loadingStatus"
		></LoadingButton>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { watch, ref } from "vue";
import LoadingButton from "./LoadingButton.vue";
import { sendToBackground } from "../messages";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ExtensionError } from "../../types";

const router = useRouter();
const route = useRoute();
const errName = ref(route.query.data);
const errMessage = ref(route.query.message);
const loadingStatus = ref<boolean>(false);

watch(
	() => route.query.data,
	(newValue) => {
		errName.value = newValue;
	}
);

const handleClick = () => {
	loadingStatus.value = true;
	setTimeout(() => {
		sendToBackground(
			{ saveBookToNotion: true },
			{
				successAction: (res) => {
					router.push({
						path: "/open",
						query: { data: (res as PageObjectResponse).url },
					});
				},
				failedAction: (err) => {
					loadingStatus.value = false;
					errName.value = getErrorMessage(err).name;
				},
			}
		);
	}, 1000);

	function getErrorMessage(error: ExtensionError) {
		return {
			name: error.name,
			message:
				error.name === "ContentScriptError"
					? error.message
					: "Sorry, D2N fails to save the book to Notion at this time. Please try again later or click learn more if the issue persists.",
		};
	}
};
</script>

<style scoped></style>
