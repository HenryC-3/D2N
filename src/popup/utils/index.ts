import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BackgroundResponse, OneTimeMessage } from "../types";
import { NotionClientError } from "@notionhq/client";

type SuccessAction = (input: PageObjectResponse) => void;
type FailedAction = (input: NotionClientError) => void;

export function addBookToNotion(
	successAction?: SuccessAction,
	failedAction?: FailedAction
) {
	chrome.runtime.sendMessage<OneTimeMessage, BackgroundResponse>(
		{ triggered: true },
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

export function changeNote(note: string) {
	chrome.runtime.sendMessage({ note });
}