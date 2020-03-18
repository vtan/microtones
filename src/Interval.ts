export interface Interval {
  shortName: string,
  longName: string
}

export const intervalsIn12Edo: ReadonlyArray<Interval> = [
  { shortName: "P1", longName: "perfect unison" },
  { shortName: "m2", longName: "minor 2nd" },
  { shortName: "M2", longName: "major 2nd" },
  { shortName: "m3", longName: "minor 3rd" },
  { shortName: "M3", longName: "major 3rd" },
  { shortName: "P4", longName: "perfect 4th" },
  { shortName: "TT", longName: "tritone (augmented 4th / diminished 5th)" },
  { shortName: "P5", longName: "perfect 5th" },
  { shortName: "m6", longName: "minor 6th" },
  { shortName: "M6", longName: "major 6th" },
  { shortName: "m7", longName: "minor 7th" },
  { shortName: "M7", longName: "major 7th" },
  { shortName: "P8", longName: "perfect octave" }
]