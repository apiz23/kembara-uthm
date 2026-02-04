"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Mountain,
	ChevronDown,
	Home,
	Camera,
	Calendar,
	Users,
	Mail,
	Sparkles,
	Globe,
	Target,
	MapPin,
	Menu,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerClose,
} from "@/components/ui/drawer";
import { CmdSearch } from "./cmd";
import logo from "@/public/icon/apple-touch-icon.png";
import Image from "next/image";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

/* ================= FEATURE FLAGS ================= */
const FEATURES = {
	activities: false,
};

/* ================= TYPES ================= */
interface NavItem {
	label: string;
	href: string;
	icon?: React.ReactNode;
	dropdown?: {
		label: string;
		href: string;
		description?: string;
		icon?: React.ReactNode;
	}[];
}

/* ================= NAV ITEMS ================= */
const navItems: NavItem[] = [
	{
		label: "Home",
		href: "/",
		icon: <Home className="h-4 w-4" />,
	},
	{
		label: "About",
		href: "/about",
		icon: <Target className="h-4 w-4" />,
	},
	// {
	// 	label: "Activities",
	// 	href: "/activities",
	// 	icon: <MapPin className="h-4 w-4" />,
	// },
	{
		label: "Annual Plan",
		href: "/annual-plan",
		icon: <Calendar className="h-4 w-4" />,
	},
	{
		label: "Gallery",
		href: "/gallery",
		icon: <Camera className="h-4 w-4" />,
	},
	{
		label: "Contact",
		href: "/contact",
		icon: <Mail className="h-4 w-4" />,
	},
];

/* ================= COMPONENT ================= */
export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setDrawerOpen(false);
	}, [pathname]);

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled ? "backdrop-blur-xl border-b shadow-lg py-3" : "border-b py-4",
			)}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between">
					{/* LOGO */}
					<Link
						href="/"
						className="flex items-center gap-3 group transition-transform hover:scale-105"
					>
						<div className="relative w-10 h-10">
							<div className="absolute inset-0 bg-linear-to-br from-primary to-chart-2 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity" />
							<div className="relative w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
								<Image src={logo} alt="Kembara UTHM Logo" width={64} height={200} />
							</div>
						</div>
						<div className="hidden sm:block">
							<div className="flex flex-col">
								<span className="font-bold text-lg tracking-tight bg-linear-to-r from-primary via-primary/90 to-chart-2 bg-clip-text text-transparent">
									KEMBARA
								</span>
								<span className="text-xs text-muted-foreground tracking-wider">
									UTHM ADVENTURE
								</span>
							</div>
						</div>
					</Link>

					{/* DESKTOP NAVIGATION */}
					<div className="hidden lg:flex items-center gap-1">
						{navItems.map((item) => (
							<div key={item.label} className="relative">
								{item.dropdown ? (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className={cn(
													"px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-all duration-200 group/nav-item",
													pathname === item.href || pathname.startsWith(item.href + "/")
														? "text-primary bg-primary/10"
														: "text-foreground/80 hover:text-primary hover:bg-accent/50",
												)}
											>
												{item.icon}
												<span>{item.label}</span>
												<ChevronDown className="h-3 w-3 ml-0.5 transition-transform group-data-[state=open]/nav-item:rotate-180" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											className="min-w-56 rounded-lg p-2 border shadow-lg bg-background"
											align="start"
										>
											<DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground">
												{item.label}
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											{item.dropdown.map((d) => (
												<DropdownMenuItem key={d.label} asChild className="p-0">
													<Link
														href={d.href}
														className={cn(
															"flex items-start gap-3 px-3 py-3 rounded-md cursor-pointer transition-colors w-full",
															pathname === d.href
																? "bg-primary/10 text-primary"
																: "hover:bg-accent",
														)}
													>
														<div className="mt-0.5">{d.icon}</div>
														<div className="flex-1">
															<div className="font-medium">{d.label}</div>
															{d.description && (
																<div className="text-xs text-muted-foreground mt-0.5">
																	{d.description}
																</div>
															)}
														</div>
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								) : (
									<Button
										variant="ghost"
										asChild
										className={cn(
											"px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-colors",
											pathname === item.href
												? "text-primary bg-primary/10"
												: "text-foreground/80 hover:text-primary hover:bg-accent/50",
										)}
									>
										<Link href={item.href}>
											{item.icon}
											<span>{item.label}</span>
										</Link>
									</Button>
								)}
							</div>
						))}
					</div>

					{/* RIGHT ACTIONS */}
					<div className="flex items-center gap-2">
						<CmdSearch />
						<AnimatedThemeToggler />

						{/* MOBILE MENU BUTTON */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setDrawerOpen(true)}
							className="lg:hidden rounded-lg hover:bg-accent/50"
						>
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>

			{/* MOBILE DRAWER */}
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerContent className="h-fit">
					<div className="overflow-y-auto">
						<DrawerHeader className="px-4 pt-6 pb-4 border-b">
							<div className="flex items-center justify-between">
								<div>
									<DrawerTitle className="text-lg font-bold bg-linear-to-r from-primary via-primary/90 to-chart-2 bg-clip-text text-transparent">
										Kembara UTHM
									</DrawerTitle>
									<DrawerDescription className="text-xs">
										Adventure & Exploration Club
									</DrawerDescription>
								</div>
								<DrawerClose asChild>
									<Button
										variant="ghost"
										size="icon"
										className="rounded-lg hover:bg-accent/50"
									>
										<X className="h-5 w-5" />
									</Button>
								</DrawerClose>
							</div>
						</DrawerHeader>

						<div className="p-4">
							<nav className="space-y-1">
								{navItems.map((item) => (
									<div
										key={item.label}
										className="border-t first:border-t-0 pt-3 first:pt-0"
									>
										{item.dropdown ? (
											<details className="group">
												<summary className="flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors">
													<div className="flex items-center gap-3">
														{item.icon}
														<span className="font-medium">{item.label}</span>
													</div>
													<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
												</summary>
												<div className="ml-10 mt-2 space-y-2">
													{item.dropdown.map((d) => (
														<DrawerClose asChild key={d.label}>
															<Link
																href={d.href}
																className={cn(
																	"flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
																	pathname === d.href
																		? "bg-primary/10 text-primary"
																		: "hover:bg-accent/50",
																)}
															>
																{d.icon}
																<div>
																	<div className="font-medium">{d.label}</div>
																	{d.description && (
																		<div className="text-xs text-muted-foreground">
																			{d.description}
																		</div>
																	)}
																</div>
															</Link>
														</DrawerClose>
													))}
												</div>
											</details>
										) : (
											<DrawerClose asChild>
												<Link
													href={item.href}
													className={cn(
														"flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors",
														pathname === item.href
															? "bg-primary/10 text-primary"
															: "hover:bg-accent/50",
													)}
												>
													{item.icon}
													<span>{item.label}</span>
												</Link>
											</DrawerClose>
										)}
									</div>
								))}
							</nav>

							{/* Footer section */}
							<div className="mt-8 pt-6 border-t">
								<div className="flex items-center justify-between">
									<div className="text-sm text-muted-foreground">
										<p className="font-medium">Kembara UTHM Adventure</p>
										<p className="text-xs mt-1">© 2024 All rights reserved</p>
									</div>
									<div className="flex items-center gap-2">
										<Button variant="ghost" size="icon" className="rounded-full">
											<Globe className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="icon" className="rounded-full">
											<Mail className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</nav>
	);
}
