export function grayscaleColor(intensity: number): string {
  return `hsl(0, 0%, ${(100 * intensity).toFixed(0)}%)`
}