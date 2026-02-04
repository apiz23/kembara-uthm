import NotFound from "@/components/ui/not-found";

export default function NotFoundDemo() {
	return (
		<NotFound
			particleCount={10000}
			particleSize={4}
			animate={true}
			buttonText="Go Back"
			buttonHref="/"
			className="custom-shadow"
		/>
	);
}
