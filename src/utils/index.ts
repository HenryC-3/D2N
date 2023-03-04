import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BackgroundResponse, InternalMessage } from "../types";
import { NotionClientError } from "@notionhq/client";

type SuccessAction = (input: PageObjectResponse) => void;
type FailedAction = (input: NotionClientError) => void;

export function addBookToNotion(
	successAction?: SuccessAction,
	failedAction?: FailedAction
) {
	chrome.runtime.sendMessage<InternalMessage, BackgroundResponse>(
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
