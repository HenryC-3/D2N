import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { BackgroundResponse, Book } from "./types";
import { Client, NotionClientError } from "@notionhq/client";

const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } = import.meta
	.env;
const notion = new Client({ auth: token });

let book = {};
chrome.runtime.onMessage.addListener(
	(message, _, response: (msg: BackgroundResponse) => void) => {
		if (message.book) {
			book = message.book;
		}
		if (message.triggered) {
			addBook(book as Book)
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

async function addBook(book: Book) {
	const response = await notion.pages.create({
		parent: { database_id: db },
		properties: {
			title: {
				title: [
					{
						text: {
							content: book.title,
						},
					},
				],
			},
			Author: {
				rich_text: [
					{
						text: {
							content: book.author,
						},
					},
				],
			},
			Publisher: {
				rich_text: [
					{
						text: {
							content: book.publisher,
						},
					},
				],
			},
			Producer: {
				rich_text: [
					{
						text: {
							content: book.producer,
						},
					},
				],
			},
			Subtitle: {
				rich_text: [
					{
						text: {
							content: book.subtitle,
						},
					},
				],
			},
			PublishDate: {
				date: {
					start: book.publishDate,
				},
			},
			PageCount: {
				number: book.pageCount,
			},
			Price: {
				number: book.price,
			},
			ISBN: {
				number: book.ISBN,
			},
			Rating: {
				number: book.rating,
			},
			RatingCount: {
				number: book.ratingCount,
			},
			Cover: {
				files: [
					{
						name: `${book.title}-${book.ISBN}`,
						external: {
							url: book.cover,
						},
					},
				],
			},
		},
	});
	console.log("Success! Entry added.");
	return response;
}
