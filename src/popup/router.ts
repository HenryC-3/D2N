import { createRouter, createWebHashHistory } from "vue-router";
import AddBookPage from "./components/AddBookPage.vue";
import OpenBookPage from "./components/OpenBookPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import AuthPage from "./components/AuthPage.vue";

const routes = [
	{ path: "/", component: AddBookPage },
	{ path: "/open", component: OpenBookPage },
	{ path: "/error", component: ErrorPage },
	{ path: "/Auth", component: AuthPage },
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
