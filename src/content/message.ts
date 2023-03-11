import { BackgroundResponse } from "../types/BackgroundResponse";
import { ExtensionRequest } from "../types/ExtensionRequest";
import { getBookInfo } from "./actions/getBookInfo";
import { createButton } from "./actions/createButton";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function sendBookToBackground() {
	const book = getBookInfo();
	chrome.runtime.sendMessage<ExtensionRequest>({ storeBook: book });
}

export function createNotionButton() {
	const isbn = getBookInfo().ISBN;
	chrome.runtime.sendMessage<ExtensionRequest>(
		{ getBookLink: isbn },
		(res: BackgroundResponse) => {
			if (res.data) {
				createButton((res.data as PageObjectResponse).url);
			}
		}
	);
}
