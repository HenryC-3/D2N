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
	/* whether the content script have got the book information form Douban */
	book?: Book;
	/* whether the user have added a note to the book  */
	note?: string;
	/* whether the user have triggered the save button */
	triggered?: boolean;
}
