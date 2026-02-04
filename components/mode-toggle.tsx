"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function ModeToggle() {
	const [mounted, setMounted] = React.useState(false);
	const { theme, setTheme, systemTheme } = useTheme();
	const [isHovered, setIsHovered] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				variant="outline"
				size="icon"
				className="relative overflow-hidden"
				aria-label="Toggle theme"
				disabled
			>
				<div className="h-[1.2rem] w-[1.2rem] bg-muted rounded-full animate-pulse" />
			</Button>
		);
	}

	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = currentTheme === "dark";
	const isSystem = theme === "system";

	const toggleTheme = () => {
		if (isDark) {
			setTheme("light");
		} else if (isSystem) {
			setTheme("dark");
		} else {
			setTheme("system");
		}
	};

	const iconVariants: Variants = {
		hidden: {
			opacity: 0,
			scale: 0.5,
			rotate: -90,
		},
		visible: {
			opacity: 1,
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring" as const,
				stiffness: 300,
				damping: 20,
			},
		},
	};

	const tooltipVariants: Variants = {
		hidden: {
			opacity: 0,
			y: 5,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring" as const,
				stiffness: 300,
				damping: 20,
			},
		},
	};

	return (
		<motion.div
			initial={false}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative"
		>
			<Button
				variant="outline"
				size="icon"
				onClick={toggleTheme}
				aria-label={`Switch to ${isDark ? "light" : isSystem ? "dark" : "system"} theme`}
				className={cn(
					"relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm",
					"hover:border-primary/50 hover:bg-accent/10",
					"transition-all duration-300",
					"h-10 w-10 rounded-full",
				)}
			>
				{/* Background gradient pulse */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

				{/* Icon container with precise positioning */}
				<div className="relative h-[1.2rem] w-[1.2rem] flex items-center justify-center">
					<AnimatePresence mode="wait">
						{isDark && (
							<motion.div
								key="moon"
								variants={iconVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								className="absolute"
							>
								<Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
							</motion.div>
						)}

						{!isDark && !isSystem && (
							<motion.div
								key="sun"
								variants={iconVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								className="absolute"
							>
								<Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
							</motion.div>
						)}

						{isSystem && (
							<motion.div
								key="monitor"
								variants={iconVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								className="absolute"
							>
								<Monitor className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Circular progress indicator */}
				<motion.div
					className="absolute inset-0 border-2 border-transparent rounded-full"
					animate={{
						borderColor: isHovered
							? [
									"hsl(var(--primary) / 0)",
									"hsl(var(--primary) / 0.5)",
									"hsl(var(--primary) / 0)",
								]
							: "transparent",
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</Button>

			{/* Tooltip */}
			<AnimatePresence>
				{isHovered && (
					<motion.div
						variants={tooltipVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 pointer-events-none"
					>
						<div className="px-3 py-1.5 text-xs font-medium whitespace-nowrap rounded-md bg-popover text-popover-foreground border shadow-lg">
							{isDark
								? "Switch to light"
								: isSystem
									? "Switch to dark"
									: "Switch to system"}
							<div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-popover border-l border-t" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Theme cycle indicator dots */}
			<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5">
				{["light", "system", "dark"].map((t, index) => (
					<div
						key={t}
						className={cn(
							"w-1 h-1 rounded-full transition-all duration-300",
							(isDark && t === "dark") ||
								(!isDark && !isSystem && t === "light") ||
								(isSystem && t === "system")
								? "bg-primary scale-100"
								: "bg-muted-foreground/30 scale-75",
						)}
					/>
				))}
			</div>
		</motion.div>
	);
}
