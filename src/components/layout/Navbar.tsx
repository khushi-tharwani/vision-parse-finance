import { Button } from "@/components/ui/button";
import { Activity, BarChart3, Upload, Bell, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StoredResult {
  fileName: string;
  analysis: { signal: string; asset: string; patterns: string[] };
  timestamp: string;
}

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<StoredResult[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("finoptic_history");
        if (raw) setNotifications(JSON.parse(raw).slice(0, 5));
      } catch {}
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("finoptic:history-updated", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("finoptic:history-updated", load);
    };
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/insights", label: "Insights", icon: Activity },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Fin<span className="text-primary">Optic</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  size="sm"
                  className={`gap-2 ${isActive(item.href) ? "text-primary" : ""}`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <DropdownMenuItem disabled className="text-sm text-muted-foreground">
                    No alerts yet. Upload a chart to get started.
                  </DropdownMenuItem>
                ) : (
                  notifications.map((n, i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5">
                      <div className="flex items-center gap-2 w-full">
                        <span className={`h-2 w-2 rounded-full ${n.analysis.signal === "bullish" ? "bg-success" : n.analysis.signal === "bearish" ? "bg-destructive" : "bg-warning"}`} />
                        <span className="text-sm font-medium truncate flex-1">{n.analysis.asset || n.fileName}</span>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {n.analysis.signal} signal · {n.analysis.patterns?.[0] || "Analysis"}
                      </span>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
