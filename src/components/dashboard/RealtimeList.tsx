import { useEffect, useState } from "react";
import { User, Clock } from "lucide-react";

interface PatientRecord {
  id: number;
  name: string;
  department: string;
  type: "门诊" | "急诊" | "住院";
  time: string;
  status: "就诊中" | "待就诊" | "已完成";
}

const generateRandomPatient = (id: number): PatientRecord => {
  const surnames = ["张", "李", "王", "刘", "陈", "杨", "赵", "黄", "周", "吴"];
  const departments = ["内科", "外科", "儿科", "妇产科", "骨科", "神经内科", "心血管科"];
  const types: PatientRecord["type"][] = ["门诊", "急诊", "住院"];
  const statuses: PatientRecord["status"][] = ["就诊中", "待就诊", "已完成"];
  
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 60);
  now.setMinutes(now.getMinutes() - randomMinutes);
  
  return {
    id,
    name: `${surnames[Math.floor(Math.random() * surnames.length)]}**`,
    department: departments[Math.floor(Math.random() * departments.length)],
    type: types[Math.floor(Math.random() * types.length)],
    time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

const initialPatients = Array.from({ length: 10 }, (_, i) => generateRandomPatient(i + 1));

const RealtimeList = () => {
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => {
        const newPatient = generateRandomPatient(Date.now());
        return [newPatient, ...prev.slice(0, 9)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTypeColor = (type: PatientRecord["type"]) => {
    switch (type) {
      case "门诊": return "text-primary bg-primary/10";
      case "急诊": return "text-destructive bg-destructive/10";
      case "住院": return "text-warning bg-warning/10";
    }
  };

  const getStatusColor = (status: PatientRecord["status"]) => {
    switch (status) {
      case "就诊中": return "text-accent";
      case "待就诊": return "text-warning";
      case "已完成": return "text-success";
    }
  };

  return (
    <div className="chart-container h-full flex flex-col">
      <div className="chart-title">实时就诊动态</div>
      <div className="flex-1 overflow-hidden relative">
        <div className="scroll-list">
          {patients.map((patient, index) => (
            <div 
              key={`${patient.id}-${index}`}
              className="scroll-list-item flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-full bg-secondary">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium">{patient.name}</div>
                  <div className="text-xs text-muted-foreground">{patient.department}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(patient.type)}`}>
                  {patient.type}
                </span>
                <span className={`text-xs ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {patient.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default RealtimeList;
