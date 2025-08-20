import StatCard from "./StatCard";

interface StatCardSectionProps {
  stats: {
    title: string;
    value: string;
    change: string;
    changeColor?: string;
    subValue: string;
  }[];
}

export default function StatCardSection({ stats }: StatCardSectionProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
