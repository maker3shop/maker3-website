import denimAvatar from "@/app/assets/images/denim-avatar.svg";
import logo from "@/app/assets/images/logo.svg";
import rohanAvatar from "@/app/assets/images/rohan-avatar.svg";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";
import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
	return (
		<>
			<header>
				<Container>
					<div className="flex items-center justify-between py-4">
						<Link href="/">
							<Image src={logo} alt="Maker3 logo" width={80} />
						</Link>
						<Link href="/">
							<Button variant="outline" disabled={true}>
								Coming soon
							</Button>
						</Link>
					</div>
				</Container>
			</header>
			<main>
				<section className=" bg-[#E4E4E7]">
					<Container>
						<div className="flex items-center py-28 justify-around">
							<Image src={denimAvatar} alt="user avatar" />
							<div>
								<p className="leading-7 text-xl">
									Hi,
									<br />
									<br />
									My name is Denim.
									<br />
									Co-founder of Maker3.
									<br />
									I am a Fullstack Developer.
									<br />I love building products for consumers.
								</p>
								<div className="mt-8 flex items-center gap-4">
									<Link target="_blank" href="https://twitter.com/denimcodes">
										<Twitter color="black" size="24" />
									</Link>
									<Link target="_blank" href="https://github.com/denimcodes">
										<Github color="black" size="24" />
									</Link>
								</div>
							</div>
						</div>
					</Container>
				</section>
				<section>
					<Container>
						<div className="flex items-center py-28 justify-around">
							<div>
								<p className="leading-7 text-xl">
									Hi,
									<br />
									<br />
									My name is Drac / Rohan Kumar
									<br />
									Co-founder of Maker3.
									<br />
									Working on Solana ecosystem.
									<br />
									Fullstack Developer.
									<br />
									UI/UX Developer.
									<br />
									Video editor.
								</p>
								<div className="mt-8 flex items-center gap-4">
									<Link target="_blank" href="https://twitter.com/0xdrac">
										<Twitter color="black" size="24" />
									</Link>
									<Link target="_blank" href="https://github.com/rohan-201">
										<Github color="black" size="24" />
									</Link>
								</div>
							</div>
							<Image src={rohanAvatar} alt="user avatar" />
						</div>
					</Container>
				</section>
			</main>
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
		</>
	);
}
