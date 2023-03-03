import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import {
	WalletDisconnectButton,
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function Wallet({ children }) {
	const network = WalletAdapterNetwork.Devnet;

	const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<WalletMultiButton>
						<WalletDisconnectButton />
						{children}
					</WalletMultiButton>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
}
