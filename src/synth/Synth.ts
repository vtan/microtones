import * as Tone from "tone"

export type Waveform =
  "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const allWaveforms: ReadonlyArray<Waveform> =
  ["triangle", "sawtooth", "square", "sine", "sine3"]

export interface Synth {
  volume: number,
  waveform: Waveform
  amplitudeAttack: number,
  amplitudeDecay: number,
  amplitudeSustain: number,
  amplitudeRelease: number
}

export function playbackSynthOptions(synth: Synth): Tone.PolySynthOptions<Tone.Synth>["options"] {
  const { volume, waveform } = synth
  return {
    volume,
    oscillator: { type: waveform },
    envelope: {
      attack: synth.amplitudeAttack,
      decay: synth.amplitudeDecay,
      sustain: synth.amplitudeSustain,
      release: synth.amplitudeRelease
    },
  }
}

export function createPlaybackSynth(synth: Synth): Tone.PolySynth {
  return new Tone.PolySynth(Tone.Synth, playbackSynthOptions(synth)).toDestination()
}
