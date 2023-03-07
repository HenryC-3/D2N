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
import { addBookToNotion, getErrorMessage } from "../utils/index";
import { watch, ref } from "vue";
import LoadingButton from "./LoadingButton.vue";

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
		addBookToNotion(
			(res) => {
				router.push({ path: "/open", query: { data: res.url } });
			},
			(err) => {
				loadingStatus.value = false;
				errName.value = getErrorMessage(err).name;
			}
		);
	}, 1000);
};
</script>

<style scoped></style>
