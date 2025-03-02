export default function randomString(length: number) {
  const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';

  return new Array(length)
    .fill(0)
    .map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
    .join('');
}
