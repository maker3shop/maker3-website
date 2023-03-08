"use client";

import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
	GlowWalletAdapter,
	PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Wallet({ children }) {
	const network = WalletAdapterNetwork.Devnet;

	const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

	const wallets = React.useMemo(
		() => [new GlowWalletAdapter(network), new PhantomWalletAdapter(network)],
		[network]
	);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}
