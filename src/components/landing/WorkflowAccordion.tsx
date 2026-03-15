"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle } from "lucide-react";

const workflowSteps = [
  { id: 1, title: "Environment Setup", content: "Configuring Python 3.10+, Node.js, and essential project dependencies for full-stack orchestration.", completed: true },
  { id: 2, title: "Backend FastAPI", content: "Developing robust RESTful endpoints with FastAPI for high-performance resume parsing and data handling.", completed: true },
  { id: 3, title: "AI Integration", content: "Leveraging Google Gemini and Genkit for advanced career analysis, mock interviews, and planning logic.", completed: true },
  { id: 4, title: "React.js Frontend", content: "Crafting a professional, responsive UI using React, Tailwind CSS, and sophisticated state management.", completed: true },
  { id: 5, title: "Testing/Deployment", content: "Final QA cycles and cloud deployment with Firebase and App Hosting for global availability.", completed: false },
];

export function WorkflowAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {workflowSteps.map((step) => (
        <AccordionItem key={step.id} value={`item-${step.id}`}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              {step.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <span className="font-medium">{step.id}. {step.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pl-8">
            {step.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
