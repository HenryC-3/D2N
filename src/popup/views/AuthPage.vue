<template>
	<div class="flex flex-col gap-3 p-3 justify-center">
		<div class="flex justify-center font-semibold text-lg">
			<!-- database name as title -->
			<h1 v-if="titleStyle === 'dbInfo'" class="text-green-500">
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
			<!-- default name as title -->
			<h1 v-if="titleStyle === 'default'">
				<span class="text-green-500">D</span
				><span class="text-[#4EAADC]">2</span><span>N </span>
				<span class="text-[#4EAADC]">ꔛꕤ</span>
			</h1>
			<!-- error name in title -->
			<h1
				v-if="titleStyle === 'errMsg'"
				class="text-red-400 font-semibold text-lg"
			>
				{{ errName }}
			</h1>
		</div>
		<!-- Auth token -->
		<input
			type="text"
			placeholder="Token Secret"
			v-model="tokenSecret"
			:class="{ 'border-red-300': inputOnError }"
			ref="tokenSecretInput"
			class="rounded-sm bg-[#F7F7F5] text-sm border-2 p-2 focus:border-blue-300 focus:outline-none"
		/>
		<!-- Database ID -->
		<input
			type="text"
			placeholder="Database ID"
			v-model="databaseID"
			:class="{ 'border-red-300': inputOnError }"
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
import LoadingButton from "../components/LoadingButton.vue";
import { useRouter } from "vue-router";
import { send } from "../../message";
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
const inputOnError = ref(false);
// UI: configure
const databaseTitle = ref("");
const databaseURL = ref("");
// UI: title
const titleStyle = ref<"default" | "dbInfo" | "errMsg">("default");

// get DB title, id, url and secret from indexDB
onMounted(() => {
	send<"getAuthInfo">(
		{ type: "getAuthInfo" },
		{
			successAction: (res) => {
				titleStyle.value = "dbInfo";

				databaseID.value = res.databaseID;
				tokenSecret.value = res.tokenSecret;
				databaseTitle.value = res.databaseTitle;
				databaseURL.value = res.databaseURL;
			},
		}
	);
});

const handleClick = () => {
	// loading
	loadingStatus.value = true;
	// check if database exist
	send<"checkAndSaveAuth">(
		{
			type: "checkAndSaveAuth",
			data: { tokenSecret: tokenSecret.value, databaseID: databaseID.value },
		},
		{
			successAction: () => {
				loadingStatus.value = false;
				router.push("/");
			},
			failedAction: (err) => {
				// change button style
				loadingStatus.value = false;

				// change title style
				titleStyle.value = "errMsg";
				errName.value = "(⑉꒦ິ^꒦ິ⑉)";

				// change input style
				inputOnError.value = true;
				setTimeout(() => {
					inputOnError.value = false;
				}, 2000);

				tokenSecretInput.value?.blur();
				databaseIDInput.value?.blur();
			},
		}
	);
};
</script>

<style scoped></style>
