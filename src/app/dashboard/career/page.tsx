"use client";

import { useState } from "react";
import { careerPlanning, CareerPlanningOutput } from "@/ai/flows/career-planning-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapIcon, Loader2, Sparkles, Plus, X, GraduationCap, Roadmap, ChevronRight } from "lucide-react";

export default function CareerPlanner() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CareerPlanningOutput | null>(null);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (s: string) => {
    setSkills(skills.filter(x => x !== s));
  };

  const handlePlan = async () => {
    if (!careerGoals.trim() || skills.length === 0) return;
    setIsLoading(true);
    try {
      const output = await careerPlanning({ skills, careerGoals });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <MapIcon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Career Path Planner</h1>
          <p className="text-muted-foreground">Map your future with personalized upskilling roadmaps.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Profile</CardTitle>
              <CardDescription>Current skill bank and aspirations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Skills</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add a skill..." 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button size="icon" onClick={addSkill} variant="outline"><Plus className="h-4 w-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map(s => (
                    <Badge key={s} className="pl-3 pr-1 py-1 gap-1">
                      {s}
                      <button onClick={() => removeSkill(s)} className="hover:text-red-400 p-0.5"><X className="h-3 w-3" /></button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Aspirations</label>
                <textarea 
                  className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="I want to become a Lead Solution Architect in 3 years..."
                  value={careerGoals}
                  onChange={(e) => setCareerGoals(e.target.value)}
                />
              </div>

              <Button 
                className="w-full h-12 rounded-full" 
                onClick={handlePlan}
                disabled={isLoading || !careerGoals.trim() || skills.length === 0}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate My Path
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          {result ? (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <Roadmap className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-headline font-bold">Recommended Paths</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {result.careerPaths.map(path => (
                    <Card key={path.title} className="group hover:border-primary transition-all">
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">{path.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{path.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-headline font-bold">Upskilling Roadmap</h2>
                </div>
                <div className="space-y-4">
                  {result.upskillingOpportunities.map((op, idx) => (
                    <div key={op.skill} className="relative flex gap-6 pb-4">
                      {idx !== result.upskillingOpportunities.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                      )}
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0 z-10 shadow-lg shadow-primary/20">
                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                      </div>
                      <Card className="flex-grow">
                        <CardHeader className="py-4">
                          <CardTitle className="text-md flex items-center justify-between">
                            {op.skill}
                            <Badge variant="outline" className="text-[10px] uppercase">Required</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed">{op.description}</p>
                          <Button variant="link" className="p-0 h-auto mt-4 text-primary text-xs font-bold uppercase tracking-wider">
                            Explore Resources <ChevronRight className="ml-1 h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 border-2 border-dashed rounded-3xl bg-muted/20">
              <div className="bg-background p-6 rounded-full shadow-sm mb-6">
                <Roadmap className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-headline font-bold">Design Your Career Roadmap</h2>
              <p className="text-muted-foreground max-w-sm mt-2">
                Enter your skills and career goals to see how AI can help you navigate your professional journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
