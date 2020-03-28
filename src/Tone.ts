export interface Tone {
  rootMultiplier: number,
  cents: number,
  nearest12TetTone: number,
  diffFromNearest12TetTone: number,
  nearestTo12TetTone?: number
}

function toneFromSubdivision(subdivision: number): Tone {
  const rootMultiplier = Math.pow(2, subdivision)
  const cents = 1200 * subdivision
  let nearest12TetTone = Math.round(cents / 100)
  const diffFromNearest12TetTone = cents - 100 * nearest12TetTone
  if (nearest12TetTone === 12) {
    nearest12TetTone = 0
  }

  return { rootMultiplier, cents, nearest12TetTone, diffFromNearest12TetTone }
}

export function equalOctaveSubdivisions(numberOfSubdivisions: number): ReadonlyArray<Tone> {
  const tones: Array<Tone> = []
  for (let i = 0; i < numberOfSubdivisions; ++i) {
    const tone = toneFromSubdivision(i / numberOfSubdivisions)
    tones.push(tone)
  }
  for (let i = 0; i < 12; ++i) {
    let nearestIndex: number | undefined
    tones.forEach((tone, j) => {
      if (tone.nearest12TetTone === i) {
        if (
          nearestIndex === undefined ||
          Math.abs(tones[nearestIndex].diffFromNearest12TetTone) > Math.abs(tone.diffFromNearest12TetTone)
        ) {
          nearestIndex = j
        }
      }
    })
    if (nearestIndex !== undefined) {
      tones[nearestIndex].nearestTo12TetTone = i
    }
  }
  return tones
}

export function toneColor(tone: Tone, startFromWhite: boolean): number {
  const gamma = 1 / 2.2
  let x = Math.abs(tone.diffFromNearest12TetTone) / 100
  if (startFromWhite) {
    x = 1 - x
  }
  return Math.pow(x, gamma)
}

export const notesIn12Edo: ReadonlyArray<string> =
  ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
