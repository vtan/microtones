import { Accidental } from "../Note"
import { Sequence, emptySequence } from "../sequencer/Sequence"
import { Waveform } from "../synth/Waveform"

export interface Project {
  waveform: Waveform,
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  sequence: Sequence
}

export const emptyProject: Project = {
  waveform: "triangle",
  numberOfSubdivisions: 12,
  displayedAccidental: "sharp",
  sequence: emptySequence
}
