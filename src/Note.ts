export interface Note {
  rootMultiplier: number,
  cents: number,
  nearest12EdoNote: number,
  diffFromNearest12EdoNote: number,
  nearestTo12EdoNote?: number
}

export type Accidental = "flat" | "sharp"

function noteFromSubdivision(subdivision: number): Note {
  const rootMultiplier = Math.pow(2, subdivision)
  const cents = 1200 * subdivision
  let nearest12EdoNote = Math.round(cents / 100)
  const diffFromNearest12EdoNote = cents - 100 * nearest12EdoNote
  if (nearest12EdoNote === 12) {
    nearest12EdoNote = 0
  }

  return { rootMultiplier, cents, nearest12EdoNote, diffFromNearest12EdoNote }
}

export function equalOctaveSubdivisions(numberOfSubdivisions: number): ReadonlyArray<Note> {
  const notes: Array<Note> = []
  for (let i = 0; i < numberOfSubdivisions; ++i) {
    const note = noteFromSubdivision(i / numberOfSubdivisions)
    notes.push(note)
  }
  for (let i = 0; i < 12; ++i) {
    let nearestIndex: number | undefined
    notes.forEach((note, j) => {
      if (note.nearest12EdoNote === i) {
        if (
          nearestIndex === undefined ||
          Math.abs(notes[nearestIndex].diffFromNearest12EdoNote) > Math.abs(note.diffFromNearest12EdoNote)
        ) {
          nearestIndex = j
        }
      }
    })
    if (nearestIndex !== undefined) {
      notes[nearestIndex].nearestTo12EdoNote = i
    }
  }
  return notes
}

export function noteColor(note: Note, startFromWhite: boolean): number {
  const gamma = 1 / 2.2
  let x = Math.abs(note.diffFromNearest12EdoNote) / 100
  if (startFromWhite) {
    x = 1 - x
  }
  return Math.pow(x, gamma)
}

export function diffText({ diffFromNearest12EdoNote }: Note): string {
  if (diffFromNearest12EdoNote === 0) {
    return ""
  } else if (diffFromNearest12EdoNote < 0) {
    return `− ${Math.abs(diffFromNearest12EdoNote).toFixed(0)}¢`
  } else {
    return `+ ${diffFromNearest12EdoNote.toFixed(0)}¢`
  }
}

export const notesIn12Edo: Record<Accidental, ReadonlyArray<string>> = {
  sharp: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  flat: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]
}
