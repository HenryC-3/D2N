import { Client, NotionClientError } from "@notionhq/client";
import { ExtensionError } from "../types";
import { ActionForOneTimeMessages, BackgroundStore } from "./types";
import { createStore } from "./store";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const store = createStore();

export const actions: ActionForOneTimeMessages = {
	getBookLink: async function handleLink(messageValue, backgroundResponse) {
		const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } = import.meta
			.env;
		const notion = new Client({ auth: token });
		const response = await notion.databases.query({
			database_id: db,
			filter: {
				property: "ISBN",
				number: { equals: messageValue as number },
			},
		});
		backgroundResponse({
			success: true,
			data: response.results[0] as PageObjectResponse,
		});
	},
	storeBook: function handleStoreBook(messageValue) {
		store.updateStore({ book: messageValue as BackgroundStore["book"] });
	},
	storeNote: function handleStoreNote(messageValue) {
		store.updateStore({
			userNote: messageValue as BackgroundStore["userNote"],
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
						success: true,
						data: res as PageObjectResponse,
					});
				}
			})
			.catch((error) =>
				backgroundResponse({
					success: false,
					error: error as NotionClientError,
				})
			);
		async function addBook(store: BackgroundStore) {
			const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } =
				import.meta.env;
			const notion = new Client({ auth: token });
			if (!store.book) {
				// eslint-disable-next-line no-throw-literal
				throw {
					name: "ContentScriptError",
					message:
						"Sorry, D2N was unable to retrieve information about the book from this page. Please make sure you are on a valid book page and try again",
				} as ExtensionError;
			}
			if (store.book) {
				const response = await notion.pages.create({
					parent: { database_id: db },
					properties: {
						title: {
							title: [
								{
									text: {
										content: store.book.title,
									},
								},
							],
						},
						Author: {
							rich_text: [
								{
									text: {
										content: store.book.author,
									},
								},
							],
						},
						Publisher: {
							rich_text: [
								{
									text: {
										content: store.book.publisher,
									},
								},
							],
						},
						Producer: {
							rich_text: [
								{
									text: {
										content: store.book.producer,
									},
								},
							],
						},
						Subtitle: {
							rich_text: [
								{
									text: {
										content: store.book.subtitle ? store.book.subtitle : "",
									},
								},
							],
						},
						PublishDate: {
							date: {
								start: store.book.publishDate,
							},
						},
						PageCount: {
							number: store.book.pageCount,
						},
						Price: {
							number: store.book.price,
						},
						ISBN: {
							number: store.book.ISBN,
						},
						Rating: {
							number: store.book.rating,
						},
						RatingCount: {
							number: store.book.ratingCount,
						},
						Cover: {
							files: [
								{
									name: `${store.book.title}-${store.book.ISBN}`,
									external: {
										url: store.book.cover,
									},
								},
							],
						},
						Note: {
							rich_text: [
								{
									text: {
										content: store.userNote ? store.userNote : "",
									},
								},
							],
						},
						Douban: {
							url: store.book.douban,
						},
					},
				});
				console.log("Success! Entry added.");
				return response;
			}
		}
	},
};
