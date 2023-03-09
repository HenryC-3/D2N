<template>
	<div class="flex h-[100%] flex-col box-border p-3 gap-3">
		<textarea
			ref="textareaRef"
			v-model="bookNote"
			type="text"
			rows="3"
			placeholder="Capture your thoughts"
			class="resize-none flex-1 rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<loading-button
			@click="handleClick"
			buttonText="Save Book"
			shortcutText="Ctrl + Enter"
			:shortcutVisibility="true"
			:loading="loadingStatus"
		></loading-button>
	</div>
</template>

<script setup lang="ts">
import LoadingButton from "../components/LoadingButton.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { sendToBackground } from "../messages";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const router = useRouter();
const loadingStatus = ref<boolean>(false);
const bookNote = ref("");
const textareaRef = ref<HTMLElement | null>(null);

onMounted(() => {
	textareaRef.value?.focus();
});

const handleClick = () => {
	// change loading status
	loadingStatus.value = true;
	sendToBackground({ storeNote: bookNote.value });
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
				router.push({
					path: "/error",
					query: { data: err.name, message: err.message },
				});
			},
		}
	);
};
</script>

<style scoped></style>
