import { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "accent" | "success" | "warning";
}
const StatCard = ({
  title,
  value,
  suffix = "",
  icon: Icon,
  trend,
  color = "primary"
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);
  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning"
  };
  return <div className="tech-card p-4 h-full">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-secondary ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && <div className={`text-xs flex items-center gap-1 ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>}
      </div>
      <div className="space-y-1">
        <div className="stat-value text-3xl text-primary bg-destructive">
          {displayValue.toLocaleString()}{suffix}
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>;
};
export default StatCard;