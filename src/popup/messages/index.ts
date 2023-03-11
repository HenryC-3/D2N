import { BackgroundResponse } from "../../types/BackgroundResponse";
import { ExtensionRequest } from "../../types/ExtensionRequest";

type SuccessAction = (input: NonNullable<BackgroundResponse["data"]>) => void;
type FailedAction = (input: NonNullable<BackgroundResponse["error"]>) => void;

export function sendToBackground(
	input: ExtensionRequest,
	actions: { successAction?: SuccessAction; failedAction?: FailedAction } = {}
) {
	chrome.runtime.sendMessage<ExtensionRequest, BackgroundResponse>(
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
