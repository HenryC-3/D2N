import { Book } from ".";

export interface ExtensionRequest {
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
	/* sender: popup script
	 * receiver: background script
	 * notify background script check the token secret and database id provided by user */
	checkAndSaveAuth?: { tokenSecret: string; databaseID: string };
	/* sender: popup script
	 * receiver: background script
	 * notify background script check the token secret and database id is available in indexDB*/
	getAuthInfo?: boolean;
}
