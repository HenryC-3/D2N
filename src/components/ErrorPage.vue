<template>
	<div class="flex flex-col gap-3 h-[100%] justify-center items-center">
		<div class="text-lg font-semibold text-red-500">{{ code }}</div>
		<div>
			<p class="text-sm">Hmm...something's not right 🤔</p>
		</div>
		<div>
			<button
				@click="handleClick"
				class="rounded bg-[#4EAADC] text-sm text-white px-3 py-1"
			>
				<div>Try Again</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { addBookToNotion } from "../utils/index";
import { watch, ref } from "vue";

const router = useRouter();
const route = useRoute();
const code = ref(route.query.data);

watch(
	() => route.query.data,
	(newValue) => {
		code.value = newValue;
	}
);
const handleClick = () => {
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
