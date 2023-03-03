import Image from "next/image";
import Link from "next/link";
import featureOne from "./assets/images/feature-one.png";
import featureThree from "./assets/images/feature-three.png";
import featureTwo from "./assets/images/feature-two.png";
import logo from "./assets/images/logo.png";

export default async function Home() {
	return (
		<>
			<div className="bg-[url(./assets/images/hero-bg.svg)] bg-no-repeat bg-center bg-cover">
				<div className="flex flex-col min-h-screen">
					<Header />
					<Hero />
				</div>
			</div>
			<main className="bg-dark text-white">
				<section className="bg-gradient-to-b from-[#2d244f]">
					<div className="container mx-auto max-w-6xl px-8 py-28 flex items-center justify-between">
						<div className="space-y-3 max-w-sm text-center">
							<h3 className="font-bold text-4xl bg-gradient-to-r from-[#9270c4] via-[#f7c2b2] to-[#e4c745]  text-transparent bg-clip-text">
								On-chain store
							</h3>
							<p className="text-xl text-gray-300">
								Create a product, setup your store and start selling to your
								audience.
							</p>
						</div>
						<Image src={featureOne} alt="On-chain store" width={400} />
					</div>
				</section>
				<section>
					<div className="container mx-auto max-w-6xl px-8 py-28 flex items-center justify-between">
						<Image src={featureTwo} alt="On-chain store" width={400} />
						<div className="space-y-3 max-w-sm text-center">
							<h3 className="font-bold text-3xl bg-gradient-to-r from-[#9270c4] via-[#f7c2b2] to-[#e4c745]  text-transparent bg-clip-text">
								Grow your product
							</h3>
							<p className="text-lg text-gray-300">
								We provide tools and analytics so you can use data to improve
								your product.
							</p>
						</div>
					</div>
				</section>
				<section>
					<div className="container mx-auto max-w-6xl px-8 py-28 flex items-center justify-between">
						<div className="space-y-3 max-w-sm text-center">
							<h3 className="font-bold text-3xl bg-gradient-to-r from-[#9270c4] via-[#f7c2b2] to-[#e4c745]  text-transparent bg-clip-text">
								Earn in crypto
							</h3>
							<p className="text-lg text-gray-300">
								Accept payments in cryptocurrency. Payments can be settled in
								SOL, USDC and USDT.
							</p>
						</div>
						<Image src={featureThree} alt="On-chain store" width={400} />
					</div>
				</section>
			</main>
		</>
	);
}

function Hero() {
	return (
		<section className="text-white flex-1 relative">
			<div className="container mx-auto max-w-6xl px-8 py-4">
				<div className="grid place-content-center absolute inset-0 space-y-16">
					<h2 className="font-bold text-6xl text-center bg-gradient-to-b from-white via-white text-transparent bg-clip-text">
						Open your store on web3
					</h2>
					<p className="text-center text-xl text-gray-300 bg-gradient-to-b from-white via-white text-transparent bg-clip-text">
						Setup your store. Sell your product. Earn in crypto.
					</p>
					<Link href="/profile/create" className="place-self-center">
						<button className="font-semibold text-xl py-3 rounded-lg text-gray-50 px-20 bg-black opacity-70 shadow-2xl shadow-[#5429f2]">
							Get started
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}

function Header() {
	return (
		<header className="text-white">
			<div className="container mx-auto max-w-6xl p-8">
				<div className="flex justify-between items-center">
					<Link href="/">
						<Image src={logo} alt="Maker3 Logo" width={130} />
					</Link>
					<nav>
						<ul>
							<li>
								<Link
									className="text-xl font-semibold bg-gradient-to-r from-[#9270c4] via-[#f7c2b2] to-[#e4c745]  text-transparent bg-clip-text"
									href="/"
								>
									Discover
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
