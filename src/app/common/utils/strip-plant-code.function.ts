export function stripPlantCode(input: string): string {
  return input.replace(/[AS]/g, '');
}

export function getPlantCode(input: string): string {
  const plantCodeMatch = input.match(/[AS]/);
  return plantCodeMatch ? plantCodeMatch[0] : 'S'; // Default to 'S' if no letter is found
}
