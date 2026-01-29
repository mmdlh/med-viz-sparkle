import { Users, Clock, TrendingUp, UserCheck, Calendar, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const hourlyData = [
  { hour: "08:00", count: 45 },
  { hour: "09:00", count: 120 },
  { hour: "10:00", count: 185 },
  { hour: "11:00", count: 210 },
  { hour: "12:00", count: 95 },
  { hour: "13:00", count: 78 },
  { hour: "14:00", count: 165 },
  { hour: "15:00", count: 195 },
  { hour: "16:00", count: 145 },
  { hour: "17:00", count: 85 },
];

const departmentData = [
  { name: "内科", value: 520, color: "hsl(195, 100%, 50%)" },
  { name: "外科", value: 380, color: "hsl(175, 100%, 45%)" },
  { name: "儿科", value: 290, color: "hsl(40, 95%, 55%)" },
  { name: "妇科", value: 245, color: "hsl(330, 70%, 55%)" },
  { name: "骨科", value: 180, color: "hsl(150, 80%, 45%)" },
  { name: "皮肤科", value: 156, color: "hsl(280, 70%, 55%)" },
];

const weeklyData = [
  { day: "周一", 预约: 380, 现场: 220 },
  { day: "周二", 预约: 420, 现场: 195 },
  { day: "周三", 预约: 395, 现场: 210 },
  { day: "周四", 预约: 450, 现场: 185 },
  { day: "周五", 预约: 480, 现场: 240 },
  { day: "周六", 预约: 320, 现场: 280 },
  { day: "周日", 预约: 180, 现场: 150 },
];

const waitTimeData = [
  { range: "0-15分钟", count: 450 },
  { range: "15-30分钟", count: 320 },
  { range: "30-60分钟", count: 180 },
  { range: ">60分钟", count: 85 },
];

const OutpatientPage = () => {
  return (
    <PageLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="animate-fade-in">
          <StatCard title="今日挂号" value={2156} suffix="人" icon={Users} trend={{ value: 8.5, isPositive: true }} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="已就诊" value={1847} suffix="人" icon={UserCheck} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="待就诊" value={309} suffix="人" icon={Clock} color="warning" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="平均等候" value={23} suffix="分钟" icon={Clock} trend={{ value: 5.2, isPositive: false }} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="预约率" value={68} suffix="%" icon={Calendar} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="满意度" value={96} suffix="%" icon={TrendingUp} color="success" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly trend */}
        <div className="chart-container animate-fade-in">
          <div className="chart-title">今日就诊时段分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorHourly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Area type="monotone" dataKey="count" stroke="hsl(195, 100%, 50%)" strokeWidth={2} fill="url(#colorHourly)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">科室就诊分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {departmentData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly comparison */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">本周预约vs现场挂号</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Bar dataKey="预约" fill="hsl(195, 100%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="现场" fill="hsl(175, 100%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Wait time distribution */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">等候时间分布</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={waitTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis type="category" dataKey="range" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} width={80} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Bar dataKey="count" fill="hsl(150, 80%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default OutpatientPage;
