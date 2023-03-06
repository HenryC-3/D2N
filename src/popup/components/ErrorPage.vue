<template>
	<div class="flex flex-col gap-3 h-[100%] justify-center items-center">
		<div class="text-lg font-semibold text-red-500">{{ code }}</div>
		<div>
			<p class="text-sm">Hmm...something's not right 🤔</p>
		</div>
		<loading-button
			@click="handleClick"
			buttonText="Try Again"
			:loading="loadingStatus"
		></loading-button>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { addBookToNotion, getErrorMessage } from "../utils/index";
import { watch, ref } from "vue";
import LoadingButton from "./LoadingButton.vue";

const router = useRouter();
const route = useRoute();
const code = ref(route.query.data);
const loadingStatus = ref<boolean>(false);

watch(
	() => route.query.data,
	(newValue) => {
		code.value = newValue;
	}
);

const handleClick = () => {
	loadingStatus.value = true;
	addBookToNotion(
		(res) => {
			router.push({ path: "/open", query: { data: res.url } });
		},
		(err) => {
			loadingStatus.value = false;
			code.value = getErrorMessage(err).name;
		}
	);
};
</script>

<style scoped></style>
