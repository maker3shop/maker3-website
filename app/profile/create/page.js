"use client";

import avatarEmpty from "@/app/assets/images/avatar-empty.svg";
import gumLogo from "@/app/assets/images/gum-logo.png";
import logo from "@/app/assets/images/logo.svg";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useGumContext } from "@/context/GumProvider";
import { useCreateProfile, useCreateUser } from "@gumhq/react-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CreateProfile() {
	const [name, setName] = React.useState("");
	const [bio, setBio] = React.useState("");
	const [avatarFile, setAvatarFile] = React.useState("");

	const fileInputRef = React.useRef();

	const gumContext = useGumContext();
	const {
		create: createUser,
		userPDA,
		error: userError,
	} = useCreateUser(gumContext);
	const {
		create: createProfile,
		profilePDA,
		error: profileError,
	} = useCreateProfile(gumContext);

	const wallet = useWallet();

	const storage = new ThirdwebStorage();

	async function handleSubmit(event) {
		event.preventDefault();

		const metadata = {
			name,
			bio,
			website: "Maker3",
			image: avatarFile,
		};

		console.log("creating user...");
		createUser(wallet.publicKey);

		console.log("uploading metadata...");
		const uri = await storage.upload(metadata);
		console.log(uri);

		console.log("creating profile...");
		createProfile(uri, "Professional", userPDA, wallet.publicKey);
		console.log("Profile created successfully");
	}

	return (
		<div className="min-h-screen flex flex-col bg-[#CDC0FF]">
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						<Image src={logo} alt="Maker3 Logo" />
					</Link>
					<WalletMultiButton />
				</div>
			</header>
			<main className="flex-1">
				<section>
					<div className="container mx-auto max-w-6xl px-8">
						<div className="grid place-content-center text-center">
							<h3 className="text-[#5429F2] font-semibold text-2xl">
								Welcome to Maker3
							</h3>
							<p className="text-2xl text-[#7A57FF]">
								Create your on-chain profile
							</p>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center gap-y-3 mt-8 w-80"
							>
								<div className="mb-4 flex items-center flex-col">
									<Image
										id="avatar"
										src={avatarEmpty}
										alt="avatar"
										onClick={() => {
											fileInputRef.current.click();
										}}
										className="w-16 cursor-pointer"
									/>
									<Input
										ref={fileInputRef}
										id="avatar-upload"
										name="avatar-upload"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={(e) => {
											const files = e.target.files[0];
											if (files) {
												const fileReader = new FileReader();
												fileReader.readAsDataURL(files);
												fileReader.onload = () => {
													setAvatarFile(fileReader.result);
												};
											}
										}}
									/>
								</div>
								<Input
									name="name"
									id="name"
									type="text"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="px-3 py-2 rounded-md w-full bg-[#5B5B5B] text-[#CDC0FF]"
								/>
								<Textarea
									name="bio"
									id="bio"
									placeholder="Bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="px-3 py-2 rounded-md w-full h-28 bg-[#5B5B5B] text-[#CDC0FF]"
								/>
								<div className="mt-4">
									<Button className="bg-[#4E44CE] text-[#CDC0FF] px-16">
										Create
									</Button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
			<footer>
				<div className="container mx-auto max-w-6xl py-4 ">
					<div className="flex items-center gap-x-2 justify-center">
						<Image src={gumLogo} alt="Gum logo" />
						<p className="text-center text-[#D946EF]">Powered by gum</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
