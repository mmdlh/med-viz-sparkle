import { Ambulance, AlertTriangle, Clock, HeartPulse, Activity, Siren } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const hourlyEmergency = [
  { hour: "00", count: 12 }, { hour: "02", count: 8 }, { hour: "04", count: 5 },
  { hour: "06", count: 15 }, { hour: "08", count: 28 }, { hour: "10", count: 35 },
  { hour: "12", count: 42 }, { hour: "14", count: 38 }, { hour: "16", count: 45 },
  { hour: "18", count: 52 }, { hour: "20", count: 48 }, { hour: "22", count: 25 },
];

const severityData = [
  { name: "一级(濒危)", value: 8, color: "hsl(0, 65%, 55%)" },
  { name: "二级(危重)", value: 35, color: "hsl(30, 85%, 55%)" },
  { name: "三级(急症)", value: 128, color: "hsl(40, 90%, 55%)" },
  { name: "四级(非急症)", value: 255, color: "hsl(150, 70%, 50%)" },
];

const categoryRadar = [
  { category: "外伤", value: 85 },
  { category: "心血管", value: 62 },
  { category: "呼吸", value: 48 },
  { category: "消化", value: 42 },
  { category: "神经", value: 38 },
  { category: "其他", value: 65 },
];

const ambulanceStatus = [
  { id: "急救1号", status: "出诊中", eta: "8分钟", patient: "心梗" },
  { id: "急救2号", status: "返程中", eta: "5分钟", patient: "外伤" },
  { id: "急救3号", status: "待命", eta: "-", patient: "-" },
  { id: "急救4号", status: "出诊中", eta: "12分钟", patient: "呼吸困难" },
  { id: "急救5号", status: "待命", eta: "-", patient: "-" },
  { id: "急救6号", status: "维护中", eta: "-", patient: "-" },
];

const EmergencyPage = () => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "出诊中": return { color: "text-destructive", bg: "bg-destructive/20", pulse: true };
      case "返程中": return { color: "text-warning", bg: "bg-warning/20", pulse: false };
      case "待命": return { color: "text-success", bg: "bg-success/20", pulse: false };
      default: return { color: "text-muted-foreground", bg: "bg-muted/20", pulse: false };
    }
  };

  return (
    <PageLayout>
      {/* 指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="animate-fade-in">
          <StatCard title="今日急诊" value={426} suffix="人" icon={Ambulance} trend={{ value: 5.2, isPositive: false }} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="抢救中" value={12} suffix="人" icon={HeartPulse} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="危重患者" value={43} suffix="人" icon={AlertTriangle} color="warning" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="平均等待" value={8} suffix="分钟" icon={Clock} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="出车次数" value={38} suffix="次" icon={Siren} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="抢救成功率" value={98.5} suffix="%" icon={Activity} color="success" />
        </div>
      </div>

      {/* 中心焦点布局：中央大图 + 四周辅助 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：分诊级别 */}
        <div className="chart-container animate-fade-in">
          <div className="chart-title">分诊级别分布</div>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 w-full mt-2">
              {severityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中央：24小时趋势 - 占2列 */}
        <div className="lg:col-span-2 chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">24小时急诊人次监控</div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyEmergency}>
              <defs>
                <linearGradient id="colorEmergencyHour" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 65%, 55%)" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="hsl(0, 65%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              <Area type="monotone" dataKey="count" stroke="hsl(0, 65%, 55%)" strokeWidth={2} fill="url(#colorEmergencyHour)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="text-center text-xs text-muted-foreground mt-2">时段（小时）</div>
        </div>

        {/* 右侧：急诊类型雷达图 */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">急诊类型分析</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={categoryRadar}>
              <PolarGrid stroke="hsl(200, 40%, 28%)" />
              <PolarAngleAxis dataKey="category" tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 10 }} />
              <Radar name="人次" dataKey="value" stroke="hsl(195, 90%, 55%)" fill="hsl(195, 90%, 55%)" fillOpacity={0.4} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 底部：急救车状态 */}
      <div className="mt-6 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="chart-title flex items-center gap-2">
          <Siren className="w-4 h-4 text-primary" />
          急救车辆实时监控
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {ambulanceStatus.map((amb, index) => {
            const config = getStatusConfig(amb.status);
            return (
              <div 
                key={amb.id} 
                className={`p-4 rounded-lg border border-border/40 ${config.bg} relative overflow-hidden animate-fade-in`}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {config.pulse && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive animate-pulse" />
                )}
                <div className="text-sm font-medium mb-2">{amb.id}</div>
                <div className={`text-xs font-medium ${config.color} mb-1`}>{amb.status}</div>
                {amb.status !== "待命" && amb.status !== "维护中" && (
                  <>
                    <div className="text-xs text-muted-foreground">预计: {amb.eta}</div>
                    <div className="text-xs text-muted-foreground mt-1">患者: {amb.patient}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default EmergencyPage;
