import { Book } from "./types";
// import { dataURLToBlob } from "blob-util";
import { Client } from "@notionhq/client";

const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } = import.meta
	.env;
const notion = new Client({ auth: token });

chrome.runtime.onMessage.addListener((message: { book: Book }) => {
	if (message) {
		// const cover = dataURLToBlob(message.book.cover);
		addBook(message.book);
	}
});

async function addBook(book: Book) {
	try {
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
		console.log(response);
		console.log("Success! Entry added.");
	} catch (error) {
		console.error(error);
	}
}
