import { Users, UserCheck, Stethoscope, Activity, HeartPulse, Pill } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import TrendChart from "@/components/dashboard/TrendChart";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import AgeDistributionChart from "@/components/dashboard/AgeDistributionChart";
import RealtimeList from "@/components/dashboard/RealtimeList";
import HospitalCapacity from "@/components/dashboard/HospitalCapacity";
import MapPlaceholder from "@/components/dashboard/MapPlaceholder";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <DashboardHeader />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="animate-fade-in" style={{ animationDelay: "0ms" }}>
              <StatCard
                title="今日门诊"
                value={3847}
                suffix="人"
                icon={Users}
                trend={{ value: 12.5, isPositive: true }}
                color="primary"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <StatCard
                title="今日急诊"
                value={426}
                suffix="人"
                icon={Activity}
                trend={{ value: 5.2, isPositive: false }}
                color="accent"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <StatCard
                title="住院患者"
                value={892}
                suffix="人"
                icon={HeartPulse}
                color="success"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <StatCard
                title="在岗医生"
                value={186}
                suffix="人"
                icon={Stethoscope}
                color="primary"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
              <StatCard
                title="手术台次"
                value={47}
                suffix="台"
                icon={UserCheck}
                trend={{ value: 8.3, isPositive: true }}
                color="warning"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
              <StatCard
                title="药品处方"
                value={2156}
                suffix="张"
                icon={Pill}
                color="accent"
              />
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left column */}
            <div className="space-y-4 md:space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
                <DepartmentChart />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                <HospitalCapacity />
              </div>
            </div>

            {/* Center column */}
            <div className="space-y-4 md:space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <TrendChart />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
                <MapPlaceholder />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4 md:space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
                <AgeDistributionChart />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "350ms" }}>
                <RealtimeList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
