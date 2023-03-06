import { Client } from "@notionhq/client";
import { Book } from "../types";

export async function addBook(book: Book) {
	const { VITE_NOTION_AUTH_TOKEN: token, VITE_NOTION_DB_ID: db } = import.meta
		.env;
	const notion = new Client({ auth: token });
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
			Note: {
				rich_text: [
					{
						text: {
							content: book.note ? book.note : "",
						},
					},
				],
			},
			Douban: {
				url: book.douban,
			},
		},
	});
	console.log("Success! Entry added.");
	return response;
}
