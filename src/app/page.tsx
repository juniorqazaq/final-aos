"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckCircle, Trophy, Play, Activity } from "lucide-react";

export default function Home() {
  const [completedLabsCount, setCompletedLabsCount] = useState(0);
  const [highScores, setHighScores] = useState({ variant1: 0, variant2: 0 });

  useEffect(() => {
    // Read user progress from localStorage
    const savedProgress = localStorage.getItem("os-labs-progress");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress) as Record<string, { completed?: boolean }>;
        const count = Object.values(parsed).filter((v) => v?.completed).length;
        setCompletedLabsCount(count);
      } catch (e) {
        console.error("Error loading lab progress:", e);
      }
    }

    const savedVariant1Score = localStorage.getItem("os-exam-highscore-variant1");
    const savedVariant2Score = localStorage.getItem("os-exam-highscore-variant2");
    setHighScores({
      variant1: savedVariant1Score ? parseInt(savedVariant1Score) : 0,
      variant2: savedVariant2Score ? parseInt(savedVariant2Score) : 0,
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 md:gap-12 py-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center gap-4 py-6 md:py-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full">
          <Activity className="w-3.5 h-3.5" />
          <span>OS Core Systems & Security</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          OS Final Exam Practice
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed text-balance">
          Master computer systems architecture, I/O devices, synchronization deadlocks, hypervisors, and security permissions with our premium study guide and live exam simulator.
        </p>
      </section>

      {/* Grid Menu Section */}
      <section className="grid md:grid-cols-2 gap-6 px-2">
        {/* Lab Study & Quizzes Card */}
        <div className="glass-panel glass-panel-hover flex flex-col justify-between p-6 md:p-8 group relative overflow-hidden">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary/10 text-primary border border-primary/25 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full border border-border/30">
                9 Labs Total
              </span>
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Lab Study & Practice
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Dive deep into 9 individual lab manuals including BIOS, Processes & Threads, System resources, chkdsk file structures, and hardware I/O scheduling. Practice with 64 structured short-answer questions.
              </p>
            </div>

            {/* Micro-metrics */}
            {completedLabsCount > 0 && (
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-success">
                <CheckCircle className="w-4 h-4" />
                <span>{completedLabsCount} of 9 Labs Complete</span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link 
              href="/labs"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/95 shadow-md shadow-primary/15 rounded-xl transition-all hover:scale-[1.01]"
              id="start-labs-btn"
            >
              <span>Explore Labs</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>

        {/* Endterm Simulator Card */}
        <div className="glass-panel glass-panel-hover flex flex-col justify-between p-6 md:p-8 group relative overflow-hidden">

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-accent/10 text-accent border border-accent/25 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full border border-border/30">
                40 Min Limit
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Endterm Exam Simulator
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Test your knowledge with simulated exam pools. Features two separate variants containing Single Choice MCQs and Multiple Choice select questions, dynamic ticking clocks, and deep grading explanations.
              </p>
            </div>

            {/* Micro-metrics */}
            {(highScores.variant1 > 0 || highScores.variant2 > 0) && (
              <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-accent">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>V1 High: {highScores.variant1}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>V2 High: {highScores.variant2}%</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link 
              href="/exam"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-bold text-foreground bg-secondary hover:bg-secondary/85 border border-border/55 rounded-xl transition-all hover:scale-[1.01]"
              id="start-exam-btn"
            >
              <span>Simulate Exam</span>
              <Play className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-center justify-around text-center mt-6">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-primary">64</span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Practice Questions</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-border/60" />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-foreground">9 Manuals</span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Lab Manual Summaries</span>
        </div>
        <div className="hidden md:block w-px h-10 bg-border/60" />
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-extrabold text-accent">50 Tasks</span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Simulated Exam Questions</span>
        </div>
      </section>
    </div>
  );
}
