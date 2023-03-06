import { BackgroundResponse, OneTimeMessage } from "../types";
import { ActionForOneTimeMessages, Action } from "./types";

export function listenToMessage(actions: ActionForOneTimeMessages) {
	chrome.runtime.onMessage.addListener(
		(
			messageValue: OneTimeMessage,
			_,
			backgroundResponse: (msg: BackgroundResponse) => void
		) => {
			for (const actionKey in actions) {
				if (messageValue[actionKey as keyof OneTimeMessage]) {
					const data = messageValue[actionKey as keyof OneTimeMessage];
					const action = actions[
						actionKey as keyof ActionForOneTimeMessages
					] as Action;
					//
					action(data, backgroundResponse);
				}
			}
			return true;
		}
	);
}
