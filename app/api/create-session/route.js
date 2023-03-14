import { CandyPay } from "@candypay/checkout-sdk";

const sdk = new CandyPay({
	api_keys: {
		private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY,
		public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY,
	},
	network: "devnet", // use 'mainnet' for prod and 'devnet' for dev environment
	config: {
		collect_shipping_address: false,
	},
});

export async function POST(request) {
	const items = await request.json();
	console.log({ items });

	try {
		const response = await sdk.session.create({
			success_url: `${process.env.STATIC_URL}/product/success`,
			cancel_url: `${process.env.STATIC_URL}/product/cancel`,
			tokens: ["bonk", "dust"],
			items,
			shipping_fees: 0,
		});

		return Response.json(response);
	} catch (error) {
		console.log(error);
		return new Response(error, {
			status: 500,
		});
	}
}
