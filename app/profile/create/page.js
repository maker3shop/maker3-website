"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "../../assets/images/avatar.png";
import gumLogo from "../../assets/images/gum-logo.png";
import logo from "../../assets/images/logo.png";

export default function CreateProfile() {
	return (
		<div className="bg-dark min-h-screen flex flex-col">
			<header>
				<div className="container mx-auto max-w-6xl p-8">
					<Link href="/">
						<Image src={logo} alt="Maker3 logo" width={130} />
					</Link>
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
							<form className="flex flex-col items-center space-y-3 mt-8">
								<Image
									src={avatar}
									alt="Upload avatar"
									className="mb-4"
									width={70}
								/>
								<input
									name="name"
									id="name"
									type="text"
									placeholder="Name"
									className="px-3 py-2 rounded-md bg-input-dark w-full placeholder:text-gray-400 text-gray-200"
								/>
								<textarea
									name="bio"
									id="bio"
									placeholder="Bio"
									className="px-3 py-1 rounded-md w-full h-24 bg-input-dark placeholder:text-gray-400 text-gray-200"
								/>
								<button className="font-semibold py-2 rounded-lg text-gray-50 px-20 bg-blue-700">
									Connect Wallet
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
