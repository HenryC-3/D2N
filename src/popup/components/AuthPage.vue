<template>
	<div class="flex flex-col gap-3 p-3 justify-center">
		<div class="flex justify-center font-semibold text-lg">
			<!-- show database title -->
			<h1 v-if="databaseTitle" class="text-green-500">
				Books are stored in:
				<a
					@click="
						() => {
							openURLInNewTab(databaseURL);
						}
					"
					:href="databaseURL"
					class="text-[#4EAADC]"
					>{{ databaseTitle }}</a
				>
			</h1>
			<!-- show default title -->
			<h1 v-else-if="!errName">
				<span class="text-green-500">D</span
				><span class="text-[#4EAADC]">2</span><span>N </span>
				<span class="text-[#4EAADC]">ꔛꕤ</span>
			</h1>
			<!-- show error name -->
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
			:button-text="databaseTitle ? 'Update' : 'Save'"
			:loading="loadingStatus"
			shortcut-text="Ctrl + Enter"
			:shortcut-visibility="true"
			@click="handleClick"
		></LoadingButton>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LoadingButton from "./LoadingButton.vue";
import { useRouter } from "vue-router";
import { sendToBackground } from "../messages";
import { IndexDB } from "../../background/types";
import { openURLInNewTab } from "../utils";

const databaseID = ref<string>("");
const tokenSecret = ref<string>("");
const router = useRouter();

// UI state
const tokenSecretInput = ref<HTMLInputElement | null>();
const databaseIDInput = ref<HTMLInputElement | null>();
// UI: button
const loadingStatus = ref(false);
// UI: error
const errName = ref("");
const isErr = ref(false);
// UI: configure
const databaseTitle = ref("");
const databaseURL = ref("");

// get DB title, id, url and secret from indexDB
onMounted(() => {
	sendToBackground(
		{ getAuthInfo: true },
		{
			successAction: (res) => {
				const response = res as unknown as IndexDB;
				databaseID.value = response.databaseID;
				tokenSecret.value = response.tokenSecret;
				databaseTitle.value = response.databaseTitle;
				databaseURL.value = response.databaseURL;
			},
		}
	);
});

const handleClick = () => {
	// loading
	loadingStatus.value = true;
	// check if database exist
	sendToBackground(
		{
			checkAndSaveAuth: {
				tokenSecret: tokenSecret.value,
				databaseID: databaseID.value,
			},
		},
		{
			successAction: () => {
				loadingStatus.value = false;
				router.push("/");
			},
			failedAction: () => {
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
