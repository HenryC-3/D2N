import { BackgroundStore } from "../types/Message";

export const store: BackgroundStore = {};

export function createStore() {
	const store: BackgroundStore = {};

	return {
		updateStore,
		queryStore,
		getStore,
	};

	function updateStore(newStore: BackgroundStore) {
		Object.keys(newStore).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			store[key] = newStore[key];
		});
	}
	function queryStore(key: keyof BackgroundStore) {
		return store[key];
	}
	function getStore() {
		const str = JSON.stringify(store);
		return JSON.parse(str) as BackgroundStore;
	}
}
