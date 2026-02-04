// app/(dashboard)/activities/page.tsx
"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Mountain,
	Tent,
	HeartHandshake,
	GraduationCap,
	Map,
	Users,
	Calendar,
	Clock,
	MapPin,
	ChevronRight,
	Star,
	Shield,
	TreePine,
	TrendingUp,
	Award,
	Compass,
} from "lucide-react";
import Image from "next/image";

interface Activity {
	id: number;
	title: string;
	category: "hiking" | "camping" | "csr" | "training" | "special";
	description: string;
	duration: string;
	difficulty: "beginner" | "intermediate" | "advanced";
	location: string;
	season: string[];
	requirements: string[];
	highlights: string[];
	image: string;
	icon: React.ElementType;
	color: string;
}

const activities: Activity[] = [
	{
		id: 1,
		title: "Hiking & Trekking",
		category: "hiking",
		description:
			"Explore Malaysia's magnificent mountains and nature trails. From beginner-friendly hills to challenging peaks, we offer guided hikes for all skill levels.",
		duration: "Half-day to multi-day",
		difficulty: "beginner",
		location: "Various locations across Malaysia",
		season: ["Year-round", "Best: Dry season"],
		requirements: ["Basic fitness", "Proper footwear", "Hydration pack"],
		highlights: [
			"Certified mountain guides",
			"Safety briefing & gear check",
			"Small group sizes (max 15)",
			"Environmental conservation focus",
		],
		image: "/images/activities/hiking.jpg",
		icon: Mountain,
		color: "from-blue-500 to-cyan-500",
	},
	{
		id: 2,
		title: "Camping & Outdoor Stays",
		category: "camping",
		description:
			"Experience the joy of sleeping under the stars. Learn essential camping skills while enjoying nature's serenity in safe, designated campsites.",
		duration: "Weekend trips (2D1N)",
		difficulty: "beginner",
		location: "Designated camping grounds",
		season: ["Year-round", "Avoid monsoon season"],
		requirements: ["Sleeping bag", "Personal items", "Open mindset"],
		highlights: [
			"All camping gear provided",
			"Campfire sessions",
			"Basic survival skills workshop",
			"Star gazing & night walks",
		],
		image: "/images/activities/camping.jpg",
		icon: Tent,
		color: "from-emerald-500 to-green-500",
	},
	{
		id: 3,
		title: "CSR & Community Volunteering",
		category: "csr",
		description:
			"Give back to communities through environmental and social initiatives. Combine adventure with meaningful community service projects.",
		duration: "Day trips to weekend projects",
		difficulty: "beginner",
		location: "Local communities & nature sites",
		season: ["Year-round"],
		requirements: ["Willingness to help", "Team spirit"],
		highlights: [
			"Beach & river cleanups",
			"Tree planting initiatives",
			"Rural community support",
			"Environmental awareness campaigns",
		],
		image: "/images/activities/csr.jpg",
		icon: HeartHandshake,
		color: "from-purple-500 to-pink-500",
	},
	{
		id: 4,
		title: "Adventure Training",
		category: "training",
		description:
			"Develop essential outdoor skills through structured workshops. From basic navigation to advanced survival techniques.",
		duration: "Workshops (3-6 hours)",
		difficulty: "beginner",
		location: "UTHM Campus & outdoor venues",
		season: ["Monthly sessions"],
		requirements: ["No experience needed", "Learning attitude"],
		highlights: [
			"Basic first aid & CPR",
			"Map reading & navigation",
			"Knot tying & shelter building",
			"Leave No Trace principles",
		],
		image: "/images/activities/training.jpg",
		icon: GraduationCap,
		color: "from-amber-500 to-orange-500",
	},
	{
		id: 5,
		title: "Special Expeditions",
		category: "special",
		description:
			"Challenging multi-day expeditions for experienced members. Push your limits with professionally guided advanced adventures.",
		duration: "3-7 days",
		difficulty: "advanced",
		location: "National parks & remote areas",
		season: ["Dry season only"],
		requirements: [
			"Previous experience",
			"Medical clearance",
			"Advanced fitness",
		],
		highlights: [
			"G7 mountain challenges",
			"Jungle trekking expeditions",
			"Multi-peak adventures",
			"Advanced wilderness skills",
		],
		image: "/images/activities/expedition.jpg",
		icon: Compass,
		color: "from-red-500 to-rose-500",
	},
];

const difficultyColors = {
	beginner: "bg-emerald-500/20 text-emerald-500",
	intermediate: "bg-amber-500/20 text-amber-500",
	advanced: "bg-red-500/20 text-red-500",
};

const difficultyLabels = {
	beginner: "Beginner Friendly",
	intermediate: "Intermediate",
	advanced: "Advanced",
};

const categoryColors = {
	hiking: "bg-blue-500/10 text-blue-500 border-blue-500/20",
	camping: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
	csr: "bg-purple-500/10 text-purple-500 border-purple-500/20",
	training: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	special: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function ActivitiesPage() {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const filteredActivities =
		selectedCategory === "all"
			? activities
			: activities.filter((activity) => activity.category === selectedCategory);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Hero Section */}
			<section className="mb-16">
				<div className="text-center max-w-3xl mx-auto">
					<Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">
						<Star className="mr-2 h-3 w-3" />
						Explore Our Activities
					</Badge>
					<h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
						<span className="bg-gradient-to-r from-primary via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
							Adventure Awaits
						</span>
					</h1>
					<p className="mb-6 text-lg text-muted-foreground md:text-xl">
						Discover the diverse range of outdoor experiences we offer at Kembara
						UTHM. From gentle hikes to challenging expeditions, there&apos;s something
						for every adventurer.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button className="rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-500">
							Join Our Next Adventure
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
						<Button variant="outline" className="rounded-xl">
							View Safety Guidelines
						</Button>
					</div>
				</div>
			</section>

			{/* Stats Bar */}
			<section className="mb-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<Card className="border-primary/20">
						<CardContent className="p-4 text-center">
							<div className="text-3xl font-bold text-primary">5+</div>
							<div className="text-sm text-muted-foreground">Activity Categories</div>
						</CardContent>
					</Card>
					<Card className="border-emerald-500/20">
						<CardContent className="p-4 text-center">
							<div className="text-3xl font-bold text-emerald-500">50+</div>
							<div className="text-sm text-muted-foreground">Annual Activities</div>
						</CardContent>
					</Card>
					<Card className="border-blue-500/20">
						<CardContent className="p-4 text-center">
							<div className="text-3xl font-bold text-blue-500">100%</div>
							<div className="text-sm text-muted-foreground">Safety Record</div>
						</CardContent>
					</Card>
					<Card className="border-amber-500/20">
						<CardContent className="p-4 text-center">
							<div className="text-3xl font-bold text-amber-500">All</div>
							<div className="text-sm text-muted-foreground">Skill Levels Welcome</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Category Filter */}
			<section className="mb-12">
				<div className="flex flex-wrap gap-2 justify-center mb-8">
					<Button
						variant={selectedCategory === "all" ? "default" : "outline"}
						className="rounded-xl"
						onClick={() => setSelectedCategory("all")}
					>
						All Activities
					</Button>
					<Button
						variant={selectedCategory === "hiking" ? "default" : "outline"}
						className="rounded-xl"
						onClick={() => setSelectedCategory("hiking")}
					>
						<Mountain className="mr-2 h-4 w-4" />
						Hiking
					</Button>
					<Button
						variant={selectedCategory === "camping" ? "default" : "outline"}
						className="rounded-xl"
						onClick={() => setSelectedCategory("camping")}
					>
						<Tent className="mr-2 h-4 w-4" />
						Camping
					</Button>
					<Button
						variant={selectedCategory === "csr" ? "default" : "outline"}
						className="rounded-xl"
						onClick={() => setSelectedCategory("csr")}
					>
						<HeartHandshake className="mr-2 h-4 w-4" />
						CSR
					</Button>
					<Button
						variant={selectedCategory === "training" ? "default" : "outline"}
						className="rounded-xl"
						onClick={() => setSelectedCategory("training")}
					>
						<GraduationCap className="mr-2 h-4 w-4" />
						Training
					</Button>
				</div>

				{/* Activities Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredActivities.map((activity) => {
						const Icon = activity.icon;
						return (
							<Card
								key={activity.id}
								className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
								id={activity.category}
							>
								{/* Activity Header */}
								<div
									className={`relative h-48 bg-gradient-to-br ${activity.color} overflow-hidden`}
								>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
									<div className="absolute top-4 right-4 z-20">
										<Badge className={difficultyColors[activity.difficulty]}>
											{difficultyLabels[activity.difficulty]}
										</Badge>
									</div>
									<div className="absolute bottom-4 left-4 z-20">
										<div className="flex items-center gap-2 text-white">
											<Icon className="h-5 w-5" />
											<span className="font-bold text-lg">{activity.title}</span>
										</div>
									</div>
								</div>

								<CardHeader className="pb-2">
									<CardDescription className="flex items-center gap-4 text-sm">
										<span className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											{activity.duration}
										</span>
										<span className="flex items-center gap-1">
											<MapPin className="h-3 w-3" />
											{activity.location}
										</span>
									</CardDescription>
								</CardHeader>

								<CardContent className="pb-4">
									<p className="text-muted-foreground mb-4">{activity.description}</p>

									<div className="space-y-4">
										{/* Season */}
										<div>
											<div className="text-sm font-medium mb-1 flex items-center gap-2">
												<Calendar className="h-3 w-3" />
												Best Season
											</div>
											<div className="flex flex-wrap gap-2">
												{activity.season.map((season, idx) => (
													<Badge key={idx} variant="outline" className="text-xs">
														{season}
													</Badge>
												))}
											</div>
										</div>

										{/* Requirements */}
										<div>
											<div className="text-sm font-medium mb-1 flex items-center gap-2">
												<Shield className="h-3 w-3" />
												Requirements
											</div>
											<div className="flex flex-wrap gap-2">
												{activity.requirements.map((req, idx) => (
													<Badge key={idx} variant="secondary" className="text-xs">
														{req}
													</Badge>
												))}
											</div>
										</div>

										{/* Highlights */}
										<div>
											<div className="text-sm font-medium mb-2 flex items-center gap-2">
												<Award className="h-3 w-3" />
												Highlights
											</div>
											<ul className="space-y-1 text-sm text-muted-foreground">
												{activity.highlights.map((highlight, idx) => (
													<li key={idx} className="flex items-start gap-2">
														<div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
														{highlight}
													</li>
												))}
											</ul>
										</div>
									</div>
								</CardContent>

								<CardFooter className="border-t pt-4">
									<div className="flex items-center justify-between w-full">
										<Badge className={categoryColors[activity.category]}>
											{activity.category.toUpperCase()}
										</Badge>
										<Button
											variant="ghost"
											size="sm"
											className="group-hover:text-primary"
										>
											Learn More
											<ChevronRight className="ml-1 h-3 w-3" />
										</Button>
									</div>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			</section>

			{/* Safety Commitment */}
			<section className="mb-16">
				<Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
					<CardHeader className="text-center">
						<div className="flex justify-center mb-4">
							<div className="rounded-2xl bg-primary/10 p-3">
								<Shield className="h-8 w-8 text-primary" />
							</div>
						</div>
						<CardTitle className="text-2xl">Our Safety Commitment</CardTitle>
						<CardDescription>
							Your safety is our top priority in every adventure
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center p-4">
								<div className="inline-flex rounded-xl bg-blue-500/10 p-3 mb-3">
									<Users className="h-6 w-6 text-blue-500" />
								</div>
								<h3 className="font-semibold mb-2">Certified Guides</h3>
								<p className="text-sm text-muted-foreground">
									All activities led by certified, experienced guides
								</p>
							</div>
							<div className="text-center p-4">
								<div className="inline-flex rounded-xl bg-emerald-500/10 p-3 mb-3">
									<TreePine className="h-6 w-6 text-emerald-500" />
								</div>
								<h3 className="font-semibold mb-2">Eco-Friendly</h3>
								<p className="text-sm text-muted-foreground">
									Follow Leave No Trace principles in all adventures
								</p>
							</div>
							<div className="text-center p-4">
								<div className="inline-flex rounded-xl bg-amber-500/10 p-3 mb-3">
									<TrendingUp className="h-6 w-6 text-amber-500" />
								</div>
								<h3 className="font-semibold mb-2">Progressive Learning</h3>
								<p className="text-sm text-muted-foreground">
									Build skills gradually from beginner to advanced levels
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* How to Join */}
			<section>
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">How to Join Activities</CardTitle>
						<CardDescription>
							Simple steps to start your adventure journey
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid md:grid-cols-4 gap-6">
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<span className="font-bold">1</span>
								</div>
								<h3 className="font-semibold mb-2">Register</h3>
								<p className="text-sm text-muted-foreground">
									Sign up as a Kembara member
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<span className="font-bold">2</span>
								</div>
								<h3 className="font-semibold mb-2">Choose</h3>
								<p className="text-sm text-muted-foreground">
									Pick activities matching your level
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<span className="font-bold">3</span>
								</div>
								<h3 className="font-semibold mb-2">Prepare</h3>
								<p className="text-sm text-muted-foreground">
									Attend briefing & get gear ready
								</p>
							</div>
							<div className="text-center">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<span className="font-bold">4</span>
								</div>
								<h3 className="font-semibold mb-2">Adventure</h3>
								<p className="text-sm text-muted-foreground">
									Join the activity & make memories
								</p>
							</div>
						</div>
					</CardContent>
					<CardFooter className="justify-center">
						<Button className="rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-500">
							Start Your Adventure Journey
							<ChevronRight className="ml-2 h-4 w-4" />
						</Button>
					</CardFooter>
				</Card>
			</section>

			{/* Bottom Quote */}
			<div className="mt-12 pt-8 border-t text-center">
				<p className="text-xl italic text-muted-foreground">
					"SETIAP DETIK, SETIAP LANGKAH, ITULAH KEMBARA"
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					Every second, every step, that&apos;s the journey
				</p>
			</div>
		</div>
	);
}
