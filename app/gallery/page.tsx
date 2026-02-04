"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
	ChevronDown,
	Camera,
	Heart,
	Share2,
	Instagram,
	Loader2,
	X,
	Grid3x3,
	Filter,
	Search,
	Calendar,
	MapPin,
	Users,
	Download,
	Bookmark,
	ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Image data with metadata
const initialImages = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1200&auto=format&fit=crop",
		alt: "Mountain sunrise",
		title: "Sunrise at Gunung Ledang",
		description: "Early morning view from the summit",
		likes: 245,
		date: "2024-03-15",
		location: "Gunung Ledang, Johor",
		tags: ["mountain", "sunrise", "summit"],
		author: "Ahmad Faris",
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&auto=format&fit=crop",
		alt: "Forest trail",
		title: "Jungle Trekking",
		description: "Exploring the rainforest trails",
		likes: 189,
		date: "2024-03-10",
		location: "Endau Rompin National Park",
		tags: ["jungle", "trekking", "rainforest"],
		author: "Sarah Lim",
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&auto=format&fit=crop",
		alt: "Beach camping",
		title: "Island Adventure",
		description: "Camping under the stars",
		likes: 312,
		date: "2024-02-28",
		location: "Tioman Island",
		tags: ["beach", "camping", "island"],
		author: "Chen Wei",
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?w=1200&auto=format&fit=crop",
		alt: "Water activities",
		title: "River Adventure",
		description: "Water sports and activities",
		likes: 156,
		date: "2024-02-20",
		location: "Sungai Pahang",
		tags: ["river", "water", "adventure"],
		author: "Maya Tan",
	},
	{
		id: 5,
		src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=1200&auto=format&fit=crop",
		alt: "Group hiking",
		title: "Team Expedition",
		description: "Group hiking expedition",
		likes: 421,
		date: "2024-02-15",
		location: "Mount Kinabalu",
		tags: ["group", "hiking", "expedition"],
		author: "Team Kembara",
	},
	{
		id: 6,
		src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1200&auto=format&fit=crop",
		alt: "Night sky",
		title: "Starry Night",
		description: "Camping under the Milky Way",
		likes: 278,
		date: "2024-02-10",
		location: "Cameron Highlands",
		tags: ["night", "stars", "camping"],
		author: "Raj Kumar",
	},
	{
		id: 7,
		src: "https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=1200&auto=format&fit=crop",
		alt: "Waterfall",
		title: "Waterfall Discovery",
		description: "Discovering hidden waterfalls",
		likes: 195,
		date: "2024-02-05",
		location: "Lata Kinjang",
		tags: ["waterfall", "nature", "discovery"],
		author: "Lisa Wong",
	},
	{
		id: 8,
		src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&auto=format&fit=crop",
		alt: "Mountain view",
		title: "Summit Achievement",
		description: "Reaching the mountain peak",
		likes: 345,
		date: "2024-01-30",
		location: "Gunung Tahan",
		tags: ["mountain", "summit", "achievement"],
		author: "Ali Hassan",
	},
];

// Additional images for infinite scroll
const additionalImages = [
	{
		id: 9,
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop",
		alt: "Rock climbing",
		title: "Rock Climbing",
		description: "Challenging rock faces",
		likes: 267,
		date: "2024-01-25",
		location: "Batu Caves",
		tags: ["climbing", "rocks", "challenge"],
		author: "David Lee",
	},
	{
		id: 10,
		src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop",
		alt: "Island hopping",
		title: "Island Hopping",
		description: "Exploring multiple islands",
		likes: 398,
		date: "2024-01-20",
		location: "Langkawi Islands",
		tags: ["island", "boat", "exploration"],
		author: "Nadia Ali",
	},
];

const allTags = [
	"All",
	"Mountain",
	"Beach",
	"Jungle",
	"Waterfall",
	"Camping",
	"Hiking",
	"Group",
	"Night",
	"Sunrise",
	"Sunset",
];

export default function GalleryPage() {
	const [images, setImages] = useState(initialImages);
	const [selectedImage, setSelectedImage] = useState<
		(typeof initialImages)[0] | null
	>(null);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedTag, setSelectedTag] = useState("All");
	const [likedImages, setLikedImages] = useState<number[]>([]);
	const galleryRef = useRef<HTMLDivElement>(null);

	const filteredImages = images.filter((image) => {
		const matchesSearch =
			searchQuery === "" ||
			image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			image.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase()),
			);

		const matchesTag =
			selectedTag === "All" ||
			image.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

		return matchesSearch && matchesTag;
	});

	const loadMoreImages = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 800));

		const newImages = additionalImages.map((img, index) => ({
			...img,
			id: images.length + index + 1,
			likes: img.likes + Math.floor(Math.random() * 100),
		}));

		setImages((prev) => [...prev, ...newImages]);
		setPage((prev) => prev + 1);

		if (page >= 2) {
			setHasMore(false);
		}

		setLoading(false);
	}, [loading, hasMore, page, images.length]);

	useEffect(() => {
		const handleScroll = () => {
			if (!galleryRef.current || loading || !hasMore) return;

			const galleryBottom = galleryRef.current.getBoundingClientRect().bottom;
			const windowHeight = window.innerHeight;

			if (galleryBottom - windowHeight < 500) {
				loadMoreImages();
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loadMoreImages, loading, hasMore]);

	const handleImageClick = (image: (typeof initialImages)[0]) => {
		setSelectedImage(image);
		document.body.style.overflow = "hidden";
	};

	const handleCloseModal = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	};

	const handleLike = (imageId: number) => {
		setLikedImages((prev) =>
			prev.includes(imageId)
				? prev.filter((id) => id !== imageId)
				: [...prev, imageId],
		);
	};

	const handleDownload = (imageSrc: string, imageTitle: string) => {
		const link = document.createElement("a");
		link.href = imageSrc;
		link.download = `kembara-${imageTitle.toLowerCase().replace(/\s+/g, "-")}.jpg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative h-screen flex items-center justify-center overflow-hidden">
				{/* Animated background */}
				<div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-chart-2/5" />

				{/* Floating shapes animation */}
				{Array.from({ length: 15 }).map((_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full bg-gradient-to-r from-primary/10 to-chart-4/10"
						style={{
							width: `${20 + Math.random() * 60}px`,
							height: `${20 + Math.random() * 60}px`,
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -30, 0],
							x: [0, Math.random() * 40 - 20, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 10 + Math.random() * 10,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
				))}

				<div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.2, ease: "easeOut" }}
						className="space-y-8"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: "spring" }}
							className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur"
						>
							<Camera className="h-3 w-3" />
							Adventure Gallery
						</motion.div>

						<div className="space-y-4">
							<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
								<span className="block bg-gradient-to-r from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
									Kembara
								</span>
								<span className="block text-foreground mt-2">Visual Chronicles</span>
							</h1>

							<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Discover breathtaking moments from our adventures across Malaysia's
								natural wonders.
							</p>
						</div>

						{/* Search Bar */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="max-w-2xl mx-auto"
						>
							<div className="relative">
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search adventures, locations, or tags..."
									className="pl-12 pr-4 py-6 rounded-2xl border-border/50 bg-background/60 backdrop-blur text-lg"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
						</motion.div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
							className="flex flex-wrap justify-center gap-6 pt-4"
						>
							{[
								{ icon: Camera, value: "2.5K+", label: "Photos" },
								{ icon: Users, value: "300+", label: "Adventurers" },
								{ icon: MapPin, value: "50+", label: "Locations" },
								{ icon: Heart, value: "15K+", label: "Likes" },
							].map((stat, index) => (
								<div key={index} className="text-center">
									<div className="flex items-center gap-2">
										<stat.icon className="h-5 w-5 text-primary" />
										<span className="text-2xl font-bold text-foreground">
											{stat.value}
										</span>
									</div>
									<span className="text-sm text-muted-foreground">{stat.label}</span>
								</div>
							))}
						</motion.div>

						{/* Scroll Indicator */}
						<motion.div
							animate={{ y: [0, 15, 0] }}
							transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
							className="pt-16"
						>
							<ChevronDown className="h-8 w-8 text-muted-foreground mx-auto" />
							<p className="text-sm text-muted-foreground mt-3 animate-pulse">
								Scroll to explore the gallery
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="py-12 md:py-20">
				<div className="container mx-auto px-4">
					{/* Filter Tags */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="mb-12"
					>
						<div className="flex flex-wrap gap-2 justify-center">
							{allTags.map((tag) => (
								<Button
									key={tag}
									variant={selectedTag === tag ? "default" : "outline"}
									size="sm"
									className="rounded-full transition-all duration-300"
									onClick={() => setSelectedTag(tag)}
								>
									{tag}
								</Button>
							))}
						</div>
					</motion.div>

					{/* Gallery Grid */}
					<div ref={galleryRef} className="relative">
						<motion.div
							layout
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
						>
							<AnimatePresence>
								{filteredImages.map((image, index) => (
									<motion.div
										key={image.id}
										layout
										initial={{ opacity: 0, scale: 0.9, y: 20 }}
										animate={{ opacity: 1, scale: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.9, y: -20 }}
										transition={{ duration: 0.4, delay: index * 0.05 }}
										whileHover={{ y: -8, transition: { duration: 0.2 } }}
										className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 cursor-pointer"
										onClick={() => handleImageClick(image)}
									>
										{/* Image Container */}
										<div className="relative aspect-[4/5] overflow-hidden">
											<div
												className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
												style={{ backgroundImage: `url(${image.src})` }}
											/>

											{/* Gradient Overlay */}
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

											{/* Quick Actions */}
											<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
												<Button
													size="icon"
													variant="secondary"
													className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm"
													onClick={(e) => {
														e.stopPropagation();
														handleLike(image.id);
													}}
												>
													<Heart
														className={`h-4 w-4 ${likedImages.includes(image.id) ? "fill-red-500 text-red-500" : "text-white"}`}
													/>
												</Button>
												<Button
													size="icon"
													variant="secondary"
													className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm"
													onClick={(e) => {
														e.stopPropagation();
														handleDownload(image.src, image.title);
													}}
												>
													<Download className="h-4 w-4 text-white" />
												</Button>
											</div>

											{/* Image Info Overlay */}
											<div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
												<h3 className="text-lg font-semibold text-white mb-2">
													{image.title}
												</h3>
												<p className="text-sm text-white/80 mb-3">{image.description}</p>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4 text-xs text-white/60">
														<span className="flex items-center gap-1">
															<Calendar className="h-3 w-3" />
															{image.date}
														</span>
														<span className="flex items-center gap-1">
															<MapPin className="h-3 w-3" />
															{image.location}
														</span>
													</div>
													<div className="flex items-center gap-1 text-white">
														<Heart className="h-4 w-4" />
														<span className="text-sm">
															{image.likes + (likedImages.includes(image.id) ? 1 : 0)}
														</span>
													</div>
												</div>
											</div>
										</div>

										{/* Bottom Info */}
										<div className="p-4">
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-semibold text-foreground truncate">
													{image.title}
												</h3>
												<div className="flex items-center gap-1">
													<Heart className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm text-muted-foreground">
														{image.likes}
													</span>
												</div>
											</div>
											<div className="flex flex-wrap gap-1">
												{image.tags.slice(0, 2).map((tag) => (
													<span
														key={tag}
														className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
													>
														{tag}
													</span>
												))}
												{image.tags.length > 2 && (
													<span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
														+{image.tags.length - 2}
													</span>
												)}
											</div>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>

						{/* Loading Indicator */}
						{loading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex justify-center py-16"
							>
								<div className="flex flex-col items-center gap-3">
									<Loader2 className="h-8 w-8 animate-spin text-primary" />
									<p className="text-muted-foreground">Loading more adventures...</p>
								</div>
							</motion.div>
						)}

						{/* End Message */}
						{!hasMore && !loading && filteredImages.length > 0 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="text-center py-16"
							>
								<div className="inline-flex items-center gap-3 rounded-2xl border border-border/50 bg-card px-8 py-4 mb-6">
									<Camera className="h-6 w-6 text-primary" />
									<span className="font-semibold">All adventures loaded!</span>
								</div>
								<p className="text-muted-foreground mb-8 max-w-md mx-auto">
									You've explored all our current adventures. New content added weekly!
								</p>
								<div className="flex flex-col sm:flex-row gap-3 justify-center">
									<Button
										variant="outline"
										className="gap-2 rounded-full"
										onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
									>
										<ChevronDown className="h-4 w-4 rotate-180" />
										Back to Top
									</Button>
									<Button asChild className="gap-2 rounded-full">
										<a
											href="https://instagram.com/kembarauthm"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Instagram className="h-4 w-4" />
											Follow for More
										</a>
									</Button>
								</div>
							</motion.div>
						)}
					</div>
				</div>
			</section>

			{/* Image Modal */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
						onClick={handleCloseModal}
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ type: "spring", damping: 25 }}
							className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-card"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Close Button */}
							<Button
								size="icon"
								variant="ghost"
								className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
								onClick={handleCloseModal}
							>
								<X className="h-5 w-5" />
							</Button>

							{/* Image */}
							<div className="relative h-[60vh]">
								<div
									className="absolute inset-0 bg-cover bg-center"
									style={{ backgroundImage: `url(${selectedImage.src})` }}
								/>
							</div>

							{/* Content */}
							<div className="p-6 md:p-8">
								<div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
									<div className="space-y-4 flex-1">
										<div>
											<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
												{selectedImage.title}
											</h2>
											<p className="text-muted-foreground">{selectedImage.description}</p>
										</div>

										<div className="flex flex-wrap gap-4 text-sm">
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4 text-primary" />
												<span className="text-foreground">{selectedImage.date}</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-chart-2" />
												<span className="text-foreground">{selectedImage.location}</span>
											</div>
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4 text-chart-4" />
												<span className="text-foreground">By {selectedImage.author}</span>
											</div>
										</div>

										<div className="flex flex-wrap gap-2">
											{selectedImage.tags.map((tag) => (
												<span
													key={tag}
													className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
												>
													{tag}
												</span>
											))}
										</div>
									</div>

									{/* Actions */}
									<div className="flex flex-wrap gap-3">
										<Button
											variant="outline"
											className="gap-2 rounded-full"
											onClick={() => handleLike(selectedImage.id)}
										>
											<Heart
												className={`h-4 w-4 ${likedImages.includes(selectedImage.id) ? "fill-red-500 text-red-500" : ""}`}
											/>
											{selectedImage.likes +
												(likedImages.includes(selectedImage.id) ? 1 : 0)}{" "}
											Likes
										</Button>
										<Button
											variant="outline"
											className="gap-2 rounded-full"
											onClick={() =>
												handleDownload(selectedImage.src, selectedImage.title)
											}
										>
											<Download className="h-4 w-4" />
											Download
										</Button>
										<Button variant="outline" className="gap-2 rounded-full">
											<Share2 className="h-4 w-4" />
											Share
										</Button>
									</div>
								</div>

								{/* Navigation */}
								<div className="flex items-center justify-between pt-6 border-t border-border">
									<Button
										variant="ghost"
										className="gap-2"
										onClick={() => {
											const currentIndex = images.findIndex(
												(img) => img.id === selectedImage.id,
											);
											const prevIndex = (currentIndex - 1 + images.length) % images.length;
											setSelectedImage(images[prevIndex]);
										}}
									>
										<ChevronDown className="h-4 w-4 rotate-90" />
										Previous
									</Button>
									<span className="text-sm text-muted-foreground">
										{images.findIndex((img) => img.id === selectedImage.id) + 1} of{" "}
										{images.length}
									</span>
									<Button
										variant="ghost"
										className="gap-2"
										onClick={() => {
											const currentIndex = images.findIndex(
												(img) => img.id === selectedImage.id,
											);
											const nextIndex = (currentIndex + 1) % images.length;
											setSelectedImage(images[nextIndex]);
										}}
									>
										Next
										<ChevronDown className="h-4 w-4 -rotate-90" />
									</Button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
