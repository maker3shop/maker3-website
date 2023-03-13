"use client";

import Container from "@/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useGumContext } from "@/context/GumProvider";
import logo from "@/public/images/logo.svg";
import { usePost } from "@gumhq/react-sdk";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { Loader2, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Product({ params }) {
	const { productPDA } = params;

	const [productBanner, setProductBanner] = React.useState("");
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [price, setPrice] = React.useState("");

	const [username, setUsername] = React.useState("");
	const [avatar, setAvatar] = React.useState("");

	const router = useRouter();

	const sdk = useGumContext();
	const {
		post: product,
		postError: productError,
		postLoading: productLoading,
	} = usePost(sdk, productPDA);

	React.useEffect(() => {
		if (!productPDA) return;
		console.log({ productPDA });
	}, [productPDA]);

	React.useEffect(() => {
		if (!product || !sdk) return;

		async function downloadProfileMetadata() {
			const storage = new ThirdwebStorage();

			const { metadata } =
				await sdk.profileMetadata.getProfileMetadataByProfile(product.profile);
			console.log({ metadata });
			setUsername(metadata.data.username);

			const avatarMetadata = await storage.downloadJSON(metadata.data.avatar);
			console.log({ avatarMetadata });
			setAvatar(avatarMetadata.avatar);
		}

		downloadProfileMetadata();
	}, [product, sdk]);

	React.useEffect(() => {
		if (!product) return;
		console.log({ product });

		async function downloadProductMetadata() {
			const storage = new ThirdwebStorage();
			const { productData } = await storage.downloadJSON(product.metadataUri);
			console.log({ productData });
			const productBannerMetadata = await storage.download(
				productData.productBanner
			);
			setProductBanner(await productBannerMetadata.text());

			setTitle(productData.title);
			setDescription(productData.description);
			setPrice(productData.price);
		}

		downloadProductMetadata();
	}, [product]);

	React.useEffect(() => {
		if (!productError) return;
		console.log({ productError });
	}, [productError]);

	async function createSession() {
		const response = await fetch("/api/create-session", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify([
				{
					name: product.title,
					price: product.price,
					image: "",
					quantity: 1,
				},
			]),
		});

		const json = await response.json();
		router.push(json.payment_url);
	}

	if (productLoading) {
		return (
			<div className="bg-[#cdc0ff] grid place-content-center min-h-screen">
				<div className="flex items-center gap-4">
					<Loader2 className="mr-2 h-8 w-8 animate-spin" />
					<p className="text-2xl">Loading Profile</p>
				</div>
			</div>
		);
	}

	if (productError || !product) {
		return (
			<div className="bg-[#cdc0ff] grid place-content-center min-h-screen">
				<div className="flex items-center gap-4">
					<p className="text-xl">Error loading product</p>
					<Button
						onClick={() => router.refresh()}
						className="bg-[#4E44CE] text-[#CDC0FF] "
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<>
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						<Image src={logo} alt="Maker3 Logo" />
					</Link>
				</div>
			</header>
			<div>
				<Container>
					<div className="grid place-content-center">
						<Image
							src={productBanner}
							alt="Product banner"
							width={1200}
							height={100}
						/>
					</div>
					<main className="flex gap-4">
						<div className="flex-1">
							<div className="flex items-center py-8 gap-4">
								<Avatar className="w-10 h-10">
									<AvatarImage src={avatar} />
									<AvatarFallback>DB</AvatarFallback>
								</Avatar>
								<p className="text-xl">{username}</p>
							</div>
							<section className="mb-8">
								<h3 className="text-2xl font-semibold">Title</h3>
								<p className="text-xl">{title}</p>
								<h3 className="text-2xl font-semibold mt-8">Description</h3>
								<p className="text-xl">{description}</p>
							</section>
						</div>
						<aside className="p-4 text-center drop-shadow-lg space-y-4 mt-8 self-start bg-blue-100 rounded-md">
							<h4 className="text-xl font-semibold">{title}</h4>
							<p className="text-2xl">{`${price} USDC`}</p>
							<Button onClick={createSession}>Buy</Button>
						</aside>
					</main>
				</Container>
				<footer className="bg-[#e4e4e7]">
					<Container>
						<div className="flex items-center justify-between py-6">
							<Link href="/" className="text-2xl font-bold">
								<Image src={logo} alt="Maker3 logo" width={80} />
							</Link>
							<ul className="flex gap-1">
								<li>
									<Link target="_blank" href="https://twitter.com/maker3shop">
										<Twitter color="black" size={24} />
									</Link>
								</li>
							</ul>
						</div>
					</Container>
				</footer>
			</div>
		</>
	);
}
