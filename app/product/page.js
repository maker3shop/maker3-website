import Container from "@/components/Container";
import openai from "@/app/assets/images/openai.svg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Text } from "@/components/ui/Typography";

const product = {
	banner: openai,
	owner: "denimcodes",
};

export default function Product() {
	return (
		<div>
			<Container>
				<Image
					src={product.banner}
					alt="Product banner"
					className="w-full mt-12"
				/>
				<div>
					<div className="flex items-center">
						<Avatar className="w-24">
							<AvatarImage src={""} />
							<AvatarFallback>DB</AvatarFallback>
						</Avatar>
						<Text>{product.owner}</Text>
					</div>
				</div>
			</Container>
		</div>
	);
}
