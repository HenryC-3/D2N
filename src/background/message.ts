import {
	Actions,
	ExtensionRequest,
	BackgroundResponse,
} from "../types/Message";

export function listenToMessage(actions: Actions) {
	chrome.runtime.onMessage.addListener(
		(
			messageValue: ExtensionRequest,
			_,
			backgroundResponse: (response: BackgroundResponse) => void
		) => {
			for (const actionKey in actions) {
				if (messageValue["type"] === actionKey) {
					const data = messageValue.data;
					const action = actions[actionKey];
					// TODO
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					action(data, backgroundResponse);
				}
			}
			return true;
		}
	);
}
