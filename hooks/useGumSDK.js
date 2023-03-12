import { useGum } from "@gumhq/react-sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { GraphQLClient } from "graphql-request";

export const useGumSDK = (
	connection,
	opts,
	cluster,
	gqlEndpoint = undefined
) => {
	const anchorWallet = useAnchorWallet();
	let gqlClient;

	if (gqlEndpoint) {
		gqlClient = new GraphQLClient(gqlEndpoint);
	}

	const sdk = useGum(anchorWallet, connection, opts, cluster, gqlClient);

	return sdk;
};
