<template>
	<div class="flex h-[100%] flex-col box-border p-3 gap-3">
		<textarea
			v-model="bookTitle"
			type="text"
			rows="3"
			placeholder="Enter the title of the book"
			class="resize-none flex-1 rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<div class="flex gap-3 items-center">
			<button
				@click="saveBook"
				class="rounded bg-[#4EAADC] text-sm text-white px-3 py-1"
			>
				<div>Save Book</div>
			</button>
			<span class="text-[#B5B4B3]">Enter</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { BackgroundRes } from "../types";

const router = useRouter();

const bookTitle = "";
const saveBook = () => {
	// TODO: fix eslint warning
	// eslint-disable-next-line no-undef
	chrome.runtime.sendMessage({ triggered: true }, (res: BackgroundRes) => {
		if (res.success) {
			router.push("/open");
		}
		if (res.error) {
			router.push({
				path: "/error",
				query: { data: res.error.name },
			});
		}
	});
};
</script>

<style scoped></style>
