import * as cheerio from "cheerio";
import { Book } from "../../types";
import { getInfoByAnchor } from "../utils";

export function getBookInfo() {
	const page = document.documentElement.outerHTML;
	const $ = cheerio.load(page);
	const book: Book = {
		title: $("h1 span").text(),
		author: $("#info span:contains('作者')").next().text(),
		publisher: $("#info span:contains('出版社')").next().text(),
		producer: $("#info span:contains('出品方')").next().text(),
		subtitle: getInfoByAnchor($("#info span:contains('副标题')")),
		publishDate: new Date(
			Date.parse(getInfoByAnchor($("#info span:contains('出版年')")))
		).toISOString(),
		pageCount: parseInt(getInfoByAnchor($("#info span:contains('页数')"))),
		price: parseFloat(
			getInfoByAnchor($("#info span:contains('定价')")).replace("元", "")
		),
		ISBN: parseInt(getInfoByAnchor($("#info span:contains('ISBN')"))),
		rating: parseFloat($(".rating_num").text().trim()),
		ratingCount: parseInt($(".rating_sum a").text().trim()),
		cover: String($("#mainpic a.nbg").attr("href")),
		douban: window.location.href,
	};

	return book;
}
