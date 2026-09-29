export function parseCarIdFromRoute(route: string | null): string | null {
  if (!route) {
    return null;
  }

  const urlSegments = route.split('/');
  const endSegment = urlSegments[urlSegments.length - 1];

  return endSegment.split('?')[0] || null;
}
