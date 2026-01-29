import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "1月", 门诊: 4200, 急诊: 1800, 住院: 890 },
  { month: "2月", 门诊: 3800, 急诊: 1600, 住院: 920 },
  { month: "3月", 门诊: 5100, 急诊: 2100, 住院: 1050 },
  { month: "4月", 门诊: 4800, 急诊: 1900, 住院: 980 },
  { month: "5月", 门诊: 5600, 急诊: 2300, 住院: 1120 },
  { month: "6月", 门诊: 6200, 急诊: 2500, 住院: 1200 },
  { month: "7月", 门诊: 5900, 急诊: 2400, 住院: 1150 },
  { month: "8月", 门诊: 6500, 急诊: 2600, 住院: 1280 },
  { month: "9月", 门诊: 5800, 急诊: 2200, 住院: 1100 },
  { month: "10月", 门诊: 6100, 急诊: 2450, 住院: 1180 },
  { month: "11月", 门诊: 5500, 急诊: 2150, 住院: 1050 },
  { month: "12月", 门诊: 6800, 急诊: 2700, 住院: 1350 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="text-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toLocaleString()}人次
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendChart = () => {
  return (
    <div className="chart-container h-full">
      <div className="chart-title">就诊趋势分析</div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorOutpatient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(175, 100%, 45%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(175, 100%, 45%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInpatient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(40, 95%, 55%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(40, 95%, 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="门诊"
            stroke="hsl(195, 100%, 50%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOutpatient)"
          />
          <Area
            type="monotone"
            dataKey="急诊"
            stroke="hsl(175, 100%, 45%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEmergency)"
          />
          <Area
            type="monotone"
            dataKey="住院"
            stroke="hsl(40, 95%, 55%)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorInpatient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">门诊</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">急诊</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">住院</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
