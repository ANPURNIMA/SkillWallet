"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, FileText, Mic, Target, TrendingUp, History, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Skills Identified", value: "24", icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Resumes Evaluated", value: "8", icon: FileText, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Mock Interviews", value: "12", icon: Mic, color: "text-green-500", bg: "bg-green-50" },
    { label: "Career Path Fit", value: "88%", icon: Target, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Candidate Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your career progress at a glance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full">Download Report</Button>
          <Button className="rounded-full shadow-md">Start New Assessment</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge variant="outline" className="text-[10px] text-green-600 border-green-200 bg-green-50">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12%
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Actions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md bg-gradient-to-br from-primary to-primary/80 text-white">
            <CardContent className="p-8">
              <div className="max-w-md space-y-4">
                <h2 className="text-2xl font-headline font-bold">Ready for your next move?</h2>
                <p className="text-primary-foreground/90">Our AI has analyzed your recent mock interview and suggests 3 new upskilling courses to boost your employability score.</p>
                <Button variant="secondary" size="lg" className="rounded-full text-primary font-bold">
                  View Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Skill Wallet
                  <Link href="/dashboard/wallet" className="text-muted-foreground group-hover:text-primary">
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </CardTitle>
                <CardDescription>Verified badges and certifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Google Cloud Prof', 'Next.js Advanced', 'React Hooks Master'].map(skill => (
                  <div key={skill} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-sm">
                    <span className="font-medium">{skill}</span>
                    <Badge className="bg-green-500/10 text-green-600 border-green-200">Verified</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Activity Feed
                  <History className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>Recent tool interactions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { act: 'Mock Interview (Backend)', date: '2h ago' },
                  { act: 'Resume Eval v3.2', date: 'Yesterday' },
                  { act: 'Career Path Mapping', date: '3 days ago' }
                ].map(item => (
                  <div key={item.act} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.act}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">{item.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Token Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-muted border border-dashed border-muted-foreground/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Monthly AI Quota</span>
                  <span className="text-sm font-bold">12 / 50</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[24%]" />
                </div>
              </div>
              <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-widest">
                Buy More Credits
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">
                "Based on your profile, you're currently in the top 15% of candidates for Full Stack roles. Upload your latest certification to boost this further!"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
