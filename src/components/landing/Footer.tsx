import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Fin<span className="text-primary">Optic</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visual intelligence for autonomous financial insights. Transform charts into actionable data.
            </p>
          </div>

          {[
            { title: "Product", links: [{ label: "Dashboard", to: "/dashboard" }, { label: "Upload", to: "/upload" }, { label: "Insights", to: "/insights" }, { label: "Pricing", to: "/" }] },
            { title: "Company", links: [{ label: "About", to: "/" }, { label: "Careers", to: "/" }, { label: "Blog", to: "/" }, { label: "Contact", to: "/" }] },
            { title: "Legal", links: [{ label: "Privacy", to: "/" }, { label: "Terms", to: "/" }, { label: "Security", to: "/" }] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-foreground transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 FinOptic. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built for financial professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
