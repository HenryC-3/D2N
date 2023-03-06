<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<!--popup -->
	<div class="flex flex-col w-[300px] rounded-md">
		<!-- content -->
		<router-view
			class="min-h-[144px] border-b-2 border-b-[#F6F6F5]"
		></router-view>

		<!-- bottom -->
		<div class="flex h-[40px] gap-1 px-3 items-center">
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
			<!-- TODO: add link to the article -->
			<a href="" class="text-[12px] text-[#72716D]">Learn More</a>
		</div>
	</div>
</template>
