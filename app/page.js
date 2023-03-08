import chart from "@/app/assets/images/chart.svg";
import coins from "@/app/assets/images/coins.svg";
import dashboardPreview from "@/app/assets/images/dashboard-preview.svg";
import logo from "@/app/assets/images/logo.svg";
import shop from "@/app/assets/images/shop.svg";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { Heading2, Text } from "@/components/ui/Typography";
import { Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	return (
		<>
			<header>
				<Container>
					<div className="flex items-center py-4 justify-around">
						<Link href="/" className="text-xl font-bold">
							<Image src={logo} alt="Maker3 logo" width={80} />
						</Link>
						<Link href="/">
							<Button variant="link">Discover products</Button>
						</Link>
						<Link href="/">
							<Button variant="link">About us</Button>
						</Link>
						<Button variant="outline">Start selling</Button>
					</div>
				</Container>
			</header>
			<main>
				<section className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
					<Container>
						<div className="h-[650px] text-center pt-24">
							<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-8xl text-white drop-shadow-[2px_2px_7px_rgba(0,0,0,0.15)]">
								Open your store on Web3
							</h1>
							<p className="leading-7 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.25)] text-2xl text-white mt-20">
								One way stop for creators to sell digital products and services
							</p>
							<Button
								className="place-self-center mt-20 drop-shadow-[3px_3px_4px_rgba(0,0,0,0.25)]"
								size="lg"
							>
								Start selling
							</Button>
						</div>
					</Container>
				</section>
				<div className="grid place-content-center mt-[-150px]">
					<Image
						src={dashboardPreview}
						alt="Hero image of dashboard page"
						width={800}
					/>
				</div>
				<section className="bg-[#E4E4E7] mt-8">
					<Container>
						<div className="flex flex-1 py-14 items-center justify-around">
							<Image src={shop} width={300} alt="Open on-chain store" />
							<div className="max-w-sm">
								<Heading2>Open your on-chain store today</Heading2>
								<Text>
									Create a product, setup your store and start selling to your
									audience.
								</Text>
							</div>
						</div>
					</Container>
				</section>
				<section>
					<Container>
						<div className="flex flex-1 py-14 items-center justify-around">
							<div className="max-w-sm">
								<Heading2>Grow your product</Heading2>
								<Text>
									We provide tools and analytics so you can use data to improve
									your product.
								</Text>
							</div>
							<Image src={chart} width={280} alt="Open on-chain store" />
						</div>
					</Container>
				</section>
				<section className="bg-[#E4E4E7]">
					<Container>
						<div className="flex flex-1 py-16 items-center justify-around">
							<Image src={coins} width={280} alt="Open on-chain store" />
							<div className="max-w-sm">
								<Heading2>Earn in SPL tokens</Heading2>
								<Text>
									Simply provide your wallet address where you would like to be
									paid and the payment from product purchase by user will be
									instantly settled and sent to your wallet.{" "}
								</Text>
							</div>
						</div>
					</Container>
				</section>
				<section>
					<Container>
						<div className="p-20 grid place-content-center w-[960px] mx-auto bg-[#987DFF] rounded-lg mt-[-32px] drop-shadow-[3px_3px_4px_rgba(0,0,0,0.45)]">
							<h2 className="text-5xl text-center text-white">
								What are you waiting for?
							</h2>
							<div className="flex justify-around items-center mt-12">
								<Button className="bg-white text-[#5429F2] px-10 py-6 hover:bg-white hover:opacity-70">
									Start selling
								</Button>
								<Button
									variant="outline"
									className="text-white border-white border-2 px-10 py-6 hover:bg-[#987dff] hover:opacity-70"
								>
									Discover products
								</Button>
							</div>
						</div>
					</Container>
				</section>
				<footer>
					<Container>
						<div className="flex items-center justify-between py-12">
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
			</main>
		</>
	);
}
