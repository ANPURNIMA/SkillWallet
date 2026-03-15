'use server';
/**
 * @fileOverview An AI agent for evaluating resumes and suggesting career paths.
 *
 * - evaluateResume - A function that handles the resume evaluation process.
 * - ResumeEvaluationInput - The input type for the evaluateResume function.
 * - ResumeEvaluationOutput - The return type for the evaluateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeEvaluationInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The plain text content of the user\'s resume.'),
});
export type ResumeEvaluationInput = z.infer<typeof ResumeEvaluationInputSchema>;

const ResumeEvaluationOutputSchema = z.object({
  evaluation: z.object({
    contentFeedback: z
      .string()
      .describe('Detailed feedback on the resume content.'),
    structureFeedback: z
      .string()
      .describe('Detailed feedback on the resume structure and formatting.'),
    keywordOptimizationFeedback: z
      .string()
      .describe('Feedback on keyword optimization relevant to job markets.'),
  }),
  identifiedSkills: z
    .array(z.string())
    .describe('A list of key skills identified from the resume.'),
  careerPaths: z
    .array(z.string())
    .describe('A list of potential career paths suggested based on identified skills.'),
});
export type ResumeEvaluationOutput = z.infer<typeof ResumeEvaluationOutputSchema>;

export async function evaluateResume(
  input: ResumeEvaluationInput
): Promise<ResumeEvaluationOutput> {
  return resumeEvaluationFlow(input);
}

const resumeEvaluationPrompt = ai.definePrompt({
  name: 'resumeEvaluationPrompt',
  input: {schema: ResumeEvaluationInputSchema},
  output: {schema: ResumeEvaluationOutputSchema},
  prompt: `You are VidyaMitra, an expert AI-powered career agent and resume evaluator.
Your task is to analyze the provided resume text and offer comprehensive feedback, identify key skills, and suggest potential career paths.

Provide feedback on the resume's content, structure, and keyword optimization. Identify all prominent skills and suggest relevant career paths based on those skills.

Resume Text:
{{resumeText}}`,
});

const resumeEvaluationFlow = ai.defineFlow(
  {
    name: 'resumeEvaluationFlow',
    inputSchema: ResumeEvaluationInputSchema,
    outputSchema: ResumeEvaluationOutputSchema,
  },
  async input => {
    const {output} = await resumeEvaluationPrompt(input);
    return output!;
  }
);
