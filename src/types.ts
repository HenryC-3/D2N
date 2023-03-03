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
}

export interface BackgroundResponse {
	success: boolean;
	data?: PageObjectResponse;
	error?: NotionClientError;
}
