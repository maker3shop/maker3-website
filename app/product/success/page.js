import logo from "@/public/images/logo.svg";
import openai from "@/public/images/openai.svg";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
	return (
		<div className="bg-[#cdc0ff] min-h-screen flex flex-col">
			<header className="py-8">
				<Container>
					<Link href="/" className="text-2xl font-bold">
						<Image src={logo} alt="Maker3 Logo" width={70} />
					</Link>
				</Container>
			</header>
			<main className="flex-1 ">
				<section>
					<Container>
						<div className="space-y-16">
							<h2 className="text-xl font-semibold text-center text-[#4E44CE]">
								Congrats! Your purchase is successful &#127881;
							</h2>
							<h3 className="text-xl font-semibold">Item purchased</h3>
							<div className="flex items-center gap-6">
								<Image
									src={openai}
									alt="product image"
									width={100}
									height={100}
									className="drop-shadow-[3px_3px_4px_rgba(0,0,0,0.25)]"
								/>
								<div className="text-xl">
									<p>
										Product title:{" "}
										<span className="font-semibold text-[#7A57FF]">
											OpenAI Template Starter Kit for ChatGPT
										</span>
									</p>
									<p>
										Price:{" "}
										<span className="font-semibold text-[#7A57FF]">
											6.7 SOL
										</span>
									</p>
								</div>
							</div>
							<div className="text-center">
								<Button className="bg-[#4E44CE] text-[#CDC0FF] ">
									Download
								</Button>
							</div>
						</div>
					</Container>
				</section>
			</main>
		</div>
	);
}
