import { MapPin, Building2 } from "lucide-react";

interface HospitalMarker {
  id: number;
  name: string;
  x: number;
  y: number;
  status: "正常" | "繁忙" | "紧急";
}

const hospitals: HospitalMarker[] = [
  { id: 1, name: "市中心医院", x: 45, y: 35, status: "正常" },
  { id: 2, name: "第一人民医院", x: 25, y: 55, status: "繁忙" },
  { id: 3, name: "儿童医院", x: 70, y: 45, status: "正常" },
  { id: 4, name: "妇幼保健院", x: 55, y: 70, status: "正常" },
  { id: 5, name: "急救中心", x: 35, y: 25, status: "紧急" },
  { id: 6, name: "康复医院", x: 75, y: 65, status: "正常" },
];

const getStatusColor = (status: HospitalMarker["status"]) => {
  switch (status) {
    case "正常": return "hsl(150, 80%, 45%)";
    case "繁忙": return "hsl(40, 95%, 55%)";
    case "紧急": return "hsl(0, 70%, 55%)";
  }
};

const MapPlaceholder = () => {
  return (
    <div className="chart-container h-full flex flex-col">
      <div className="chart-title">医院分布地图</div>
      <div className="flex-1 relative bg-gradient-to-br from-secondary/50 to-background rounded-lg overflow-hidden min-h-[200px]">
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(200, 60%, 25%)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {hospitals.slice(0, -1).map((h1, i) => 
            hospitals.slice(i + 1).map((h2, j) => (
              <line
                key={`${h1.id}-${h2.id}`}
                x1={`${h1.x}%`}
                y1={`${h1.y}%`}
                x2={`${h2.x}%`}
                y2={`${h2.y}%`}
                stroke="hsl(195, 100%, 50%)"
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="4 4"
              />
            ))
          )}
        </svg>

        {/* Hospital markers */}
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
          >
            {/* Pulse ring */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ 
                backgroundColor: getStatusColor(hospital.status),
                opacity: 0.3,
                width: 24,
                height: 24,
                marginLeft: -4,
                marginTop: -4,
              }}
            />
            {/* Marker */}
            <div 
              className="relative p-1.5 rounded-full"
              style={{ 
                backgroundColor: getStatusColor(hospital.status),
                boxShadow: `0 0 15px ${getStatusColor(hospital.status)}80`
              }}
            >
              <Building2 className="w-4 h-4 text-background" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-card border border-border px-2 py-1 rounded text-xs whitespace-nowrap">
                {hospital.name}
                <span 
                  className="ml-2"
                  style={{ color: getStatusColor(hospital.status) }}
                >
                  {hospital.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">正常</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">繁忙</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">紧急</span>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
