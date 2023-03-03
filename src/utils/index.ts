import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { BackgroundResponse } from "../types";
import { NotionClientError } from "@notionhq/client";

type SuccessAction = (input: PageObjectResponse) => void;
type FailedAction = (input: NotionClientError) => void;

export const addBookToNotion = (
	successAction?: SuccessAction,
	failedAction?: FailedAction
) => {
	chrome.runtime.sendMessage({ triggered: true }, (res: BackgroundResponse) => {
		if (res.success && res.data && successAction) {
			successAction(res.data);
		}
		if (res.error && failedAction) {
			failedAction(res.error);
		}
	});
};
