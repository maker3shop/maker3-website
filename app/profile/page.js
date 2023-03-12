"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGumContext } from "@/context/GumProvider";

export default function Profile() {
	const wallet = useWallet();
	console.log("Wallet: ", wallet.publicKey);

	const sdk = useGumContext();

	React.useEffect(() => {
		async function fetchProfiles() {
			if (!wallet && !sdk) return;
			console.log({ sdk });
			return await sdk.user.getUser(wallet.publicKey);
		}
		fetchProfiles()
			.then((profile) => console.log({ profile }))
			.catch(console.error);
	}, [wallet, sdk]);

	return <div>Profile</div>;
}
