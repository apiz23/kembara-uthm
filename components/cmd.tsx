"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	Search,
	X,
	Mountain,
	Calendar,
	Users,
	MapPin,
	Sparkles,
	TrendingUp,
	Clock,
	Compass,
	Command,
	ArrowRight,
	Globe,
	Hash,
	Camera,
	UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "./ui/input";

interface QuickAction {
	label: string;
	icon: React.ElementType;
	shortcut: string;
	action: () => void;
}

interface RecentSearch {
	query: string;
	timestamp: string;
	icon: React.ElementType;
}

interface Category {
	label: string;
	icon: React.ElementType;
	color: string;
	bgColor: string;
	description: string;
}

export function CmdSearch() {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [recentSearches] = useState<RecentSearch[]>([
		{ query: "Gunung Ledang", timestamp: "2 hours ago", icon: Mountain },
		{ query: "Camping Gear", timestamp: "Yesterday", icon: Compass },
		{ query: "Team Building", timestamp: "3 days ago", icon: Users },
		{ query: "Night Trekking", timestamp: "1 week ago", icon: Clock },
		{ query: "Photography", timestamp: "2 weeks ago", icon: Camera },
	]);
	const router = useRouter();

	const categories: Category[] = [
		{
			label: "Hiking",
			icon: Mountain,
			color: "bg-chart-1",
			bgColor: "bg-chart-1/10",
			description: "Mountain expeditions & trails",
		},
		{
			label: "Events",
			icon: Calendar,
			color: "bg-chart-2",
			bgColor: "bg-chart-2/10",
			description: "Upcoming activities",
		},
		{
			label: "Members",
			icon: Users,
			color: "bg-chart-3",
			bgColor: "bg-chart-3/10",
			description: "Team profiles",
		},
		{
			label: "Locations",
			icon: MapPin,
			color: "bg-chart-4",
			bgColor: "bg-chart-4/10",
			description: "Explore destinations",
		},
		{
			label: "Annual Plan",
			icon: Globe,
			color: "bg-primary",
			bgColor: "bg-primary/10",
			description: "2026 schedule",
		},
		{
			label: "Gallery",
			icon: Camera,
			color: "bg-chart-5",
			bgColor: "bg-chart-5/10",
			description: "Photo collection",
		},
	];

	const navigationItems = [
		{ label: "Home", path: "/", icon: Compass, description: "Main dashboard" },
		{
			label: "About",
			path: "/about",
			icon: UserCircle,
			description: "Our story & mission",
		},
		{
			label: "Activities",
			path: "/activities",
			icon: Mountain,
			description: "All adventures",
		},
		{
			label: "Annual Plan",
			path: "/annual-plan",
			icon: Calendar,
			description: "2026 schedule",
		},
		{
			label: "Gallery",
			path: "/gallery",
			icon: Camera,
			description: "Photo collection",
		},
		{
			label: "Contact",
			path: "/contact",
			icon: Users,
			description: "Get in touch",
		},
	];

	// Keyboard shortcut: Ctrl / Cmd + K
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((open) => !open);
			}
			if (e.key === "Escape" && open) {
				e.preventDefault();
				setOpen(false);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [open]);

	const handleNavigation = (path: string) => {
		router.push(path);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* Search Icon Button */}
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative rounded-xl border-2 border-border hover:border-ring/50 hover:bg-accent/50 hover:scale-105 transition-all duration-200 group"
				>
					<Search className="h-4 w-4 transition-transform group-hover:scale-110" />
				</Button>
			</DialogTrigger>

			{/* Command Palette */}
			<DialogContent className="p-0 max-w-3xl sm:max-w-3xl overflow-hidden border-2 border-border rounded-3xl shadow-2xl bg-card/95 backdrop-blur-sm">
				<div className="flex flex-col max-h-[80vh] bg-background">
					{/* Header */}
					<div className="p-6 border-b-2 border-border">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="p-2.5 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border-2 border-primary/20">
									<Image
										src="/icon/android-chrome-512x512.png"
										alt="Kembara Logo"
										width={32}
										height={32}
										className="object-contain"
									/>
								</div>
								<div>
									<DialogTitle className="text-2xl font-bold bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
										Command Search
									</DialogTitle>
									<div className="text-sm text-muted-foreground flex items-center gap-2">
										<Command className="h-3 w-3" />
										Press Ctrl/Cmd + K anytime to search
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Search Input */}
					<div className="p-6 border-b-2 border-border">
						<div className="relative">
							<div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
							<Input
								type="text"
								placeholder="Search adventures, members, events, locations..."
								className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-border focus:border-ring focus:ring-2 focus:ring-ring/20 bg-card relative z-10 group"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								autoFocus
							/>
							{searchQuery && (
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setSearchQuery("")}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-xl z-10"
								>
									<X className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-hidden">
						{searchQuery ? (
							<div className="p-6 overflow-y-auto h-full">
								{/* Search Results */}
								<div className="space-y-4">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-bold text-foreground flex items-center gap-2">
											<Sparkles className="h-4 w-4 text-primary" />
											Search Results
										</h3>
										<Badge variant="outline" className="text-sm font-medium border-2">
											{navigationItems.length} results
										</Badge>
									</div>

									<div className="space-y-3">
										{navigationItems.map((item) => {
											const Icon = item.icon;
											return (
												<button
													key={item.label}
													onClick={() => handleNavigation(item.path)}
													className="w-full text-left p-4 rounded-2xl border-2 border-border hover:border-ring/50 hover:bg-accent/30 transition-all duration-200 group hover:shadow-lg"
												>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-4">
															<div className="p-3 rounded-xl bg-accent border-2 border-accent/50">
																<Icon className="h-5 w-5 text-accent-foreground" />
															</div>
															<div>
																<div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
																	{item.label}
																</div>
																<div className="text-sm text-muted-foreground">
																	{item.description}
																</div>
															</div>
														</div>
														<div className="flex items-center gap-2">
															<span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
																Navigate
															</span>
															<ArrowRight className="h-4 w-4 text-border group-hover:text-primary transition-colors group-hover:translate-x-1" />
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>
							</div>
						) : (
							<div className="p-6 overflow-y-auto h-full">
								{/* Categories */}
								<div className="mb-10">
									<h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
										<Hash className="h-5 w-5 text-primary" />
										Browse Categories
									</h3>
									<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
										{categories.map((category) => {
											const Icon = category.icon;
											return (
												<button
													key={category.label}
													onClick={() => setSearchQuery(category.label)}
													className="p-5 rounded-2xl border-2 border-border hover:border-ring/50 hover:bg-accent/30 transition-all duration-200 group text-left"
												>
													<div className="flex items-start gap-4">
														<div
															className={`p-3 rounded-xl ${category.bgColor} border-2 border-border/50`}
														>
															<div className={`p-2 rounded-lg ${category.color}`}>
																<Icon className="h-5 w-5 text-white" />
															</div>
														</div>
														<div className="flex-1">
															<div className="font-bold text-foreground group-hover:text-primary transition-colors">
																{category.label}
															</div>
															<div className="text-sm text-muted-foreground mt-1">
																{category.description}
															</div>
														</div>
														<ArrowRight className="h-4 w-4 text-border mt-2 group-hover:text-primary transition-colors group-hover:translate-x-1" />
													</div>
												</button>
											);
										})}
									</div>
								</div>

								{/* Recent Searches */}
								<div>
									<h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
										<Clock className="h-5 w-5 text-primary" />
										Recent Searches
									</h3>
									<div className="space-y-3">
										{recentSearches.map((search) => {
											const Icon = search.icon;
											return (
												<button
													key={search.query}
													onClick={() => setSearchQuery(search.query)}
													className="w-full text-left p-4 rounded-2xl border-2 border-border hover:border-ring/50 hover:bg-accent/30 transition-all duration-200 group"
												>
													<div className="flex items-center justify-between">
														<div className="flex items-center gap-4">
															<div className="p-3 rounded-xl bg-accent border-2 border-accent/50">
																<Icon className="h-5 w-5 text-accent-foreground" />
															</div>
															<div>
																<div className="font-bold text-foreground group-hover:text-primary transition-colors">
																	{search.query}
																</div>
																<div className="text-sm text-muted-foreground flex items-center gap-2">
																	<Clock className="h-3 w-3" />
																	{search.timestamp}
																</div>
															</div>
														</div>
														<div className="flex items-center gap-2">
															<span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
																Search
															</span>
															<ArrowRight className="h-4 w-4 text-border group-hover:text-primary transition-colors group-hover:translate-x-1" />
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>

								{/* Quick Tips */}
								<div className="mt-8 p-5 rounded-2xl border-2 border-primary/20 bg-primary/5">
									<div className="flex items-center gap-3 mb-3">
										<Sparkles className="h-5 w-5 text-primary" />
										<h4 className="font-bold text-foreground">Quick Tips</h4>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
										<div className="flex items-center gap-2 text-muted-foreground">
											<Command className="h-3 w-3" />
											<span>
												Press{" "}
												<kbd className="px-2 py-1 bg-accent rounded-md text-xs font-mono">
													ESC
												</kbd>{" "}
												to close
											</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<ArrowRight className="h-3 w-3" />
											<span>
												Use{" "}
												<kbd className="px-2 py-1 bg-accent rounded-md text-xs font-mono">
													↑↓
												</kbd>{" "}
												to navigate
											</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Command className="h-3 w-3" />
											<span>
												Press{" "}
												<kbd className="px-2 py-1 bg-accent rounded-md text-xs font-mono">
													Enter
												</kbd>{" "}
												to select
											</span>
										</div>
										<div className="flex items-center gap-2 text-muted-foreground">
											<Command className="h-3 w-3" />
											<span>
												<kbd className="px-2 py-1 bg-accent rounded-md text-xs font-mono">
													⌘K
												</kbd>{" "}
												opens anywhere
											</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
