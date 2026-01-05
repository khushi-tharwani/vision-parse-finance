import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Upload as UploadIcon, 
  FileImage, 
  FileText, 
  X, 
  CheckCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "image" | "pdf";
  status: "pending" | "uploading" | "complete";
  progress: number;
}

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type.includes("pdf") ? "pdf" : "image",
      status: "pending",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });

    toast({
      title: "Files Added",
      description: `${newFiles.length} file(s) added for processing`,
    });
  };

  const simulateUpload = (fileId: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading" } : f))
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, status: "complete", progress: 100 } : f
          )
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 300);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const analyzeFiles = () => {
    toast({
      title: "Analysis Started",
      description: "Your files are being processed. Insights will appear in your dashboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Upload Financial Visuals</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drop your charts, PDFs, or screenshots. Our AI will analyze patterns and generate insights automatically.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative max-w-2xl mx-auto border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-secondary/30"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4">
              <UploadIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragging ? "Drop files here" : "Drag & drop your files"}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              or click to browse
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileImage className="h-4 w-4" />
                PNG, JPG, WEBP
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                PDF, PPT
              </span>
            </div>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{files.length} file(s) selected</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiles([])}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-3 mb-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="p-2 rounded-lg bg-secondary">
                    {file.type === "image" ? (
                      <FileImage className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {file.status === "uploading" && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                      </div>
                    )}
                    {file.status === "complete" && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full group"
              onClick={analyzeFiles}
              disabled={files.some((f) => f.status === "uploading")}
            >
              <Sparkles className="h-5 w-5" />
              Analyze with Visual AI
            </Button>
          </div>
        )}

        {/* Supported Formats */}
        <div className="max-w-2xl mx-auto mt-12">
          <h3 className="text-center font-semibold mb-6">Supported Formats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FileImage, label: "Chart Images", formats: "PNG, JPG, WEBP" },
              { icon: FileText, label: "Documents", formats: "PDF" },
              { icon: FileText, label: "Presentations", formats: "PPT, PPTX" },
              { icon: FileImage, label: "Screenshots", formats: "Any format" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-4 text-center">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.formats}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
