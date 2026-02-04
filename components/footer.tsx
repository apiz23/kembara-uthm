import {
	Mountain,
	MapPin,
	Mail,
	Instagram,
	Facebook,
	Youtube,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					{/* Brand Section */}
					<div className="flex flex-col items-start gap-3">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/10">
								<Mountain className="h-5 w-5 text-primary" />
							</div>
							<div>
								<div className="font-bold text-lg">KEMBARA</div>
								<div className="text-xs text-muted-foreground">UTHM Adventure Club</div>
							</div>
						</div>
						<p className="text-sm text-muted-foreground max-w-xs">
							Exploring nature, building character, creating memories since 2018.
						</p>
					</div>

					{/* Links Section */}
					<div className="space-y-2">
						<div className="text-sm font-medium">Quick Links</div>
						<div className="flex flex-col gap-1">
							<Link
								href="/about"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								About
							</Link>
							<Link
								href="/activities"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Activities
							</Link>
							<Link
								href="/annual-plan"
								className="text-sm text-muted-foreground hover:text-primary transition-colors"
							>
								Annual Plan
							</Link>
						</div>
					</div>
					<div className="space-y-2">
						<div className="text-sm font-medium">Contact</div>
						<div className="flex flex-col gap-1">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<MapPin className="h-3 w-3" />
								<span>UTHM University</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Mail className="h-3 w-3" />
								<span>kembara@uthm.edu.my</span>
							</div>
						</div>
					</div>

					{/* Social Media */}
					<div className="flex flex-col gap-3">
						<div className="text-sm font-medium">Follow Us</div>
						<div className="flex gap-2">
							<a
								href="#"
								className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
							>
								<Instagram className="h-4 w-4 text-muted-foreground" />
							</a>
							<a
								href="#"
								className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
							>
								<Facebook className="h-4 w-4 text-muted-foreground" />
							</a>
							<a
								href="#"
								className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
							>
								<Youtube className="h-4 w-4 text-muted-foreground" />
							</a>
						</div>
					</div>
				</div>

				{/* Divider & Copyright */}
				<div className="mt-8 pt-6 border-t">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
						<div>
							&copy; {new Date().getFullYear()} Kembara UTHM Adventure Club. All rights
							reserved.
						</div>
						<div className="text-xs">
							"SETIAP DETIK, SETIAP LANGKAH, ITULAH KEMBARA"
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
