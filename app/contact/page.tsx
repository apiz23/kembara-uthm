"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	Clock,
	Users,
	Globe,
	MessageSquare,
	Heart,
} from "lucide-react";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut" as const,
		},
	},
};

export default function ContactPage() {
	const contactInfo = [
		{
			icon: Mail,
			title: "Email",
			details: "kembara@uthm.edu.my",
			subtitle: "Primary Contact",
			description: "For general inquiries and information",
		},
		{
			icon: Phone,
			title: "Phone",
			details: "+60 7-453 7000",
			subtitle: "Office Hours",
			description: "Monday - Friday, 8:00 AM - 5:00 PM",
		},
		{
			icon: MapPin,
			title: "Location",
			details: "Universiti Tun Hussein Onn Malaysia",
			subtitle: "Main Campus",
			description: "86400 Parit Raja, Batu Pahat, Johor, Malaysia",
		},
	];

	const clubHours = [
		{
			icon: Clock,
			day: "Monday - Thursday",
			time: "2:00 PM - 6:00 PM",
			activity: "Planning & Training Sessions",
		},
		{
			icon: Users,
			day: "Friday",
			time: "3:00 PM - 8:00 PM",
			activity: "Community Meetups & Briefings",
		},
		{
			icon: Globe,
			day: "Weekends",
			time: "Varies",
			activity: "Adventure Expeditions",
		},
	];

	const socialLinks = [
		{
			platform: "Instagram",
			handle: "@kembarauthm",
			url: "https://instagram.com/kembarauthm",
			followers: "3.5K+ followers",
		},
		{
			platform: "Facebook",
			handle: "Kembara UTHM",
			url: "https://facebook.com/kembarauthm",
			members: "2K+ members",
		},
		{
			platform: "Telegram",
			handle: "Kembara Updates",
			url: "https://t.me/kembarauthm",
			members: "Active community",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative overflow-hidden px-6 py-28 sm:px-8 md:py-28">
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.035] blur-[140px]" />
					<div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-chart-2/[0.035] blur-[130px]" />
				</div>

				<div className="mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-center"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur mb-6">
							<span className="h-2 w-2 rounded-full bg-primary" />
							Get In Touch
						</div>

						<h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
							Connect with{" "}
							<span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
								Kembara
							</span>
						</h1>

						<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
							Ready to join our next adventure? Here's everything you need to reach us
							and become part of Malaysia's premier university adventure community.
						</p>
					</motion.div>
				</div>
			</section>

			{/* Contact Information */}
			<section className="px-6 pb-20 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="grid gap-6 md:grid-cols-3"
					>
						{contactInfo.map((info, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card className="group relative h-full overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-8 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg">
									<div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

									<div className="relative">
										<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
											<info.icon className="h-7 w-7 text-primary" />
										</div>

										<h3 className="text-xl font-semibold text-foreground mb-2">
											{info.title}
										</h3>
										<p className="text-sm text-muted-foreground mb-4">{info.subtitle}</p>

										<p className="text-lg font-medium text-foreground mb-3">
											{info.details}
										</p>
										<p className="text-sm text-muted-foreground">{info.description}</p>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Club Hours & Activities */}
			<section className="px-6 pb-20 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Club Hours & Activities
						</h2>
						<p className="text-muted-foreground">
							When and where to find us throughout the week
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="grid gap-6 md:grid-cols-3"
					>
						{clubHours.map((schedule, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-8 backdrop-blur">
									<div className="flex items-start gap-4">
										<div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-chart-2/10 flex-shrink-0">
											<schedule.icon className="h-6 w-6 text-chart-2" />
										</div>

										<div>
											<h3 className="text-lg font-semibold text-foreground mb-2">
												{schedule.day}
											</h3>
											<p className="text-primary font-medium mb-2">{schedule.time}</p>
											<p className="text-sm text-muted-foreground">{schedule.activity}</p>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Social Media & Community */}
			<section className="px-6 pb-20 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-center mb-12"
					>
						<div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur mb-4">
							<span className="h-2 w-2 rounded-full bg-chart-4" />
							Join Our Community
						</div>

						<h2 className="text-3xl font-bold text-foreground mb-4">
							Stay Connected
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto">
							Follow us on social media for the latest updates, photos, and adventure
							announcements
						</p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="grid gap-6 md:grid-cols-3"
					>
						{socialLinks.map((social, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-8 backdrop-blur transition-all hover:border-border/60 hover:shadow-lg">
									<a
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="block"
									>
										<div className="flex items-start justify-between mb-4">
											<div>
												<h3 className="text-xl font-semibold text-foreground mb-2">
													{social.platform}
												</h3>
												<p className="text-primary font-medium">{social.handle}</p>
											</div>
											<MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
										</div>

										<p className="text-sm text-muted-foreground">
											{social.followers || social.members}
										</p>

										<div className="mt-4 pt-4 border-t border-border/40">
											<p className="text-xs text-muted-foreground">
												Click to visit our {social.platform} page
											</p>
										</div>
									</a>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Getting Started */}
			<section className="px-6 pb-20 sm:px-8">
				<div className="mx-auto max-w-4xl">
					<Card className="relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 via-background/60 to-chart-2/5 p-10 backdrop-blur">
						<div className="grid md:grid-cols-2 gap-10 items-center">
							<div>
								<div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/70 backdrop-blur mb-6">
									<Heart className="h-3 w-3 text-primary" />
									New to Kembara?
								</div>

								<h2 className="text-2xl font-bold text-foreground mb-4">
									Ready for Your First Adventure?
								</h2>
								<p className="text-muted-foreground mb-6">
									Join us for our monthly orientation sessions where we introduce new
									members to our community, safety protocols, and upcoming adventures.
								</p>

								<ul className="space-y-3">
									<li className="flex items-center gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-primary" />
										<span>No prior experience needed</span>
									</li>
									<li className="flex items-center gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-chart-2" />
										<span>All equipment provided for beginners</span>
									</li>
									<li className="flex items-center gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-chart-4" />
										<span>Meet fellow adventure enthusiasts</span>
									</li>
								</ul>
							</div>

							<div className="text-center">
								<div className="inline-block rounded-2xl border-2 border-dashed border-primary/30 p-8">
									<p className="text-sm text-muted-foreground mb-3">
										Next Orientation Session
									</p>
									<p className="text-2xl font-bold text-foreground mb-2">
										Every First Saturday
									</p>
									<p className="text-primary font-medium mb-4">
										10:00 AM @ Adventure Hub
									</p>
									<p className="text-xs text-muted-foreground">
										Check our social media for updates and special events
									</p>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* Campus Map & Location */}
			<section className="px-6 pb-20 sm:px-8">
				<div className="mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Find Us on Campus
						</h2>
						<p className="text-muted-foreground">Visit our adventure hub at UTHM</p>
					</motion.div>

					<Card className="overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-8 backdrop-blur">
						<div className="grid md:grid-cols-2 gap-10 items-center">
							<div>
								<h3 className="text-xl font-semibold text-foreground mb-4">
									Adventure Hub Location
								</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-3">
										<MapPin className="h-5 w-5 text-primary mt-0.5" />
										<div>
											<p className="font-medium text-foreground">
												Block C, Faculty of Technical and Vocational Education
											</p>
											<p className="text-sm text-muted-foreground">
												Ground Floor, Room C-101
											</p>
										</div>
									</div>

									<div className="flex items-start gap-3">
										<Clock className="h-5 w-5 text-chart-2 mt-0.5" />
										<div>
											<p className="font-medium text-foreground">Semester Hours</p>
											<p className="text-sm text-muted-foreground">
												During academic semesters only
											</p>
										</div>
									</div>
								</div>

								<div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
									<p className="text-sm text-foreground">
										<span className="font-semibold">Note:</span> For urgent matters during
										non-operating hours, contact our student committee via Telegram group.
									</p>
								</div>
							</div>

							<div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-border/40">
								<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center">
									<div className="text-center">
										<MapPin className="h-12 w-12 text-primary/40 mx-auto mb-4" />
										<p className="text-muted-foreground">Campus Map Location</p>
										<p className="text-sm text-muted-foreground mt-2">
											Block C, FPTV Building
										</p>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
}
