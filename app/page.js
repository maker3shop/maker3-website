export default async function Home() {
	return (
		<>
			<div className="bg-[url(./assets/images/hero-bg.svg)] bg-no-repeat bg-center bg-cover">
				<div className="flex flex-col min-h-screen">
					<Header />
					<Hero />
				</div>
			</div>
			<main></main>
		</>
	);
}

function Hero() {
	return (
		<section className="text-white flex-1 relative">
			<div className="container mx-auto max-w-6xl px-8 py-4">
				<div className="grid place-content-center absolute inset-0 space-y-16">
					<h2 className="font-bold text-6xl text-center">
						Open your store on web3
					</h2>
					<p className="text-center text-xl text-gray-300">
						Setup your store. Sell your product. Earn in crypto.
					</p>
					<button className="font-semibold py-3 rounded-lg text-gray-50 text-center place-self-center px-9 bg-black">
						Get started
					</button>
				</div>
			</div>
		</section>
	);
}

function Header() {
	return (
		<header className="text-white">
			<div className="container mx-auto max-w-6xl px-8 py-8">
				<div className="flex justify-between">
					<h1 className="font-bold">Logo</h1>
					<nav>
						<ul>
							<li>Discover</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
