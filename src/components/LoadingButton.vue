<template>
	<div
		:class="{ 'cursor-not-allowed': loading }"
		class="flex gap-3 items-center"
	>
		<button
			:class="{ 'pointer-events-none': loading }"
			class="rounded bg-[#4EAADC] text-sm text-white px-3 py-1"
		>
			<div v-if="!loading">{{ buttonText }}</div>
			<div v-if="loading">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
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
		<span :class="{ hidden: loading }" class="text-[#B5B4B3] text-sm">{{
			shortcutText
		}}</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	buttonText: string;
	shortcutText?: string;
	loading?: boolean;
}>();
</script>

<style scoped></style>
