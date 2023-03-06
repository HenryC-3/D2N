import { store } from "./store";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BackgroundResponse, Book, OneTimeMessage } from "../types";
import { NotionClientError } from "@notionhq/client";
import { addBook } from "./action";

chrome.runtime.onMessage.addListener(
	(message: OneTimeMessage, _, response: (msg: BackgroundResponse) => void) => {
		if (message.book) {
			store.book = message.book;
		}
		if (message.note && store.book) {
			store.book.note = message.note;
		}
		if (message.triggered) {
			addBook(store.book as Book)
				.then((res) => {
					if (res.object === "page") {
						response({ success: true, data: res as PageObjectResponse });
					}
				})
				.catch((error) =>
					response({ success: false, error: error as NotionClientError })
				);
		}
		return true;
	}
);
