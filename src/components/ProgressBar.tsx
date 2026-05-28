"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">Progress</span>
        <span className="font-semibold text-primary">{current} / {total} ({percentage}%)</span>
      </div>
      <div className="w-full h-2 bg-muted/80 rounded-full overflow-hidden border border-border/40">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
