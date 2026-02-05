"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	CalendarDays,
	Compass,
	Sparkles,
	Target,
	TrendingUp,
	Users,
} from "lucide-react";
import { AdventureEvent } from "../types";
import { motion } from "motion/react";
import { AdventureCardGrid } from "./adventure-timeline";

const adventureEvents: AdventureEvent[] = [
	{
		id: "1",
		month: "April",
		title: "MT. LAMBAK (BUTTERFLY TRAIL)",
		dates: "04",
		location: "Johor",
		type: "hiking",
		confirmed: true,
		description:
			"A scenic hike through the butterfly trail with breathtaking views of Johor's landscape. Perfect for beginners and intermediate hikers.",
		coordinates: {
			lng: 103.0769,
			lat: 2.0216,
		},
	},
	{
		id: "2",
		month: "April",
		title: "BAHA. AYAM. STONG",
		dates: "10–14",
		duration: "3D2N",
		location: "Kelantan",
		type: "expedition",
		confirmed: true,
		description:
			"Multi-day exploration of the Stong Waterfalls and surrounding jungle. An adventurous journey through Kelantan's pristine wilderness.",
		coordinates: {
			lng: 101.9853,
			lat: 5.4016,
		},
	},
	{
		id: "3",
		month: "May",
		title: "C. B. L. TERENGGANU",
		dates: "30 Apr – 02 May",
		duration: "3D2N",
		location: "Terengganu",
		type: "expedition",
		confirmed: true,
		description:
			"Beach camping adventure along Terengganu's beautiful coastline. Experience sunset views and beach activities.",
		coordinates: {
			lng: 103.1324,
			lat: 5.3117,
		},
	},
	{
		id: "4",
		month: "June",
		title: "PULAU KEKABU × BUKIT SINGA",
		dates: "30 May – 01 Jun",
		duration: "3D2N",
		location: "Pulau Kekabu",
		type: "expedition",
		confirmed: true,
		description:
			"Island and hill adventure combining beach exploration with jungle trekking. Discover hidden gems of Pulau Kekabu.",
		coordinates: {
			lng: 100.7412,
			lat: 5.5268,
		},
	},
	{
		id: "5",
		month: "August",
		title: "MT. CHAMAH (G7)",
		dates: "03–05",
		duration: "2D1N",
		location: "Kelantan",
		type: "hiking",
		confirmed: true,
		description:
			"Challenge one of Malaysia's G7 peaks. This advanced hike offers stunning views and a true mountaineering experience.",
		coordinates: {
			lng: 101.9608,
			lat: 5.3536,
		},
	},
	{
		id: "6",
		month: "October",
		title: "KEMBARA MUDA 2026",
		dates: "TBC",
		location: "TBC",
		type: "event",
		confirmed: false,
		description:
			"Annual youth adventure camp focused on team building and outdoor skills. Final location and dates to be confirmed.",
		coordinates: {
			lng: 101.9758,
			lat: 4.2105,
		},
	},
	{
		id: "7",
		month: "May",
		title: "RIVER TREKKING ADVENTURE",
		dates: "15–16",
		duration: "2D1N",
		location: "Pahang",
		type: "water",
		confirmed: true,
		description:
			"River trekking through crystal clear waters and jungle streams. Suitable for water sports enthusiasts.",
		coordinates: {
			lng: 102.2559,
			lat: 3.8077,
		},
	},
	{
		id: "8",
		month: "June",
		title: "JUNGLE TRAIL EXPLORATION",
		dates: "20–21",
		duration: "2D1N",
		location: "Perak",
		type: "trail",
		confirmed: true,
		description:
			"Explore ancient jungle trails and discover hidden waterfalls in Perak's rainforest.",
		coordinates: {
			lng: 101.0901,
			lat: 4.5975,
		},
	},
];

export default function AnnualPlanPage() {
	const confirmedCount = adventureEvents.filter((e) => e.confirmed).length;
	const typesCount = new Set(adventureEvents.map((e) => e.type)).size;

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto px-4 py-20 pt-28 w-full md:max-w-[80vw]">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-secondary/50 border border-border mb-6 animate-pulse">
						<Sparkles className="h-4 w-4 text-primary" />
						<span className="text-sm font-bold tracking-widest">
							2026 ADVENTURE CALENDAR
						</span>
					</div>
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.6 }}
						className="mb-6 text-5xl font-bold text-foreground md:text-7xl"
					>
						Activities Timmeline
					</motion.h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Follow our journey through 2026 with meticulously planned expeditions and
						adventures across Malaysia's most beautiful landscapes.
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
					<StatCard
						icon={CalendarDays}
						val={adventureEvents.length.toString()}
						label="Total Adventures"
						color="primary"
						description="Planned for 2026"
					/>
					<StatCard
						icon={Target}
						val={confirmedCount.toString()}
						label="Confirmed"
						color="chart-2"
						description="Ready to go"
					/>
					<StatCard
						icon={TrendingUp}
						val="6"
						label="Months"
						color="chart-4"
						description="Of adventures"
					/>
					<StatCard
						icon={Users}
						val={typesCount.toString()}
						label="Activity Types"
						color="chart-5"
						description="Variety of experiences"
					/>
				</div>

				{/* Timeline Card */}
				<Card className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
					<CardHeader className="border-b border-border bg-card">
						<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
									<Compass className="h-6 w-6 text-primary" />
								</div>
								<div>
									<CardTitle className="text-2xl md:text-3xl font-black">
										Expedition Schedule 2026
									</CardTitle>
									<CardDescription className="text-base">
										Our carefully planned adventure calendar for the year
									</CardDescription>
								</div>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
								<span>Click any adventure for details</span>
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-4 md:p-6">
						{/* Replace the placeholder with AdventureCardGrid */}
						<AdventureCardGrid
							items={adventureEvents}
							title="2026 Adventure Calendar"
							description="Explore our planned expeditions throughout the year"
						/>
					</CardContent>
				</Card>

				{/* Footer Note */}
				<div className="mt-12 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
						<span className="text-sm text-muted-foreground">
							⚠️ All dates are subject to change based on weather conditions and
							permits
						</span>
					</div>
					<p className="mt-4 text-sm text-muted-foreground">
						Want to join an adventure?{" "}
						<a href="/contact" className="text-primary hover:underline font-medium">
							Contact us
						</a>{" "}
						for registration details.
					</p>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon: Icon,
	val,
	label,
	color,
	description,
}: {
	icon: any;
	val: string;
	label: string;
	color: string;
	description?: string;
}) {
	const colorClasses = {
		primary: "text-primary bg-primary/10 border-primary/20",
		"chart-2": "text-chart-2 bg-chart-2/10 border-chart-2/20",
		"chart-4": "text-chart-4 bg-chart-4/10 border-chart-4/20",
		"chart-5": "text-chart-5 bg-chart-5/10 border-chart-5/20",
	};

	return (
		<div
			className={`p-4 md:p-5 rounded-xl border ${colorClasses[color as keyof typeof colorClasses]} transition-all hover:scale-[1.02]`}
		>
			<div className="flex items-center justify-between mb-2">
				<div className="p-2 rounded-lg bg-background/50">
					<Icon className={`h-4 w-4 text-${color}`} />
				</div>
				<span className="text-2xl md:text-3xl font-black">{val}</span>
			</div>
			<h3 className="font-bold text-foreground">{label}</h3>
			{description && (
				<p className="text-xs text-muted-foreground mt-1">{description}</p>
			)}
		</div>
	);
}
