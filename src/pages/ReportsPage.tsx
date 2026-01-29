import { FileBarChart, Download, Calendar, TrendingUp, Users, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, ComposedChart, Line } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const monthlyData = [
  { month: "1月", 门诊: 42000, 住院: 8900, 收入: 1250 },
  { month: "2月", 门诊: 38000, 住院: 9200, 收入: 1180 },
  { month: "3月", 门诊: 51000, 住院: 10500, 收入: 1420 },
  { month: "4月", 门诊: 48000, 住院: 9800, 收入: 1350 },
  { month: "5月", 门诊: 56000, 住院: 11200, 收入: 1580 },
  { month: "6月", 门诊: 62000, 住院: 12000, 收入: 1720 },
  { month: "7月", 门诊: 59000, 住院: 11500, 收入: 1650 },
  { month: "8月", 门诊: 65000, 住院: 12800, 收入: 1820 },
  { month: "9月", 门诊: 58000, 住院: 11000, 收入: 1600 },
  { month: "10月", 门诊: 61000, 住院: 11800, 收入: 1700 },
  { month: "11月", 门诊: 55000, 住院: 10500, 收入: 1520 },
  { month: "12月", 门诊: 68000, 住院: 13500, 收入: 1900 },
];

const departmentRevenue = [
  { name: "内科", revenue: 2850 },
  { name: "外科", revenue: 3200 },
  { name: "骨科", revenue: 2100 },
  { name: "妇产科", revenue: 1800 },
  { name: "儿科", revenue: 1200 },
  { name: "急诊科", revenue: 1650 },
];

const quarterComparison = [
  { quarter: "Q1", 去年: 3850, 今年: 4250 },
  { quarter: "Q2", 去年: 4650, 今年: 5120 },
  { quarter: "Q3", 去年: 5070, 今年: 5580 },
  { quarter: "Q4", 去年: 5120, 今年: 5800 },
];

const reportList = [
  { name: "2024年度运营报告", type: "年度报告", date: "2025-01-15", status: "已生成" },
  { name: "12月门诊统计报表", type: "月度报告", date: "2025-01-05", status: "已生成" },
  { name: "Q4季度财务报告", type: "季度报告", date: "2025-01-10", status: "已生成" },
  { name: "12月药品消耗报告", type: "月度报告", date: "2025-01-03", status: "已生成" },
  { name: "年度医疗质量报告", type: "年度报告", date: "2025-01-20", status: "生成中" },
];

const ReportsPage = () => {
  return (
    <PageLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="animate-fade-in">
          <StatCard title="年度门诊" value={663000} suffix="人次" icon={Users} trend={{ value: 15.2, isPositive: true }} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="年度住院" value={132700} suffix="人次" icon={Users} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="年度收入" value={18690} suffix="万" icon={DollarSign} trend={{ value: 12.8, isPositive: true }} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="同比增长" value={15.2} suffix="%" icon={TrendingUp} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="报表数量" value={156} suffix="份" icon={FileBarChart} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="本月新增" value={12} suffix="份" icon={Calendar} color="warning" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly trend - spans 2 columns */}
        <div className="lg:col-span-2 chart-container animate-fade-in">
          <div className="chart-title">年度运营趋势</div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyData}>
              <defs>
                <linearGradient id="colorOutpatientReport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(195, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} />
              <Area yAxisId="left" type="monotone" dataKey="门诊" stroke="hsl(195, 100%, 50%)" strokeWidth={2} fill="url(#colorOutpatientReport)" />
              <Bar yAxisId="left" dataKey="住院" fill="hsl(175, 100%, 45%)" radius={[4, 4, 0, 0]} barSize={20} />
              <Line yAxisId="right" type="monotone" dataKey="收入" stroke="hsl(40, 95%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(40, 95%, 55%)' }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">门诊人次</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">住院人次</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">收入(万元)</span>
            </div>
          </div>
        </div>

        {/* Department revenue */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">科室收入排名</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} width={60} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} formatter={(value) => [`${value}万元`, '收入']} />
              <Bar dataKey="revenue" fill="hsl(150, 80%, 45%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quarter comparison */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">季度同比对比</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={quarterComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 60%, 20%)" opacity={0.3} />
              <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 20%, 60%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 40%, 10%)', border: '1px solid hsl(200, 60%, 25%)' }} formatter={(value) => [`${value}万元`, '']} />
              <Bar dataKey="去年" fill="hsl(220, 40%, 40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="今年" fill="hsl(195, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(220, 40%, 40%)' }} />
              <span className="text-xs text-muted-foreground">去年</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">今年</span>
            </div>
          </div>
        </div>

        {/* Report list - spans 2 columns */}
        <div className="lg:col-span-2 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">最新报表</div>
          <div className="overflow-x-auto">
            <table className="w-full mt-2">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">报表名称</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">类型</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">生成日期</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">状态</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {reportList.map((report, index) => (
                  <tr key={index} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3 text-sm font-medium">{report.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-sm text-muted-foreground">{report.date}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-xs ${report.status === '已生成' ? 'text-success' : 'text-warning'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {report.status === '已生成' && (
                        <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </td>
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

export default ReportsPage;
