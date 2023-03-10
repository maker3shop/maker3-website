"use client";

import logo from "@/app/assets/images/logo.svg";
import openai from "@/app/assets/images/openai.svg";
import Container from "@/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const product = {
	banner: openai,
	owner: "denimcodes",
	title: "Open AI Template",
	description:
		"The project comes with a Frontend web interface and backend with a database ready to go with all the requirements you would need to create your own project. This starter kit is made for demo and use purposes as a way to kickstart your own project. No responsibility is made for debugging, bugs, security or issues which will need to be applied at your applied as your responsibility.",
	price: 6.7,
};

export default function Product() {
	return (
		<>
			<header>
				<div className="container mx-auto max-w-6xl p-8 flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						<Image src={logo} alt="Maker3 Logo" />
					</Link>
					<WalletMultiButton />
				</div>
			</header>
			<div>
				<Container>
					<Image src={product.banner} alt="Product banner" className="w-full" />
					<main className="flex gap-4">
						<div className="flex-1">
							<div className="flex items-center py-8 gap-4">
								<Avatar className="w-10 h-10">
									<AvatarImage src={""} />
									<AvatarFallback>DB</AvatarFallback>
								</Avatar>
								<p className="text-xl">{product.owner}</p>
							</div>
							<section className="mb-8">
								<h3 className="text-2xl font-semibold">Title</h3>
								<p className="text-xl">{product.title}</p>
								<h3 className="text-2xl font-semibold mt-8">Description</h3>
								<p className="text-xl">{product.description}</p>
							</section>
						</div>
						<aside className="p-4 text-center drop-shadow-lg space-y-4 mt-8 self-start bg-blue-100 rounded-md">
							<h4 className="text-xl font-semibold">{product.title}</h4>
							<p className="text-2xl">{`${product.price} SOL`}</p>
							<Button>Buy</Button>
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
