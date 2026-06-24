export function stripLetters(input: string): string {
  return input.replace(/[^A-Za-z]/g, '');
}
