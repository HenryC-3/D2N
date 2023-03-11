import { Action, ActionForOneTimeMessages } from "../types";
import { BackgroundResponse } from "../types/BackgroundResponse";
import { ExtensionRequest } from "../types/ExtensionRequest";

export function listenToMessage(actions: ActionForOneTimeMessages) {
	chrome.runtime.onMessage.addListener(
		(
			messageValue: ExtensionRequest,
			_,
			backgroundResponse: (msg: BackgroundResponse) => void
		) => {
			for (const actionKey in actions) {
				if (messageValue[actionKey as keyof ExtensionRequest]) {
					const data = messageValue[actionKey as keyof ExtensionRequest];
					const action = actions[
						actionKey as keyof ActionForOneTimeMessages
					] as Action<typeof data>;
					action(data, backgroundResponse);
				}
			}
			return true;
		}
	);
}
