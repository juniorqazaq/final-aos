"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Terminal, ChevronRight, Home } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname() || "";

  // Helper to map paths to beautiful labels
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs = [];

    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Customize specific labels
      if (segment === "labs") label = "Labs Hub";
      else if (segment === "exam") label = "Exam Simulator";
      else if (segment.startsWith("lab")) {
        const labNum = segment.replace("lab", "");
        label = `Lab ${labNum}`;
      } else if (/^\d+$/.test(segment) && segments[i - 1] === "labs") {
        label = `Lab ${segment}`;
      } else if (segment === "variant1") {
        label = "Variant 1";
      } else if (segment === "variant2") {
        label = "Variant 2";
      }

      crumbs.push({ label, path: currentPath });
    }

    return crumbs;
  };

  const crumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md border-b border-border/40 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-base md:text-lg text-primary tracking-tight transition-transform hover:scale-[1.02]"
        >
          <div className="p-1.5 bg-primary/10 border border-primary/20 rounded-lg">
            <Terminal className="w-5 h-5" />
          </div>
          <span>AOS Practice</span>
        </Link>

        {/* Dynamic Breadcrumbs (Visible on Desktop) */}
        <nav aria-label="Breadcrumbs" className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 py-1.5 px-3 rounded-full border border-border/20">
          <Link href="/" className="hover:text-foreground flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path}>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/55" />
              {idx === crumbs.length - 1 ? (
                <span className="text-foreground font-medium">{crumb.label}</span>
              ) : (
                <Link href={crumb.path} className="hover:text-foreground">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Actions (Home link for Mobile + Theme Toggle) */}
        <div className="flex items-center gap-2">
          {pathname !== "/" && (
            <Link 
              href="/" 
              className="p-2 md:hidden text-muted-foreground hover:text-foreground bg-secondary/55 hover:bg-secondary/90 rounded-full border border-border/30 transition-all"
              title="Return Home"
            >
              <Home className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground bg-secondary/55 hover:bg-secondary/90 rounded-full border border-border/30 transition-all duration-300"
            aria-label="Toggle visual theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
