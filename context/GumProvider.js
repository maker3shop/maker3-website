"use client";

import { useGum } from "@gumhq/react-sdk";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import React from "react";

const GumContext = React.createContext();

export function useGumContext() {
	return React.useContext(GumContext);
}

export default function GumProvider({ children }) {
	const anchorWallet = useAnchorWallet();
	const network = WalletAdapterNetwork.Devnet;

	const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

	const connection = React.useMemo(() => {
		new Connection(endpoint, "confirmed");
	}, [endpoint]);

	const gumSDK = useGum(
		anchorWallet,
		connection,
		{
			preflightCommitment: "confirmed",
		},
		network
	);

	return <GumContext.Provider value={gumSDK}>{children}</GumContext.Provider>;
}
