import { createRouter, createWebHashHistory } from "vue-router";
import AddBookPage from "./components/AddBookPage.vue";
import OpenBookPage from "./components/OpenBookPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import AuthPage from "./components/AuthPage.vue";
import { sendToBackground } from "./messages";

const routes = [
	{ path: "/", component: AddBookPage },
	{ path: "/open", component: OpenBookPage },
	{ path: "/error", component: ErrorPage },
	{ path: "/auth", component: AuthPage },
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(() => {
	sendToBackground(
		{ checkAuthInfoExist: true },
		{
			successAction: () => {
				return true;
			},
			failedAction: () => {
				router.push("/auth");
			},
		}
	);
});
