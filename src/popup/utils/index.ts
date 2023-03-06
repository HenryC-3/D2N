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
