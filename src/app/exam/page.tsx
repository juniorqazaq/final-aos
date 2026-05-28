"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldAlert, Award, Play } from "lucide-react";

export default function ExamHub() {
  const [highScores, setHighScores] = useState({ variant1: 0, variant2: 0 });

  useEffect(() => {
    // Retrieve high scores from localStorage
    const savedV1 = localStorage.getItem("os-exam-highscore-variant1");
    const savedV2 = localStorage.getItem("os-exam-highscore-variant2");
    setHighScores({
      variant1: savedV1 ? parseInt(savedV1) : 0,
      variant2: savedV2 ? parseInt(savedV2) : 0,
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-4">
      {/* Top Header */}
      <div className="flex flex-col gap-1 border-b border-border/30 pb-4">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg border border-transparent hover:border-border/30 transition-all"
            title="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Endterm Exam Simulator
          </h1>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground pl-8">
          Challenge your understanding of core OS systems under timed conditions.
        </p>
      </div>

      {/* Warning/Instructions Alert Banner */}
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 text-xs md:text-sm text-foreground/80">
          <span className="font-bold text-foreground">Important Exam Instructions</span>
          <ul className="list-disc pl-4 space-y-1 mt-1 text-muted-foreground">
            <li>Each exam variant contains exactly **20 Single Choice** and **5 Multiple Choice** questions.</li>
            <li>You have **40 minutes** to complete the exam.</li>
            <li>The timer counts down in real-time. Once the clock hits zero, your exam is **automatically submitted** and graded.</li>
            <li>You can navigate back and forth between questions to review or alter answers before clicking **Submit**.</li>
          </ul>
        </div>
      </div>

      {/* Variant Grid Selector */}
      <div className="grid md:grid-cols-2 gap-6 mt-2">
        {/* VARIANT 1 CARD */}
        <div className="glass-panel glass-panel-hover p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                Exam Pool A
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>40 Mins</span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                Variant 1
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Covers device-independent I/O layers, UMA vs NUMA processor architectures, NTFS ACL implementations, paravirtualization transfers, DMA controller processes, and rootkit malware detection.
              </p>
            </div>

            {/* High Score Panel */}
            {highScores.variant1 > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold mt-2">
                <Award className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                <span>Personal High Score: {highScores.variant1}%</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link 
              href="/exam/variant1"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/95 shadow-md shadow-primary/15 rounded-xl transition-all hover:scale-[1.01]"
              id="start-v1-btn"
            >
              <span>Begin Variant 1</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>

        {/* VARIANT 2 CARD */}
        <div className="glass-panel glass-panel-hover p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                Exam Pool B
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>40 Mins</span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                Variant 2
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Covers Coffman deadlock conditions, Banker&apos;s Safe/Unsafe state sequences, hypervisor VM migration methods, mutex thread synchronization, NTFS disk quotas, and UAC elevation boundaries.
              </p>
            </div>

            {/* High Score Panel */}
            {highScores.variant2 > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-success font-semibold mt-2">
                <Award className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                <span>Personal High Score: {highScores.variant2}%</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link 
              href="/exam/variant2"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-foreground bg-secondary hover:bg-secondary/85 border border-border/55 rounded-xl transition-all hover:scale-[1.01]"
              id="start-v2-btn"
            >
              <span>Begin Variant 2</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
