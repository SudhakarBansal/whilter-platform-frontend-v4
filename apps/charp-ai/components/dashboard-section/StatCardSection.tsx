import StatCard from "./StatCard";

const stats = [
	{
		title: "Total Media Requests",
		value: "1.2 M",
		change: "+55%",
		changeColor: "text-green-400",
		subValue: "1233450",
	},
	{
		title: "Total Media Generated",
		value: "1.1 M",
		change: "+55%",
		changeColor: "text-green-400",
		subValue: "1133450",
	},
	{
		title: "Total Media Failed",
		value: "20 K",
		change: "-20%",
		changeColor: "text-red-400",
		subValue: "23345",
	},
	{
		title: "Total Media Pending",
		value: "6 K",
		change: "-55%",
		changeColor: "text-red-400",
		subValue: "63450",
	},
];

export default function StatCardSection() {
	return (
		<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{stats.map((stat, idx) => (
				<StatCard key={idx} {...stat} />
			))}
		</div>
	);
}