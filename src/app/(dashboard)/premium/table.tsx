interface Feature {
	feature: string;
	free: string;
	basic: string;
	guild: string;
}

interface ComparisonTableProps {
	features: Feature[];
	section: string;
}

export function ComparisonTable({ features, section }: ComparisonTableProps) {
	return (
		<div className="w-full max-w-4xl">
			<h3 className="mb-4 text-center text-2xl font-bold">{section}</h3>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-white/20">
							<th className="p-4 text-left font-bold">Feature</th>
							<th className="p-4 text-center font-bold">Free</th>
							<th className="p-4 text-center font-bold">Basic</th>
							<th className="p-4 text-center font-bold">Guild</th>
						</tr>
					</thead>
					<tbody>
						{features.map((feature) => (
							<tr key={feature.feature} className="border-b border-white/10">
								<td className="p-4 font-medium">{feature.feature}</td>
								<td className="p-4 text-center">{feature.free}</td>
								<td className="p-4 text-center">{feature.basic}</td>
								<td className="p-4 text-center">{feature.guild}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
} 