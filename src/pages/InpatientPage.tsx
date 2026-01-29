import { Bed, UserPlus, UserMinus, Clock, Activity, HeartPulse, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const wardData = [
  { name: "内科病区", total: 120, occupied: 108, color: "hsl(195, 90%, 55%)" },
  { name: "外科病区", total: 100, occupied: 92, color: "hsl(175, 85%, 50%)" },
  { name: "骨科病区", total: 60, occupied: 54, color: "hsl(40, 90%, 55%)" },
  { name: "妇产科", total: 80, occupied: 68, color: "hsl(330, 70%, 55%)" },
  { name: "儿科病区", total: 50, occupied: 42, color: "hsl(150, 70%, 50%)" },
  { name: "ICU", total: 30, occupied: 28, color: "hsl(0, 65%, 55%)" },
];

const admissionTrend = [
  { date: "01/20", 入院: 45, 出院: 38 },
  { date: "01/21", 入院: 52, 出院: 48 },
  { date: "01/22", 入院: 38, 出院: 42 },
  { date: "01/23", 入院: 48, 出院: 45 },
  { date: "01/24", 入院: 55, 出院: 50 },
  { date: "01/25", 入院: 42, 出院: 52 },
  { date: "01/26", 入院: 50, 出院: 46 },
];

const patientTypeData = [
  { name: "普通病房", value: 520, color: "hsl(195, 90%, 55%)" },
  { name: "重症监护", value: 85, color: "hsl(0, 65%, 55%)" },
  { name: "日间病房", value: 120, color: "hsl(175, 85%, 50%)" },
  { name: "康复病房", value: 95, color: "hsl(150, 70%, 50%)" },
];

const recentPatients = [
  { name: "张**", ward: "内科病区", bed: "A-12", days: 3, status: "稳定" },
  { name: "李**", ward: "外科病区", bed: "B-08", days: 5, status: "恢复中" },
  { name: "王**", ward: "ICU", bed: "I-02", days: 1, status: "观察中" },
  { name: "刘**", ward: "骨科病区", bed: "C-15", days: 7, status: "待出院" },
  { name: "陈**", ward: "妇产科", bed: "D-06", days: 2, status: "稳定" },
];

const InpatientPage = () => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "稳定": return "text-success bg-success/10";
      case "恢复中": return "text-primary bg-primary/10";
      case "观察中": return "text-warning bg-warning/10";
      case "待出院": return "text-accent bg-accent/10";
      default: return "text-muted-foreground";
    }
  };

  return (
    <PageLayout>
      {/* 指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="animate-fade-in">
          <StatCard title="在院患者" value={892} suffix="人" icon={Bed} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="今日入院" value={56} suffix="人" icon={UserPlus} trend={{ value: 12, isPositive: true }} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="今日出院" value={48} suffix="人" icon={UserMinus} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="床位使用率" value={87} suffix="%" icon={Activity} color="warning" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="平均住院" value={6.8} suffix="天" icon={Clock} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="危重患者" value={28} suffix="人" icon={HeartPulse} color="accent" />
        </div>
      </div>

      {/* 左右分栏：左侧病区卡片，右侧图表 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左侧：病区床位卡片网格 - 占2列 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="chart-container animate-fade-in h-full">
            <div className="chart-title">病区床位概览</div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {wardData.map((ward, index) => {
                const percentage = (ward.occupied / ward.total) * 100;
                return (
                  <div 
                    key={ward.name} 
                    className="p-3 rounded-lg bg-secondary/40 border border-border/30 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{ward.name}</span>
                      {percentage >= 90 && <AlertCircle className="w-4 h-4 text-destructive" />}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold" style={{ color: ward.color }}>{ward.occupied}</span>
                        <span className="text-muted-foreground text-sm">/{ward.total}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">使用率</div>
                        <div className="text-sm font-medium" style={{ color: percentage >= 90 ? 'hsl(0, 65%, 55%)' : percentage >= 70 ? 'hsl(40, 90%, 55%)' : 'hsl(150, 70%, 50%)' }}>
                          {percentage.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%`, backgroundColor: ward.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：图表和列表 - 占3列 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 入出院趋势 */}
          <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="chart-title">近7日入出院趋势</div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={admissionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
                <Line type="monotone" dataKey="入院" stroke="hsl(195, 90%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(195, 90%, 55%)', r: 4 }} />
                <Line type="monotone" dataKey="出院" stroke="hsl(150, 70%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(150, 70%, 50%)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs text-muted-foreground">入院</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success" /><span className="text-xs text-muted-foreground">出院</span></div>
            </div>
          </div>

          {/* 下方分两栏 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 患者类型 */}
            <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="chart-title">患者类型</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={patientTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {patientTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2">
                {patientTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 最近入院 */}
            <div className="chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="chart-title">最近入院患者</div>
              <div className="space-y-2 mt-3">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-muted-foreground text-xs">{patient.ward}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{patient.days}天</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default InpatientPage;
