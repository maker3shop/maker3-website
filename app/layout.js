import "./globals.css";

export const metadata = {
	title: "Maker3 - Web3 Marketplace",
	description:
		"A web3 marketplace for creators to sell digital products and services.",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
