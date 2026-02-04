"use client";

import { useRef, useEffect, useState, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass, Mountain, ArrowRight } from "lucide-react";

interface NotFoundProps {
	particleCount?: number;
	particleSize?: number;
	animate?: boolean;
	buttonText?: string;
	buttonHref?: string;
	className?: string;
	onButtonClick?: () => void;
}

export default function NotFound({
	particleCount = 150,
	particleSize = 2,
	animate = true,
	buttonText = "Return Home",
	buttonHref = "/",
	className = "",
	onButtonClick,
}: NotFoundProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [isDark, setIsDark] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkDarkMode = () => {
			setIsDark(document.documentElement.classList.contains("dark"));
		};

		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkDarkMode();
		checkMobile();

		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		window.addEventListener("resize", checkMobile);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const handleMouseMove = (e: MouseEvent) => {
		if (!containerRef.current || isMobile) return;

		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect();
		const x = ((e.clientX - left) / width - 0.5) * 20;
		const y = ((e.clientY - top) / height - 0.5) * 20;

		setMousePosition({ x, y });

		if (contentRef.current) {
			contentRef.current.style.transform = `translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
		}
	};

	const handleMouseLeave = () => {
		if (isMobile) return;

		setMousePosition({ x: 0, y: 0 });
		if (contentRef.current) {
			contentRef.current.style.transform = "translateX(0) translateY(0)";
		}
	};

	// Adjust particle count for mobile
	const adjustedParticleCount = isMobile ? particleCount / 2 : particleCount;
	const adjustedParticleSize = isMobile ? particleSize * 0.8 : particleSize;

	// Using Unsplash images for better quality
	const backgroundImage = isDark
		? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
		: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

	return (
		<div
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-background via-background/95 to-primary/5 ${className}`}
		>
			{/* Background Image with Overlay */}
			<div className="absolute inset-0 z-0">
				<Image
					src={backgroundImage}
					alt="Adventure Background"
					fill
					className="object-cover opacity-30 dark:opacity-20"
					priority
					quality={100}
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
			</div>

			{/* Animated Particles */}
			<Particles
				color={isDark ? "#ffffff" : "#335dcf"}
				particleCount={adjustedParticleCount}
				particleSize={adjustedParticleSize}
				animate={animate}
				className="absolute inset-0 z-0 opacity-20 md:opacity-30"
			/>

			{/* Main Content */}
			<div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Error Code Display */}
					<div className="text-center mb-8 sm:mb-12">
						<div
							ref={contentRef}
							className="inline-block transition-transform duration-150 ease-out"
						>
							<div className="relative mb-6 sm:mb-8">
								<div className="text-[120px] sm:text-[160px] md:text-[240px] font-black leading-none tracking-tight">
									<span className="bg-linear-to-r from-primary via-primary/80 to-chart-2 bg-clip-text text-transparent">
										404
									</span>
								</div>
								<div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-linear-to-r from-primary/20 to-chart-2/20 blur-xl" />
								<div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-linear-to-r from-chart-4/20 to-chart-5/20 blur-xl" />
							</div>
						</div>

						{/* Message */}
						<div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 px-2">
							<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold px-2">
								Lost in the Wilderness
							</h1>
							<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
								Looks like you&apos;ve wandered off the trail. Don&apos;t worry, even
								the best explorers sometimes lose their way. Let&apos;s get you back to
								the adventure!
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
							<Button
								size={isMobile ? "default" : "lg"}
								className="rounded-full px-6 sm:px-8 py-4 sm:py-6 gap-2 sm:gap-3 group w-full sm:w-auto"
								asChild
							>
								<Link href={buttonHref} onClick={onButtonClick}>
									<Home className="h-4 w-4 sm:h-5 sm:w-5" />
									{buttonText}
									<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>

							<Button
								size={isMobile ? "default" : "lg"}
								variant="outline"
								className="rounded-full px-6 sm:px-8 py-4 sm:py-6 gap-2 sm:gap-3 group w-full sm:w-auto backdrop-blur-sm"
								asChild
							>
								<Link href="/expeditions">
									<Compass className="h-4 w-4 sm:h-5 sm:w-5" />
									Explore Expeditions
									<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
						</div>

						{/* Quick Links */}
						<div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 px-4">
							<p className="text-sm text-muted-foreground mb-3 sm:mb-4 text-center">
								Quick links that might help:
							</p>
							<div className="flex flex-wrap justify-center gap-2 sm:gap-3">
								{[
									{ href: "/about", label: "About Club" },
									{ href: "/gallery", label: "Gallery" },
									{ href: "/members", label: "Members" },
									{ href: "/contact", label: "Contact" },
								].map((link) => (
									<Link
										key={link.href}
										href={link.href}
										className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-border hover:border-primary/50 hover:text-primary transition-colors whitespace-nowrap"
									>
										{link.label}
									</Link>
								))}
							</div>
						</div>
					</div>

					{/* Mobile-friendly tips */}
					{isMobile && (
						<div className="mt-8 px-4">
							<div className="bg-background/30 backdrop-blur-sm border border-border/50 rounded-2xl p-4 text-center">
								<Mountain className="h-6 w-6 mx-auto mb-2 text-primary" />
								<p className="text-xs text-muted-foreground">
									Tap on buttons to navigate. Swipe to explore more adventures!
								</p>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Decorative Elements */}
			{!isMobile && (
				<>
					{/* Floating decorative elements */}
					<div className="hidden lg:block absolute top-1/4 left-10 w-4 h-4 rounded-full bg-primary/20 animate-pulse" />
					<div className="hidden lg:block absolute bottom-1/4 right-10 w-6 h-6 rounded-full bg-chart-2/20 animate-pulse delay-1000" />
					<div className="hidden lg:block absolute top-1/3 right-20 w-3 h-3 rounded-full bg-chart-4/20 animate-pulse delay-500" />
				</>
			)}

			{/* Bottom linear for mobile */}
			{isMobile && (
				<div className="fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
			)}
		</div>
	);
}
