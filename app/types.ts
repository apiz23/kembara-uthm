export interface AdventureEvent {
	id: string;
	month: string;
	title: string;

	// ✅ ADD THESE
	dates: string;
	duration?: string;
	description?: string;

	location: string;
	type: "hiking" | "expedition" | "event" | "water" | "trail";
	confirmed: boolean;

	// ✅ REQUIRED for map usage
	coordinates: {
		lng: number;
		lat: number;
	};
}
