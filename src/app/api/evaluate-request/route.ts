
import { NextResponse } from 'next/server';
import { evaluateResume } from '@/ai/flows/resume-evaluation-flow';

/**
 * POST /api/evaluate-request
 * Handles resume evaluation by calling the internal Genkit flow.
 * Note: In a production app, this would handle PDF parsing before evaluation.
 */
export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();
    
    if (!resumeText) {
      return NextResponse.json({ error: "Missing resume content" }, { status: 400 });
    }

    // Call internal Genkit flow directly (Node.js backend logic)
    const result = await evaluateResume({ resumeText });

    return NextResponse.json({
      success: true,
      evaluation: result.evaluation,
      skills: result.identifiedSkills,
      atsScore: Math.floor(Math.random() * 20) + 80 // Mock ATS score
    });
  } catch (error) {
    console.error("Evaluation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
