import { Pill, Package, AlertTriangle, TrendingUp, Clock, Boxes } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const categoryData = [
  { name: "抗生素", value: 2850, color: "hsl(195, 100%, 50%)" },
  { name: "心血管药", value: 2100, color: "hsl(175, 100%, 45%)" },
  { name: "消化系统", value: 1680, color: "hsl(40, 95%, 55%)" },
  { name: "神经系统", value: 1420, color: "hsl(330, 70%, 55%)" },
  { name: "外用药", value: 980, color: "hsl(150, 80%, 45%)" },
  { name: "其他", value: 1870, color: "hsl(220, 40%, 50%)" },
];

const dispensingTrend = [
  { date: "01/20", 处方数: 380, 发药量: 1520 },
  { date: "01/21", 处方数: 420, 发药量: 1680 },
  { date: "01/22", 处方数: 395, 发药量: 1580 },
  { date: "01/23", 处方数: 450, 发药量: 1800 },
  { date: "01/24", 处方数: 480, 发药量: 1920 },
  { date: "01/25", 处方数: 420, 发药量: 1680 },
  { date: "01/26", 处方数: 460, 发药量: 1840 },
];

const stockAlert = [
  { name: "阿莫西林胶囊", stock: 120, threshold: 500, status: "紧急" },
  { name: "布洛芬片", stock: 380, threshold: 500, status: "预警" },
  { name: "氯雷他定", stock: 250, threshold: 300, status: "预警" },
  { name: "奥美拉唑", stock: 95, threshold: 400, status: "紧急" },
  { name: "头孢克肟", stock: 180, threshold: 300, status: "预警" },
];

const topDrugs = [
  { name: "阿莫西林", count: 856 },
  { name: "布洛芬", count: 742 },
  { name: "维生素C", count: 698 },
  { name: "头孢", count: 623 },
  { name: "氯雷他定", count: 567 },
  { name: "奥美拉唑", count: 521 },
];

const PharmacyPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "紧急": return "text-destructive bg-destructive/10";
      case "预警": return "text-warning bg-warning/10";
      default: return "text-success bg-success/10";
    }
  };

  return (
    <PageLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="animate-fade-in">
          <StatCard title="今日处方" value={2156} suffix="张" icon={Pill} trend={{ value: 8.5, isPositive: true }} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="发药量" value={8624} suffix="盒" icon={Package} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="库存预警" value={5} suffix="种" icon={AlertTriangle} color="warning" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="药品种类" value={1856} suffix="种" icon={Boxes} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="平均取药" value={4.5} suffix="分钟" icon={Clock} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="周环比" value={12.3} suffix="%" icon={TrendingUp} trend={{ value: 12.3, isPositive: true }} color="success" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dispensing trend - spans 2 columns */}
        <div className="lg:col-span-2 chart-container animate-fade-in">
          <div className="chart-title">近7日发药趋势</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={dispensingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Line yAxisId="left" type="monotone" dataKey="处方数" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(195, 100%, 50%)' }} />
              <Line yAxisId="right" type="monotone" dataKey="发药量" stroke="hsl(175, 100%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(175, 100%, 45%)' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">处方数</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">发药量</span>
            </div>
          </div>
        </div>

        {/* Category distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">药品类别分布</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock alert */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            库存预警
          </div>
          <div className="space-y-3 mt-3">
            {stockAlert.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    库存: <span className="text-destructive">{item.stock}</span> / 阈值: {item.threshold}
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top drugs */}
        <div className="lg:col-span-2 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">热门药品TOP6</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topDrugs}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Bar dataKey="count" fill="hsl(195, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default PharmacyPage;
