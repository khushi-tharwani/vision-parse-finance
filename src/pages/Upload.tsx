import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Upload as UploadIcon,
  FileImage,
  FileText,
  X,
  CheckCircle,
  Loader2,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useChartAnalysis, AnalysisResult } from "@/hooks/useChartAnalysis";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "image" | "pdf";
  status: "pending" | "uploading" | "complete" | "analyzing" | "analyzed";
  progress: number;
  file: File;
  preview?: string;
}

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();
  const { isAnalyzing, results, error, analyzeFiles } = useChartAnalysis();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => {
      const f: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type.includes("pdf") ? "pdf" : "image",
        status: "complete",
        progress: 100,
        file,
      };
      if (file.type.startsWith("image/")) {
        f.preview = URL.createObjectURL(file);
      }
      return f;
    });

    setFiles((prev) => [...prev, ...newFiles]);
    toast({ title: "Files Added", description: `${newFiles.length} file(s) ready for analysis` });
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

  const handleAnalyze = async () => {
    const imageFiles = files.filter((f) => f.type === "image").map((f) => f.file);
    if (imageFiles.length === 0) {
      toast({ title: "No Images", description: "Please upload image files to analyze.", variant: "destructive" });
      return;
    }
    setFiles((prev) => prev.map((f) => ({ ...f, status: "analyzing" })));
    toast({ title: "Analysis Started", description: `Analyzing ${imageFiles.length} chart(s) with AI...` });

    const analysisResults = await analyzeFiles(imageFiles);
    setFiles((prev) => prev.map((f) => ({ ...f, status: "analyzed" })));

    if (analysisResults.length > 0) {
      toast({ title: "Analysis Complete", description: `Generated insights for ${analysisResults.length} chart(s)` });
    } else if (error) {
      toast({ title: "Analysis Failed", description: error, variant: "destructive" });
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "bullish": return <TrendingUp className="h-5 w-5 text-success" />;
      case "bearish": return <TrendingDown className="h-5 w-5 text-destructive" />;
      default: return <Minus className="h-5 w-5 text-warning" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "bullish": return "text-success bg-success/10 border-success/20";
      case "bearish": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "text-warning bg-warning/10 border-warning/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Upload Financial Visuals</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drop your charts, PDFs, or screenshots. Our AI will analyze patterns and generate insights automatically.
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative max-w-2xl mx-auto border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-secondary/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="file-upload"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="text-center">
            <motion.div
              className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
              animate={isDragging ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
            >
              <UploadIcon className="h-8 w-8 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragging ? "Drop files here" : "Drag & drop your files"}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">or click to browse</p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><FileImage className="h-4 w-4" /> PNG, JPG, WEBP</span>
              <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> PDF</span>
            </div>
          </div>
        </motion.div>

        {/* File List */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              className="max-w-2xl mx-auto mt-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{files.length} file(s) selected</h3>
                <Button variant="ghost" size="sm" onClick={() => setFiles([])}>Clear All</Button>
              </div>

              <div className="space-y-3 mb-6">
                {files.map((file, i) => (
                  <motion.div
                    key={file.id}
                    className="glass-card p-4 flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="p-2 rounded-lg bg-secondary">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {file.status === "analyzing" && (
                        <div className="flex items-center gap-2 text-primary">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-xs">Analyzing...</span>
                        </div>
                      )}
                      {file.status === "complete" && <CheckCircle className="h-5 w-5 text-success" />}
                      {file.status === "analyzed" && <Sparkles className="h-5 w-5 text-primary" />}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-secondary rounded-lg transition-colors"
                        disabled={isAnalyzing}
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full group"
                onClick={handleAnalyze}
                disabled={isAnalyzing || files.length === 0}
              >
                {isAnalyzing ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing Charts...</>
                ) : (
                  <><Sparkles className="h-5 w-5" /> Analyze with Visual AI</>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              className="max-w-4xl mx-auto mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Analysis Results
              </h2>

              <div className="space-y-6">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    className="glass-card p-6 border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{result.fileName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {result.analysis.asset} • {result.analysis.timeframe}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getSignalColor(result.analysis.signal)}`}>
                        {getSignalIcon(result.analysis.signal)}
                        <span className="text-sm font-medium capitalize">{result.analysis.signal}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Confidence", value: `${result.analysis.confidence}%`, highlight: true },
                        { label: "Risk Level", value: result.analysis.riskLevel },
                        { label: "Trend", value: result.analysis.trendDirection },
                        { label: "Strength", value: result.analysis.trendStrength },
                      ].map((m, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-secondary/40 border border-border/20">
                          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                          <p className={`text-lg font-bold capitalize ${m.highlight ? "text-primary" : ""}`}>{m.value}</p>
                        </div>
                      ))}
                    </div>

                    {result.analysis.patterns.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Detected Patterns</p>
                        <div className="flex flex-wrap gap-2">
                          {result.analysis.patterns.map((pattern, i) => (
                            <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                              {pattern}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-border/30 pt-4 space-y-3">
                      <p className="text-sm leading-relaxed">{result.analysis.summary}</p>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary">{result.analysis.recommendation}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supported Formats */}
        <motion.div
          className="max-w-2xl mx-auto mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-center font-semibold mb-6">Supported Formats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FileImage, label: "Chart Images", formats: "PNG, JPG, WEBP" },
              { icon: FileText, label: "Documents", formats: "PDF" },
              { icon: FileText, label: "Presentations", formats: "PPT, PPTX" },
              { icon: FileImage, label: "Screenshots", formats: "Any format" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-4 text-center hover:border-primary/30 transition-colors">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.formats}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Upload;
