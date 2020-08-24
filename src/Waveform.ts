import * as Tone from "tone"

export type Waveform =
  "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const allWaveforms: ReadonlyArray<Waveform> =
  ["triangle", "sawtooth", "square", "sine", "sine3"]

export function waveformToSynth(waveform: Waveform): Tone.PolySynth {
  return new Tone.PolySynth(Tone.Synth, {
    volume: -6,
    oscillator: { type: waveform },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      release: 1,
      sustain: 0.2,
    }
  }).toDestination()
}
