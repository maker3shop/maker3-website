"use client";

import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { Connection } from "@solana/web3.js";
import { useGumSDK } from "@/hooks/useGumSDK";

const HELIUS_DEVNET_RPC = process.env.NEXT_PUBLIC_HELIUS_DEVNET_RPC;

const GumContext = React.createContext();

export function useGumContext() {
	return React.useContext(GumContext);
}

export default function GumProvider({ children }) {
	const connection = React.useMemo(
		() => new Connection(HELIUS_DEVNET_RPC, "confirmed"),
		[]
	);
	const sdk = useGumSDK(
		connection,
		{ preflightCommitment: "confirmed" },
		WalletAdapterNetwork.Devnet
	);

	return <GumContext.Provider value={sdk}>{children}</GumContext.Provider>;
}
