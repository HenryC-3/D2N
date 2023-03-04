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
			:loading="loadingStatus"
		></loading-button>
	</div>
</template>

<script setup lang="ts">
import LoadingButton from "./LoadingButton.vue";
import { useRouter } from "vue-router";
import { addBookToNotion, changeNote as addNote } from "../utils/index";
import { onMounted, ref } from "vue";

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

	// NOTE: 接下来调用的函数的顺序很重要，否则会导致发送失败
	// 原因在于，下方的每个函数都会向 background script 发送一条信息，background script 每次只能接收一条信息，详见 ./src/background.ts
	addNote(bookNote.value);
	addBookToNotion(
		(res) => {
			router.push({ path: "/open", query: { data: res.url } });
		},
		(err) => {
			router.push({ path: "/error", query: { data: err.name } });
		}
	);
};
</script>

<style scoped></style>
