import { Note } from "./Note"

export interface Pitch {
  octave: number,
  frequency: number,
  note: Note
}

export function notesToPitches(
  lowestFrequency: number,
  lowestOctave: number,
  octaves: number,
  notes: ReadonlyArray<Note>
): ReadonlyArray<Pitch> {
  const result: Array<Pitch> = []
  for (let octave = 0; octave < octaves; ++octave) {
    const rootFrequency = lowestFrequency * Math.pow(2, octave - 1)
    result.push(...notes.map(note =>
      ({
        octave:  lowestOctave + octave,
        frequency: rootFrequency * note.rootMultiplier,
        note
      })
    ))
  }
  return result
}
