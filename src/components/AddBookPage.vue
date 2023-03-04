<template>
	<div class="flex h-[100%] flex-col box-border p-3 gap-3">
		<textarea
			v-model="bookTitle"
			type="text"
			rows="3"
			placeholder="Enter the title of the book"
			class="resize-none flex-1 rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<loading-button
			@click="handleClick"
			buttonText="Save Book"
			shortcutText="Enter"
			:loading="loadingStatus"
		></loading-button>
	</div>
</template>

<script setup lang="ts">
import LoadingButton from "./LoadingButton.vue";
import { useRouter } from "vue-router";
import { addBookToNotion } from "../utils/index";
import { ref } from "vue";

const router = useRouter();
const loadingStatus = ref<boolean>(false);

const bookTitle = "";
const handleClick = () => {
	loadingStatus.value = true;
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
