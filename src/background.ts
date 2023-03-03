import { error } from "console";
import { BackgroundRes, Book } from "./types";
import { Client, NotionClientError } from "@notionhq/client";

const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } = import.meta
	.env;
const notion = new Client({ auth: token });

// TODO: 移除该变量
let book = {};
chrome.runtime.onMessage.addListener(
	(message, _, response: (msg: BackgroundRes) => void) => {
		console.log("message", message);
		if (message.book) {
			book = message.book;
		}
		if (message.triggered) {
			addBook(book as Book)
				.then(() => {
					// TODO: 测试是否能跳转到错误页
					throw error;
					response({ success: true });
				})
				.catch((error) =>
					response({ success: false, error: error as NotionClientError })
				);
		}
		return true;
	}
);

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
