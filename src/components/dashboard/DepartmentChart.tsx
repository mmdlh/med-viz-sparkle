import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "内科", value: 2850, color: "hsl(195, 100%, 50%)" },
  { name: "外科", value: 2100, color: "hsl(175, 100%, 45%)" },
  { name: "儿科", value: 1680, color: "hsl(40, 95%, 55%)" },
  { name: "妇产科", value: 1420, color: "hsl(150, 80%, 45%)" },
  { name: "骨科", value: 980, color: "hsl(280, 70%, 55%)" },
  { name: "其他", value: 1870, color: "hsl(220, 40%, 40%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-lg">
        <p className="text-foreground font-medium">{item.name}</p>
        <p className="text-sm text-muted-foreground">
          就诊人次: <span className="text-primary">{item.value.toLocaleString()}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          占比: <span className="text-accent">{((item.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-1.5">
          <div 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const DepartmentChart = () => {
  return (
    <div className="chart-container h-full">
      <div className="chart-title">科室分布</div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
