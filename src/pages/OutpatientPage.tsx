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
  { name: "内科", value: 520, color: "hsl(195, 90%, 55%)" },
  { name: "外科", value: 380, color: "hsl(175, 85%, 50%)" },
  { name: "儿科", value: 290, color: "hsl(40, 90%, 55%)" },
  { name: "妇科", value: 245, color: "hsl(330, 70%, 55%)" },
  { name: "骨科", value: 180, color: "hsl(150, 70%, 50%)" },
  { name: "皮肤科", value: 156, color: "hsl(280, 60%, 55%)" },
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

const satisfactionData = [
  { name: "非常满意", value: 68, fill: "hsl(150, 70%, 50%)" },
  { name: "满意", value: 28, fill: "hsl(195, 90%, 55%)" },
  { name: "一般", value: 3, fill: "hsl(40, 90%, 55%)" },
  { name: "不满意", value: 1, fill: "hsl(0, 65%, 55%)" },
];

const OutpatientPage = () => {
  return (
    <PageLayout>
      {/* 横向卡片式布局 - 区别于首页 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
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
          <StatCard title="平均等候" value={23} suffix="分钟" icon={Clock} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="预约率" value={68} suffix="%" icon={Calendar} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="满意度" value={96} suffix="%" icon={TrendingUp} color="success" />
        </div>
      </div>

      {/* 上下分层布局：上方大图表，下方小图表组 */}
      <div className="space-y-6">
        {/* 上方：全宽大图表 */}
        <div className="chart-container animate-fade-in">
          <div className="chart-title">今日就诊时段分布</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="colorHourly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(195, 90%, 55%)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(195, 90%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              <Area type="monotone" dataKey="count" stroke="hsl(195, 90%, 55%)" strokeWidth={2} fill="url(#colorHourly)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 下方：三等分图表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 科室分布 - 饼图 */}
          <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="chart-title">科室就诊分布</div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {departmentData.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 本周对比 - 柱状图 */}
          <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="chart-title">本周预约vs现场</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
                <Bar dataKey="预约" fill="hsl(195, 90%, 55%)" radius={[3, 3, 0, 0]} barSize={12} />
                <Bar dataKey="现场" fill="hsl(175, 85%, 50%)" radius={[3, 3, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 满意度 - 简化展示 */}
          <div className="chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="chart-title">患者满意度</div>
            <div className="flex flex-col items-center justify-center h-[220px]">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(220, 30%, 22%)" strokeWidth="12" />
                  <circle 
                    cx="60" cy="60" r="50" fill="none" 
                    stroke="hsl(150, 70%, 50%)" strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${96 * 3.14} ${100 * 3.14}`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">96%</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-3">综合满意度</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {satisfactionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span style={{ color: item.fill }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default OutpatientPage;
