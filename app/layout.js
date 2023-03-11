import "./globals.css";

import LayoutClient from "@/components/LayoutClient";

export const metadata = {
	title: "Maker3 - Web3 Marketplace",
	description:
		"A web3 marketplace for creators to sell digital products and services.",
	image: "./web-preview.png",
	icons: {
		icon: "./icon.png",
	},
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<LayoutClient>{children}</LayoutClient>
			</body>
		</html>
	);
}
