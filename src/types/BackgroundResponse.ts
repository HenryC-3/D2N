import {
	GetDatabaseResponse,
	PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ExtensionError } from "./ExtensionError";

export interface BackgroundResponse {
	data?: PageObjectResponse | GetDatabaseResponse;
	error?: ExtensionError;
}
