"use client";

import gumLogo from "@/app/assets/images/gum-logo.png";
import logo from "@/app/assets/images/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Heading3, Text } from "@/components/ui/Typography";
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

	if (userError) {
		console.log(userError);
	}

	if (profileError) {
		console.log(profileError);
	}

	return (
		<div className="min-h-screen flex flex-col">
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
							<Heading3>Welcome to Maker3</Heading3>
							<Text>Create your on-chain profile</Text>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center gap-y-3 mt-8 w-80"
							>
								<div className="mb-4 flex items-center flex-col">
									<Avatar className="cursor-pointer">
										<AvatarImage
											id="avatar"
											onClick={() => {
												fileInputRef.current.click();
											}}
											src={avatarFile}
											alt="avatar"
										/>
										<AvatarFallback
											onClick={() => {
												fileInputRef.current.click();
											}}
										>
											DB
										</AvatarFallback>
									</Avatar>
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
									className="px-3 py-2 rounded-md w-full"
								/>
								<Textarea
									name="bio"
									id="bio"
									placeholder="Bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="px-3 py-2 rounded-md w-full h-28"
								/>
								<div>
									<Button>Create</Button>
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
						<p className="text-center text-pink-400">Powered by gum</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
