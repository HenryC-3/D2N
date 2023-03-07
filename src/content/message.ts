import { OneTimeMessage } from "../types";
import { getBookInfo } from "./actions/getBookInfo";

export function sendBookToBackground() {
	getBookInfo()
		.then((book) => {
			chrome.runtime.sendMessage<OneTimeMessage>({ storeBook: book });
		})
		.catch((error) => {
			console.log(error);
		});
}
