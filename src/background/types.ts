import { BackgroundResponse, OneTimeMessage, Book } from "../types";

export interface BackgroundStore {
	book?: Book;
	userNote?: string;
}

export type ActionForOneTimeMessages = {
	// eslint-disable-next-line no-unused-vars
	[K in keyof Required<OneTimeMessage>]: Action<Required<OneTimeMessage>[K]>;
};
export type Action<T> = (
	messageValue: T,
	backgroundResponse: (msg: BackgroundResponse) => void
) => void;

export type IndexDB = OneTimeMessage["checkAndSaveAuth"] & {
	databaseTitle: string;
	databaseURL: string;
};
