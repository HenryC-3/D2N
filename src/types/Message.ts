import {
	GetDatabaseResponse,
	PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ExtensionError } from "./Error";
import { List, Union } from "ts-toolbelt";

export type ExtRequestTypes =
	| "storeBook"
	| "storeNote"
	| "getAuthInfo"
	| "saveBookToNotion"
	| "getBookLink"
	| "checkAndSaveAuth";

type ExtRequest<Type extends ExtRequestTypes, RequestBody> = {
	type: Type;
	data?: RequestBody;
};
type ExtResponse<ResponseData> =
	| { data: ResponseData }
	| { error: ExtensionError };

export type BackgroundAction<RequestBody, ResponseBody> = (
	data: RequestBody,
	backgroundResponse: (response: ExtResponse<ResponseBody>) => void
) => void;

interface Messenger<Type extends ExtRequestTypes, RequestBody, ResponseBody> {
	request: ExtRequest<Type, RequestBody>;
	response: ExtResponse<ResponseBody>;
	action: BackgroundAction<RequestBody, ResponseBody>;
}

// create relation between request, response and action
type Messengers = [
	Messenger<"storeBook", Book, undefined>,
	Messenger<"storeNote", string, undefined>,
	Messenger<"saveBookToNotion", undefined, PageObjectResponse>,
	Messenger<"getBookLink", Book["ISBN"], PageObjectResponse>,
	Messenger<
		"checkAndSaveAuth",
		Omit<IndexDB, "databaseTitle" | "databaseURL">,
		GetDatabaseResponse
	>,
	Messenger<"getAuthInfo", undefined, IndexDB>
];

// send message
export type GetRequest<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["request"];

export type GetResponse<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["response"];

export type GetResponseData<Type extends ExtRequestTypes> = Union.Exclude<
	List.Select<Messengers, { request: { type: Type } }>[0]["response"],
	{ error: ExtensionError }
>["data"];

// actions
export type GetAction<Type extends ExtRequestTypes> = List.Select<
	Messengers,
	{ request: { type: Type } }
>[0]["action"];

export type ExtensionRequest = Messengers[number]["request"];

export type BackgroundResponse = Messengers[number]["response"];

export type Actions = {
	[Type in ExtRequestTypes]: List.Select<
		Messengers,
		{ request: { type: Type } }
	>[0]["action"];
};

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
