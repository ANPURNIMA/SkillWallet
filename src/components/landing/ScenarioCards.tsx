"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mic, MapIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const scenarios = [
  {
    title: "Resume Evaluation",
    description: "Get instant feedback on resume content, structure, and keywords mapped to specific industry standards.",
    icon: FileText,
    href: "/dashboard/resume",
    imageId: "resume-eval"
  },
  {
    title: "Mock Interview",
    description: "Practice with our AI-driven interview simulator and receive real-time scores on relevance and communication.",
    icon: Mic,
    href: "/dashboard/interview",
    imageId: "interview-sim"
  },
  {
    title: "Career Planner",
    description: "Receive personalized career paths and upskilling opportunities based on your current skill bank.",
    icon: MapIcon,
    href: "/dashboard/career",
    imageId: "career-map"
  }
];

export function ScenarioCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {scenarios.map((scenario) => {
        const img = PlaceHolderImages.find(p => p.id === scenario.imageId);
        return (
          <Card key={scenario.title} className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden">
              {img && (
                <Image
                  src={img.imageUrl}
                  alt={scenario.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={img.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/0" />
            </div>
            <CardHeader>
              <div className="p-2 bg-primary/5 w-fit rounded-lg mb-2">
                <scenario.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline text-xl">{scenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-6 min-h-[4rem]">
                {scenario.description}
              </p>
              <Button asChild className="w-full">
                <Link href={scenario.href}>
                  Try it now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
