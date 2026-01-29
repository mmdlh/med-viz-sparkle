import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

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
      weekday: 'long'
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
    <header className="header-glow h-20 flex items-center justify-between px-8 relative">
      {/* Left decoration */}
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground text-sm">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Center title */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-primary animate-pulse-glow" />
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-wider text-glow">
            医疗数据分析平台
          </h1>
          <Activity className="w-8 h-8 text-accent animate-pulse-glow" />
        </div>
        <div className="text-xs text-muted-foreground tracking-widest mt-1">
          MEDICAL DATA ANALYTICS PLATFORM
        </div>
      </div>

      {/* Right time display */}
      <div className="flex items-center gap-4">
        <div className="font-display text-2xl text-primary text-glow">
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </header>
  );
};

export default DashboardHeader;
