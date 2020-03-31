export function grayscaleColor(intensity: number): string {
  return `hsl(0, 0%, ${(100 * intensity).toFixed(0)}%)`
}

export const selectionColor = "#ffeb99"
export const playbackColor = "#dce8b1"

export function updateAt<T>(index: number, f: (_: T) => T, array: ReadonlyArray<T>): ReadonlyArray<T> {
  return array.map((e, i) => i === index ? f(e) : e)
}
