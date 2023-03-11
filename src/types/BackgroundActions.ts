import { ExtensionRequest } from "./ExtensionRequest";
import { BackgroundResponse } from "./BackgroundResponse";

export type BackgroundActions = {
	[K in keyof Required<ExtensionRequest>]: Action<
		Required<ExtensionRequest>[K]
	>;
};
export type Action<T> = (
	messageValue: T,
	backgroundResponse: (msg: BackgroundResponse) => void
) => void;
