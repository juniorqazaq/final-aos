"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { labsData } from "@/data/labsData";
import { ArrowLeft, BookOpen, Check, HelpCircle, RotateCcw, Award } from "lucide-react";

// Inline helper to render custom study guide summaries with rich styling
function StudyNotesRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  
  return (
    <div className="prose-custom flex flex-col gap-4">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Header 3
        if (trimmed.startsWith("###")) {
          return (
            <h3 key={idx} className="text-lg font-bold text-foreground border-b border-border/20 pb-1.5 mt-6 mb-2">
              {trimmed.replace("###", "").trim()}
            </h3>
          );
        }

        // Bold concept titles with description
        if (trimmed.startsWith("**") && trimmed.includes("**") && !trimmed.startsWith("*")) {
          const match = trimmed.match(/^\*\*(.*?)\*\*(.*)/);
          if (match) {
            const [, title, rest] = match;
            return (
              <p key={idx} className="text-sm text-foreground/80 leading-relaxed">
                <strong className="text-foreground font-semibold block sm:inline mr-1">{title}</strong>
                {rest}
              </p>
            );
          }
        }

        // Bullet lists
        if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
          const cleanLine = trimmed.replace(/^[\*\-]\s*/, "");
          
          // Check for nested bold elements like * **Information:** text
          if (cleanLine.startsWith("**") && cleanLine.includes("**")) {
            const match = cleanLine.match(/^\*\*(.*?)\*\*(.*)/);
            if (match) {
              const [, boldText, normalText] = match;
              return (
                <div key={idx} className="flex gap-2 pl-4 text-sm text-foreground/80">
                  <span className="text-primary font-bold text-base leading-none">•</span>
                  <p>
                    <strong className="text-foreground font-semibold mr-1">{boldText}</strong>
                    {normalText}
                  </p>
                </div>
              );
            }
          }
          
          return (
            <div key={idx} className="flex gap-2 pl-4 text-sm text-foreground/80">
              <span className="text-primary font-bold text-base leading-none">•</span>
              <span>{cleanLine}</span>
            </div>
          );
        }

        // Generic block code formatting (like `fsutil fsinfontfsinfo C:`)
        if (trimmed.startsWith("`") && trimmed.endsWith("`") && trimmed.length > 2) {
          return (
            <pre key={idx} className="bg-muted/75 border border-border/40 p-3 rounded-lg font-mono text-xs text-primary overflow-x-auto my-2">
              <code>{trimmed.replace(/`/g, "")}</code>
            </pre>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-sm text-foreground/80 leading-relaxed text-balance">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function LabDetail() {
  const router = useRouter();
  const { id } = useParams() || {};
  const lab = labsData.find((l) => l.id === id);

  const [activeTab, setActiveTab] = useState<"study" | "practice">("study");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // If lab not found
  useEffect(() => {
    if (!lab) {
      router.push("/labs");
    }
  }, [lab, router]);

  // Load progress states
  useEffect(() => {
    if (!lab) return;

    // Load dynamic progress
    const progressSaved = localStorage.getItem("os-labs-progress");
    if (progressSaved) {
      try {
        const parsed = JSON.parse(progressSaved);
        if (parsed[lab.id]) {
          setIsCompleted(parsed[lab.id].completed || false);
        }
      } catch (e) {
        console.error("Error loading lab state:", e);
      }
    }

    // Load active draft answers
    const answersSaved = localStorage.getItem(`os-lab-answers-${lab.id}`);
    if (answersSaved) {
      try {
        setUserAnswers(JSON.parse(answersSaved));
      } catch (e) {
        console.error("Error loading answers draft:", e);
      }
    }
  }, [lab]);

  if (!lab) return null;

  // Handle answer input change
  const handleAnswerChange = (qId: string, val: string) => {
    const updated = { ...userAnswers, [qId]: val };
    setUserAnswers(updated);
    localStorage.setItem(`os-lab-answers-${lab.id}`, JSON.stringify(updated));
  };

  // Check if answer matches
  const verifyAnswer = (userInput: string = "", correctAnswer: string = "") => {
    return userInput.toUpperCase().trim() === correctAnswer.toUpperCase().trim();
  };

  // Toggle lab completion
  const handleToggleComplete = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);

    const progressSaved = localStorage.getItem("os-labs-progress");
    let progressObj: Record<string, { completed?: boolean; timestamp?: string }> = {};
    if (progressSaved) {
      try {
        progressObj = JSON.parse(progressSaved) as Record<string, { completed?: boolean; timestamp?: string }>;
      } catch (e) {
        console.error("Error parsing progress log:", e);
      }
    }

    progressObj[lab.id] = { completed: nextState, timestamp: new Date().toISOString() };
    localStorage.setItem("os-labs-progress", JSON.stringify(progressObj));
  };

  // Reset quiz states
  const handleResetQuiz = () => {
    setUserAnswers({});
    localStorage.removeItem(`os-lab-answers-${lab.id}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-2">
      {/* Top Header */}
      <div className="flex flex-col gap-4">
        {/* Back Link */}
        <Link 
          href="/labs" 
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Labs</span>
        </Link>

        {/* Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
              {lab.title}
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight leading-none">
              {lab.subtitle}
            </h1>
          </div>

          {/* Complete Status Button */}
          <button
            onClick={handleToggleComplete}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              isCompleted 
                ? "bg-success/15 border-success/40 text-success" 
                : "bg-secondary/45 border-border/60 hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
            }`}
            id={`complete-${lab.id}-btn`}
          >
            {isCompleted ? <Check className="w-4 h-4" /> : <Award className="w-4 h-4 text-muted-foreground/60" />}
            <span>{isCompleted ? "Completed" : "Mark as Complete"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex bg-muted/60 border border-border/30 rounded-xl p-1 max-w-xs">
        <button
          onClick={() => setActiveTab("study")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "study"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          id="study-tab-btn"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Study Guide</span>
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "practice"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          id="practice-tab-btn"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Practice Quiz</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="glass-panel p-6 border border-border/40">
        {activeTab === "study" ? (
          /* STUDY NOTES PANEL */
          <section className="flex flex-col gap-2">
            <StudyNotesRenderer content={lab.concepts} />
          </section>
        ) : (
          /* INTERACTIVE QUIZ PANEL */
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/20 pb-3">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <span>Practice Questions</span>
                <span className="text-xs bg-primary/10 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-medium">
                  {lab.questions.length} Items
                </span>
              </h2>
              <button
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-destructive transition-all"
                title="Clear answers"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-6 divide-y divide-border/20">
              {lab.questions.map((q, idx) => {
                const userAns = userAnswers[q.id] || "";
                const hasAnswered = !!userAns;
                const isCorrect = verifyAnswer(userAns, q.answer);
                
                return (
                  <div key={q.id} className={`flex flex-col gap-3 ${idx > 0 ? "pt-5" : ""}`}>
                    {/* Question Title */}
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-bold text-foreground leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 pl-8.5">
                      {/* Responsive 2x2 Option Buttons Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                        {q.options.map((opt) => {
                          const optLetter = opt[0]; // "A", "B", "C", "D"
                          const isSelected = userAns === optLetter;
                          const isCorrectChoice = optLetter === q.answer;
                          
                          let btnStyle = "border-border/60 hover:border-primary/45 bg-muted/10 hover:bg-muted/30 text-foreground/80";
                          if (hasAnswered) {
                            if (isCorrectChoice) {
                              btnStyle = "border-success/50 bg-success/10 text-success font-semibold shadow-sm";
                            } else if (isSelected) {
                              btnStyle = "border-destructive/50 bg-destructive/10 text-destructive font-semibold shadow-sm";
                            } else {
                              btnStyle = "border-border/30 bg-muted/5 text-muted-foreground/45 cursor-not-allowed";
                            }
                          }
                          
                          return (
                            <button
                              key={optLetter}
                              disabled={hasAnswered}
                              onClick={() => handleAnswerChange(q.id, optLetter)}
                              className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-start gap-2.5 outline-none ${btnStyle}`}
                            >
                              <span className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center font-bold text-[10px] ${
                                hasAnswered
                                  ? isCorrectChoice
                                    ? "bg-success text-success-foreground"
                                    : isSelected
                                      ? "bg-destructive text-destructive-foreground"
                                      : "bg-muted/40 text-muted-foreground/60"
                                  : "bg-secondary text-foreground"
                              }`}>
                                {optLetter}
                              </span>
                              <span className="leading-relaxed">{opt.substring(3)}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Immediate Feedback and Detailed Explanation */}
                      {hasAnswered && (
                        <div className={`p-4 border rounded-xl flex flex-col gap-2 transition-all text-xs leading-relaxed ${
                          isCorrect 
                            ? "bg-success/5 border-success/20 text-success-foreground" 
                            : "bg-destructive/5 border-destructive/20 text-destructive-foreground"
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold">
                            {isCorrect ? (
                              <>
                                <Check className="w-4 h-4 text-success" />
                                <span className="text-success uppercase tracking-wider text-[10px]">Correct Answer!</span>
                              </>
                            ) : (
                              <>
                                <span className="text-destructive uppercase tracking-wider text-[10px]">Incorrect Choice</span>
                              </>
                            )}
                          </div>
                          
                          {!isCorrect && (
                            <p className="text-foreground/90 font-medium">
                              The correct answer is <strong className="text-success">{q.answer}</strong>: {" "}
                              <span className="font-semibold">{q.options.find(o => o.startsWith(q.answer))?.substring(3)}</span>
                            </p>
                          )}

                          {q.hint && (
                            <div className="border-t border-border/20 pt-2 mt-1">
                              <span className="font-bold text-primary uppercase tracking-wider text-[9px] block mb-0.5">
                                Explanation:
                              </span>
                              <p className="text-muted-foreground italic font-medium">
                                {q.hint}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
