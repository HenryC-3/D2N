import { Client } from "@notionhq/client";
import { ExtensionError, OneTimeMessage } from "../../types";
import { BackgroundStore } from "../types";
import { set, get } from "idb-keyval";

export async function saveAuthInfo(
	input: NonNullable<OneTimeMessage["checkAndSaveAuth"]>
) {
	set("databaseID", input.databaseID);
	set("tokenSecret", input.tokenSecret);
}

export async function getAuthInfo() {
	const databaseID = await get("databaseID");
	const tokenSecret = await get("tokenSecret");
	const {
		VITE_NOTION_AUTH_TOKEN: devTokenSecret,
		VITE_NOTION_DB_ID: devDatabaseID,
	} = import.meta.env;
	if (databaseID && tokenSecret) {
		return { databaseID, tokenSecret } as NonNullable<
			OneTimeMessage["checkAndSaveAuth"]
		>;
	}
	if (devTokenSecret && devDatabaseID) {
		return {
			databaseID: devDatabaseID,
			tokenSecret: devTokenSecret,
		} as NonNullable<OneTimeMessage["checkAndSaveAuth"]>;
	}
	// eslint-disable-next-line no-throw-literal
	throw {
		name: "Token&IDNotExistError",
		message:
			"Sorry, You have to provide Notion Secret Token and Database ID to use D2N",
	} as ExtensionError;
}

export async function addBook(store: BackgroundStore) {
	const { tokenSecret: token, databaseID: db } = await getAuthInfo();
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
