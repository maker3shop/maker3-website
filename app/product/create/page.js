"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useGumContext } from "@/context/GumProvider";
import bannerEmpty from "@/public/images/banner-empty.svg";
import logo from "@/public/images/logo.svg";
import { useCreatePost } from "@gumhq/react-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { IpfsUploader, ThirdwebStorage } from "@thirdweb-dev/storage";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const USER_PDA = process.env.NEXT_PUBLIC_USER_PDA;
const PROFILE_PDA = process.env.NEXT_PUBLIC_PROFILE_PDA;

export default function CreateProductPage() {
	return (
		<div className="bg-[#CDC0FF] min-h-screen flex flex-col">
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex items-center justify-between">
					<Link href="/">
						<Image src={logo} alt="Maker3 logo" width={70} />
					</Link>
				</div>
			</header>
			<main className="flex-1">
				<section>
					<div className="container mx-auto max-w-6xl px-8">
						<div className="grid place-content-center text-center">
							<h3 className="text-[#987DFF] text-2xl font-semibold">
								Create product
							</h3>
							<CreateProductForm />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function CreateProductForm() {
	const [title, setTitle] = React.useState("");
	const [price, setPrice] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [productBannerFile, setProductBannerFile] = React.useState("");
	const [productFile, setProductFile] = React.useState("");
	const [uploadStatus, setUploadStatus] = React.useState(""); // loading, success, error

	const bannerFileRef = React.useRef();
	const productFileRef = React.useRef();

	const router = useRouter();

	const wallet = useWallet();

	const sdk = useGumContext();
	const {
		create,
		postPDA: productPDA,
		isCreatingPost: isCreatingProduct,
		createPostError: createProductError,
	} = useCreatePost(sdk);

	const uploader = new IpfsUploader({
		uploadWithGatewayUrl: true,
	});
	const storage = new ThirdwebStorage(uploader);

	React.useEffect(() => {
		console.log({ productPDA });
	}, [productPDA]);

	React.useEffect(() => {
		console.log({ createProductError });
	}, [createProductError]);

	React.useEffect(() => {
		if (!productPDA) return;

		console.log("Product PDA: ", productPDA.toString());
		if (!isCreatingProduct) {
			router.push(`product/${productPDA}`);
		}
	}, [productPDA, router, isCreatingProduct]);

	async function handleSubmit(event) {
		event.preventDefault();

		console.log({
			title,
			price,
			description,
			productBannerFile,
			product: productFile,
		});

		setUploadStatus("loading");

		const productBannerUrl = await uploadProductBanner();
		if (!productBannerUrl) return;
		console.log({ productBannerUrl });

		const productUrl = await uploadProduct();
		if (!productUrl) return;
		console.log({ productUrl });

		const metadataUrl = await uploadPostMetadata(productBannerUrl, productUrl);
		if (!metadataUrl) return;
		console.log({ metadataUrl });

		setUploadStatus("success");

		await create(metadataUrl, PROFILE_PDA, USER_PDA, wallet.publicKey);
	}

	async function uploadProductBanner() {
		if (!productBannerFile || productBannerFile.length === 0) {
			alert("Please upload a product banner file");
			return;
		}

		const uri = await storage.upload(productBannerFile);
		const url = storage.resolveScheme(uri);
		return url;
	}

	async function uploadProduct() {
		if (!productFile || productFile.length === 0) {
			alert("Please upload a product file");
			return;
		}

		const uri = await storage.upload(productFile);
		const url = storage.resolveScheme(uri);
		return url;
	}

	async function uploadPostMetadata(productBannerUrl, productUrl) {
		const metadata = {
			productData: {
				title,
				price,
				description,
				productBanner: productBannerUrl,
				product: productUrl,
			},
			type: "text",
			content: {
				content: "Maker3 product",
				format: "markdown",
			},
			authorship: {
				signature: wallet.publicKey,
				publicKey: wallet.publicKey,
			},
		};

		const uri = await storage.upload(metadata);
		const url = storage.resolveScheme(uri);
		return url;
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center space-y-3 mt-8 w-96 mb-8"
		>
			<div>
				<Image
					src={productBannerFile || bannerEmpty}
					alt="Product banner"
					width={600}
					height={100}
					onClick={() => bannerFileRef.current.click()}
					className="rounded-md cursor-pointer"
					priority={true}
				/>
				<Input
					ref={bannerFileRef}
					name="bannerFile"
					id="bannerFile"
					type="file"
					className="hidden"
					accept="image/*"
					onChange={(e) => {
						const files = e.target.files[0];
						if (files) {
							const fileReader = new FileReader();
							fileReader.readAsDataURL(files);
							fileReader.onload = () => {
								setProductBannerFile(fileReader.result);
							};
						}
					}}
				/>
			</div>
			<div className="space-y-2 flex flex-col w-full">
				<Input
					name="title"
					id="title"
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required={true}
					className="bg-[#5b5b5b] text-[#cdc0ff]"
				/>
			</div>
			<div className="space-y-2 flex flex-col w-full">
				<Input
					name="price"
					id="price"
					type="text"
					placeholder="Price (in USDC)"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required={true}
					className="bg-[#5b5b5b] text-[#cdc0ff]"
				/>
			</div>
			<div className="space-y-2 flex flex-col w-full">
				<Textarea
					name="description"
					id="description"
					placeholder="Project description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required={true}
					className="h-28 bg-[#5b5b5b] text-[#cdc0ff]"
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="file">
					Upload file (documents, images, audio, video)
				</Label>
				<Input
					ref={productFileRef}
					name="productFile"
					id="productFile"
					type="file"
					placeholder="Upload product file"
					onChange={(e) => {
						const files = e.target.files[0];
						if (files) {
							const fileReader = new FileReader();
							fileReader.readAsDataURL(files);
							fileReader.onload = () => {
								setProductFile(fileReader.result);
							};
						}
					}}
					required={true}
					className="bg-[#5B5B5B] text-[#CDC0FF"
				/>
			</div>
			<div>
				<Button
					disabled={uploadStatus === "loading" || isCreatingProduct}
					className="bg-[#4E44CE] text-[#CDC0FF]"
				>
					{uploadStatus === "loading" || isCreatingProduct ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : undefined}
					Publish
				</Button>
			</div>
		</form>
	);
}
