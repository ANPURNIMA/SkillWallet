"use client";

import { Navigation } from "@/components/Navigation";
import { ScenarioCards } from "@/components/landing/ScenarioCards";
import { WorkflowAccordion } from "@/components/landing/WorkflowAccordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, PlayCircle, ExternalLink, Cpu, Code2, Globe, Database, Server, Zap } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(p => p.id === "hero-main");

  const skills = [
    { label: "API Integration", icon: ExternalLink },
    { label: "AI Agent Design", icon: Cpu },
    { label: "FastAPI", icon: Zap },
    { label: "Python", icon: Database },
    { label: "Node.js", icon: Server },
    { label: "JavaScript", icon: Code2 },
    { label: "React.js", icon: Globe },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <Badge variant="secondary" className="px-3 py-1 font-semibold uppercase tracking-wider">Education</Badge>
                <Badge variant="outline" className="px-3 py-1 font-semibold uppercase tracking-wider">Group Project</Badge>
              </div>
              <h1 className="text-5xl lg:text-6xl font-headline font-bold text-primary leading-tight">
                VidyaMitra: The Intelligent Career Agent
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl font-body leading-relaxed">
                Empowering job seekers with AI-Powered Resume Evaluation, Mock Interview Training, and Data-Driven Career Path Recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 h-14 px-8 text-lg font-semibold">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-semibold">
                  Documentation
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video lg:aspect-square">
              {heroImg && (
                <Image
                  src={heroImg.imageUrl}
                  alt="Career Agent Platform"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint={heroImg.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Platform Description */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h2 className="text-3xl font-headline font-bold">Platform Overview</h2>
              </div>
              <Card className="bg-white/50 backdrop-blur border-none shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    VidyaMitra is a comprehensive, web-based career management ecosystem designed to bridge the gap between education and employment. Built with a modern full-stack architecture—utilizing React.js for a fluid frontend and FastAPI for high-performance AI processing—it provides students and professionals with a centralized "Skill Bank" to track growth.
                  </p>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
                    Our platform integrates sophisticated LLM workflows to parse resumes with high precision, simulate realistic interview environments, and map individual competencies to evolving market demands.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Scenario Cards */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h2 className="text-3xl font-headline font-bold">Core Capabilities</h2>
              </div>
              <ScenarioCards />
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Alpha Completion</span>
                    <span className="text-primary">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="default" className="w-full">
                    <PlayCircle className="mr-2 h-4 w-4" /> Demo
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" /> Repo
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-headline font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Project Workflow</h3>
                  <WorkflowAccordion />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Technical Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-primary">Technical Stack</h4>
              <p className="text-sm text-muted-foreground">Powered by modern industry-standard technologies.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {skills.map((skill) => (
                <Badge 
                  key={skill.label} 
                  variant="outline" 
                  className="bg-background px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-primary/5 cursor-default transition-colors"
                >
                  <skill.icon className="h-3 w-3 text-primary" />
                  {skill.label}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} VidyaMitra Team. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
