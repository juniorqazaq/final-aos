import React from "react";
import questionsData from "@/data/questions.json";
import ExamSimulatorClient from "./ExamSimulatorClient";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer?: string;
  answers?: string[];
  explanation: string;
}

interface ExamData {
  single: Question[];
  multiple: Question[];
}

export function generateStaticParams() {
  return [{ variant: "variant1" }, { variant: "variant2" }];
}

export default function ExamPage({ params }: { params: { variant: string } }) {
  const { variant } = params;
  
  // Fetch specific variant data
  const db = questionsData as Record<string, ExamData>;
  const activeExam = db[variant];

  if (!activeExam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 gap-4">
        <h1 className="text-xl font-bold text-foreground">Exam Variant Not Found</h1>
        <p className="text-xs text-muted-foreground">The requested exam pool does not exist.</p>
      </div>
    );
  }

  return <ExamSimulatorClient activeExam={activeExam} variant={variant} />;
}
