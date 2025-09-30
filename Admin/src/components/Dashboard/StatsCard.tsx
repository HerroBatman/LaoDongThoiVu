import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: StatsCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${getChangeColor()}`}>{change}</p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
}
