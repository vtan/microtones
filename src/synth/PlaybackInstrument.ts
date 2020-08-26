import * as Tone from "tone"

import { Instrument, Synth, Filter, Reverb } from "./Instrument"

export class PlaybackInstrument {
  readonly synth: Tone.PolySynth
  readonly lowPassFilter: Tone.Filter
  readonly reverb: Tone.Reverb
  instrument: Instrument

  constructor(instrument: Instrument) {
    this.instrument = instrument
    const { synth, lowPassFilter, reverb } = instrument
    this.reverb = new Tone.Reverb(reverbOptions(reverb)).toDestination()
    this.lowPassFilter = new Tone.Filter(lowPassFilterOptions(lowPassFilter)).connect(this.reverb)
    this.synth = new Tone.PolySynth(Tone.Synth, synthOptions(synth)).connect(this.lowPassFilter)
  }

  free(): void {
    this.synth.releaseAll()
    this.synth.disconnect()
    this.lowPassFilter.disconnect()
    this.reverb.disconnect()
  }

  set(instrument: Instrument): void {
    if (instrument.synth !== this.instrument.synth) {
      this.synth.set(synthOptions(instrument.synth))
    }
    if (instrument.lowPassFilter !== this.instrument.lowPassFilter) {
      this.lowPassFilter.set(lowPassFilterOptions(instrument.lowPassFilter))
    }
    if (instrument.reverb !== this.instrument.reverb) {
      this.reverb.set(reverbOptions(instrument.reverb))
    }
    this.instrument = instrument
  }
}

function synthOptions(synth: Synth): Tone.PolySynthOptions<Tone.Synth>["options"] {
  const { volume, waveform } = synth
  return {
    volume,
    oscillator: { type: waveform },
    envelope: {
      attack: synth.attack,
      decay: synth.decay,
      sustain: synth.sustain,
      release: synth.release
    }
  }
}

function lowPassFilterOptions(filter: Filter): Partial<Tone.FilterOptions> {
  return { ...filter, type: "lowpass" }
}

function reverbOptions(reverb: Reverb) {
  return { ...reverb }
}
