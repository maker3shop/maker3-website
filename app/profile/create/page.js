"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatar from "../../assets/images/avatar.png";
import gumLogo from "../../assets/images/gum-logo.png";
import logo from "../../assets/images/logo.png";

export default function CreateProfile() {
	const [name, setName] = React.useState("");
	const [bio, setBio] = React.useState("");
	const [avatarFile, setAvatarFile] = React.useState("");

	const fileInputRef = React.useRef();

	function handleSubmit(event) {
		event.preventDefault();

		console.log({ name, bio, avatarFile });
	}

	return (
		<div className="bg-dark min-h-screen flex flex-col">
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex justify-between items-center">
					<Link href="/">
						<Image src={logo} alt="Maker3 logo" width={130} />
					</Link>
					<button className="font-semibold py-2 rounded-lg text-gray-50 px-8 bg-slate-700">
						Connect wallet
					</button>
				</div>
			</header>
			<main className="flex-1">
				<section>
					<div className="container mx-auto max-w-6xl px-8 text-white">
						<div className="grid place-content-center">
							<h3 className=" text-2xl text-center">Welcome to Maker3</h3>
							<p className=" text-xl text-gray-400 text-center">
								Create your on-chain profile
							</p>
							<form
								onSubmit={handleSubmit}
								className="flex flex-col items-center space-y-3 mt-8"
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
									className="px-3 py-2 rounded-md bg-input-dark w-full placeholder:text-gray-400 text-gray-200"
								/>
								<textarea
									name="bio"
									id="bio"
									placeholder="Bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="px-3 py-1 rounded-md w-full h-24 bg-input-dark placeholder:text-gray-400 text-gray-200"
								/>
								<button className="font-semibold py-2 rounded-lg text-gray-50 px-20 bg-blue-700">
									Create
								</button>
							</form>
						</div>
					</div>
				</section>
			</main>
			<footer>
				<div className="container mx-auto max-w-6xl py-4 ">
					<div className="flex items-center gap-x-2 justify-center">
						<Image src={gumLogo} alt="Gum logo" />
						<p className="text-center text-pink-200">Powered by gum</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
