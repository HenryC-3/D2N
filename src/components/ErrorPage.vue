<template>
	<div class="flex flex-col gap-3 h-[100%] justify-center items-center">
		<div class="text-lg font-semibold text-red-500">{{ status }}</div>
		<div>
			<p class="text-sm">Hmm...something's not right 🤔</p>
		</div>
		<div>
			<button
				@click="saveBook"
				class="rounded bg-[#4EAADC] text-sm text-white px-3 py-1"
			>
				<div>Try Again</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const status = `${route.query.data}`;
// TODO: finish saveBook
const saveBook = () => {
	console.log("book saved");
};
</script>

<style scoped></style>
