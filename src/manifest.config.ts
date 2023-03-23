import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
	// can only contain digits, dots, or dash
	.replace(/[^\d.-]+/g, "")
	// split into version parts
	.split(/[.-]/);

export default defineManifest(async (env) => ({
	icons: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" },
	host_permissions: ["https://api.notion.com/v1/*"],
	content_scripts: [
		{
			matches: ["https://book.douban.com/**"],
			js: ["src/content/index.ts"],
		},
	],
	background: {
		service_worker: "src/background/index.ts",
		type: "module",
	},
	manifest_version: 3,
	action: { default_popup: "index.html" },
	name: "D2N",
	version: `${major}.${minor}.${patch}.${label}`,
}));
