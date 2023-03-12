"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/logo.svg";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Heading3, Text } from "@/components/ui/Typography";

export default function CreaeProductPage() {
	return (
		<div className="bg-dark min-h-screen flex flex-col">
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
							<Heading3>Create product</Heading3>
							<form className="flex flex-col items-center space-y-3 mt-8 w-96">
								<div className="w-full h-28 grid place-content-center bg-gray-200 text-gray-800 rounded-md mb-4">
									<Text>Upload product banner</Text>
								</div>
								<div className="space-y-2 flex flex-col w-full">
									<Input
										name="title"
										id="title"
										type="text"
										placeholder="Title"
									/>
								</div>
								<div className="space-y-2 flex flex-col w-full">
									<Input
										name="price"
										id="price"
										type="text"
										placeholder="Price"
									/>
								</div>
								<div className="space-y-2 flex flex-col w-full">
									<Textarea
										name="description"
										id="description"
										placeholder="Description"
										className="h-28"
									/>
								</div>
								<div>
									<Button>Publish</Button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
