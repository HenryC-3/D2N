import { createRouter, createWebHashHistory } from "vue-router";
import AddBookPage from "./components/AddBookPage.vue";
import OpenBookPage from "./components/OpenBookPage.vue";
import ErrorPage from "./components/ErrorPage.vue";

const routes = [
	{ path: "/", component: AddBookPage },
	{ path: "/open", component: OpenBookPage },
	{ path: "/error", component: ErrorPage },
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
