import { FileBarChart, Download, Calendar, TrendingUp, Users, DollarSign, Filter } from "lucide-react";
import { ComposedChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Line } from "recharts";
import PageLayout from "@/components/dashboard/PageLayout";
import StatCard from "@/components/dashboard/StatCard";

const monthlyData = [
  { month: "1月", 门诊: 42, 住院: 8.9, 收入: 1250 },
  { month: "2月", 门诊: 38, 住院: 9.2, 收入: 1180 },
  { month: "3月", 门诊: 51, 住院: 10.5, 收入: 1420 },
  { month: "4月", 门诊: 48, 住院: 9.8, 收入: 1350 },
  { month: "5月", 门诊: 56, 住院: 11.2, 收入: 1580 },
  { month: "6月", 门诊: 62, 住院: 12.0, 收入: 1720 },
  { month: "7月", 门诊: 59, 住院: 11.5, 收入: 1650 },
  { month: "8月", 门诊: 65, 住院: 12.8, 收入: 1820 },
  { month: "9月", 门诊: 58, 住院: 11.0, 收入: 1600 },
  { month: "10月", 门诊: 61, 住院: 11.8, 收入: 1700 },
  { month: "11月", 门诊: 55, 住院: 10.5, 收入: 1520 },
  { month: "12月", 门诊: 68, 住院: 13.5, 收入: 1900 },
];

const departmentRevenue = [
  { name: "外科", revenue: 3200 },
  { name: "内科", revenue: 2850 },
  { name: "骨科", revenue: 2100 },
  { name: "妇产科", revenue: 1800 },
  { name: "急诊科", revenue: 1650 },
  { name: "儿科", revenue: 1200 },
];

const quarterComparison = [
  { quarter: "Q1", 去年: 3850, 今年: 4250 },
  { quarter: "Q2", 去年: 4650, 今年: 5120 },
  { quarter: "Q3", 去年: 5070, 今年: 5580 },
  { quarter: "Q4", 去年: 5120, 今年: 5800 },
];

const reportCategories = [
  { category: "运营报表", count: 45, recent: "年度运营报告" },
  { category: "财务报表", count: 38, recent: "Q4财务分析" },
  { category: "医疗质量", count: 28, recent: "质量控制报告" },
  { category: "人力资源", count: 22, recent: "人员配置报告" },
  { category: "设备资产", count: 15, recent: "设备采购报告" },
];

const reportList = [
  { name: "2024年度运营报告", type: "年度", date: "01-15", size: "2.8MB" },
  { name: "12月门诊统计报表", type: "月度", date: "01-05", size: "1.2MB" },
  { name: "Q4季度财务报告", type: "季度", date: "01-10", size: "3.5MB" },
  { name: "12月药品消耗报告", type: "月度", date: "01-03", size: "0.8MB" },
  { name: "年度医疗质量报告", type: "年度", date: "01-20", size: "4.2MB" },
  { name: "设备维护年报", type: "年度", date: "01-18", size: "1.6MB" },
];

const ReportsPage = () => {
  return (
    <PageLayout>
      {/* 指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="animate-fade-in">
          <StatCard title="年度门诊" value={663} suffix="千人" icon={Users} trend={{ value: 15.2, isPositive: true }} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
          <StatCard title="年度住院" value={132.7} suffix="千人" icon={Users} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <StatCard title="年度收入" value={1.87} suffix="亿" icon={DollarSign} trend={{ value: 12.8, isPositive: true }} color="success" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
          <StatCard title="同比增长" value={15.2} suffix="%" icon={TrendingUp} color="primary" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <StatCard title="报表总数" value={156} suffix="份" icon={FileBarChart} color="accent" />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
          <StatCard title="本月新增" value={12} suffix="份" icon={Calendar} color="warning" />
        </div>
      </div>

      {/* 表格为主的数据密集型布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：报表分类统计 */}
        <div className="chart-container animate-fade-in">
          <div className="chart-title flex items-center justify-between">
            <span>报表分类</span>
            <Filter className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-3 mt-4">
            {reportCategories.map((cat, index) => (
              <div key={cat.category} className="p-3 rounded-lg bg-secondary/40 border border-border/30 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{cat.category}</span>
                  <span className="text-primary font-bold">{cat.count}</span>
                </div>
                <div className="text-xs text-muted-foreground">最新: {cat.recent}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 中间：报表列表 */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="chart-title">最新报表</div>
          <div className="space-y-2 mt-3">
            {reportList.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/40 transition-colors group cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{report.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-1.5 py-0.5 rounded bg-secondary">{report.type}</span>
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-primary/10 text-primary transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：科室收入排名 */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="chart-title">科室收入排名</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} width={55} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} formatter={(value) => [`${value}万`, '收入']} />
              <Bar dataKey="revenue" fill="hsl(150, 70%, 50%)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 底部全宽：年度趋势 */}
        <div className="lg:col-span-2 chart-container animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="chart-title">年度运营趋势</div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={monthlyData}>
              <defs>
                <linearGradient id="colorOutpatientReport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(195, 90%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(195, 90%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} />
              <Area yAxisId="left" type="monotone" dataKey="门诊" stroke="hsl(195, 90%, 55%)" strokeWidth={2} fill="url(#colorOutpatientReport)" />
              <Bar yAxisId="left" dataKey="住院" fill="hsl(175, 85%, 50%)" radius={[3, 3, 0, 0]} barSize={16} />
              <Line yAxisId="right" type="monotone" dataKey="收入" stroke="hsl(40, 90%, 55%)" strokeWidth={2} dot={{ fill: 'hsl(40, 90%, 55%)', r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs text-muted-foreground">门诊(千人)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-xs text-muted-foreground">住院(千人)</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-warning" /><span className="text-xs text-muted-foreground">收入(万)</span></div>
          </div>
        </div>

        {/* 季度对比 */}
        <div className="chart-container animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="chart-title">季度同比</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={quarterComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200, 40%, 28%)" opacity={0.4} />
              <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(200, 25%, 65%)', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(220, 30%, 16%)', border: '1px solid hsl(200, 40%, 30%)' }} formatter={(value) => [`${value}万`, '']} />
              <Bar dataKey="去年" fill="hsl(220, 30%, 40%)" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="今年" fill="hsl(195, 90%, 55%)" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportsPage;
