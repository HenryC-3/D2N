<template>
	<div class="flex h-[40px] gap-1 items-center justify-between">
		<!-- Learn More -->
		<button class="flex items-center gap-1 pl-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				class="text-[#B5B4B3]"
			>
				<path
					fill="currentColor"
					d="M11 18h2v-2h-2v2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-14a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2a2 2 0 0 1 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5a4 4 0 0 0-4-4Z"
				/>
			</svg>
			<a
				href="https://github.com/HenryC-3/D2N.git"
				class="text-[12px] text-[#B5B4B3]"
				>Learn More</a
			>
		</button>
		<!-- Navigation button -->
		<button
			@click="goToConfigOrHome"
			:class="{ hidden: !showNavButton }"
			class="flex items-center justify-end w-[40px] pr-3"
		>
			<svg
				v-if="showHomeIcon"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				class="text-[#B5B4B3]"
			>
				<path
					fill="currentColor"
					d="M17.5 16.5v2q0 .2.15.35q.15.15.35.15q.2 0 .35-.15q.15-.15.15-.35v-2h2q.2 0 .35-.15q.15-.15.15-.35q0-.2-.15-.35q-.15-.15-.35-.15h-2v-2q0-.2-.15-.35Q18.2 13 18 13q-.2 0-.35.15q-.15.15-.15.35v2h-2q-.2 0-.35.15q-.15.15-.15.35q0 .2.15.35q.15.15.35.15ZM18 21q-2.075 0-3.537-1.462Q13 18.075 13 16q0-2.075 1.463-3.538Q15.925 11 18 11t3.538 1.462Q23 13.925 23 16q0 2.075-1.462 3.538Q20.075 21 18 21ZM6 19q-.825 0-1.412-.587Q4 17.825 4 17V8q0-.475.213-.9q.212-.425.587-.7l6-4.5q.525-.4 1.2-.4q.675 0 1.2.4l6 4.5q.375.275.588.7q.212.425.212.9v1.3q-.475-.15-.975-.225Q18.525 9 18 9V8l-6-4.5L6 8v9h5.075q.075.525.225 1.025q.15.5.375.975Zm6-8.75Z"
				/>
			</svg>
			<svg
				v-else
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 256 256"
				class="text-[#B5B4B3]"
			>
				<path
					fill="currentColor"
					d="M128 72a56 56 0 1 0 56 56a56 56 0 0 0-56-56Zm0 96a40 40 0 1 1 40-40a40 40 0 0 1-40 40Zm106.8-17.6l-14.9-19.8c.1-1.8 0-3.7 0-5.1l14.9-19.9a7.8 7.8 0 0 0 1.3-6.9a114.8 114.8 0 0 0-10.9-26.4a8.2 8.2 0 0 0-5.8-4l-24.5-3.5l-3.7-3.7l-3.5-24.5a8.2 8.2 0 0 0-4-5.8a114.8 114.8 0 0 0-26.4-10.9a7.8 7.8 0 0 0-6.9 1.3L130.6 36h-5.2l-19.8-14.8a7.8 7.8 0 0 0-6.9-1.3a114.8 114.8 0 0 0-26.4 10.9a8.2 8.2 0 0 0-4 5.8l-3.5 24.5l-3.7 3.7l-24.5 3.5a8.2 8.2 0 0 0-5.8 4a114.8 114.8 0 0 0-10.9 26.4a7.8 7.8 0 0 0 1.3 6.9l14.9 19.8v5.1l-14.9 19.9a7.8 7.8 0 0 0-1.3 6.9a114.8 114.8 0 0 0 10.9 26.4a8.2 8.2 0 0 0 5.8 4l24.5 3.5l3.7 3.7l3.5 24.5a8.2 8.2 0 0 0 4 5.8a114.8 114.8 0 0 0 26.4 10.9a7.6 7.6 0 0 0 2.1.3a7.7 7.7 0 0 0 4.8-1.6l19.8-14.8h5.2l19.8 14.8a7.8 7.8 0 0 0 6.9 1.3a114.8 114.8 0 0 0 26.4-10.9a8.2 8.2 0 0 0 4-5.8l3.5-24.6c1.2-1.2 2.6-2.5 3.6-3.6l24.6-3.5a8.2 8.2 0 0 0 5.8-4a114.8 114.8 0 0 0 10.9-26.4a7.8 7.8 0 0 0-1.3-6.9Zm-21.7 22l-23.3 3.3a8.3 8.3 0 0 0-4.7 2.5c-1.2 1.3-4.9 5.1-6.7 6.7a8 8 0 0 0-2.7 4.9l-3.3 23.3a88.6 88.6 0 0 1-15.6 6.5l-18.9-14.2a7.7 7.7 0 0 0-5.3-1.5h-9.2a7.7 7.7 0 0 0-5.3 1.5l-18.9 14.2a88.6 88.6 0 0 1-15.6-6.5l-3.3-23.3a8 8 0 0 0-2.7-4.9a66.5 66.5 0 0 1-6.5-6.5a8 8 0 0 0-4.9-2.7l-23.3-3.3a96.9 96.9 0 0 1-6.5-15.6l14.2-18.9a8.8 8.8 0 0 0 1.6-5c-.1-1.8-.2-7-.1-9.5a7.7 7.7 0 0 0-1.5-5.3L36.4 99.2a96.9 96.9 0 0 1 6.5-15.6l23.3-3.3a8 8 0 0 0 4.9-2.7a66.5 66.5 0 0 1 6.5-6.5a8 8 0 0 0 2.7-4.9l3.3-23.3a96.9 96.9 0 0 1 15.6-6.5l18.9 14.2a7.7 7.7 0 0 0 5.3 1.5c3-.1 6.2-.1 9.2 0a7.7 7.7 0 0 0 5.3-1.5l18.9-14.2a88.6 88.6 0 0 1 15.6 6.5l3.3 23.3a8 8 0 0 0 2.7 4.9a66.5 66.5 0 0 1 6.5 6.5a8 8 0 0 0 4.9 2.7l23.3 3.3a88.6 88.6 0 0 1 6.5 15.6l-14.2 18.9a8.8 8.8 0 0 0-1.6 5c.1 1.8.2 7 .1 9.5a7.7 7.7 0 0 0 1.5 5.3l14.2 18.9a88.6 88.6 0 0 1-6.5 15.6Z"
				/>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { send } from "../../message";
const route = useRoute();
const router = useRouter();
const path = computed(() => {
	return route.path;
});

const showHomeIcon = computed(() => {
	return route.path === "/auth";
});
const showNavButton = ref(false);

// show navigation button when auth info is invalid
onMounted(() => {
	send<"getAuthInfo">(
		{ type: "getAuthInfo" },
		{
			successAction: () => {
				showNavButton.value = true;
			},
		}
	);
});

// update navigation button visibility when route changed
watch(path, () => {
	send<"getAuthInfo">(
		{ type: "getAuthInfo" },
		{
			successAction: () => {
				showNavButton.value = true;
			},
		}
	);
});

const goToConfigOrHome = () => {
	if (path.value === "/auth") {
		router.push("/");
	} else {
		router.push("/auth");
	}
};
</script>

<style scoped></style>
