const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+';

export type GeneratePasswordOptions = {
  characters?: number;
  hasNumber?: boolean;
  hasSymbols?: boolean;
};

export default function generatePassword(options: GeneratePasswordOptions = {}) {
  const { characters = 8, hasNumber = false, hasSymbols = false } = options;
  return new Array(characters)
    .fill(0)
    .map(() => {
      const allChars = CHARACTERS + (hasNumber ? NUMBERS : '') + (hasSymbols ? SYMBOLS : '');
      return allChars[Math.floor(Math.random() * allChars.length)];
    })
    .join('');
}
