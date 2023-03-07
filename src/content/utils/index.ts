import type { Cheerio } from "cheerio";
import * as cheerio from "cheerio";

// 	find and format target information of the book
export function getInfoByAnchor(anchor: Cheerio<cheerio.Element>) {
	try {
		const source = anchor[0].nextSibling as unknown as Element;
		if (source.nodeValue) {
			return source.nodeValue.trim();
		}
	} catch (error) {
		return "";
	}
	return "";
}
