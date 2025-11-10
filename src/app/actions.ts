'use server';

import { suggestCodeSnippetTemplate } from '@/ai/flows/suggest-code-snippet-template';

export async function getTemplateSuggestion(prevState: any, formData: FormData) {
  const description = formData.get('description') as string;
  if (!description) {
    return { suggestion: '', error: 'Vui lòng cung cấp mô tả.' };
  }

  try {
    const result = await suggestCodeSnippetTemplate({ description });
    return { suggestion: result.templateSuggestion, error: null };
  } catch (error) {
    console.error(error);
    return { suggestion: '', error: 'Không thể lấy gợi ý từ AI. Vui lòng thử lại.' };
  }
}
