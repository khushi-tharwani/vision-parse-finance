import { FileImage, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Upload {
  id: string;
  name: string;
  type: "image" | "pdf";
  status: "completed" | "processing" | "failed";
  timestamp: string;
  insights: number;
}

const uploads: Upload[] = [
  { id: "1", name: "BTC_4H_chart.png", type: "image", status: "completed", timestamp: "2 min ago", insights: 3 },
  { id: "2", name: "Q4_Report.pdf", type: "pdf", status: "processing", timestamp: "5 min ago", insights: 0 },
  { id: "3", name: "ETH_daily.png", type: "image", status: "completed", timestamp: "12 min ago", insights: 2 },
  { id: "4", name: "Market_Analysis.pdf", type: "pdf", status: "completed", timestamp: "1 hour ago", insights: 5 },
  { id: "5", name: "SOL_weekly.png", type: "image", status: "failed", timestamp: "2 hours ago", insights: 0 },
];

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Completed" },
  processing: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Processing" },
  failed: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
};

const RecentUploads = () => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent Uploads</h3>
        <Badge variant="outline" className="text-xs">
          {uploads.length} files
        </Badge>
      </div>

      <div className="space-y-3">
        {uploads.map((upload) => {
          const StatusIcon = statusConfig[upload.status].icon;
          return (
            <div
              key={upload.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-secondary">
                {upload.type === "image" ? (
                  <FileImage className="h-4 w-4 text-primary" />
                ) : (
                  <FileText className="h-4 w-4 text-primary" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{upload.name}</p>
                <p className="text-xs text-muted-foreground">{upload.timestamp}</p>
              </div>

              <div className="flex items-center gap-2">
                {upload.status === "completed" && upload.insights > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {upload.insights} insights
                  </span>
                )}
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${statusConfig[upload.status].bg}`}>
                  <StatusIcon className={`h-3 w-3 ${statusConfig[upload.status].color}`} />
                  <span className={`text-xs ${statusConfig[upload.status].color}`}>
                    {statusConfig[upload.status].label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentUploads;
