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
	SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

require("@solana/wallet-adapter-react-ui/styles.css");

const HELIUS_DEVNET_RPC = process.env.NEXT_PUBLIC_HELIUS_DEVNET_RPC;

export default function Wallet({ children }) {
	const network = WalletAdapterNetwork.Devnet;

	const endpoint = React.useMemo(() => HELIUS_DEVNET_RPC, []);

	const wallets = React.useMemo(
		() => [
			new GlowWalletAdapter(network),
			new PhantomWalletAdapter(network),
			new SolflareWalletAdapter(network),
		],
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
