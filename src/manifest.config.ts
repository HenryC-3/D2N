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
	host_permissions: ["https://api.notion.com/v1/*"],
	content_scripts: [
		{
			matches: ["https://book.douban.com/**"],
			js: ["src/content.ts"],
		},
	],
	background: {
		service_worker: "src/background.ts",
		type: "module",
	},
	manifest_version: 3,
	action: { default_popup: "index.html" },
	name:
		env.mode === "staging"
			? "[INTERNAL] CRXJS Power Tools"
			: "CRXJS Power Tools",
	// up to four numbers separated by dots
	version: `${major}.${minor}.${patch}.${label}`,
	// semver is OK in "version_name"
	version_name: version,
}));
