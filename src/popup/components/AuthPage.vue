<template>
	<div class="flex flex-col gap-3 p-3 justify-center">
		<div class="flex justify-center">
			<h1 v-if="!errName" class="font-semibold text-lg">
				<span class="text-green-500">D</span
				><span class="text-[#4EAADC]">2</span><span>N </span>
				<span class="text-[#4EAADC]">ꔛꕤ</span>
			</h1>
			<h1 v-else class="text-red-400 font-semibold text-lg">
				{{ errName }}
			</h1>
		</div>
		<!-- Auth token -->
		<input
			type="text"
			placeholder="Token Secret"
			v-model="tokenSecret"
			:class="{ 'border-red-300': isErr }"
			ref="tokenSecretInput"
			class="rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<!-- Database ID -->
		<input
			type="text"
			placeholder="Database ID"
			v-model="databaseID"
			:class="{ 'border-red-300': isErr }"
			ref="databaseIDInput"
			class="rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<LoadingButton
			button-text="Save"
			:loading="loadingStatus"
			shortcut-text="Ctrl + Enter"
			:shortcut-visibility="true"
			@click="handleClick"
		></LoadingButton>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoadingButton from "./LoadingButton.vue";
import { checkAndSaveAuth } from "../utils";
import { useRouter } from "vue-router";

const databaseID = ref<string>("");
const tokenSecret = ref<string>("");
const router = useRouter();

// UI state
const loadingStatus = ref(false);
const errName = ref("");
const isErr = ref(false);
const tokenSecretInput = ref<HTMLInputElement | null>();
const databaseIDInput = ref<HTMLInputElement | null>();

const handleClick = () => {
	// loading
	loadingStatus.value = true;
	// check if database exist
	checkAndSaveAuth(
		{
			tokenSecret: tokenSecret.value,
			databaseID: databaseID.value,
		},
		{
			successAction: () => {
				loadingStatus.value = false;
				router.push("/save");
			},
			failedAction: (err) => {
				loadingStatus.value = false;
				errName.value = "(⑉꒦ິ^꒦ິ⑉)";
				isErr.value = true;
				setTimeout(() => {
					isErr.value = false;
				}, 2000);
				tokenSecretInput.value?.blur();
				databaseIDInput.value?.blur();
			},
		}
	);
};
</script>

<style scoped></style>
