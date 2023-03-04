import { Book, InternalMessage } from "./types";
import * as cheerio from "cheerio";
import type { Cheerio } from "cheerio";
import { blobToDataURL } from "blob-util";

getBookInfo()
	.then((book) => {
		chrome.runtime.sendMessage<InternalMessage>({ book });
	})
	.catch((error) => {
		console.log(error);
	});

async function getBookInfo() {
	const page = document.documentElement.outerHTML;
	const $ = cheerio.load(page);
	// const coverBlobStr = await getBookCoverBlobStr();
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
		// cover: coverBlobStr,
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	async function getBookCoverBlobStr() {
		const coverURL = $("#mainpic a.nbg").attr("href");
		if (coverURL) {
			const res = await fetch(coverURL);
			const blob = await res.blob();
			const blobStr = await blobToDataURL(blob); // see [javascript - Passing FormData/File Object from content script to background script in chrome extension with Manifest V3 - Stack Overflow](https://stackoverflow.com/questions/68735839/passing-formdata-file-object-from-content-script-to-background-script-in-chrome)

			// see if I really get the image form the server
			// const imageUrl = URL.createObjectURL(blob);
			// const img = document.createElement("img");
			// img.src = imageUrl;
			// document.body.appendChild(img);

			return blobStr;
		}
		return "";
	}
}
