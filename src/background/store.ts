import { Book } from "../types";

interface BackgroundStore {
	book?: Book;
}
export const store: BackgroundStore = {};
