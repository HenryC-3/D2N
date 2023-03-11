import { Client, NotionClientError } from "@notionhq/client";
import { createStore } from "../store";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { addBook, getAuthInfo, saveAuthInfo } from "./utils";
import { BackgroundActions } from "../../types/BackgroundActions";
import { ExtensionError } from "../../types/ExtensionError";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const store = createStore();

export const actions: BackgroundActions = {
	getAuthInfo: async function handleCheck(messageValue, backgroundResponse) {
		try {
			const response = await getAuthInfo();
			if (response) {
				// TODO
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				backgroundResponse({ data: response });
			}
		} catch (error) {
			backgroundResponse({ error: error as ExtensionError });
		}
	},
	checkAndSaveAuth: async function handleAuth(
		messageValue,
		backgroundResponse
	) {
		const { tokenSecret, databaseID } = messageValue;
		const notion = new Client({ auth: tokenSecret });
		try {
			const response = (await notion.databases.retrieve({
				database_id: databaseID,
			})) as DatabaseObjectResponse;

			await saveAuthInfo({
				databaseURL: response.url,
				databaseTitle: response.title[0].plain_text,
				databaseID: messageValue.databaseID,
				tokenSecret: messageValue.tokenSecret,
			});
			backgroundResponse({ data: response });
		} catch (error) {
			backgroundResponse({ error: error as NotionClientError });
		}
	},
	getBookLink: async function handleLink(messageValue, backgroundResponse) {
		const { tokenSecret: token, databaseID: db } = await getAuthInfo();
		const notion = new Client({ auth: token });
		const response = await notion.databases.query({
			database_id: db,
			filter: {
				property: "ISBN",
				number: { equals: messageValue },
			},
		});
		backgroundResponse({
			data: response.results[0] as PageObjectResponse,
		});
	},
	storeBook: function handleStoreBook(messageValue) {
		store.updateStore({ book: messageValue });
	},
	storeNote: function handleStoreNote(messageValue) {
		store.updateStore({
			userNote: messageValue,
		});
	},
	saveBookToNotion: async function handleSaveBook(
		messageValue,
		backgroundResponse
	) {
		addBook(store.getStore())
			.then((res) => {
				if (res && res.object === "page") {
					backgroundResponse({
						data: res as PageObjectResponse,
					});
				}
			})
			.catch((error) =>
				backgroundResponse({
					error: error as NotionClientError,
				})
			);
	},
};
