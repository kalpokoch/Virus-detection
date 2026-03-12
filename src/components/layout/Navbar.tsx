import { Link, useLocation } from "react-router-dom";
import acaiLogo from "@/assets/acai-logo.png";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { LogoPlaceholder } from "@/components/shared/LogoPlaceholder";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/prediction", label: "Prediction" },
  { href: "/contributors", label: "Contributors" },
];

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className="relative">
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <img 
              src={acaiLogo} 
              alt="Amity AI Logo" 
              className="h-14 w-auto object-contain self-start"
            />
            <div className="h-6 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground hidden sm:inline">
              Virus Detection System
            </span>
          </div>
          <nav className="ml-auto hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  location.pathname === link.href && "text-primary underline decoration-2 underline-offset-4"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto md:ml-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "absolute left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-4 mt-1 rounded-b-xl border border-border bg-card shadow-md overflow-hidden">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "block w-full py-3 px-6 text-base font-medium transition-colors",
                i < navLinks.length - 1 && "border-b border-border",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
