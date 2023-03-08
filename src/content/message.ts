import { BackgroundResponse } from "../types";
import { OneTimeMessage } from "../types";
import { getBookInfo } from "./actions/getBookInfo";
import { createButton } from "./actions/createButton";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function sendBookToBackground() {
	const book = getBookInfo();
	chrome.runtime.sendMessage<OneTimeMessage>({ storeBook: book });
}

export function createNotionButton() {
	const isbn = getBookInfo().ISBN;
	chrome.runtime.sendMessage<OneTimeMessage>(
		{ getBookLink: isbn },
		(res: BackgroundResponse) => {
			if (res.data) {
				createButton((res.data as PageObjectResponse).url);
			}
		}
	);
}
