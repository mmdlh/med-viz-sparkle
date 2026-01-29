import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

const data = [
  { age: "0-18", male: 1200, female: 1100 },
  { age: "19-35", male: 2800, female: 3200 },
  { age: "36-50", male: 3500, female: 3100 },
  { age: "51-65", male: 4200, female: 3800 },
  { age: "66+", male: 2600, female: 2900 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="text-foreground font-medium mb-2">{label}岁</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === 'male' ? '男性' : '女性'}: {entry.value.toLocaleString()}人
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AgeDistributionChart = () => {
  return (
    <div className="chart-container h-full">
      <div className="chart-title">年龄分布</div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
          <XAxis 
            dataKey="age" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 11 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="male" 
            fill="hsl(195, 100%, 50%)" 
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
          <Bar 
            dataKey="female" 
            fill="hsl(330, 70%, 55%)" 
            radius={[4, 4, 0, 0]}
            maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">男性</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(330, 70%, 55%)' }} />
          <span className="text-xs text-muted-foreground">女性</span>
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
