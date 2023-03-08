<script setup lang="ts">
import { RouterView } from "vue-router";
import GlobalBottom from "./components/GlobalBottom.vue";
</script>

<template>
	<!--popup -->
	<div class="flex flex-col w-[300px] rounded-md">
		<!-- content -->
		<router-view
			class="min-h-[144px] border-b-2 border-b-[#F6F6F5]"
		></router-view>

		<!-- bottom -->
		<GlobalBottom></GlobalBottom>
	</div>
</template>
