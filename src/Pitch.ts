import { Tone } from "./Tone"

export interface Pitch {
  frequency: number,
  tone: Tone
}

export function tonesToPitches(
  lowestFrequency: number,
  octaves: number,
  tones: ReadonlyArray<Tone>
): ReadonlyArray<Pitch> {
  const result: Array<Pitch> = []
  for (let octave = 0; octave < octaves; ++octave) {
    const rootFrequency = lowestFrequency * Math.pow(2, octave - 1)
    result.push(...tones.map(tone => toneToPitch(rootFrequency, tone)))
  }
  return result
}

function toneToPitch(rootFrequency: number, tone: Tone): Pitch {
  return {
    frequency: rootFrequency * tone.rootMultiplier,
    tone
  }
}
