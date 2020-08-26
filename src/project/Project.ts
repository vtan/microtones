import { Accidental } from "../Note"
import { Sequence, emptySequence } from "../sequencer/Sequence"
import { Instrument } from "../synth/Instrument"

export interface Project {
  instrument: Instrument
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  sequence: Sequence
}

export const emptyProject: Project = {
  instrument: {
    synth: {
      volume: -6,
      waveform: "triangle",
      attack: 0.01,
      decay: 0.1,
      sustain: 0.2,
      release: 0.2
    },
    lowPassFilter: { frequency: 12_800 },
    reverb: {
      wet: 0.1,
      decay: 1.5
    }
  },
  numberOfSubdivisions: 12,
  displayedAccidental: "sharp",
  sequence: emptySequence
}
