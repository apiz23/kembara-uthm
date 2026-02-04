"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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
} from "lucide-react";
import { AdventureEvent } from "../types";
import {
	Map,
	MapControls,
	MapMarker,
	MarkerContent,
} from "@/components/ui/map";

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
		April: "bg-chart-4 text-white border-chart-4",
		May: "bg-chart-2 text-white border-chart-2",
		June: "bg-chart-3 text-white border-chart-3",
		July: "bg-chart-1 text-white border-chart-1",
		August: "bg-chart-5 text-white border-chart-5",
		September: "bg-chart-4 text-white border-chart-4",
		October: "bg-chart-2 text-white border-chart-2",
		November: "bg-chart-3 text-white border-chart-3",
		December: "bg-chart-1 text-white border-chart-1",
	};
	return (
		monthColors[month] || "bg-primary text-primary-foreground border-primary"
	);
};

export const getMonthBadgeColor = (month: string) => {
	const monthColors: Record<string, string> = {
		April: "bg-chart-4/90 text-white border-chart-4/90 shadow-md",
		May: "bg-chart-2/90 text-white border-chart-2/90 shadow-md",
		June: "bg-chart-3/90 text-white border-chart-3/90 shadow-md",
		July: "bg-chart-1/90 text-white border-chart-1/90 shadow-md",
		August: "bg-chart-5/90 text-white border-chart-5/90 shadow-md",
		September: "bg-chart-4/90 text-white border-chart-4/90 shadow-md",
		October: "bg-chart-2/90 text-white border-chart-2/90 shadow-md",
		November: "bg-chart-3/90 text-white border-chart-3/90 shadow-md",
		December: "bg-chart-1/90 text-white border-chart-1/90 shadow-md",
	};
	return (
		monthColors[month] || "bg-primary/90 text-white border-primary/90 shadow-md"
	);
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
						<div
							className={`px-3 py-1.5 rounded-full ${getMonthBadgeColor(event.month)}`}
						>
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
			className="relative h-[20vh] w-full rounded-lg overflow-hidden border border-border/50 bg-card/50 shadow-xs"
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

			{/* Location label */}
			<div className="absolute bottom-2 right-2 flex flex-col items-end">
				<div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 shadow-xs">
					<p className="text-xs font-medium text-foreground truncate">
						{event.location}
					</p>
					<p className="text-[10px] text-muted-foreground truncate">
						{event.coordinates.lat.toFixed(2)}°N, {event.coordinates.lng.toFixed(2)}°E
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

/* ===================== TIMELINE ITEM COMPONENT ===================== */
function TimelineItemComponent({
	item,
	index,
}: {
	item: AdventureEvent;
	index: number;
}) {
	const itemRef = useRef(null);
	const itemInView = useInView(itemRef, {
		once: true,
		margin: "-50px",
	});

	const TypeIcon = getTypeIcon(item.type);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<div ref={itemRef} className="relative flex gap-6 group">
			{/* Timeline dot */}
			<motion.div
				initial={{ scale: 0 }}
				animate={itemInView ? { scale: 1 } : { scale: 0 }}
				transition={{ delay: index * 0.1, duration: 0.2 }}
				className="absolute left-5 top-8 h-4 w-4 rounded-full border-2 border-background bg-card shadow-sm flex items-center justify-center z-10"
			>
				<div
					className={`h-2.5 w-2.5 rounded-full ${getTypeColor(item.type).split(" ")[0]}`}
				/>
			</motion.div>

			{/* Content */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
				transition={{ delay: index * 0.1 + 0.1, duration: 0.3 }}
				className="ml-10 flex-1"
			>
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<div className="cursor-pointer rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group shadow-sm">
							{/* Month Badge */}
							<div className="absolute -top-3 right-5 z-10">
								<div
									className={`px-4 py-1.5 rounded-full ${getMonthBadgeColor(item.month)} font-medium`}
								>
									<span className="text-xs font-semibold tracking-wide">
										{item.month}
									</span>
								</div>
							</div>

							{/* Header with type badge */}
							<div className="flex items-center gap-3 mb-4">
								<div
									className={`p-2.5 rounded-lg ${getTypeBgColor(item.type)} ${getTypeOutlineColor(item.type)}/30 border`}
								>
									<TypeIcon className="h-4.5 w-4.5" />
								</div>
								<div className="flex items-center gap-2">
									<Badge
										className={`${getTypeColor(item.type)} font-medium text-xs px-3 py-1`}
									>
										<TypeIcon className="h-3 w-3 mr-1.5" />
										{item.type.toUpperCase()}
									</Badge>
									{item.confirmed ? (
										<Badge className="bg-green-500/20 text-green-600 border-green-500/40 font-medium text-xs px-3 py-1">
											<CheckCircle2 className="h-3 w-3 mr-1.5" />
											Confirmed
										</Badge>
									) : (
										<Badge className="bg-amber-500/20 text-amber-600 border-amber-500/40 font-medium text-xs px-3 py-1">
											<AlertCircle className="h-3 w-3 mr-1.5" />
											Tentative
										</Badge>
									)}
								</div>
							</div>

							{/* Title & Description */}
							<h3 className="text-xl font-bold text-foreground mb-3 pr-16">
								{item.title}
							</h3>
							{item.description && (
								<p className="text-sm text-muted-foreground mb-4 line-clamp-2">
									{item.description}
								</p>
							)}

							{/* Mini Map */}
							<div className="mb-4">
								<EventMiniMap event={item} />
							</div>

							{/* Date & Duration Info */}
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-2 text-sm bg-secondary/50 px-3 py-1.5 rounded-lg">
										<Calendar className="h-4 w-4 text-chart-2" />
										<span className="font-semibold text-foreground">{item.dates}</span>
									</div>
									{item.duration && (
										<div className="flex items-center gap-2 text-sm bg-secondary/50 px-3 py-1.5 rounded-lg">
											<Clock className="h-4 w-4 text-chart-3" />
											<span className="font-semibold text-foreground">
												{item.duration}
											</span>
										</div>
									)}
								</div>
							</div>

							{/* Details & CTA */}
							<div className="flex items-center justify-between pt-4 border-t border-border/50">
								<div className="flex items-center gap-2 text-sm bg-secondary/30 px-3 py-1.5 rounded-lg">
									<MapPin className="h-4 w-4 text-primary" />
									<span className="font-medium text-foreground">{item.location}</span>
								</div>

								{/* View Details */}
								<div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
									<span>Explore Adventure</span>
									<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</div>
							</div>
						</div>
					</SheetTrigger>
					<SheetContent className="p-0 w-full sm:max-w-2xl">
						<EventDetailView event={item} />
					</SheetContent>
				</Sheet>
			</motion.div>
		</div>
	);
}

/* ===================== MAIN TIMELINE COMPONENT ===================== */
type AdventureTimelineProps = {
	items?: AdventureEvent[];
	title?: string;
	description?: string;
};

function AdventureTimeline({
	items = [],
	title = "Adventure Timeline",
	description = "Explore our upcoming expeditions and adventures",
}: AdventureTimelineProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-30px" });

	// Group items by month
	const groupedByMonth = items.reduce(
		(acc, item) => {
			if (!acc[item.month]) {
				acc[item.month] = [];
			}
			acc[item.month].push(item);
			return acc;
		},
		{} as Record<string, AdventureEvent[]>,
	);

	// Sort months chronologically
	const monthOrder = [
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const sortedMonths = Object.keys(groupedByMonth).sort(
		(a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b),
	);

	return (
		<div className="w-full mx-auto">
			{/* Header */}
			<div className="text-center mb-12">
				<h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-foreground">
					{title}
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
			</div>

			<div ref={ref} className="relative w-full">
				{/* Timeline line */}
				<motion.div
					initial={{ scaleY: 0 }}
					animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"
				/>

				<div className="space-y-8">
					{sortedMonths.map((month, monthIndex) => (
						<div key={month} className="space-y-8">
							{/* Month Header */}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
								transition={{ delay: monthIndex * 0.1, duration: 0.3 }}
								className="relative"
							>
								<div className="flex items-center gap-4">
									<div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
									<div
										className={`px-4 py-2.5 rounded-full ${getMonthBadgeColor(month)} text-sm font-semibold`}
									>
										{month} 2026 • {groupedByMonth[month].length} Adventure
										{groupedByMonth[month].length !== 1 ? "s" : ""}
									</div>
									<div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
								</div>
							</motion.div>

							{/* Events for this month */}
							{groupedByMonth[month].map((event, eventIndex) => (
								<TimelineItemComponent
									key={event.id}
									item={event}
									index={monthIndex * 10 + eventIndex}
								/>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export { AdventureTimeline };
