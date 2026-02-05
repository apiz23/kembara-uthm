"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	CheckCircle2,
	AlertCircle,
	Mountain,
	Tent,
	Waves,
	Map as MapIcon,
	Flag,
	MapPin,
	Calendar,
	Clock,
	ChevronRight,
	Navigation,
	ArrowRight,
	Grid3x3,
	Filter,
} from "lucide-react";
import { AdventureEvent } from "../types";
import {
	Map,
	MapControls,
	MapMarker,
	MarkerContent,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ===================== HELPERS ===================== */
export const getTypeIcon = (type: AdventureEvent["type"]) => {
	const icons = {
		hiking: Mountain,
		expedition: Tent,
		water: Waves,
		trail: MapIcon,
		event: Flag,
	};
	return icons[type];
};

export const getTypeColor = (type: AdventureEvent["type"]) => {
	return {
		hiking: "bg-chart-1 text-white border-chart-1",
		expedition: "bg-chart-2 text-white border-chart-2",
		water: "bg-chart-3 text-white border-chart-3",
		trail: "bg-chart-4 text-white border-chart-4",
		event: "bg-chart-5 text-white border-chart-5",
	}[type];
};

export const getTypeOutlineColor = (type: AdventureEvent["type"]) => {
	return {
		hiking: "border-chart-1/30 text-chart-1 bg-chart-1/10",
		expedition: "border-chart-2/30 text-chart-2 bg-chart-2/10",
		water: "border-chart-3/30 text-chart-3 bg-chart-3/10",
		trail: "border-chart-4/30 text-chart-4 bg-chart-4/10",
		event: "border-chart-5/30 text-chart-5 bg-chart-5/10",
	}[type];
};

export const getTypeBgColor = (type: AdventureEvent["type"]) => {
	return {
		hiking: "bg-chart-1/20",
		expedition: "bg-chart-2/20",
		water: "bg-chart-3/20",
		trail: "bg-chart-4/20",
		event: "bg-chart-5/20",
	}[type];
};

export const getMonthColor = (month: string) => {
	const monthColors: Record<string, string> = {
		April: "bg-chart-4/90 text-white",
		May: "bg-chart-2/90 text-white",
		June: "bg-chart-3/90 text-white",
		July: "bg-chart-1/90 text-white",
		August: "bg-chart-5/90 text-white",
		September: "bg-chart-4/90 text-white",
		October: "bg-chart-2/90 text-white",
		November: "bg-chart-3/90 text-white",
		December: "bg-chart-1/90 text-white",
	};
	return monthColors[month] || "bg-primary/90 text-white";
};

/* ===================== DETAIL VIEW ===================== */
export function EventDetailView({ event }: { event: AdventureEvent }) {
	const TypeIcon = getTypeIcon(event.type);

	return (
		<div className="flex flex-col h-full max-w-4xl mx-auto">
			{/* Map Section */}
			<div className="h-[45vh] w-full relative border-b border-border/50 overflow-hidden">
				<Map center={[event.coordinates.lng, event.coordinates.lat]} zoom={12}>
					<MapControls position="bottom-right" showZoom showCompass showFullscreen />
					<MapMarker
						longitude={event.coordinates.lng}
						latitude={event.coordinates.lat}
					>
						<MarkerContent>
							<div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
								<TypeIcon className="h-4 w-4 text-white" />
							</div>
						</MarkerContent>
					</MapMarker>
				</Map>

				{/* Map Overlay Gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/80 pointer-events-none" />

				{/* Event Header */}
				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold text-foreground">{event.title}</h2>
							<p className="text-sm text-muted-foreground">{event.location}</p>
						</div>
						<div className={`px-3 py-1.5 rounded-full ${getMonthColor(event.month)}`}>
							<span className="text-sm font-semibold">{event.month} 2026</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="flex-1 overflow-y-auto">
				<div className="p-6">
					{/* Status & Type */}
					<div className="flex items-center gap-3 mb-6">
						<Badge className={`${getTypeColor(event.type)} font-medium`}>
							<TypeIcon className="h-3.5 w-3.5 mr-1.5" />
							{event.type.toUpperCase()}
						</Badge>
						{event.confirmed ? (
							<Badge className="bg-green-500/20 text-green-600 border-green-500/40 font-medium">
								<CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
								Confirmed
							</Badge>
						) : (
							<Badge className="bg-amber-500/20 text-amber-600 border-amber-500/40 font-medium">
								<AlertCircle className="h-3.5 w-3.5 mr-1.5" />
								Tentative
							</Badge>
						)}
					</div>

					{/* Description */}
					<div className="mb-8">
						<h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
							Description
						</h3>
						<p className="text-foreground leading-relaxed">{event.description}</p>
					</div>

					{/* Details Grid */}
					<div className="grid gap-4 mb-8">
						{/* Location */}
						<div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border shadow-xs">
							<div className="p-2 rounded-lg bg-primary/10">
								<MapPin className="h-4 w-4 text-primary" />
							</div>
							<div>
								<h4 className="text-sm font-semibold text-muted-foreground mb-1">
									Location
								</h4>
								<p className="font-medium text-foreground">{event.location}</p>
								<p className="text-xs text-muted-foreground mt-1">
									{event.coordinates.lat.toFixed(4)}°N,{" "}
									{event.coordinates.lng.toFixed(4)}°E
								</p>
							</div>
						</div>

						{/* Date & Duration */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border shadow-xs">
								<div className="p-2 rounded-lg bg-chart-2/10">
									<Calendar className="h-4 w-4 text-chart-2" />
								</div>
								<div>
									<h4 className="text-sm font-semibold text-muted-foreground mb-1">
										Date
									</h4>
									<p className="font-medium text-foreground">
										{event.month} {event.dates}, 2026
									</p>
								</div>
							</div>

							{event.duration && (
								<div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border shadow-xs">
									<div className="p-2 rounded-lg bg-chart-3/10">
										<Clock className="h-4 w-4 text-chart-3" />
									</div>
									<div>
										<h4 className="text-sm font-semibold text-muted-foreground mb-1">
											Duration
										</h4>
										<p className="font-medium text-foreground">{event.duration}</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Notes */}
					<div className="p-4 rounded-lg bg-accent/10 border border-accent/20 shadow-xs">
						<div className="flex items-center gap-2 mb-2">
							<CheckCircle2 className="h-4 w-4 text-accent-foreground" />
							<h4 className="text-sm font-semibold text-accent-foreground">
								Expedition Notes
							</h4>
						</div>
						<p className="text-sm text-muted-foreground">
							This activity is currently{" "}
							<span className="font-medium text-foreground">
								{event.confirmed
									? "confirmed and ready for registration."
									: "in planning phase. Details will be updated soon."}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

/* ===================== MINI MAP COMPONENT ===================== */
function EventMiniMap({ event }: { event: AdventureEvent }) {
	const TypeIcon = getTypeIcon(event.type);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative h-[180px] w-full rounded-lg overflow-hidden border border-border/50 bg-card/50 shadow-xs group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Map
				center={[event.coordinates.lng, event.coordinates.lat]}
				zoom={isHovered ? 11 : 10}
				interactive={false}
			>
				<MapMarker
					longitude={event.coordinates.lng}
					latitude={event.coordinates.lat}
				>
					<MarkerContent>
						<motion.div
							animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
							transition={{ duration: 0.2 }}
							className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center"
						>
							<TypeIcon className="h-3 w-3 text-white" />
						</motion.div>
					</MarkerContent>
				</MapMarker>
			</Map>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Location label */}
			<div className="absolute bottom-2 right-2 flex flex-col items-end my-5">
				<div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 shadow-xs">
					<p className="text-xs font-medium text-foreground truncate max-w-[120px]">
						{event.location}
					</p>
				</div>
			</div>

			{/* Zoom hint */}
			<div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full p-1 shadow-xs">
				<Navigation className="h-3 w-3 text-muted-foreground" />
			</div>
		</div>
	);
}

/* ===================== EVENT CARD COMPONENT ===================== */
function EventCard({ event, index }: { event: AdventureEvent; index: number }) {
	const TypeIcon = getTypeIcon(event.type);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.05 }}
			whileHover={{ y: -4, transition: { duration: 0.2 } }}
			className="h-full"
		>
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetTrigger asChild>
					<div className="cursor-pointer h-full rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
						{/* Top section with month and type */}
						<div className="relative p-5">
							{/* Month badge */}
							<div className="absolute top-4 right-4">
								<div
									className={`px-3 py-1 rounded-full ${getMonthColor(event.month)} text-xs font-semibold`}
								>
									{event.month}
								</div>
							</div>

							{/* Type icon and badge */}
							<div className="flex items-center gap-3 mb-4">
								<div
									className={`p-2.5 rounded-xl ${getTypeBgColor(event.type)} ${getTypeOutlineColor(event.type)}/30 border`}
								>
									<TypeIcon className="h-5 w-5" />
								</div>
								<div className="flex items-center gap-2">
									<Badge
										className={`${getTypeColor(event.type)} font-medium text-xs px-3 py-1`}
									>
										{event.type.toUpperCase()}
									</Badge>
									{event.confirmed ? (
										<Badge className="bg-green-500/20 text-green-600 border-green-500/40 font-medium text-xs px-2 py-1">
											<CheckCircle2 className="h-3 w-3 mr-1" />
											Confirmed
										</Badge>
									) : (
										<Badge className="bg-amber-500/20 text-amber-600 border-amber-500/40 font-medium text-xs px-2 py-1">
											<AlertCircle className="h-3 w-3 mr-1" />
											Tentative
										</Badge>
									)}
								</div>
							</div>

							{/* Title */}
							<h3 className="text-xl font-bold text-foreground mb-3 pr-12 line-clamp-1">
								{event.title}
							</h3>

							{/* Description */}
							{event.description && (
								<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
									{event.description}
								</p>
							)}
						</div>

						{/* Mini Map */}
						<div className="px-5">
							<EventMiniMap event={event} />
						</div>

						{/* Bottom info section */}
						<div className="p-5">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2 text-sm">
										<Calendar className="h-4 w-4 text-chart-2" />
										<span className="font-medium text-foreground">{event.dates}</span>
									</div>
									{event.duration && (
										<div className="flex items-center gap-2 text-sm">
											<Clock className="h-4 w-4 text-chart-3" />
											<span className="font-medium text-foreground">{event.duration}</span>
										</div>
									)}
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 text-sm">
									<MapPin className="h-4 w-4 text-primary" />
									<span className="font-medium text-foreground truncate max-w-[120px]">
										{event.location}
									</span>
								</div>

								{/* CTA */}
								<div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
									<span className="text-xs">View Details</span>
									<ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
								</div>
							</div>
						</div>
					</div>
				</SheetTrigger>
				<SheetContent className="p-0 w-full sm:max-w-2xl">
					<EventDetailView event={event} />
				</SheetContent>
			</Sheet>
		</motion.div>
	);
}

/* ===================== MAIN CARD GRID COMPONENT ===================== */
type AdventureCardGridProps = {
	items?: AdventureEvent[];
	title?: string;
	description?: string;
};

export function AdventureCardGrid({
	items = [],
	title = "Upcoming Adventures",
	description = "Explore our upcoming expeditions and adventures",
}: AdventureCardGridProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedType, setSelectedType] = useState<string>("All");
	const [selectedMonth, setSelectedMonth] = useState<string>("All");

	// Get unique types and months
	const allTypes = ["All", ...new Set(items.map((item) => item.type))];
	const allMonths = ["All", ...new Set(items.map((item) => item.month))];

	// Filter items
	const filteredItems = items.filter((item) => {
		const matchesSearch =
			searchQuery === "" ||
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.location.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesType =
			selectedType === "All" || item.type === selectedType.toLowerCase();
		const matchesMonth = selectedMonth === "All" || item.month === selectedMonth;

		return matchesSearch && matchesType && matchesMonth;
	});

	return (
		<div className="w-full mx-auto">
			{/* Header */}
			<div className="text-center mb-12">
				<div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur mb-4">
					<Grid3x3 className="h-3 w-3" />
					Adventure Catalog
				</div>
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
					{title}
				</h2>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					{description}
				</p>
			</div>

			{/* Filters */}
			<div className="mb-8 space-y-6">
				{/* Search */}
				<div className="max-w-md mx-auto">
					<div className="relative">
						<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search adventures..."
							className="pl-10 pr-4 py-2 rounded-full border-border/50 bg-background/60 backdrop-blur"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				{/* Filter buttons */}
				<div className="flex flex-col md:flex-row gap-4 justify-center">
					<div className="flex flex-wrap gap-2 justify-center">
						<span className="text-sm font-medium text-muted-foreground self-center">
							Type:
						</span>
						{allTypes.map((type) => (
							<Button
								key={type}
								variant={selectedType === type ? "default" : "outline"}
								size="sm"
								className="rounded-full"
								onClick={() => setSelectedType(type)}
							>
								{type === "All" ? "All Types" : type}
							</Button>
						))}
					</div>

					<div className="flex flex-wrap gap-2 justify-center">
						<span className="text-sm font-medium text-muted-foreground self-center">
							Month:
						</span>
						{allMonths.map((month) => (
							<Button
								key={month}
								variant={selectedMonth === month ? "default" : "outline"}
								size="sm"
								className="rounded-full"
								onClick={() => setSelectedMonth(month)}
							>
								{month === "All" ? "All Months" : month}
							</Button>
						))}
					</div>
				</div>
			</div>

			{/* Results count */}
			<div className="mb-6 text-center">
				<p className="text-sm text-muted-foreground">
					Showing {filteredItems.length} of {items.length} adventures
				</p>
			</div>

			{/* Card Grid */}
			{filteredItems.length > 0 ? (
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{filteredItems.map((event, index) => (
						<EventCard key={event.id} event={event} index={index} />
					))}
				</motion.div>
			) : (
				<div className="text-center py-12">
					<div className="inline-flex items-center gap-3 rounded-2xl border border-border/50 bg-background/60 px-8 py-4 mb-6">
						<AlertCircle className="h-5 w-5 text-amber-500" />
						<span className="font-medium">No adventures found</span>
					</div>
					<p className="text-muted-foreground mb-6">
						Try adjusting your search or filter criteria
					</p>
					<Button
						variant="outline"
						onClick={() => {
							setSearchQuery("");
							setSelectedType("All");
							setSelectedMonth("All");
						}}
					>
						Clear All Filters
					</Button>
				</div>
			)}

			{/* Stats footer */}
			<div className="mt-12 pt-8 border-t border-border/40">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{[
						{ label: "Total Adventures", value: items.length.toString() },
						{
							label: "Confirmed",
							value: items.filter((i) => i.confirmed).length.toString(),
						},
						{
							label: "Unique Locations",
							value: new Set(items.map((i) => i.location)).size.toString(),
						},
						{
							label: "Months Covered",
							value: new Set(items.map((i) => i.month)).size.toString(),
						},
					].map((stat, index) => (
						<div key={index} className="text-center">
							<div className="text-2xl font-bold text-foreground mb-1">
								{stat.value}
							</div>
							<div className="text-sm text-muted-foreground">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
