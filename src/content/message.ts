import { Book, OneTimeMessage } from "../types";
import * as cheerio from "cheerio";
import type { Cheerio } from "cheerio";

export function sendBookToBackground() {
	getBookInfo()
		.then((book) => {
			chrome.runtime.sendMessage<OneTimeMessage>({ book });
		})
		.catch((error) => {
			console.log(error);
		});
}

async function getBookInfo() {
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

	// 	find and format target information of the book
	function getInfoByAnchor(anchor: Cheerio<cheerio.Element>) {
		const source = anchor[0].nextSibling as unknown as Element;
		if (source.nodeValue) {
			return source.nodeValue.trim();
		}
		return "";
	}
}
