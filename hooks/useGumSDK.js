import { useGum } from "@gumhq/react-sdk";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { GraphQLClient } from "graphql-request";

export const useGumSDK = (connection, opts, cluster) => {
	const anchorWallet = useAnchorWallet();
	const gqlClient = new GraphQLClient(
		"https://light-pelican-32.hasura.app/v1/graphql"
	);

	const sdk = useGum(anchorWallet, connection, opts, cluster, gqlClient);

	return sdk;
};
