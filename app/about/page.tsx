"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Mountain,
	Compass,
	Users,
	Target,
	Heart,
	Shield,
	Award,
	Calendar,
	MapPin,
	Globe,
	TrendingUp,
	TreePine,
	Trophy,
	Star,
	ChevronRight,
} from "lucide-react";

const committeeMembers = [
	{
		name: "Ahmad Rizal",
		role: "President",
		image: "/images/committee/ahmad.jpg",
		badge: "Mountaineering Expert",
		description: "5+ years of adventure leadership",
	},
	{
		name: "Siti Nurhaliza",
		role: "Vice President",
		image: "/images/committee/siti.jpg",
		badge: "Wilderness First Aid",
		description: "Specializes in safety protocols",
	},
	{
		name: "Raj Kumar",
		role: "Activities Director",
		image: "/images/committee/raj.jpg",
		badge: "Rock Climbing Instructor",
		description: "Coordinates all expeditions",
	},
	{
		name: "Mei Ling",
		role: "Logistics Manager",
		image: "/images/committee/mei.jpg",
		badge: "Camping Specialist",
		description: "Ensures smooth operations",
	},
	{
		name: "Ali Hassan",
		role: "Safety Officer",
		image: "/images/committee/ali.jpg",
		badge: "Emergency Response",
		description: "Certified safety trainer",
	},
	{
		name: "Fatimah Zainal",
		role: "Treasurer",
		image: "/images/committee/fatimah.jpg",
		badge: "Finance & Budgeting",
		description: "Manages club finances",
	},
];

const milestones = [
	{
		year: "2018",
		title: "Club Established",
		description: "Founded by outdoor enthusiasts",
	},
	{
		year: "2019",
		title: "First Major Expedition",
		description: "Successfully climbed Mount Tahan",
	},
	{
		year: "2020",
		title: "COVID Adaptation",
		description: "Virtual adventures and training",
	},
	{
		year: "2021",
		title: "Community Outreach",
		description: "Started CSR programs",
	},
	{
		year: "2022",
		title: "Record Participation",
		description: "100+ active members",
	},
	{
		year: "2023",
		title: "International Recognition",
		description: "Featured in adventure magazines",
	},
	{
		year: "2024",
		title: "New Facilities",
		description: "Acquired adventure equipment",
	},
	{
		year: "2025",
		title: "Digital Platform",
		description: "Launched online presence",
	},
];

const coreValues = [
	{
		icon: Heart,
		title: "Passion for Adventure",
		description: "We believe in the transformative power of nature and adventure",
	},
	{
		icon: Shield,
		title: "Safety First",
		description: "All activities follow strict safety protocols and guidelines",
	},
	{
		icon: Users,
		title: "Community & Teamwork",
		description: "Building strong bonds through shared experiences",
	},
	{
		icon: Globe,
		title: "Environmental Stewardship",
		description: "Commitment to preserving natural environments",
	},
	{
		icon: Trophy,
		title: "Personal Growth",
		description: "Challenging limits and developing leadership skills",
	},
	{
		icon: TreePine,
		title: "Sustainability",
		description: "Promoting eco-friendly adventure practices",
	},
];

export default function AboutPage() {
	return (
		<div className="container mx-auto px-4 py-8 pt-32">
			{/* Hero Section */}
			<section className="mb-16">
				<div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-emerald-500/10 p-8 md:p-12">
					<div className="relative z-10 max-w-3xl">
						<Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">
							<Mountain className="mr-2 h-3 w-3" />
							Since 2018
						</Badge>
						<h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
							<span className="bg-linear-to-r from-primary via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
								About Kembara
							</span>
						</h1>
						<p className="mb-6 text-lg text-muted-foreground md:text-xl">
							The premier adventure and exploration club of UTHM, dedicated to
							fostering a love for nature, building resilient individuals, and creating
							unforgettable outdoor experiences since 2018.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button className="rounded-xl bg-linear-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-500">
								Join Our Community
								<ChevronRight className="ml-2 h-4 w-4" />
							</Button>
							<Button variant="outline" className="rounded-xl">
								Upcoming Adventures
							</Button>
						</div>
					</div>
					<div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-r from-primary/20 to-cyan-500/20 blur-3xl"></div>
					<div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-linear-to-r from-emerald-500/20 to-primary/20 blur-3xl"></div>
				</div>
			</section>

			{/* Vision & Mission Section */}
			<section id="vision" className="mb-16 scroll-mt-20 py-6">
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold">Our Vision & Mission</h2>
					<p className="text-muted-foreground">
						Guiding principles that drive our adventures and community
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					<Card className="border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
						<CardHeader>
							<div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3">
								<Target className="h-8 w-8 text-primary" />
							</div>
							<CardTitle className="text-2xl">Our Vision</CardTitle>
							<CardDescription>The future we&apos;re building towards</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-lg">
								To become the leading university adventure club in Malaysia, recognized
								for excellence in outdoor education, environmental stewardship, and
								developing future leaders through transformative wilderness experiences.
							</p>
							<div className="mt-6 space-y-4">
								<div className="flex items-start gap-3">
									<TrendingUp className="mt-1 h-4 w-4 text-emerald-500" />
									<span>Inspire 1000+ students to embrace outdoor adventures</span>
								</div>
								<div className="flex items-start gap-3">
									<Globe className="mt-1 h-4 w-4 text-cyan-500" />
									<span>Promote sustainable adventure tourism nationwide</span>
								</div>
								<div className="flex items-start gap-3">
									<Award className="mt-1 h-4 w-4 text-amber-500" />
									<span>Establish international adventure partnerships</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-emerald-500/20 bg-linear-to-br from-emerald-500/5 to-transparent">
						<CardHeader>
							<div className="mb-4 inline-flex rounded-2xl bg-emerald-500/10 p-3">
								<Compass className="h-8 w-8 text-emerald-500" />
							</div>
							<CardTitle className="text-2xl">Our Mission</CardTitle>
							<CardDescription>What we do every day</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-lg">
								To provide safe, accessible, and transformative outdoor experiences that
								foster personal growth, environmental awareness, and lifelong
								friendships among UTHM students.
							</p>
							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="rounded-xl border p-4 text-center">
									<div className="text-2xl font-bold text-primary">50+</div>
									<div className="text-sm text-muted-foreground">Annual Activities</div>
								</div>
								<div className="rounded-xl border p-4 text-center">
									<div className="text-2xl font-bold text-emerald-500">300+</div>
									<div className="text-sm text-muted-foreground">Active Members</div>
								</div>
								<div className="rounded-xl border p-4 text-center">
									<div className="text-2xl font-bold text-amber-500">15+</div>
									<div className="text-sm text-muted-foreground">
										Mountains Conquered
									</div>
								</div>
								<div className="rounded-xl border p-4 text-center">
									<div className="text-2xl font-bold text-cyan-500">100%</div>
									<div className="text-sm text-muted-foreground">Safety Record</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Core Values */}
			<section className="mb-16">
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold">Our Core Values</h2>
					<p className="text-muted-foreground">
						The principles that guide every adventure
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{coreValues.map((value, index) => {
						const Icon = value.icon;
						return (
							<Card
								key={index}
								className="group hover:shadow-lg transition-all duration-300"
							>
								<CardHeader>
									<div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 group-hover:scale-110 transition-transform duration-300">
										<Icon className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{value.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>

			{/* Leadership Team */}
			<section className="mb-16">
				<div className="mb-10 text-center">
					<h2 className="mb-2 text-3xl font-bold">Meet Our Leadership Team</h2>
					<p className="text-muted-foreground">
						Passionate individuals dedicated to creating amazing adventures
					</p>
				</div>

				<Tabs defaultValue="committee" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="committee">Committee</TabsTrigger>
						<TabsTrigger value="advisors">Advisors</TabsTrigger>
						<TabsTrigger value="instructors">Instructors</TabsTrigger>
					</TabsList>

					<TabsContent value="committee">
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{committeeMembers.map((member, index) => (
								<Card
									key={index}
									className="group hover:shadow-xl transition-all duration-300"
								>
									<CardContent className="p-6">
										<div className="flex flex-col items-center text-center">
											<Avatar className="mb-4 h-24 w-24 border-4 border-background shadow-lg">
												<AvatarImage src={member.image} alt={member.name} />
												<AvatarFallback className="bg-linear-to-br from-primary to-emerald-600 text-white">
													{member.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
											<h3 className="text-lg font-semibold">{member.name}</h3>
											<Badge className="mt-2 bg-primary/20 text-primary hover:bg-primary/30">
												{member.role}
											</Badge>
											<p className="mt-2 text-sm text-muted-foreground">{member.badge}</p>
											<p className="mt-3 text-sm">{member.description}</p>
											<Button variant="ghost" size="sm" className="mt-4">
												Contact
												<ChevronRight className="ml-1 h-3 w-3" />
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="advisors">
						<Card>
							<CardContent className="p-6">
								<div className="text-center py-12">
									<Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<h3 className="mt-4 text-lg font-semibold">Our Advisory Board</h3>
									<p className="mt-2 text-muted-foreground">
										Comprising experienced mountaineers, environmental scientists, and
										safety experts who guide our strategic direction and ensure the
										highest standards in all our activities.
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="instructors">
						<Card>
							<CardContent className="p-6">
								<div className="text-center py-12">
									<Award className="mx-auto h-12 w-12 text-muted-foreground/50" />
									<h3 className="mt-4 text-lg font-semibold">Certified Instructors</h3>
									<p className="mt-2 text-muted-foreground">
										All our activities are led by certified instructors with international
										certifications in mountaineering, first aid, and wilderness survival.
									</p>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</section>

			{/* Join Us CTA */}
			<section className="mb-8">
				<Card className="border-none bg-linear-to-br from-primary/10 via-primary/5 to-emerald-500/10">
					<CardContent className="p-8 md:p-12">
						<div className="flex flex-col items-center text-center">
							<div className="mb-6 rounded-2xl bg-background/80 p-4 shadow-lg">
								<Mountain className="h-12 w-12 text-primary" />
							</div>
							<h2 className="mb-4 text-3xl font-bold">Ready for Adventure?</h2>
							<p className="mb-6 max-w-2xl text-lg text-muted-foreground">
								Join our community of passionate adventurers and start your journey with
								Kembara. No experience necessary - just bring your enthusiasm!
							</p>
							<div className="flex flex-wrap gap-4">
								<Button
									size="lg"
									className="rounded-xl bg-linear-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-500"
								>
									Become a Member
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
								<Button size="lg" variant="outline" className="rounded-xl">
									Attend Info Session
								</Button>
							</div>
							<div className="mt-8 grid grid-cols-2 gap-8 text-sm text-muted-foreground md:grid-cols-4">
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">Free</div>
									<div>Registration</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-emerald-500">All</div>
									<div>Skill Levels Welcome</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-amber-500">Flexible</div>
									<div>Commitment</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-cyan-500">24/7</div>
									<div>Support</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Footer Quote */}
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
