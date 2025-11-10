'use server';

/**
 * @fileOverview This file defines a Genkit flow that suggests the most relevant code snippet templates
 * based on a description of the coding task.
 *
 * - suggestCodeSnippetTemplate -  A function that takes a description of a coding task and returns
 *   a suggestion of the most relevant code snippet templates.
 * - SuggestCodeSnippetTemplateInput - The input type for the suggestCodeSnippetTemplate function.
 * - SuggestCodeSnippetTemplateOutput - The output type for the suggestCodeSnippetTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCodeSnippetTemplateInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the coding task for which a code snippet template is desired.'
    ),
});
export type SuggestCodeSnippetTemplateInput = z.infer<
  typeof SuggestCodeSnippetTemplateInputSchema
>;

const SuggestCodeSnippetTemplateOutputSchema = z.object({
  templateSuggestion: z
    .string()
    .describe(
      'The suggested code snippet template that is most relevant to the provided coding task description.'
    ),
});
export type SuggestCodeSnippetTemplateOutput = z.infer<
  typeof SuggestCodeSnippetTemplateOutputSchema
>;

export async function suggestCodeSnippetTemplate(
  input: SuggestCodeSnippetTemplateInput
): Promise<SuggestCodeSnippetTemplateOutput> {
  return suggestCodeSnippetTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCodeSnippetTemplatePrompt',
  input: {schema: SuggestCodeSnippetTemplateInputSchema},
  output: {schema: SuggestCodeSnippetTemplateOutputSchema},
  prompt: `You are an AI assistant that suggests the most relevant code snippet template based on the user's description of their coding task. Respond with the name of the suggested template.

Task description: {{{description}}}`,
});

const suggestCodeSnippetTemplateFlow = ai.defineFlow(
  {
    name: 'suggestCodeSnippetTemplateFlow',
    inputSchema: SuggestCodeSnippetTemplateInputSchema,
    outputSchema: SuggestCodeSnippetTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
