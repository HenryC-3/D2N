import type {
	BackgroundResponse,
	ExtensionError,
	OneTimeMessage,
} from "../../types";

type SuccessAction = (input: NonNullable<BackgroundResponse["data"]>) => void;
type FailedAction = (input: NonNullable<BackgroundResponse["error"]>) => void;

export function addBookToNotion(
	successAction?: SuccessAction,
	failedAction?: FailedAction
) {
	chrome.runtime.sendMessage<OneTimeMessage, BackgroundResponse>(
		{ saveBookToNotion: true },
		(res) => {
			if (res.success && res.data && successAction) {
				successAction(res.data);
			}
			if (res.error && failedAction) {
				failedAction(res.error);
			}
		}
	);
}

export function changeNote(note: OneTimeMessage["storeNote"]) {
	chrome.runtime.sendMessage({ storeNote: note } as OneTimeMessage);
}

export function getErrorMessage(error: ExtensionError) {
	return {
		name: error.name,
		message:
			error.name === "ContentScriptError"
				? error.message
				: "Sorry, D2N fails to save the book to Notion at this time. Please try again later or click learn more if the issue persists.",
	};
}

export function checkAndSaveAuth(
	input: OneTimeMessage["checkAndSaveAuth"],
	actions: { successAction?: SuccessAction; failedAction?: FailedAction } = {}
) {
	chrome.runtime.sendMessage<OneTimeMessage, BackgroundResponse>(
		{ checkAndSaveAuth: input },
		(res) => {
			if (res.success && res.data && actions.successAction) {
				actions.successAction(res.data);
			}
			if (!res.success && res.error && actions.failedAction) {
				const err = res.error;
				actions.failedAction(err);
			}
		}
	);
}
