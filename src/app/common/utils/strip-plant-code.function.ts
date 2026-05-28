// Plant code comes from the body code,
// A body code such as "A-1234" may not always have a letter in it,
// if it doesn't, we can assume it's from the St. Louis plant (S) since A.O. Smith always had a letter in their body codes.

export function stripPlantCode(input: string): string {
  return input.replace(/[AS]/g, '');
}

export function getPlantCode(input: string): string {
  const plantCodeMatch = input.match(/[AS]/);
  return plantCodeMatch ? plantCodeMatch[0] : 'S'; // Default to 'S' if no letter is found
}
