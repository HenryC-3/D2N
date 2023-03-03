export const { sendTriggered, watchTriggered } = getMessenger("triggered");

type MessageType =
	| "wrongPage" // current page doesn't match https://book.douban.com/subject/27594044/
	| "ready" // content script has collected book information
	| "triggered" // user triggers the save book button
	| "failed" // background script fails to send the book to notion
	| "success" // background script sends the book to notion successfully
	| "duplicate"; // background scripts detects a duplicate book in notion

function getMessenger<T>(type: MessageType) {
	return {
		["send" + type.toUpperCase()]: (data: T) => {
			chrome.runtime.sendMessage({ type, data });
		},
		["watch" + type.toUpperCase()]: (action: (data: T) => void) => {
			chrome.runtime.onMessage.addListener((message) => {
				if (message.type === type) {
					action(message.data);
				}
			});
		},
	};
}
