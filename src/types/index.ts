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

export type IndexDB = {
	databaseID: string;
	tokenSecret: string;
	databaseTitle: string;
	databaseURL: string;
};

export interface BackgroundStore {
	book?: Book;
	userNote?: string;
}
