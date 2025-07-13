import Link from "next/link";

interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
	return (
		<Link
			className={`text-blue-400 hover:text-blue-300 underline ${className}`}
			href={href}
			rel="noopener noreferrer"
			target="_blank"
		>
			{children}
		</Link>
	);
} 