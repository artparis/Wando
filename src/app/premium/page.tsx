import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { configLimitFeatures, extraFeatures, levelingFeatures } from "../(dashboard)/premium/features";
import { PremiumPlan } from "../(dashboard)/premium/plan";
import { ComparisonTable } from "../(dashboard)/premium/table";
import { ExternalLink } from "../../components/ExternalLink";
import { TOKEN_COOKIE } from "../../utils/constants";
import { makeApiRequest } from "../../utils/make-api-request";
import { NavbarComponent } from "../../components/navbar/Navbar";

import logoImg from "../../../public/assets/Muzzle.webp";
import lurkrFreeImg from "../../../public/assets/Muzzle.webp";
import lurkrMaxImg from "../../../public/assets/Muzzle.webp";
import lurkrUltimateImg from "../../../public/assets/Muzzle.webp";

export default async function Premium() {
	const token = (await cookies()).get(TOKEN_COOKIE)?.value;
	const currentPlan = token ? await getData(token) : null;

	return (
		<>
			{/* Navbar at the top */}
			<NavbarComponent isDashboard={false} />
			<div className="container mx-auto flex flex-col justify-center">
				<div className="mb-6 flex flex-col items-center gap-4 xl:gap-0">
					<div className="flex flex-col items-center gap-4 xl:flex-row">
						<p className="font-bold text-lg text-shadow-regular xl:whitespace-nowrap xl:text-2xl">
							Unlimited Leveling. Limited Investment.
						</p>
						<Image
							alt="Muzzle logo"
							className="hidden aspect-square size-72 xl:block"
							height={288}
							priority
							src={logoImg}
							width={288}
						/>
						<p className="font-bold text-lg text-shadow-regular xl:whitespace-nowrap xl:text-2xl">
							Premium Status. Premium Support.
						</p>
					</div>

					<main className="flex w-full flex-col items-center">
						<div className="flex flex-col gap-4 lg:flex-row lg:gap-10 xl:gap-16">
							<PremiumPlan
								buttonText="Turn it to Max!"
								funny="Buys you groceries…"
								img={lurkrMaxImg}
								isCurrent={currentPlan?.plan === "Basic"}
								name="Muzzle Max"
								perks={[
									"Personal Premium Muzzle for you!",
									"No tips on /level command for you",
									"Patreon role in Muzzle support server",
									"Premium support",
								]}
								price={1}
								tier={1}
							/>

							<PremiumPlan
								buttonText="Become Ultimate!"
								funny="Helps you pay taxes…"
								img={lurkrUltimateImg}
								isCurrent={currentPlan?.plan === "Guild"}
								name="Muzzle Ultimate"
								perks={[
									"Premium Muzzle for a whole server",
									"Huge increase in configuration limits",
									"Everything from Muzzle Max",
									"Patreon role in Muzzle support server",
									"Premium support",
									"Helps developers maintain Muzzle!",
								]}
								price={5}
								tier={2}
							/>

							<PremiumPlan
								buttonText="Stay Free!"
								funny="Kisses you goodnight…"
								img={lurkrFreeImg}
								isCurrent={currentPlan?.plan === "None"}
								name="Muzzle Free"
								perks={["Standard configuration limits"]}
								price={0}
								regular={["Tips on /level command", "No role in Muzzle support server", "Standard support"]}
								tier={0}
							/>
						</div>

						<p className="max-w-prose text-balance text-center text-white/75">
							Purchases are subject to our <Link href="/terms">Terms of Service</Link> &{" "}
							<Link href="/privacy">Privacy Policy</Link> and to the{" "}
							<ExternalLink href="https://www.patreon.com/policy/legal">Terms of Service</ExternalLink> and{" "}
							<ExternalLink href="https://support.patreon.com/hc/articles/205032045-Patreon-s-refund-policy">
								Refund Policy
							</ExternalLink>{" "}
							of Patreon, Inc.
						</p>

						<h2 className="mt-8 font-bold text-4xl">Compare Muzzle Plans</h2>

						<div className="mt-6 space-y-6">
							<ComparisonTable features={levelingFeatures} section="Leveling" />
							<ComparisonTable features={configLimitFeatures} section="Configuration" />
							<ComparisonTable features={extraFeatures} section="Extras" />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

export const metadata: Metadata = {
	description:
		"Get the most out of Muzzle with our premium plans. Compare the different plans and choose the one that fits your needs.",
	title: "Premium Plans",
};

async function getData(token: string) {
	const response = await makeApiRequest("/users/@me/premium", token, {
		next: {
			revalidate: 2 * 60, // 2 minutes
		},
	});

	if (!response.ok) {
		return null;
	}

	return response.json() as Promise<CurrentPlanResponse>;
}

interface CurrentPlanResponse {
	plan: "None" | "Basic" | "Guild";
}
