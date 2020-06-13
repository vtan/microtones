import { Accidental } from "./Note"
import { Sequence, emptySequence } from "./Sequence"
import { Waveform } from "./Waveform"

export interface Project {
  waveform: Waveform,
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  sequences: ReadonlyArray<Sequence>
}

export const emptyProject: Project = {
  waveform: "triangle",
  numberOfSubdivisions: 12,
  displayedAccidental: "sharp",
  sequences: [emptySequence]
}
