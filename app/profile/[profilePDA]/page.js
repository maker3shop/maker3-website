"use client";

import avatarEmpty from "@/app/assets/images/avatar-empty.svg";
import logo from "@/app/assets/images/logo.svg";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { useGumContext } from "@/context/GumProvider";
import { useProfile } from "@gumhq/react-sdk";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Profile({ params }) {
	const { profilePDA } = params;
	console.log({ profilePDA });

	const sdk = useGumContext();
	const { profile, profileError } = useProfile(sdk, profilePDA);

	React.useEffect(() => {
		console.log({ profile });
	}, [profile]);

	React.useEffect(() => {
		console.log({ profileError });
	}, [profileError]);

	return (
		<div className="bg-[#CDC0FF] min-h-screen">
			<header className="py-14">
				<Container>
					<Link href="/" className="text-2xl font-bold">
						<Image src={logo} alt="Maker3 Logo" width={70} />
					</Link>
				</Container>
			</header>
			<main>
				<section className="py-10">
					<Container>
						<div className="flex items-center gap-6">
							<Image src={avatarEmpty} alt="avatar" width="70" />
							<div className="space-y-2">
								<p className="text-xl text-gray-100">
									{profile?.metadata.data.name}
								</p>
								<p className="text-lg text-gray-200 max-w-md">
									{profile?.metadata.data.bio}
								</p>
							</div>
						</div>
						<Link href="/product/create">
							<Button className="mt-8 bg-[#4E44CE] text-[#CDC0FF] ">
								Create product
							</Button>
						</Link>
					</Container>
				</section>
			</main>
		</div>
	);
}
