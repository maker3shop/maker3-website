/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				dark: "#222222",
				"input-dark": "#302f2f",
			},
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "localhost:3000",
			},
		],
	},
	plugins: [],
};
