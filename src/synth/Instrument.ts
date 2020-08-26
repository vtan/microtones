export interface Instrument {
  synth: Synth,
  lowPassFilter: Filter,
  reverb: Reverb
}

export type InstrumentChange = {
  [K in keyof Instrument]?: Partial<Instrument[K]>
}

export function updateInstrument(instrument: Instrument, change: InstrumentChange): Instrument {
  const synth = change.synth ? { ...instrument.synth, ...change.synth } : instrument.synth
  const lowPassFilter = change.lowPassFilter ? { ...instrument.lowPassFilter, ...change.lowPassFilter } : instrument.lowPassFilter
  const reverb = change.reverb ? { ...instrument.reverb, ...change.reverb } : instrument.reverb
  return { synth, lowPassFilter, reverb }
}

export interface Synth {
  volume: number,
  waveform: Waveform
  attack: number,
  decay: number,
  sustain: number,
  release: number
}

export interface Filter {
  frequency: number
}

export interface Reverb {
  wet: number,
  decay: number
}

export type Waveform =
  "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const allWaveforms: ReadonlyArray<Waveform> =
  ["triangle", "sawtooth", "square", "sine", "sine3"]
