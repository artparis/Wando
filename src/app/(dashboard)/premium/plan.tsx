import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

interface PremiumPlanProps {
	buttonText: string;
	funny: string;
	img: string | StaticImageData;
	isCurrent: boolean;
	name: string;
	perks: string[];
	price: number;
	tier: number;
	regular?: string[];
}

export function PremiumPlan({
	buttonText,
	funny,
	img,
	isCurrent,
	name,
	perks,
	price,
	tier,
	regular,
}: PremiumPlanProps) {
	return (
		<div className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
			<Image
				alt={`${name} plan`}
				className="aspect-square size-32"
				height={128}
				priority
				src={img}
				width={128}
			/>

			<div className="flex flex-col items-center gap-2">
				<h3 className="font-bold text-2xl">{name}</h3>
				<p className="text-center text-white/75">{funny}</p>
			</div>

			<div className="flex flex-col items-center gap-2">
				<div className="flex items-center gap-1">
					<span className="text-3xl font-bold">${price}</span>
					<span className="text-white/75">/month</span>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				{perks.map((perk) => (
					<div key={perk} className="flex items-center gap-2">
						<span className="text-green-400">✅</span>
						<span className="text-sm">{perk}</span>
					</div>
				))}
				{regular?.map((item) => (
					<div key={item} className="flex items-center gap-2">
						<span className="text-white/50">❌</span>
						<span className="text-sm text-white/50">{item}</span>
					</div>
				))}
			</div>

			<Link
				className={`rounded-lg px-6 py-2 font-bold transition-colors ${
					isCurrent
						? "bg-green-500 text-black hover:bg-green-400"
						: "bg-blue-500 text-white hover:bg-blue-400"
				}`}
				href={
					name === "Muzzle Free"
						? "https://discord.com/oauth2/authorize?client_id=1321940665667551272"
						: `https://www.patreon.com/join/muzzlebot?selected_tier=${tier}`
				}
				target={name === "Muzzle Free" ? "_blank" : undefined}
			>
				{isCurrent ? "Current Plan" : buttonText}
			</Link>
		</div>
	);
} 