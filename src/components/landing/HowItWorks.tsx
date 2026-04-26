import { Upload, Sparkles, BarChart3 } from "lucide-react";

const steps = [
  { icon: Upload, step: "1", title: "Upload", description: "Drop charts, PDFs, or screenshots." },
  { icon: Sparkles, step: "2", title: "Analyze", description: "AI detects patterns and signals automatically." },
  { icon: BarChart3, step: "3", title: "Decide", description: "Get clear, actionable recommendations." },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How it works</h2>
          <p className="text-muted-foreground">Three simple steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-mono text-muted-foreground mb-1">STEP {s.step}</div>
              <h3 className="font-semibold mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
