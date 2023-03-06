import { NotionClientError } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Book {
	title: string;
	author: string;
	publisher: string;
	producer: string;
	subtitle: string;
	publishDate: string;
	pageCount: number;
	price: number;
	ISBN: number;
	rating: number; // 豆瓣星
	ratingCount: number; // 评价人数
	cover: string;
	note?: string; // quick thoughts about the book
	douban: string; // book's douban URL
}

export interface BackgroundResponse {
	success?: boolean;
	data?: PageObjectResponse;
	error?: NotionClientError;
}

export interface OneTimeMessage {
	/* sender: content script
	 * receiver: background script
	 * notify background script to store the book information to background store  */
	storeBook?: Book;
	/* sender: popup script
	 * receiver: background script
	 * notify background script to store the user notes to background store  */
	storeNote?: string;
	/* sender: popup script
	 * receiver: background script
	 * notify background script send the book related information to notion */
	saveBookToNotion?: boolean;
}
