import { BackgroundResponse, OneTimeMessage } from "../../types";

type SuccessAction = (input: NonNullable<BackgroundResponse["data"]>) => void;
type FailedAction = (input: NonNullable<BackgroundResponse["error"]>) => void;

export function sendToBackground(
	input: OneTimeMessage,
	actions: { successAction?: SuccessAction; failedAction?: FailedAction } = {}
) {
	chrome.runtime.sendMessage<OneTimeMessage, BackgroundResponse>(
		input,
		(res) => {
			if (res.data && actions.successAction) {
				actions.successAction(res.data);
			}
			if (res.error && actions.failedAction) {
				const err = res.error;
				actions.failedAction(err);
			}
		}
	);
}
