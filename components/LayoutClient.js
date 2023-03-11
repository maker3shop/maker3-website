"use client";

import Wallet from "@/components/Wallet";
import GumProvider from "@/context/GumProvider";

export default function LayoutClient({ children }) {
	return (
		<Wallet>
			<GumProvider>{children}</GumProvider>
		</Wallet>
	);
}
