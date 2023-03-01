"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../assets/images/logo.png";

export default function CreaeProductPage() {
	return (
		<div className="bg-black min-h-screen flex flex-col">
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex items-center justify-between">
					<Link href="/">
						<Image src={logo} alt="Maker3 logo" width={130} />
					</Link>
					<p className=" text-gray-400">C8MxGwhe53cdK.....4vdWULZtyc1Hqnkbgn</p>
				</div>
			</header>
			<main className="flex-1">
				<section className="mt-16">
					<div className="container mx-auto max-w-6xl px-8 text-white">
						<div className="grid place-content-center">
							<p className="text-xl text-semibold text-gray-400 text-center mb-1">
								Create product
							</p>
							<form className="flex flex-col items-center space-y-3 mt-8 w-72">
								<div className="space-y-2 flex flex-col w-full">
									<label id="name" className="text-gray-300">
										Title
									</label>
									<input
										name="title"
										id="title"
										type="text"
										placeholder="Your project title"
										className="px-3 py-1 rounded-md bg-gray-50 opacity-10"
									/>
								</div>
								<div className="space-y-2 flex flex-col w-full">
									<label id="price" className="text-gray-300">
										Price
									</label>
									<input
										name="price"
										id="price"
										type="text"
										placeholder="in USDC"
										className="px-3 py-1 rounded-md bg-gray-50 opacity-10"
									/>
								</div>
								<div className="space-y-2 flex flex-col w-full">
									<label id="description" className="text-gray-300">
										Description
									</label>
									<textarea
										name="description"
										id="description"
										placeholder="Tell us about your project"
										className="px-3 py-1 rounded-md bg-gray-50 opacity-10 h-32"
									/>
								</div>
								<div>
									<button className="font-semibold py-2 rounded-lg text-gray-50 px-20 bg-blue-700 mt-4">
										Publish
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
