import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Building2, 
  Ambulance, 
  Pill,
  FileBarChart
} from "lucide-react";

const menuItems = [
  { path: "/", label: "数据总览", icon: LayoutDashboard },
  { path: "/outpatient", label: "门诊分析", icon: Stethoscope },
  { path: "/inpatient", label: "住院管理", icon: Building2 },
  { path: "/emergency", label: "急诊监控", icon: Ambulance },
  { path: "/pharmacy", label: "药品管理", icon: Pill },
  { path: "/reports", label: "统计报表", icon: FileBarChart },
];

const NavigationMenu = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300 group
              ${isActive 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
            <span className="hidden lg:inline">{item.label}</span>
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
            )}
            
            {/* Hover glow */}
            <div className={`
              absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
              ${isActive ? "bg-primary/5" : "bg-secondary/30"}
            `} />
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
