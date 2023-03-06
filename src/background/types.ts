import { BackgroundResponse, OneTimeMessage, Book } from "../types";

export interface BackgroundStore {
	book?: Book;
	userNote?: string;
}

export type ActionForOneTimeMessages = {
	// eslint-disable-next-line no-unused-vars
	[k in keyof OneTimeMessage]: Action;
};
export type Action = (
	messageValue: OneTimeMessage[keyof OneTimeMessage],
	backgroundResponse: (msg: BackgroundResponse) => void
) => void;
