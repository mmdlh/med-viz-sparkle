import { Pill, Package, AlertTriangle, TrendingUp, Clock, Boxes, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Treemap } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const dispensingTrend = [
  { date: "01/20", 处方数: 380, 发药量: 1520 },
  { date: "01/21", 处方数: 420, 发药量: 1680 },
  { date: "01/22", 处方数: 395, 发药量: 1580 },
  { date: "01/23", 处方数: 450, 发药量: 1800 },
  { date: "01/24", 处方数: 480, 发药量: 1920 },
  { date: "01/25", 处方数: 420, 发药量: 1680 },
  { date: "01/26", 处方数: 460, 发药量: 1840 },
];

const categoryTreemap = [
  { name: "抗生素", size: 2850, fill: "hsl(195, 90%, 55%)" },
  { name: "心血管药", size: 2100, fill: "hsl(175, 85%, 50%)" },
  { name: "消化系统", size: 1680, fill: "hsl(40, 90%, 55%)" },
  { name: "神经系统", size: 1420, fill: "hsl(330, 70%, 55%)" },
  { name: "外用药", size: 980, fill: "hsl(150, 70%, 50%)" },
  { name: "维生素", size: 870, fill: "hsl(280, 60%, 55%)" },
  { name: "其他", size: 1200, fill: "hsl(220, 40%, 50%)" },
];

const stockAlert = [
  { name: "阿莫西林胶囊", stock: 120, threshold: 500, trend: -15 },
  { name: "布洛芬片", stock: 380, threshold: 500, trend: -8 },
  { name: "氯雷他定", stock: 250, threshold: 300, trend: -12 },
  { name: "奥美拉唑", stock: 95, threshold: 400, trend: -20 },
  { name: "头孢克肟", stock: 180, threshold: 300, trend: -5 },
];

const topDrugs = [
  { name: "阿莫西林", count: 856, trend: 12 },
  { name: "布洛芬", count: 742, trend: 8 },
  { name: "维生素C", count: 698, trend: 15 },
  { name: "头孢", count: 623, trend: -3 },
  { name: "氯雷他定", count: 567, trend: 5 },
];

const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, name, fill } = props;
  if (width < 50 || height < 30) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="hsl(220, 30%, 16%)" strokeWidth={2} rx={4} />
      <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={width > 80 ? 12 : 10} fontWeight="500">
        {name}
      </text>
    </g>
  );
};

const PharmacyPage = () => {
  return (
    <PageLayout>
      {/* 指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
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

      {/* 瀑布流式布局：不规则卡片大小 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 发药趋势 - 8列 */}
        <div className="lg:col-span-8 chart-container animate-fade-in">
          <div className="chart-title">近7日发药趋势</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dispensingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              <Line yAxisId="left" type="monotone" dataKey="处方数" stroke="hsl(195, 90%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(195, 90%, 55%)', r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="发药量" stroke="hsl(175, 85%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(175, 85%, 50%)', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs text-muted-foreground">处方数</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-xs text-muted-foreground">发药量</span></div>
          </div>
        </div>

        {/* 热门药品排行 - 4列 */}
        <div className="lg:col-span-4 chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">热门药品 TOP5</div>
          <div className="space-y-3 mt-3">
            {topDrugs.map((drug, index) => (
              <div key={drug.name} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index < 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{drug.name}</span>
                    <span className="text-sm text-primary">{drug.count}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full rounded-full bg-primary transition-all duration-1000"
                      style={{ width: `${(drug.count / 856) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs ${drug.trend > 0 ? 'text-success' : 'text-destructive'}`}>
                  {drug.trend > 0 ? '↑' : '↓'}{Math.abs(drug.trend)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 药品分类树图 - 5列 */}
        <div className="lg:col-span-5 chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">药品类别消耗分布</div>
          <ResponsiveContainer width="100%" height={240}>
            <Treemap
              data={categoryTreemap}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="hsl(220, 30%, 16%)"
              content={<CustomTreemapContent />}
            />
          </ResponsiveContainer>
        </div>

        {/* 库存预警 - 7列 */}
        <div className="lg:col-span-7 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            库存预警监控
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">药品名称</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">当前库存</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">安全阈值</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">库存状态</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">趋势</th>
                </tr>
              </thead>
              <tbody>
                {stockAlert.map((item) => {
                  const ratio = item.stock / item.threshold;
                  const status = ratio < 0.3 ? { text: "紧急", color: "text-destructive bg-destructive/10" } : { text: "预警", color: "text-warning bg-warning/10" };
                  return (
                    <tr key={item.name} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 px-3 text-sm font-medium">{item.name}</td>
                      <td className="py-2.5 px-3 text-sm text-destructive font-medium">{item.stock}</td>
                      <td className="py-2.5 px-3 text-sm text-muted-foreground">{item.threshold}</td>
                      <td className="py-2.5 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.text}</span>
                      </td>
                      <td className="py-2.5 px-3 text-sm text-destructive">{item.trend}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PharmacyPage;
