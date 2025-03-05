const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+';

export type GeneratePasswordOptions = {
  characters?: number;
  hasNumbers?: boolean;
  hasSymbols?: boolean;
};

export function generatePassword(options: GeneratePasswordOptions = {}) {
  const { characters = 8, hasNumbers = false, hasSymbols = false } = options;

  return new Array(characters)
    .fill(0)
    .map(() => {
      const allChars = CHARACTERS + (hasNumbers ? NUMBERS : '') + (hasSymbols ? SYMBOLS : '');
      return allChars[Math.floor(Math.random() * allChars.length)];
    })
    .join('');
}
