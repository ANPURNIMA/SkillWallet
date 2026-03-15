"use client";

import { useState } from "react";
import { evaluateResume, ResumeEvaluationOutput } from "@/ai/flows/resume-evaluation-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ResumeTool() {
  const [resumeText, setResumeText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeEvaluationOutput | null>(null);

  const handleEvaluate = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    try {
      const output = await evaluateResume({ resumeText });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-2xl">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Resume Evaluator</h1>
          <p className="text-muted-foreground">AI-driven analysis for content, structure, and keyword optimization.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Resume Text</CardTitle>
              <CardDescription>Paste your resume content here for deep analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Experience: Software Engineer at... Skills: React, Python..."
                className="min-h-[400px] font-mono text-sm leading-relaxed"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <Button 
                onClick={handleEvaluate} 
                disabled={isLoading || !resumeText.trim()} 
                className="w-full h-12 rounded-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Run Evaluation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {result ? (
            <ScrollArea className="h-[650px] pr-4">
              <div className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Analysis Complete</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    VidyaMitra has identified {result.identifiedSkills.length} core competencies.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" /> Content Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground leading-relaxed">
                    {result.evaluation.contentFeedback}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-md flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" /> Keywords & Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {result.evaluation.keywordOptimizationFeedback}
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-xs font-bold uppercase tracking-wider mb-2">Identified Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.identifiedSkills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-[10px]">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className="text-md">Suggested Career Paths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.careerPaths.map(path => (
                        <li key={path} className="flex items-center gap-2 text-sm bg-white/10 p-2 rounded-md">
                          <Target className="h-4 w-4" /> {path}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-3xl opacity-50">
              <div className="bg-muted p-6 rounded-full mb-4">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-headline font-bold">Waiting for input</h3>
              <p className="text-sm max-w-xs mt-2">Evaluation results will appear here once you process your resume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
