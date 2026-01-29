import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import NavigationMenu from "./NavigationMenu";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <header className="header-glow relative">
      {/* Top row - Title */}
      <div className="h-16 flex items-center justify-between px-6">
        {/* Left - Date */}
        <div className="text-muted-foreground text-sm min-w-[140px]">
          {formatDate(currentTime)}
        </div>

        {/* Center title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-primary animate-pulse-glow" />
            <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-glow">
              医疗数据分析平台
            </h1>
            <Activity className="w-6 h-6 text-accent animate-pulse-glow" />
          </div>
          <div className="text-[10px] text-muted-foreground tracking-widest">
            MEDICAL DATA ANALYTICS PLATFORM
          </div>
        </div>

        {/* Right - Time */}
        <div className="font-display text-xl text-primary text-glow min-w-[140px] text-right">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Navigation row */}
      <div className="h-12 flex items-center justify-center border-t border-border/30 bg-background/30 backdrop-blur-sm">
        <NavigationMenu />
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </header>
  );
};

export default DashboardHeader;
