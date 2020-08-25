import { Accidental } from "../Note"
import { Sequence, emptySequence } from "../sequencer/Sequence"
import { Synth } from "../synth/Synth"

export interface Project {
  synth: Synth
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  sequence: Sequence
}

export const emptyProject: Project = {
  synth: {
    volume: -6,
    waveform: "triangle",
    amplitudeAttack: 0.01,
    amplitudeDecay: 0.1,
    amplitudeSustain: 0.2,
    amplitudeRelease: 0.2
  },
  numberOfSubdivisions: 12,
  displayedAccidental: "sharp",
  sequence: emptySequence
}
