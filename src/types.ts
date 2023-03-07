import { NotionClientError } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Book {
	title: string;
	author: string;
	publisher: string;
	producer: string;
	subtitle?: string;
	originalTitle?: string;
	publishDate: string;
	pageCount: number;
	price: number;
	ISBN: number;
	rating: number; // 豆瓣星
	ratingCount: number; // 评价人数
	cover: string;
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
	/* sender: content script
	 * receiver: background script
	 * notify background script get the book URL in Notion */
	getBookLink?: number;
}

export type ExtensionError =
	| {
			name: "ContentScriptError";
			message: "Sorry, D2N was unable to retrieve information about the book from this page. Please make sure you are on a valid book page and try again";
	  }
	| NotionClientError;
