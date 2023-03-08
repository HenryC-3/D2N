export function openURLInNewTab(url: string) {
	chrome.tabs.create({ url });
}
