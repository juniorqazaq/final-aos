"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Clock } from "lucide-react";

interface TimerProps {
  initialSeconds: number;
  isActive: boolean;
  onTimeUp: () => void;
}

export default function Timer({ initialSeconds, isActive, onTimeUp }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) {
      if (secondsLeft === 0) onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const percentage = (secondsLeft / initialSeconds) * 100;
  const isUrgent = secondsLeft <= 300; // Final 5 minutes

  // SVG Circular math
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`flex items-center gap-3 px-4 py-2 bg-card/45 backdrop-blur-md rounded-xl border transition-all ${
      isUrgent 
        ? "border-destructive/60 bg-destructive/5 text-destructive animate-pulse-red" 
        : "border-border/60 text-foreground"
    }`}>
      {/* SVG Circular Progression Indicator */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="16"
            cy="16"
            r={radius}
            className="stroke-muted-foreground/15 fill-none"
            strokeWidth="3"
          />
          <circle
            cx="16"
            cy="16"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-linear ${
              isUrgent ? "stroke-destructive" : "stroke-primary"
            }`}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {isUrgent ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5 text-primary" />}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          Time Remaining
        </span>
        <span className="text-sm font-bold font-mono tracking-tight leading-none mt-0.5">
          {formatTime(secondsLeft)}
        </span>
      </div>
    </div>
  );
}
