import logo from "@/app/assets/images/logo.svg";
import openai from "@/app/assets/images/openai.svg";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Cancel() {
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
						<div className="space-y-6 text-center">
							<h2 className="text-xl font-semibold text-[#4E44CE]">
								The user has cancelled the purchased. &#128532;
							</h2>
							<div className="flex justify-center">
								<Image
									src={openai}
									alt="product banner"
									width={500}
									height={400}
									className="py-8 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
								/>
							</div>
							<p className="text-xl">
								If you would like to purchase again, please go to{" "}
								<Link href="/" className="text-[#2B5EDF]">
									product
								</Link>{" "}
								page.
							</p>
							<p className="text-xl">OR</p>
							<p className="text-xl">
								<Link href="/" className="text-[#2B5EDF]">
									Explore
								</Link>{" "}
								other products.
							</p>
						</div>
					</Container>
				</section>
			</main>
		</div>
	);
}
