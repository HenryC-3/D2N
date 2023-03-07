import { BackgroundResponse } from "../types";
import { OneTimeMessage } from "../types";
import { getBookInfo } from "./actions/getBookInfo";
import { createButton } from "./actions/createButton";

export function sendBookToBackground() {
	const book = getBookInfo();
	chrome.runtime.sendMessage<OneTimeMessage>({ storeBook: book });
}

export function createNotionButton() {
	const isbn = getBookInfo().ISBN;
	chrome.runtime.sendMessage<OneTimeMessage>(
		{ getBookLink: isbn },
		(res: BackgroundResponse) => {
			if (res.success && res.data) {
				createButton(res.data.url);
			}
		}
	);
}
