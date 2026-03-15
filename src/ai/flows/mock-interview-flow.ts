'use server';
/**
 * @fileOverview An AI agent that conducts mock interviews and provides feedback.
 *
 * - mockInterview - A function that handles a single turn of the mock interview process.
 * - MockInterviewInput - The input type for the mockInterview function.
 * - MockInterviewOutput - The return type for the mockInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MockInterviewInputSchema = z.object({
  jobDescription: z.string().describe("The full job description for the mock interview."),
  userResumeContent: z.string().describe("The textual content of the user's resume. This should contain all relevant information from the resume."),
  userResponse: z.string().describe("The user's spoken or typed response to the current interview question."),
  currentQuestion: z.string().describe("The interview question the user just responded to."),
});
export type MockInterviewInput = z.infer<typeof MockInterviewInputSchema>;

const MockInterviewOutputSchema = z.object({
  feedback: z.string().describe("Detailed feedback on the user's response, covering content relevance, communication style, and specific areas for improvement."),
  score: z.number().int().min(0).max(100).describe("An overall score for the response, out of 100."),
  nextQuestion: z.string().describe("The next logical interview question to ask the user, based on the job description and previous conversation flow."),
});
export type MockInterviewOutput = z.infer<typeof MockInterviewOutputSchema>;

export async function mockInterview(input: MockInterviewInput): Promise<MockInterviewOutput> {
  return mockInterviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mockInterviewPrompt',
  input: {schema: MockInterviewInputSchema},
  output: {schema: MockInterviewOutputSchema},
  prompt: `You are an AI career agent specializing in conducting mock interviews and providing insightful feedback. Your primary goal is to help job seekers improve their interview performance.

You have access to the job description the candidate is interviewing for and their resume.

---
Job Description:
{{{jobDescription}}}

Candidate's Resume Content:
{{{userResumeContent}}}
---

The question you just asked the candidate was:
"{{{currentQuestion}}}"

The candidate's response to this question was:
"{{{userResponse}}}"

Your task is to:
1.  **Evaluate the Candidate's Response**: Provide detailed, constructive feedback on the 'userResponse'. Focus on:
    *   **Content Relevance and Depth**: How well did the response address the question? Was it comprehensive? Did it highlight relevant skills/experiences from the resume in relation to the job description?
    *   **Communication Style**: Comment on clarity, conciseness, structure, and professionalism. (Infer these from the text provided.)
    *   **Areas for Improvement**: Suggest specific, actionable steps the candidate can take to improve this particular response.
2.  **Assign a Score**: Give an overall score for this response out of 100.
3.  **Propose Next Question**: Based on the job description, the candidate's resume, and the current conversation flow, formulate a logical and challenging next interview question.

Please format your response strictly as a JSON object, adhering to the following schema:
{{jsonSchema output}}
`,
});

const mockInterviewFlow = ai.defineFlow(
  {
    name: 'mockInterviewFlow',
    inputSchema: MockInterviewInputSchema,
    outputSchema: MockInterviewOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
