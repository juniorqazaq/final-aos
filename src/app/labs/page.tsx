"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { labsData } from "@/data/labsData";
import { CheckCircle, Circle, ArrowLeft, BookOpen, Layers } from "lucide-react";

export default function LabsHub() {
  const [completedLabs, setCompletedLabs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Read lab progress from local storage
    const saved = localStorage.getItem("os-labs-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const progress: Record<string, boolean> = {};
        Object.keys(parsed).forEach((key) => {
          progress[key] = parsed[key]?.completed || false;
        });
        setCompletedLabs(progress);
      } catch (e) {
        console.error("Error loading lab progress:", e);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg border border-transparent hover:border-border/30 transition-all"
              title="Back to home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              OS Lab Manuals
            </h1>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Review detailed OS architecture notes and test your knowledge with interactive lab questions.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 self-start sm:self-auto">
          <Layers className="w-4 h-4" />
          <span>{Object.values(completedLabs).filter(Boolean).length} / 9 Complete</span>
        </div>
      </div>

      {/* Grid of Labs */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {labsData.map((lab) => {
          const isComplete = completedLabs[lab.id] || false;
          
          return (
            <Link 
              key={lab.id} 
              href={`/labs/${lab.id}`}
              className="glass-panel glass-panel-hover flex flex-col justify-between p-5 relative overflow-hidden group border border-border/40"
            >
              {/* Completed Visual Status Tag */}
              <div className="absolute right-3 top-3">
                {isComplete ? (
                  <CheckCircle className="w-5 h-5 text-success fill-success/10" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30" />
                )}
              </div>

              <div className="flex flex-col gap-3">
                {/* Lab Title */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                    {lab.title}
                  </span>
                  <h2 className="text-base font-bold text-foreground tracking-tight group-hover:text-primary transition-colors leading-snug">
                    {lab.subtitle}
                  </h2>
                </div>
              </div>

              {/* Lab Metadata Footer */}
              <div className="flex items-center justify-between mt-6 pt-3 border-t border-border/20 text-[11px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-muted-foreground/60" />
                  <span>{lab.questions.length} Questions</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full border ${
                  isComplete 
                    ? "border-success/30 bg-success/10 text-success" 
                    : "border-border/50 bg-muted/30"
                }`}>
                  {isComplete ? "Done" : "Study"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
