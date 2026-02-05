"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Mountain,
	Users,
	Calendar,
	Compass,
	MapPin,
	Camera,
	Heart,
	Globe,
	Leaf,
	Map as MapIcon,
	Shield,
	Star,
	ChevronRight,
	Instagram,
	ArrowUpRight,
	Sparkles,
	PlayCircle,
	Tent,
	TreePine,
	GlassWater,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import logo from "@/public/icon/apple-touch-icon.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
	const heroRef = useRef(null);
	const heroInView = useInView(heroRef, { once: true, amount: 0.3 });

	// Animation variants
	const fadeInUp = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const scaleIn = {
		hidden: { scale: 0.9, opacity: 0 },
		visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
	};

	return (
		<div className="min-h-screen bg-background text-foreground overflow-hidden">
			{/* Hero Section - Introduction */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-card">
				{/* Animated background with theme colors */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/5 dark:bg-primary/[0.035] blur-[140px]" />
					<div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-chart-2/5 dark:bg-chart-2/[0.035] blur-[120px]" />
					<div className="absolute left-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-foreground/5 dark:bg-foreground/[0.02] blur-[150px]" />
				</div>

				{/* Grid background - FIXED: Correct gradient syntax */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)/10_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/10_1px,transparent_1px)] bg-[size:24px_24px]" />

				<div className="container mx-auto px-4 py-32 md:py-12 relative z-10">
					<div className="max-w-6xl mx-auto">
						<motion.div
							ref={heroRef}
							initial="hidden"
							animate={heroInView ? "visible" : "hidden"}
							variants={staggerContainer}
						>
							{/* Club Identity */}
							<motion.div variants={fadeInUp} className="text-center mb-12">
								<div className="flex flex-col items-center justify-center mb-6">
									<motion.div
										variants={scaleIn}
										className="relative inline-flex items-center justify-center w-28 h-28 mb-8"
										whileHover={{ scale: 1.05 }}
										transition={{ type: "spring", stiffness: 300 }}
									>
										{/* Animated glow effect */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-chart-2 animate-pulse blur-xl opacity-50" />

										{/* Gradient border */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-chart-2 p-[2px]">
											<div className="absolute inset-0 rounded-2xl bg-background blur-sm" />
										</div>

										{/* Main logo container */}
										<div className="relative z-10 w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-chart-2/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-2xl">
											<Image
												src={logo}
												alt="Kembara UTHM Logo"
												width={80}
												height={80}
												className="drop-shadow-2xl brightness-125 contrast-110"
											/>
										</div>
									</motion.div>

									<Badge
										variant="outline"
										className="inline-flex items-center gap-3 rounded-full border-primary/30 bg-card/80 backdrop-blur-sm px-6 py-2.5 text-sm font-semibold uppercase tracking-widest mb-6 group hover:border-primary/60 hover:bg-card transition-all duration-300"
									>
										{/* Animated sparkle */}
										<div className="relative">
											<Sparkles className="h-4 w-4 text-primary animate-spin-slow" />
											<div className="absolute inset-0 bg-primary/20 blur-sm animate-ping" />
										</div>

										{/* Text with gradient */}
										<span className="bg-gradient-to-r from-primary via-primary/90 to-chart-2 bg-clip-text text-transparent font-bold">
											UTHM Adventure Club
										</span>

										{/* Separator */}
										<div className="h-4 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

										{/* Animated dot */}
										<div className="relative">
											<div className="h-2 w-2 rounded-full bg-primary" />
											<div className="absolute inset-0 rounded-full bg-primary animate-ping" />
										</div>
									</Badge>
								</div>
								<motion.h1
									variants={fadeInUp}
									className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
								>
									<span className="block bg-gradient-to-r from-primary via-primary/80 to-chart-3 bg-clip-text text-transparent">
										Kembara
									</span>
									<span className="block text-foreground mt-2">UTHM Adventure Club</span>
								</motion.h1>

								<motion.p
									variants={fadeInUp}
									className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10"
								>
									Discover Malaysia's natural wonders, build lifelong friendships, and
									create unforgettable memories with UTHM's premier outdoor adventure
									society.
								</motion.p>
							</motion.div>

							{/* Visual Showcase */}
							<motion.div
								variants={staggerContainer}
								className="grid md:grid-cols-3 gap-6 mb-16"
							>
								{[
									{
										src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
										alt: "Mountain Adventure",
										badge: "Gunung Ledang",
										icon: Mountain,
										color: "border-primary/30 bg-primary/5",
									},
									{
										src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
										alt: "Jungle Trekking",
										badge: "Endau Rompin",
										icon: TreePine,
										color: "border-chart-2/30 bg-chart-2/5",
									},
									{
										src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
										alt: "Island Adventure",
										badge: "Tioman Island",
										icon: GlassWater,
										color: "border-chart-3/30 bg-chart-3/5",
									},
								].map((image, index) => {
									const Icon = image.icon;
									return (
										<motion.div
											key={index}
											variants={scaleIn}
											whileHover={{ y: -8, scale: 1.02 }}
											transition={{ duration: 0.3 }}
											className={`relative h-64 rounded-2xl overflow-hidden group cursor-pointer border-2 ${image.color}`}
										>
											<Image
												src={image.src}
												alt={image.alt}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover group-hover:scale-110 transition-transform duration-700"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
											<div className="absolute bottom-4 left-4">
												<Badge className="bg-card/90 backdrop-blur-sm border-border/40 text-black dark:text-white">
													<Icon className="h-3 w-3 mr-1" />
													{image.badge}
												</Badge>
											</div>
										</motion.div>
									);
								})}
							</motion.div>

							{/* Club Milestones */}
							<motion.div variants={fadeInUp} className="text-center">
								<div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-card border border-border backdrop-blur shadow-sm">
									{[
										{
											value: "5+",
											label: "Years of Adventure",
											icon: Calendar,
											color: "bg-primary/10 text-primary",
										},
										{
											value: "50+",
											label: "Expeditions",
											icon: Compass,
											color: "bg-chart-2/10 text-chart-2",
										},
										{
											value: "300+",
											label: "Community Members",
											icon: Users,
											color: "bg-chart-4/10 text-chart-4",
										},
										{
											value: "15+",
											label: "Destinations",
											icon: MapIcon,
											color: "bg-chart-5/10 text-chart-5",
										},
									].map((stat, index) => {
										const Icon = stat.icon;
										return (
											<motion.div
												key={index}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 + 0.5 }}
												className="text-center space-y-3"
												whileHover={{ scale: 1.05 }}
											>
												<div
													className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${stat.color.split(" ")[0]} mb-3`}
												>
													<Icon className={`h-6 w-6 ${stat.color.split(" ")[1]}`} />
												</div>
												<div className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">
													{stat.value}
												</div>
												<div className="text-sm text-muted-foreground font-medium">
													{stat.label}
												</div>
											</motion.div>
										);
									})}
								</div>
							</motion.div>
						</motion.div>
					</div>
				</div>

				{/* Scroll indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, y: [0, 10, 0] }}
					transition={{
						opacity: { delay: 1, duration: 0.6 },
						y: { delay: 1.5, duration: 1.5, repeat: Infinity },
					}}
					className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
				>
					<ChevronRight className="h-6 w-6 text-muted-foreground rotate-90" />
				</motion.div>
			</section>

			{/* Club Story */}
			<section className="py-20 bg-card/50 relative overflow-hidden">
				{/* Grid background - FIXED */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-[size:24px_24px]" />

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-6xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="text-center mb-12"
						>
							<Badge
								variant="secondary"
								className="inline-flex items-center gap-2 rounded-full border-border/40 bg-background/80 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80 mb-4"
							>
								<Sparkles className="h-3 w-3 text-primary" />
								Our Journey
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
								Our Adventure Story
							</h2>
							<p className="text-lg text-muted-foreground">
								Founded by passionate UTHM students who believe in the transformative
								power of nature
							</p>
						</motion.div>
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="space-y-8">
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6 }}
									className="space-y-6"
								>
									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-2 h-8 bg-primary rounded-full" />
											<h3 className="text-xl font-bold text-foreground">Our Philosophy</h3>
										</div>
										<p className="text-muted-foreground leading-relaxed">
											At Kembara, we believe that adventure builds character. Through
											challenging expeditions and shared experiences, we help students
											develop resilience, teamwork, and a deep appreciation for Malaysia's
											natural heritage.
										</p>
									</div>

									<div className="space-y-4">
										<div className="flex items-center gap-3">
											<div className="w-2 h-8 bg-chart-2 rounded-full" />
											<h3 className="text-xl font-bold text-foreground">
												Community First
											</h3>
										</div>
										<p className="text-muted-foreground leading-relaxed">
											More than just an adventure club, we're a supportive community where
											lasting friendships are formed. Our alumni network continues to
											connect and support each other beyond university life.
										</p>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.2 }}
									className="flex flex-col sm:flex-row gap-4"
								>
									<Button size="lg" className="gap-2 w-full sm:w-auto">
										Join Our Community
										<ArrowUpRight className="h-4 w-4" />
									</Button>
									<Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
										<PlayCircle className="h-4 w-4" />
										Watch Our Story
									</Button>
								</motion.div>
							</div>

							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className="relative"
							>
								<div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl border border-border/40 group">
									<Image
										src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
										alt="Kembara Community"
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-cover group-hover:scale-105 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
								</div>

								{/* Floating image - responsive positioning */}
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: 0.3 }}
									className="absolute -right-2 sm:right-0 md:-right-4 bottom-0 md:-bottom-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-background shadow-lg"
								>
									<Image
										src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
										alt="Adventure Moment"
										fill
										sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
										className="object-cover"
									/>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Adventure Types - Bento Grid Style */}
			<section className="py-20 relative bg-gradient-to-b from-background via-background to-background/95">
				<div className="absolute inset-0 -z-10">
					<div className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-chart-4/5 dark:bg-chart-4/[0.02] blur-[120px]" />
				</div>

				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<Badge
							variant="outline"
							className="inline-flex items-center gap-2 rounded-full border-primary/50 bg-card/80 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary mb-4"
						>
							<Compass className="h-3 w-3" />
							Adventure Catalog
						</Badge>
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
							Types of Adventures
						</h2>
						<p className="text-lg text-muted-foreground">
							Diverse expeditions catering to all adventure levels
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{[
							{
								title: "Mountain Expeditions",
								description: "Summit challenges for all skill levels",
								icon: Mountain,
								image:
									"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
								color: "border-primary/30 bg-primary/5 hover:border-primary/50",
								badge: "Advanced",
								badgeColor: "bg-primary/20 text-primary border-primary/30",
							},
							{
								title: "Jungle Trekking",
								description: "Explore Malaysia's rainforests",
								icon: TreePine,
								image:
									"https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
								color: "border-chart-2/30 bg-chart-2/5 hover:border-chart-2/50",
								badge: "Intermediate",
								badgeColor: "bg-chart-2/20 text-chart-2 border-chart-2/30",
							},
							{
								title: "Coastal Adventures",
								description: "Island hopping and beach camping",
								icon: Tent,
								image:
									"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
								color: "border-chart-3/30 bg-chart-3/5 hover:border-chart-3/50",
								badge: "Beginner",
								badgeColor: "bg-chart-3/20 text-chart-3 border-chart-3/30",
							},
						].map((type, index) => {
							const Icon = type.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									whileHover={{ y: -4 }}
								>
									<Card
										className={`border-2 overflow-hidden ${type.color} hover:shadow-lg transition-all duration-300 group pt-0`}
									>
										<div className="relative h-48">
											<Image
												src={type.image}
												alt={type.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover group-hover:scale-105 transition-transform duration-500"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
											<div className="absolute top-4 left-4">
												<div className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center border border-border/40">
													<Icon className="h-6 w-6 text-foreground" />
												</div>
											</div>
											<div className="absolute top-4 right-4">
												<Badge className={`${type.badgeColor}`}>{type.badge}</Badge>
											</div>
										</div>
										<CardContent className="p-6">
											<h3 className="text-xl font-bold mb-3 text-foreground">
												{type.title}
											</h3>
											<p className="text-muted-foreground mb-4">{type.description}</p>
											<Button
												variant="ghost"
												className="gap-2 px-0 text-primary hover:text-primary/90"
											>
												Explore Adventures
												<ArrowUpRight className="h-4 w-4" />
											</Button>
										</CardContent>
									</Card>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Safety & Values */}
			<section className="py-20 bg-card relative overflow-hidden">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-6xl mx-auto"
					>
						<div className="text-center mb-12">
							<Badge
								variant="outline"
								className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/80 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80 mb-4"
							>
								<Shield className="h-3 w-3 text-primary" />
								Our Commitment
							</Badge>
							<h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
								Safety & Values
							</h2>
							<p className="text-lg text-muted-foreground">
								Adventure with confidence and responsibility
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-6">
							{[
								{
									icon: Shield,
									title: "Safety First",
									description:
										"All expeditions led by certified guides with comprehensive safety protocols",
									highlight: "100% Safety Record",
									color: "bg-primary/10 text-primary border-primary/20",
								},
								{
									icon: Heart,
									title: "Environmental Care",
									description:
										"Leave No Trace principles and conservation efforts in all our adventures",
									highlight: "Eco-Friendly Practices",
									color: "bg-chart-2/10 text-chart-2 border-chart-2/20",
								},
								{
									icon: Users,
									title: "Inclusive Community",
									description:
										"Welcoming adventurers of all backgrounds and experience levels",
									highlight: "300+ Active Members",
									color: "bg-chart-4/10 text-chart-4 border-chart-4/20",
								},
							].map((value, index) => {
								const Icon = value.icon;
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
										whileHover={{ y: -4 }}
										className={`group relative overflow-hidden rounded-2xl border p-8 backdrop-blur transition-all hover:shadow-lg ${value.color}`}
									>
										<div className="relative text-center">
											<div
												className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.color.split(" ")[0]} mb-6 group-hover:scale-110 transition-transform duration-300`}
											>
												<Icon className={`h-7 w-7 ${value.color.split(" ")[1]}`} />
											</div>
											<h3 className="text-xl font-bold mb-4 text-foreground">
												{value.title}
											</h3>
											<p className="text-muted-foreground mb-6 leading-relaxed">
												{value.description}
											</p>
											<Badge
												variant="outline"
												className="px-4 py-1.5 border-border/40 bg-card/60"
											>
												{value.highlight}
											</Badge>
										</div>
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Photo Gallery Preview */}
			<section className="py-20 relative bg-gradient-to-b from-background to-card">
				<div className="absolute inset-0 -z-10">
					<div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-chart-3/5 dark:bg-chart-3/[0.02] blur-[100px]" />
				</div>

				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12"
					>
						<div className="inline-flex items-center gap-3 mb-4">
							<Camera className="h-8 w-8 text-primary" />
							<h2 className="text-3xl md:text-4xl font-bold text-foreground">
								Adventure Moments
							</h2>
						</div>
						<p className="text-lg text-muted-foreground">
							Glimpse into our unforgettable journeys
						</p>
					</motion.div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
						{[
							"https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
							"https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
							"https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
							"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
						].map((src, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ scale: 1.05 }}
								className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer border border-border/40"
							>
								<Image
									src={src}
									alt={`Adventure photo ${index + 1}`}
									fill
									sizes="(max-width: 768px) 50vw, 25vw"
									className="object-cover group-hover:scale-110 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							</motion.div>
						))}
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-center"
					>
						<Button
							variant="outline"
							className="gap-2 group hover:shadow-lg transition-all border-border hover:border-primary"
							asChild
						>
							<a
								href="https://www.instagram.com/kembarauthm"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram className="h-5 w-5" />
								See More on Instagram
								<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</a>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Footer CTA */}
			<section className="py-16 bg-gradient-to-b from-background via-card/50 to-card relative overflow-hidden">
				{/* Grid background - FIXED */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-[size:24px_24px]" />

				<div className="container mx-auto px-4 text-center relative z-10">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl mx-auto"
					>
						<Badge
							variant="outline"
							className="inline-flex items-center gap-2 rounded-full border-border/50 bg-card/80 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80 mb-6"
						>
							<Star className="h-3 w-3 text-primary" />
							Ready to Adventure?
						</Badge>

						<h2 className="text-3xl font-bold mb-6 text-foreground">
							Start Your Journey with Us
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Ready to see what we're all about? Browse our expeditions and learn more
							about the Kembara experience.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								variant="outline"
								className="gap-2 group hover:shadow-lg transition-all border-border hover:border-primary"
							>
								View Expedition Gallery
								<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
							<Button size="lg" className="gap-2 group hover:shadow-lg transition-all">
								Join Our Community
								<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
