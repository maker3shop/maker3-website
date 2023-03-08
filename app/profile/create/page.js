"use client";

import { useCreateProfile, useCreateUser } from "@gumhq/react-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGumContext } from "../../../context/GumProvider";
import avatar from "../../assets/images/avatar.png";
import gumLogo from "../../assets/images/gum-logo.png";
import logo from "../../assets/images/logo.png";

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
						Maker3
					</Link>
					<WalletMultiButton />
				</div>
			</header>
			<main className="flex-1">
				<section>
					<div className="container mx-auto max-w-6xl px-8">
						<div className="grid place-content-center">
							<h3 className="text-2xl text-semibold text-transparent bg-clip-text text-center mb-[0.5]">
								Welcome to Maker3
							</h3>
							<p className=" text-xl text-center ">
								Create your on-chain profile
							</p>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center gap-y-3 mt-8 w-80"
							>
								<div className="mb-4 flex items-center flex-col">
									<Image
										id="avatar"
										src={avatarFile || avatar}
										onClick={() => {
											fileInputRef.current.click();
										}}
										alt="avatar"
										width={70}
										height={70}
									/>
									<input
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
								<input
									name="name"
									id="name"
									type="text"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="px-3 py-2 rounded-md w-full"
								/>
								<textarea
									name="bio"
									id="bio"
									placeholder="Bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="px-3 py-2 rounded-md w-full h-28 text-2xl"
								/>
								<div>
									<button className="font-semibold py-2 rounded-lg px-20 mt-5">
										Create
									</button>
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
						<p className="text-center">Powered by gum</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
