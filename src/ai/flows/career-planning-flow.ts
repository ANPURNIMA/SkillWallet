'use server';
/**
 * @fileOverview An AI agent that provides personalized career path recommendations and upskilling opportunities.
 *
 * - careerPlanning - A function that handles the career planning process.
 * - CareerPlanningInput - The input type for the careerPlanning function.
 * - CareerPlanningOutput - The return type for the careerPlanning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerPlanningInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of the user\'s current skills.'),
  careerGoals: z
    .string()
    .describe('A description of the user\'s career aspirations and goals.'),
});
export type CareerPlanningInput = z.infer<typeof CareerPlanningInputSchema>;

const CareerPlanningOutputSchema = z.object({
  careerPaths: z
    .array(
      z.object({
        title: z.string().describe('The title of the recommended career path.'),
        description:
          z.string().describe('A detailed description of the career path, including typical responsibilities and growth opportunities.'),
      })
    )
    .describe('A list of personalized career path recommendations.'),
  upskillingOpportunities: z
    .array(
      z.object({
        skill: z
          .string()
          .describe('The name of the skill to be acquired or improved.'),
        description: z
          .string()
          .describe(
            'A description of why this skill is relevant for the recommended career paths and how to acquire or improve it (e.g., courses, certifications, projects).'
          ),
      })
    )
    .describe('A list of relevant upskilling opportunities.'),
});
export type CareerPlanningOutput = z.infer<typeof CareerPlanningOutputSchema>;

export async function careerPlanning(
  input: CareerPlanningInput
): Promise<CareerPlanningOutput> {
  return careerPlanningFlow(input);
}

const careerPlanningPrompt = ai.definePrompt({
  name: 'careerPlanningPrompt',
  input: {schema: CareerPlanningInputSchema},
  output: {schema: CareerPlanningOutputSchema},
  prompt: `You are an expert career advisor. Your task is to provide personalized career path recommendations and relevant upskilling opportunities based on the user's current skills and career goals.

### User Information:
Skills: {{{skills}}}
Career Goals: {{{careerGoals}}}

Based on the provided information, generate detailed career path recommendations and specific upskilling opportunities. Ensure the output strictly adheres to the JSON schema provided.

Consider the user's existing skills and how they can be leveraged or built upon to achieve their stated career goals. For each upskilling opportunity, explain its relevance and suggest actionable steps to acquire or improve it.`,
});

const careerPlanningFlow = ai.defineFlow(
  {
    name: 'careerPlanningFlow',
    inputSchema: CareerPlanningInputSchema,
    outputSchema: CareerPlanningOutputSchema,
  },
  async input => {
    const {output} = await careerPlanningPrompt(input);
    return output!;
  }
);
