export function stripDigits(input: string): string {
  return input.replace(/\D/g, '').replace(/^0+/, '');
}
