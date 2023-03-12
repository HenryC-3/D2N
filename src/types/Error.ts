import { NotionClientError } from "@notionhq/client";

export type ExtensionError =
	| {
			name: "ContentScriptError";
			message: "Sorry, D2N was unable to retrieve information about the book from this page. Please make sure you are on a valid book page and try again";
	  }
	| {
			name: "Token&IDNotExistError";
			message: "Sorry, You have to provide Notion Secret Token and Database ID to use D2N";
	  }
	| NotionClientError;
