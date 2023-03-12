import { ExtensionError } from "../types/Error";
import { ExtRequestTypes } from "../types/Message";
import { GetRequest, GetResponse, GetResponseData } from "../types/Message";

type SuccessAction<Type extends ExtRequestTypes> = (
	input: GetResponseData<Type>
) => void;
type FailedAction = (input: ExtensionError) => void;

export function send<Type extends ExtRequestTypes>(
	input: GetRequest<Type>,
	actions: {
		successAction?: SuccessAction<Type>;
		failedAction?: FailedAction;
	} = {}
) {
	chrome.runtime.sendMessage<GetRequest<Type>, GetResponse<Type>>(
		input,
		(res) => {
			if (res.data && actions.successAction) {
				actions.successAction(res.data);
			}
			if (res.error && actions.failedAction) {
				const err = res.error;
				actions.failedAction(err);
			}
		}
	);
}
