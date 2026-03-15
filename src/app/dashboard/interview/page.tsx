"use client";

import { useState } from "react";
import { mockInterview, MockInterviewOutput } from "@/ai/flows/mock-interview-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, Loader2, Play, MessageSquare, Award, SkipForward } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MockInterviewTool() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeContent, setResumeContent] = useState("");
  const [userResponse, setUserResponse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about yourself and your background.");
  const [history, setHistory] = useState<{q: string, a: string, f: string, s: number}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) return;
    setIsLoading(true);
    try {
      const result = await mockInterview({
        jobDescription,
        userResumeContent: resumeContent,
        userResponse,
        currentQuestion
      });
      
      setHistory([{ q: currentQuestion, a: userResponse, f: result.feedback, s: result.score }, ...history]);
      setCurrentQuestion(result.nextQuestion);
      setUserResponse("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-fit mx-auto p-4 rounded-3xl">
            <Mic className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-bold text-primary">Mock Interview Simulator</h1>
          <p className="text-muted-foreground text-lg">Practice with our AI interviewer to master your next big opportunity.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interview Context</CardTitle>
            <CardDescription>Tell us about the role and your background to personalize the simulation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Job Description / Title</label>
              <Input 
                placeholder="e.g. Senior Frontend Developer at Tech Corp..." 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Your Brief Resume Context</label>
              <Textarea 
                placeholder="Mention key projects, skills, and experience relevant to this role..."
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
              />
            </div>
            <Button 
              className="w-full h-12 rounded-full" 
              onClick={() => setIsStarted(true)}
              disabled={!jobDescription.trim() || !resumeContent.trim()}
            >
              Start Session <Play className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-primary shadow-lg overflow-hidden">
          <div className="bg-primary px-6 py-3 flex items-center justify-between">
            <Badge variant="outline" className="text-primary-foreground border-white/20 bg-white/10 uppercase tracking-widest text-[10px]">Active Session</Badge>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => setIsStarted(false)}>End Session</Button>
          </div>
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-xl font-headline flex gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Interviewer:
            </CardTitle>
            <p className="text-lg font-medium leading-relaxed italic text-primary/80">"{currentQuestion}"</p>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Textarea 
              placeholder="Type your response here..."
              className="min-h-[200px] text-lg leading-relaxed focus:ring-primary"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" disabled={isLoading}>Skip Question</Button>
              <Button 
                onClick={handleSubmitResponse} 
                disabled={isLoading || !userResponse.trim()}
                className="rounded-full px-8"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <SkipForward className="h-4 w-4 mr-2" />}
                Submit Answer
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-headline font-bold text-xl px-2">Session Transcript</h3>
          {history.map((entry, idx) => (
            <Card key={idx} className="bg-muted/30">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Question {history.length - idx}</p>
                    <p className="font-medium text-sm">{entry.q}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Score</p>
                    <p className="text-lg font-bold text-primary">{entry.s}/100</p>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg text-sm italic border">
                  "{entry.a}"
                </div>
                <div className="flex gap-2">
                  <Award className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">{entry.f}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <h4 className="text-5xl font-headline font-bold text-primary">
                {history.length > 0 
                  ? Math.round(history.reduce((acc, curr) => acc + curr.s, 0) / history.length) 
                  : 0}
              </h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-2">Overall Avg Score</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>RELEVANCE</span>
                <span>{history.length > 0 ? "82%" : "0%"}</span>
              </div>
              <Progress value={history.length > 0 ? 82 : 0} className="h-1.5" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>CONFIDENCE</span>
                <span>{history.length > 0 ? "75%" : "0%"}</span>
              </div>
              <Progress value={history.length > 0 ? 75 : 0} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest">Job Fit Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{jobDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-[10px]">High Compatibility</Badge>
              <Badge variant="secondary" className="text-[10px]">Skills Match 85%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
