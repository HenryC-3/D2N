export function createButton(notionURL: string) {
	if (!notionURL) return;
	const ratingWrapper = document.getElementsByClassName("rating_wrap")[0];
	const btn = document.createElement("button");

	btn.innerText = "View in Notion";
	btn.style.width = "100%";
	btn.style.marginTop = "8px";
	btn.style.backgroundColor = "#4EAADC";
	btn.style.color = "#fff";
	btn.style.padding = "8px 16px";
	btn.style.border = "none";
	btn.style.borderRadius = "4px";
	btn.style.cursor = "pointer";
	btn.style.fontWeight = "bold";
	btn.style.fontSize = "14px";

	btn.addEventListener("click", function () {
		window.location.href = notionURL;
	});

	ratingWrapper.appendChild(btn);
}
