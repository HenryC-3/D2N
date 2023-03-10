import { createRouter, createWebHashHistory } from "vue-router";
import AddBookPage from "./views/AddBookPage.vue";
import OpenBookPage from "./views/OpenBookPage.vue";
import ErrorPage from "./views/ErrorPage.vue";
import AuthPage from "./views/AuthPage.vue";
import { send } from "../message";

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
	try {
		send<"getAuthInfo">(
			{ type: "getAuthInfo" },
			{
				successAction: () => {
					return true;
				},
				failedAction: () => {
					router.push("/auth");
				},
			}
		);
	} catch (error) {
		return true;
	}
});
