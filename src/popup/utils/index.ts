import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type {
	BackgroundResponse,
	ExtensionError,
	OneTimeMessage,
} from "../../types";

type SuccessAction = (input: PageObjectResponse) => void;
type FailedAction = (input: ExtensionError) => void;

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
