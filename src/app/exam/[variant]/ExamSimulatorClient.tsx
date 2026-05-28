"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Timer from "@/components/Timer";
import ProgressBar from "@/components/ProgressBar";
import { 
  ArrowLeft, CheckCircle2, XCircle, RotateCcw, AlertTriangle, 
  ChevronRight, ChevronLeft, ThumbsUp, ShieldCheck 
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer?: string; // For single choice
  answers?: string[]; // For multiple choice
  explanation: string;
}

interface ExamData {
  single: Question[];
  multiple: Question[];
}

interface ExamSimulatorClientProps {
  activeExam: ExamData;
  variant: string;
}

export default function ExamSimulatorClient({ activeExam, variant }: ExamSimulatorClientProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedSingleAnswers, setSelectedSingleAnswers] = useState<Record<number, string>>({});
  const [selectedMultipleAnswers, setSelectedMultipleAnswers] = useState<Record<number, string[]>>({});
  const [committedMultipleAnswers, setCommittedMultipleAnswers] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeftAtSubmit, setTimeLeftAtSubmit] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const [examStarted, setExamStarted] = useState(false);

  const initialTime = 2400; // 40 minutes in seconds

  // Sync state reference for tracking duration
  const timeRef = useRef(initialTime);

  useEffect(() => {
    if (isSubmitted || !examStarted) return;
    
    timeRef.current = initialTime;
    const interval = setInterval(() => {
      timeRef.current -= 1;
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, examStarted]);

  const allQuestions = [...activeExam.single, ...activeExam.multiple];
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentIdx];
  const isMultipleChoice = currentIdx >= activeExam.single.length;

  // Single choice select
  const handleSingleSelect = (qId: number, optionLetter: string) => {
    if (isSubmitted) return;
    setSelectedSingleAnswers((prev) => ({ ...prev, [qId]: optionLetter }));
  };

  // Multiple choice toggle
  const handleMultipleToggle = (qId: number, optionLetter: string) => {
    if (isSubmitted) return;
    setSelectedMultipleAnswers((prev) => {
      const current = prev[qId] || [];
      const next = current.includes(optionLetter)
        ? current.filter((x) => x !== optionLetter)
        : [...current, optionLetter].sort();
      return { ...prev, [qId]: next };
    });
  };

  // Grade the entire exam
  const handleExamSubmit = () => {
    if (isSubmitted) return;

    let correctCount = 0;

    // 1. Grade single choice questions (MCQ)
    activeExam.single.forEach((q) => {
      const userAns = selectedSingleAnswers[q.id] || "";
      if (userAns === q.answer) {
        correctCount += 1;
      }
    });

    // 2. Grade multiple choice questions (Select all correct)
    activeExam.multiple.forEach((q) => {
      const userAnswersList = selectedMultipleAnswers[q.id] || [];
      const correctAnswersList = q.answers || [];

      // Arrays must be identical in selected options (both are sorted)
      const isIdentical = 
        userAnswersList.length === correctAnswersList.length &&
        userAnswersList.every((val, i) => val === correctAnswersList[i]);

      if (isIdentical) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / totalQuestions) * 100);
    setScore({ correct: correctCount, total: totalQuestions, percentage: percent });
    setTimeLeftAtSubmit(timeRef.current);
    setIsSubmitted(true);

    // Save high score to local storage
    const storageKey = `os-exam-highscore-${variant}`;
    const savedHighScore = localStorage.getItem(storageKey);
    if (!savedHighScore || percent > parseInt(savedHighScore)) {
      localStorage.setItem(storageKey, percent.toString());
    }
  };

  // Restart exam
  const handleRetakeExam = () => {
    setSelectedSingleAnswers({});
    setSelectedMultipleAnswers({});
    setCommittedMultipleAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    timeRef.current = initialTime;
    setExamStarted(false);
  };

  // Calculate stats
  const answeredCount = 
    Object.keys(selectedSingleAnswers).length + 
    Object.keys(selectedMultipleAnswers).filter((k) => selectedMultipleAnswers[parseInt(k)]?.length > 0).length;

  const getQuestionStatus = (idx: number) => {
    const q = allQuestions[idx];
    const isMcq = idx < activeExam.single.length;
    if (isMcq) {
      return !!selectedSingleAnswers[q.id];
    } else {
      return (selectedMultipleAnswers[q.id] || []).length > 0;
    }
  };

  // Format dynamic time taken
  const formatTimeTaken = () => {
    const secondsUsed = initialTime - timeLeftAtSubmit;
    const mins = Math.floor(secondsUsed / 60);
    const secs = secondsUsed % 60;
    return `${mins}m ${secs}s`;
  };

  if (!examStarted) {
    return (
      /* EXAM INTRODUCTION / GATE SCREEN */
      <div className="flex flex-col gap-6 max-w-xl mx-auto py-8">
        <div className="flex flex-col gap-4 text-center">
          <Link href="/exam" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-semibold self-center">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel and Return</span>
          </Link>
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 border border-primary/20 rounded-full w-16 h-16 mx-auto mt-2 text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Start Exam: {variant === "variant1" ? "Variant 1" : "Variant 2"}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            You are about to launch a full timed simulation. Closing this browser window or navigating away does not pause the active running timer.
          </p>
        </div>

        <div className="glass-panel p-6 border border-border/40 flex flex-col gap-4 text-xs md:text-sm leading-relaxed">
          <span className="font-bold text-foreground uppercase tracking-wider text-[10px] text-primary">Exam Parameters</span>
          <div className="grid grid-cols-2 gap-4 border-t border-border/20 pt-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Total Score Capacity</span>
              <span className="font-bold text-foreground">25 Points</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Time Limit boundary</span>
              <span className="font-bold text-foreground">40 Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Single Choice MCQs</span>
              <span className="font-bold text-foreground">20 Questions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Multiple Choice (Select all)</span>
              <span className="font-bold text-foreground">5 Questions</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setExamStarted(true)}
          className="w-full px-5 py-3.5 text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/95 shadow-md shadow-primary/15 rounded-xl transition-all hover:scale-[1.01]"
          id="begin-exam-session-btn"
        >
          Activate Exam Timer and Begin
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-2">
      {/* Dynamic Results Page Overlay */}
      {isSubmitted ? (
        <div className="flex flex-col gap-8">
          {/* Top Score Banner Card */}
          <div className="glass-panel p-8 text-center border-t-4 border-t-success flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-success bg-success/15 border border-success/30 rounded-full">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Exam Complete</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                Exam Performance Overview
              </h1>
              <p className="text-xs text-muted-foreground">
                Time Taken: <strong className="text-foreground font-semibold">{formatTimeTaken()}</strong> • Grade Accuracy: <strong className="text-foreground font-semibold">{score.percentage}%</strong>
              </p>
            </div>

            {/* Circular Dynamic Score visual */}
            <div className="relative w-36 h-36 flex items-center justify-center mt-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  className="stroke-muted-foreground/10 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="56"
                  className="stroke-success fill-none transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 - (score.percentage / 100) * 2 * Math.PI * 56}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-foreground">{score.percentage}%</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                  {score.correct} / {score.total} Correct
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleRetakeExam}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-foreground bg-secondary hover:bg-secondary/95 border border-border/60 rounded-xl transition-all"
                id="retake-exam-btn"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Exam</span>
              </button>
              <Link
                href="/exam"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/95 rounded-xl shadow-sm transition-all"
              >
                <span>Exam Selector Hub</span>
              </Link>
            </div>
          </div>

          {/* Deep Question Review sheet */}
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-extrabold text-foreground uppercase tracking-wider border-b border-border/20 pb-2">
              Question-by-Question Revision Sheet
            </h2>

            <div className="flex flex-col gap-6 divide-y divide-border/20">
              {allQuestions.map((q, idx) => {
                const isMcq = idx < activeExam.single.length;
                const userAnsSingle = selectedSingleAnswers[q.id] || "";
                const userAnsMultiple = selectedMultipleAnswers[q.id] || [];
                
                let isQuestionCorrect = false;
                if (isMcq) {
                  isQuestionCorrect = userAnsSingle === q.answer;
                } else {
                  const correctAnsList = q.answers || [];
                  isQuestionCorrect = 
                    userAnsMultiple.length === correctAnsList.length &&
                    userAnsMultiple.every((val, i) => val === correctAnsList[i]);
                }

                return (
                  <div key={q.id} className={`flex flex-col gap-4 ${idx > 0 ? "pt-6" : ""}`}>
                    {/* Header: Status badge & index */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-foreground leading-snug">
                          {q.question}
                        </h3>
                      </div>
                      
                      {/* Correct/Incorrect badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                        isQuestionCorrect 
                          ? "border-success/30 bg-success/10 text-success" 
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                      }`}>
                        {isQuestionCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{isQuestionCorrect ? "Correct" : "Incorrect"}</span>
                      </span>
                    </div>

                    {/* Options rendering with green/red highlight review logic */}
                    <div className="flex flex-col gap-2 pl-8.5">
                      <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Answer Selection review:</span>
                      {q.options.map((opt) => {
                        const letter = opt.substring(0, 2).replace(")", "").trim(); // E.g., extracts "A"
                        const isOptCorrect = isMcq ? letter === q.answer : q.answers?.includes(letter);
                        const isOptUserSelected = isMcq ? letter === userAnsSingle : userAnsMultiple.includes(letter);

                        let optionStyle = "border-border/40 bg-muted/20 text-foreground/80";
                        if (isOptCorrect) {
                          optionStyle = "border-success/50 bg-success/15 text-success font-semibold";
                        } else if (isOptUserSelected && !isOptCorrect) {
                          optionStyle = "border-destructive/50 bg-destructive/15 text-destructive font-semibold";
                        }

                        return (
                          <div 
                            key={opt}
                            className={`p-3 text-xs border rounded-xl flex items-center justify-between transition-all ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isOptCorrect && <CheckCircle2 className="w-4 h-4 text-success" />}
                            {isOptUserSelected && !isOptCorrect && <XCircle className="w-4 h-4 text-destructive" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Conceptual Explanation Box */}
                    <div className="pl-8.5 mt-1">
                      <div className="p-4 bg-secondary/45 border border-border/40 rounded-xl flex flex-col gap-1.5 text-xs leading-relaxed">
                        <span className="font-bold text-primary uppercase tracking-wider text-[9px]">
                          Technical Explanation:
                        </span>
                        <p className="text-foreground/80">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* LIVE EXAM RUNTIME INTERFACE */
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Question Display panel (Left Column, Width 2/3) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <h2 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
                Question {currentIdx + 1} of {totalQuestions}
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                isMultipleChoice
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-primary/30 bg-primary/10 text-primary"
              }`}>
                {isMultipleChoice ? "Select All That Apply" : "Single Choice (MCQ)"}
              </span>
            </div>

            <div className="glass-panel p-6 border border-border/40 flex flex-col gap-6 min-h-[300px]">
              {/* Question Text */}
              <p className="text-sm md:text-base font-bold text-foreground leading-snug">
                {currentQuestion.question}
              </p>

              {/* Options selectors */}
              <div className="flex flex-col gap-3">
                {(() => {
                  const isSingleCommitted = !isMultipleChoice && !!selectedSingleAnswers[currentQuestion.id];
                  const isMultipleCommitted = isMultipleChoice && !!committedMultipleAnswers[currentQuestion.id];
                  const isCommitted = isSingleCommitted || isMultipleCommitted;

                  return currentQuestion.options.map((opt) => {
                    const letter = opt.substring(0, 2).replace(")", "").trim(); // E.g. "A"
                    const isSelected = isMultipleChoice
                      ? (selectedMultipleAnswers[currentQuestion.id] || []).includes(letter)
                      : selectedSingleAnswers[currentQuestion.id] === letter;
                    
                    const isOptCorrect = isMultipleChoice
                      ? (currentQuestion.answers || []).includes(letter)
                      : letter === currentQuestion.answer;

                    let optionStyle = "border-border/60 hover:bg-secondary/40 text-foreground/80 hover:text-foreground";
                    
                    if (isCommitted) {
                      if (isOptCorrect) {
                        optionStyle = "border-success/50 bg-success/10 text-success font-semibold shadow-sm cursor-not-allowed";
                      } else if (isSelected) {
                        optionStyle = "border-destructive/50 bg-destructive/10 text-destructive font-semibold shadow-sm cursor-not-allowed";
                      } else {
                        optionStyle = "border-border/30 bg-muted/5 text-muted-foreground/45 cursor-not-allowed";
                      }
                    } else if (isSelected) {
                      optionStyle = isMultipleChoice
                        ? "border-accent bg-accent/10 text-accent font-semibold shadow-md shadow-accent/5"
                        : "border-primary bg-primary/10 text-primary font-semibold shadow-md shadow-primary/5";
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isCommitted}
                        onClick={() => isMultipleChoice ? handleMultipleToggle(currentQuestion.id, letter) : handleSingleSelect(currentQuestion.id, letter)}
                        className={`w-full text-left p-3.5 text-xs rounded-xl border transition-all flex items-center justify-between outline-none ${optionStyle}`}
                        id={`opt-${letter}-btn`}
                      >
                        <span>{opt}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isCommitted
                            ? isOptCorrect
                              ? "border-success bg-success text-success-foreground"
                              : isSelected
                                ? "border-destructive bg-destructive text-destructive-foreground"
                                : "border-border/40 bg-muted/40"
                            : isSelected
                              ? isMultipleChoice
                                ? "border-accent bg-accent text-accent-foreground"
                                : "border-primary bg-primary text-primary-foreground"
                              : "border-border/80 bg-background"
                        }`}>
                          {isCommitted ? (
                            isOptCorrect ? (
                              <span className="text-[10px] font-bold text-white leading-none">✓</span>
                            ) : isSelected ? (
                              <span className="text-[10px] font-bold text-white leading-none">✗</span>
                            ) : null
                          ) : (
                            isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  });
                })()}
              </div>

              {/* Actions for multiple choice check */}
              {isMultipleChoice && !committedMultipleAnswers[currentQuestion.id] && (
                <button
                  onClick={() => setCommittedMultipleAnswers(prev => ({ ...prev, [currentQuestion.id]: true }))}
                  disabled={(selectedMultipleAnswers[currentQuestion.id] || []).length === 0}
                  className="mt-2 px-5 py-2.5 bg-accent text-accent-foreground text-xs font-bold rounded-xl hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none self-start border border-accent/20 shadow-sm transition-all hover:scale-[1.01]"
                >
                  Check Multiple Choice Answer
                </button>
              )}

              {/* Technical Explanation shown immediately upon answering */}
              {(() => {
                const isSingleCommitted = !isMultipleChoice && !!selectedSingleAnswers[currentQuestion.id];
                const isMultipleCommitted = isMultipleChoice && !!committedMultipleAnswers[currentQuestion.id];
                const isCommitted = isSingleCommitted || isMultipleCommitted;

                return isCommitted && (
                  <div className="p-4 bg-secondary/45 border border-border/40 rounded-xl flex flex-col gap-1.5 text-xs leading-relaxed mt-2">
                    <span className="font-bold text-primary uppercase tracking-wider text-[9px]">
                      Technical Explanation:
                    </span>
                    <p className="text-foreground/80">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Navigators inside Question View */}
            <div className="flex items-center justify-between mt-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((p) => p - 1)}
                className="inline-flex items-center gap-1 px-4 py-2.5 text-xs font-bold text-muted-foreground hover:text-foreground bg-secondary/55 hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none rounded-xl border border-border/50 transition-all"
                id="prev-btn"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              {currentIdx === totalQuestions - 1 ? (
                <button
                  onClick={handleExamSubmit}
                  className="inline-flex items-center gap-1 px-6 py-2.5 text-xs font-extrabold text-success-foreground bg-success hover:bg-success/95 rounded-xl shadow-md shadow-success/10 border border-success/30 transition-all hover:scale-[1.01]"
                  id="submit-exam-btn"
                >
                  <span>Submit Exam</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx((p) => p + 1)}
                  className="inline-flex items-center gap-1 px-5 py-2.5 text-xs font-bold text-foreground bg-secondary/55 hover:bg-secondary border border-border/50 rounded-xl transition-all"
                  id="next-btn"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Panel: Timer, Progress & Question Grid (Right Column, Width 1/3) */}
          <div className="flex flex-col gap-6">
            {/* Ticking Timer Card */}
            <Timer 
              initialSeconds={initialTime} 
              isActive={!isSubmitted && examStarted} 
              onTimeUp={handleExamSubmit} 
            />

            {/* Answered Progress bar */}
            <div className="glass-panel p-5 border border-border/40">
              <ProgressBar current={answeredCount} total={totalQuestions} />
            </div>

            {/* 1-25 Question Grid Navigator */}
            <div className="glass-panel p-5 border border-border/40 flex flex-col gap-3">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Question Navigator
              </span>
              <div className="grid grid-cols-5 gap-2 mt-1">
                {allQuestions.map((_, idx) => {
                  const isAnswered = getQuestionStatus(idx);
                  const isActive = idx === currentIdx;

                  let btnStyle = "border-border/60 bg-muted/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground";
                  if (isActive) {
                    btnStyle = "border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/20";
                  } else if (isAnswered) {
                    btnStyle = "border-muted-foreground/35 bg-muted-foreground/10 text-foreground font-semibold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIdx(idx)}
                      className={`aspect-square text-xs rounded-lg border transition-all flex items-center justify-center font-mono ${btnStyle}`}
                      id={`nav-btn-${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fast Submit Alert Panel */}
            <div className="glass-panel p-4 border border-border/40 bg-secondary/20 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p>
                Ensure you verify all answers using the Question Navigator grid. Unanswered items receive 0 points.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
