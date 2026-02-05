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
	Instagram,
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
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		// Set initial state
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setDrawerOpen(false);
	}, [pathname]);

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				scrolled
					? "bg-background/95 backdrop-blur-xl border-b py-3 shadow-lg"
					: "bg-white/70 dark:bg-transparent backdrop-blur-md py-4",
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
							<div
								className={cn(
									"absolute inset-0 bg-linear-to-br rounded-xl blur transition-opacity",
									scrolled
										? "from-primary to-chart-2 opacity-70"
										: "from-primary/30 to-chart-2/30 dark:from-white/30 dark:to-primary/50 opacity-100",
								)}
							/>
							<div
								className={cn(
									"relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300",
									scrolled
										? "bg-linear-to-br from-primary to-primary/80"
										: "bg-white/80 dark:bg-white/20 backdrop-blur-sm",
								)}
							>
								<Image
									src={logo}
									alt="Kembara UTHM Logo"
									width={64}
									height={200}
									className={cn("transition-opacity", !scrolled && "opacity-90")}
								/>
							</div>
						</div>
						<div className="hidden sm:block">
							<div className="flex flex-col">
								<span
									className={cn(
										"font-bold text-lg tracking-tight transition-colors duration-300",
										scrolled
											? "bg-linear-to-r from-primary via-primary/90 to-chart-2 bg-clip-text text-transparent"
											: "text-foreground dark:text-white drop-shadow-lg",
									)}
								>
									KEMBARA
								</span>
								<span
									className={cn(
										"text-xs tracking-wider transition-colors duration-300",
										scrolled
											? "text-muted-foreground"
											: "text-foreground/80 dark:text-white/80 drop-shadow",
									)}
								>
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
														? scrolled
															? "text-primary bg-primary/10"
															: "text-primary bg-primary/10 dark:text-white dark:bg-white/20"
														: scrolled
															? "text-foreground/80 hover:text-primary hover:bg-accent/50"
															: "text-foreground/90 hover:text-primary hover:bg-white/50 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/15 backdrop-blur-sm",
												)}
											>
												{item.icon}
												<span>{item.label}</span>
												<ChevronDown
													className={cn(
														"h-3 w-3 ml-0.5 transition-transform group-data-[state=open]/nav-item:rotate-180",
														!scrolled && "text-foreground/70 dark:text-white/70",
													)}
												/>
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
												? scrolled
													? "text-primary bg-primary/10"
													: "text-primary bg-primary/10 dark:text-white dark:bg-white/20"
												: scrolled
													? "text-foreground/80 hover:text-primary hover:bg-accent/50"
													: "text-foreground/90 hover:text-primary hover:bg-white/50 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/15 backdrop-blur-sm",
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
							className={cn(
								"lg:hidden rounded-lg transition-colors",
								scrolled
									? "hover:bg-accent/50"
									: "text-foreground/90 hover:text-primary hover:bg-white/50 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/15 backdrop-blur-sm",
							)}
						>
							<Menu className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>

			{/* MOBILE DRAWER */}
			{/* MOBILE DRAWER */}
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerContent className="h-fit rounded-t-2xl border-t border-border/50">
					<div className="overflow-y-auto">
						{/* Header with linear background */}
						<div className="relative overflow-hidden rounded-t-2xl">
							<DrawerHeader className="relative px-6 pt-8 pb-6">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="relative">
											<div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
												<Image
													src={logo}
													alt="Kembara UTHM Logo"
													width={44}
													height={44}
													className="brightness-125"
												/>
											</div>
										</div>
										<div className="flex flex-col items-start">
											<DrawerTitle className="text-xl font-bold bg-linear-to-r from-primary via-primary/90 to-chart-2 bg-clip-text text-transparent">
												Kembara UTHM
											</DrawerTitle>
											<DrawerDescription className="text-xs font-medium text-muted-foreground">
												Adventure & Exploration Club
											</DrawerDescription>
										</div>
									</div>
									<DrawerClose asChild>
										<Button
											variant="ghost"
											size="icon"
											className="rounded-xl hover:bg-background/50 backdrop-blur-sm"
										>
											<X className="h-5 w-5" />
										</Button>
									</DrawerClose>
								</div>
							</DrawerHeader>
						</div>

						<div className="p-6">
							{/* Navigation Items */}
							<nav className="space-y-2 mb-8">
								{navItems.map((item) => (
									<div key={item.label} className="relative">
										{item.dropdown ? (
											<details className="group">
												<summary className="flex items-center justify-between px-4 py-4 rounded-xl cursor-pointer bg-card/50 hover:bg-card border border-transparent hover:border-border/50 transition-all duration-200">
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
															{item.icon}
														</div>
														<div className="text-left">
															<span className="font-semibold text-foreground">
																{item.label}
															</span>
														</div>
													</div>
													<ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
												</summary>
												<div className="ml-12 mt-2 space-y-2 pl-2 border-l-2 border-primary/20">
													{item.dropdown.map((d) => (
														<DrawerClose asChild key={d.label}>
															<Link
																href={d.href}
																className={cn(
																	"flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200",
																	pathname === d.href
																		? "bg-primary/10 text-primary font-medium"
																		: "hover:bg-accent/30 text-muted-foreground hover:text-foreground",
																)}
															>
																<div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
																	{d.icon}
																</div>
																<div>
																	<div className="font-medium">{d.label}</div>
																	{d.description && (
																		<div className="text-xs text-muted-foreground mt-0.5">
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
														"flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200",
														pathname === item.href
															? "bg-primary/10 text-primary border border-primary/20"
															: "bg-card/50 hover:bg-card border border-transparent hover:border-border/50",
													)}
												>
													<div
														className={cn(
															"w-10 h-10 rounded-lg flex items-center justify-center",
															pathname === item.href ? "bg-primary/20" : "bg-primary/10",
														)}
													>
														{item.icon}
													</div>
													<div>
														<span className="font-semibold">{item.label}</span>
													</div>
												</Link>
											</DrawerClose>
										)}
									</div>
								))}
							</nav>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</nav>
	);
}
