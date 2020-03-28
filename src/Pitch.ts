import { Tone } from "./Tone"

export interface Pitch {
  octave: number,
  frequency: number,
  tone: Tone
}

export function tonesToPitches(
  lowestFrequency: number,
  lowestOctave: number,
  octaves: number,
  tones: ReadonlyArray<Tone>
): ReadonlyArray<Pitch> {
  const result: Array<Pitch> = []
  for (let octave = 0; octave < octaves; ++octave) {
    const rootFrequency = lowestFrequency * Math.pow(2, octave - 1)
    result.push(...tones.map(tone =>
      ({
        octave:  lowestOctave + octave,
        frequency: rootFrequency * tone.rootMultiplier,
        tone
      })
    ))
  }
  return result
}
