import { Ambulance, AlertTriangle, Clock, Users, HeartPulse, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const hourlyEmergency = [
  { hour: "00:00", count: 12 },
  { hour: "02:00", count: 8 },
  { hour: "04:00", count: 5 },
  { hour: "06:00", count: 15 },
  { hour: "08:00", count: 28 },
  { hour: "10:00", count: 35 },
  { hour: "12:00", count: 42 },
  { hour: "14:00", count: 38 },
  { hour: "16:00", count: 45 },
  { hour: "18:00", count: 52 },
  { hour: "20:00", count: 48 },
  { hour: "22:00", count: 25 },
];

const severityData = [
  { name: "一级(濒危)", value: 8, color: "hsl(0, 70%, 55%)" },
  { name: "二级(危重)", value: 35, color: "hsl(30, 90%, 55%)" },
  { name: "三级(急症)", value: 128, color: "hsl(40, 95%, 55%)" },
  { name: "四级(非急症)", value: 255, color: "hsl(150, 80%, 45%)" },
];

const categoryData = [
  { type: "外伤", count: 85 },
  { type: "心血管", count: 62 },
  { type: "呼吸系统", count: 48 },
  { type: "消化系统", count: 42 },
  { type: "神经系统", count: 38 },
  { type: "其他", count: 151 },
];

const ambulanceStatus = [
  { id: "急救1号", status: "出诊中", location: "市中心", patient: "心梗患者" },
  { id: "急救2号", status: "返程中", location: "东区", patient: "外伤患者" },
  { id: "急救3号", status: "待命", location: "医院", patient: "-" },
  { id: "急救4号", status: "出诊中", location: "南区", patient: "呼吸困难" },
  { id: "急救5号", status: "待命", location: "医院", patient: "-" },
];

const EmergencyPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "出诊中": return "text-destructive bg-destructive/10";
      case "返程中": return "text-warning bg-warning/10";
      case "待命": return "text-success bg-success/10";
      default: return "text-muted-foreground";
    }
  };

  return (
    <PageLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
          <StatCard title="出车次数" value={38} suffix="次" icon={Ambulance} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="抢救成功率" value={98.5} suffix="%" icon={Activity} color="success" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly trend - spans 2 columns */}
        <div className="lg:col-span-2 chart-container animate-fade-in">
          <div className="chart-title">24小时急诊人次分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyEmergency}>
              <defs>
                <linearGradient id="colorEmergencyHour" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 70%, 55%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(0, 70%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Area type="monotone" dataKey="count" stroke="hsl(0, 70%, 55%)" strokeWidth={2} fill="url(#colorEmergencyHour)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Severity distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">分诊级别分布</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={severityData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span style={{ color: item.color }}>{item.value}人</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">急诊类型分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis type="category" dataKey="type" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} width={70} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Bar dataKey="count" fill="hsl(195, 100%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ambulance status - spans 2 columns */}
        <div className="lg:col-span-2 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">急救车辆实时状态</div>
          <div className="overflow-x-auto">
            <table className="w-full mt-2">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">车辆编号</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">状态</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">当前位置</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">运送患者</th>
                </tr>
              </thead>
              <tbody>
                {ambulanceStatus.map((amb) => (
                  <tr key={amb.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 text-sm font-medium">{amb.id}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(amb.status)}`}>
                        {amb.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-sm text-muted-foreground">{amb.location}</td>
                    <td className="py-2.5 px-3 text-sm">{amb.patient}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmergencyPage;
