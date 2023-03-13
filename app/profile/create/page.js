"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useGumContext } from "@/context/GumProvider";
import avatarEmpty from "@/public/images/avatar-empty.svg";
import gumLogo from "@/public/images/gum-logo.png";
import logo from "@/public/images/logo.svg";
import { useCreateProfile, useCreateUser } from "@gumhq/react-sdk";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { IpfsUploader, ThirdwebStorage } from "@thirdweb-dev/storage";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function CreateProfile() {
	const [isProfileCreated, setProfileCreated] = React.useState("");
	const wallet = useWallet();

	const sdk = useGumContext();
	const { create: createUser, userPDA, isCreatingUser } = useCreateUser(sdk);

	React.useEffect(() => {
		console.log("Wallet: ", wallet.publicKey?.toString());
	}, [wallet]);

	React.useEffect(() => {
		console.log("User PDA: ", userPDA?.toString());
	}, [userPDA]);

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
							<p className="text-2xl text-[#7A57FF] mb-8">
								Create your on-chain profile
							</p>
							{userPDA && !isCreatingUser ? (
								<ProfileForm
									sdk={sdk}
									owner={wallet.publicKey}
									userPDA={userPDA}
								/>
							) : (
								<Button
									loading={!!isCreatingUser}
									disabled={!!isCreatingUser}
									onClick={async () => await createUser(wallet.publicKey)}
									className="bg-[#4E44CE] text-[#CDC0FF] "
								>
									{isCreatingUser && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Create user
								</Button>
							)}
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

function ProfileForm({ sdk, userPDA, owner }) {
	const [name, setName] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [bio, setBio] = React.useState("");
	const [avatarFile, setAvatarFile] = React.useState("");
	const [uploadStatus, setUploadStatus] = React.useState(""); // loading, success, error

	const fileInputRef = React.useRef();

	const router = useRouter();

	const { create, profilePDA, createProfileError, isCreatingProfile } =
		useCreateProfile(sdk);

	const uploader = new IpfsUploader({
		uploadWithGatewayUrl: true,
	});
	const storage = new ThirdwebStorage({ uploader });

	React.useEffect(() => {
		if (!profilePDA) return;

		console.log("Profile PDA: ", profilePDA.toString());
		if (!isCreatingProfile) {
			router.push(`profile/${profilePDA}`);
		}
	}, [profilePDA, router, isCreatingProfile]);

	async function handleSubmit(event) {
		event.preventDefault();
		console.log({ username, name, bio, avatarFile });

		setUploadStatus("loading");
		const avatarUrl = await uploadAvatar();
		if (!avatarUrl) return;
		console.log({ avatarUrl });

		const metadataUrl = await uploadMetadata(avatarUrl);
		if (!metadataUrl) return;
		console.log({ metadataUrl });
		setUploadStatus("success");

		await create(metadataUrl, "Professional", userPDA, owner);
	}

	async function uploadMetadata(avatarUrl) {
		const metadata = {
			username,
			name,
			bio,
			website: "Maker3",
			avatar: avatarUrl,
		};

		const uri = await storage.upload(metadata);
		const url = storage.resolveScheme(uri);
		return url;
	}

	async function uploadAvatar() {
		if (!avatarFile || avatarFile.length === 0) {
			alert("Please upload an avatar file");
			return;
		}
		const avatarUri = await storage.upload({ avatar: avatarFile });
		return storage.resolveScheme(avatarUri);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-y-3 w-80"
		>
			<div className="mb-4 flex items-center flex-col">
				<Image
					id="avatar"
					src={avatarFile || avatarEmpty}
					alt="avatar"
					onClick={() => {
						fileInputRef.current.click();
					}}
					width={70}
					height={70}
					className="cursor-pointer rounded-full"
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
				name="username"
				id="username"
				type="text"
				placeholder="Username"
				value={username}
				required={true}
				onChange={(e) => setUsername(e.target.value)}
				className="px-3 py-2 rounded-md w-full bg-[#5B5B5B] text-[#CDC0FF]"
			/>
			<Input
				name="name"
				id="name"
				type="text"
				placeholder="Name"
				value={name}
				required={true}
				onChange={(e) => setName(e.target.value)}
				className="px-3 py-2 rounded-md w-full bg-[#5B5B5B] text-[#CDC0FF]"
			/>
			<Textarea
				name="bio"
				id="bio"
				placeholder="Bio"
				value={bio}
				required={true}
				onChange={(e) => setBio(e.target.value)}
				className="px-3 py-2 rounded-md w-full h-28 bg-[#5B5B5B] text-[#CDC0FF]"
			/>
			<div className="mt-4">
				<Button
					disabled={uploadStatus === "loading" || isCreatingProfile}
					className="bg-[#4E44CE] text-[#CDC0FF] px-16"
				>
					{uploadStatus === "loading" || isCreatingProfile ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : undefined}
					{uploadStatus === "loading" ? "Uploading metadata" : undefined}
					{isCreatingProfile ? "Creating profile" : undefined}
					{uploadStatus !== "loading" && !isCreatingProfile
						? "Create"
						: undefined}
				</Button>
			</div>
		</form>
	);
}
