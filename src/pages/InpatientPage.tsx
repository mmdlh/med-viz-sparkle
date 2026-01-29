import { Bed, UserPlus, UserMinus, Clock, Activity, HeartPulse } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const wardData = [
  { name: "内科病区", total: 120, occupied: 108 },
  { name: "外科病区", total: 100, occupied: 92 },
  { name: "骨科病区", total: 60, occupied: 54 },
  { name: "妇产科", total: 80, occupied: 68 },
  { name: "儿科病区", total: 50, occupied: 42 },
  { name: "ICU", total: 30, occupied: 28 },
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
  { name: "普通病房", value: 520, color: "hsl(195, 100%, 50%)" },
  { name: "重症监护", value: 85, color: "hsl(0, 70%, 55%)" },
  { name: "日间病房", value: 120, color: "hsl(175, 100%, 45%)" },
  { name: "康复病房", value: 95, color: "hsl(150, 80%, 45%)" },
];

const stayDuration = [
  { range: "1-3天", count: 180 },
  { range: "4-7天", count: 320 },
  { range: "8-14天", count: 210 },
  { range: "15-30天", count: 85 },
  { range: ">30天", count: 25 },
];

const InpatientPage = () => {
  return (
    <PageLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ward occupancy */}
        <div className="chart-container animate-fade-in">
          <div className="chart-title">各病区床位使用情况</div>
          <div className="space-y-4 mt-4">
            {wardData.map((ward) => {
              const percentage = (ward.occupied / ward.total) * 100;
              const getColor = (pct: number) => {
                if (pct >= 90) return "hsl(0, 70%, 55%)";
                if (pct >= 70) return "hsl(40, 95%, 55%)";
                return "hsl(150, 80%, 45%)";
              };
              return (
                <div key={ward.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{ward.name}</span>
                    <span>
                      <span style={{ color: getColor(percentage) }}>{ward.occupied}</span>
                      <span className="text-muted-foreground">/{ward.total}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: getColor(percentage),
                        boxShadow: `0 0 10px ${getColor(percentage)}40`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Admission/Discharge trend */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">近7日入出院趋势</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={admissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Line type="monotone" dataKey="入院" stroke="hsl(195, 100%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(195, 100%, 50%)' }} />
              <Line type="monotone" dataKey="出院" stroke="hsl(150, 80%, 45%)" strokeWidth={2} dot={{ fill: 'hsl(150, 80%, 45%)' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">入院</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">出院</span>
            </div>
          </div>
        </div>

        {/* Patient type distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">患者类型分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={patientTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {patientTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {patientTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stay duration */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">住院时长分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stayDuration}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Bar dataKey="count" fill="hsl(175, 100%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default InpatientPage;
