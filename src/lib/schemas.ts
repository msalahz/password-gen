import z from 'zod';
import { generatePassword } from '@/lib/generate-password.ts';
import { MIN_CHARACTERS } from '@/lib/constants.ts';

export const passwordGenerateSearchSchema = z.object({
  password: z.string().default(generatePassword()),
  characters: z.number().default(MIN_CHARACTERS),
  hasNumbers: z.boolean().default(false),
  hasSymbols: z.boolean().default(false),
});
