"use client";

import avatarEmpty from "@/app/assets/images/avatar-empty.svg";
import logo from "@/app/assets/images/logo.svg";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
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
								<p className="text-xl text-gray-100">Drac</p>
								<p className="text-lg text-gray-200 max-w-md">
									I fell in love with programming and I have atleast learnt
									something I think
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
