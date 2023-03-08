import "./globals.css";

import Wallet from "../components/Wallet";
import GumProvider from "../context/GumProvider";

export const metadata = {
	title: "Maker3 - Web3 Marketplace",
	description:
		"A web3 marketplace for creators to sell digital products and services.",
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Wallet>
					<GumProvider>{children}</GumProvider>
				</Wallet>
			</body>
		</html>
	);
}
