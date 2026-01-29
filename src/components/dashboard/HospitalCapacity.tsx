import { Bed, Users, Stethoscope, Ambulance } from "lucide-react";

interface CapacityItemProps {
  icon: React.ReactNode;
  label: string;
  current: number;
  total: number;
  color: string;
}

const CapacityItem = ({ icon, label, current, total, color }: CapacityItemProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="p-2 rounded-lg bg-secondary" style={{ color }}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium">
            <span style={{ color }}>{current}</span>
            <span className="text-muted-foreground">/{total}</span>
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}40`
            }}
          />
        </div>
      </div>
    </div>
  );
};

const HospitalCapacity = () => {
  return (
    <div className="chart-container h-full">
      <div className="chart-title">医院容量监控</div>
      <div className="space-y-2">
        <CapacityItem
          icon={<Bed className="w-4 h-4" />}
          label="床位使用"
          current={847}
          total={1000}
          color="hsl(195, 100%, 50%)"
        />
        <CapacityItem
          icon={<Stethoscope className="w-4 h-4" />}
          label="门诊接诊"
          current={1256}
          total={1500}
          color="hsl(175, 100%, 45%)"
        />
        <CapacityItem
          icon={<Users className="w-4 h-4" />}
          label="医护人员"
          current={423}
          total={500}
          color="hsl(150, 80%, 45%)"
        />
        <CapacityItem
          icon={<Ambulance className="w-4 h-4" />}
          label="急救车辆"
          current={18}
          total={25}
          color="hsl(40, 95%, 55%)"
        />
      </div>
    </div>
  );
};

export default HospitalCapacity;
