import { getBookInfo } from "./actions/getBookInfo";
import { createButton } from "./actions/createButton";
import { send } from "../message";

export function sendBookToBackground() {
	const book = getBookInfo();
	send<"storeBook">({ type: "storeBook", data: book });
}

export function createNotionButton() {
	const isbn = getBookInfo().ISBN;
	send<"getBookLink">(
		{ type: "getBookLink", data: isbn },
		{
			successAction: (res) => {
				createButton(res.url);
			},
		}
	);
}
