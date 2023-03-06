<template>
	<div
		ref="buttonRef"
		:class="{
			'cursor-not-allowed gap-0': loading, // remove gap on loading
			'gap-2': !loading, // add gap
			'gap-0': !Boolean(shortcutText), // remove gap when shortcutText is empty
		}"
		class="flex items-center"
	>
		<button
			:class="{ 'pointer-events-none': loading }"
			class="min-w-[94px] rounded bg-[#4EAADC] text-sm text-white px-3 py-1 flex justify-center items-center"
		>
			<div v-if="!loading">{{ buttonText }}</div>
			<div v-if="loading">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
						opacity=".5"
					/>
					<path
						fill="currentColor"
						d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
					>
						<animateTransform
							attributeName="transform"
							dur="1s"
							from="0 12 12"
							repeatCount="indefinite"
							to="360 12 12"
							type="rotate"
						/>
					</path>
				</svg>
			</div>
		</button>
		<span :class="{ hidden: invisible }" class="text-[#B5B4B3] text-xs">{{
			shortcutText
		}}</span>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps<{
	buttonText: string;
	shortcutText?: "Enter" | "Ctrl + Enter";
	shortcutVisibility?: boolean;
	loading?: boolean;
}>();

const invisible = computed(() => {
	if (props.shortcutVisibility && props.loading) {
		return true;
	}
	if (props.shortcutVisibility && !props.loading) {
		return false;
	}
	return true;
});

const buttonRef = ref<HTMLDivElement | null>(null);
onMounted(() => {
	document.addEventListener("keyup", (e) => {
		if (e.code === "Enter" && props.shortcutText === "Enter") {
			buttonRef.value?.click();
		}

		if (
			e.ctrlKey &&
			e.code === "Enter" &&
			props.shortcutText === "Ctrl + Enter"
		) {
			buttonRef.value?.click();
		}
	});
});
</script>

<style scoped></style>
