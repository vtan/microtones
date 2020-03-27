import { PolySynth, Synth } from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { tonesToPitches } from "./Pitch"
import { equalOctaveSubdivisions, Tone } from "./Tone"

export type Waveform = "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const waveforms: ReadonlyArray<Waveform> = ["triangle", "sawtooth", "square", "sine", "sine3"]

export interface AppState {
  synth: PolySynth,
  waveform: Waveform,
  numberOfSubdivisions: number,
  tones: ReadonlyArray<Tone>,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>,
  pressedToneMultipliers: ReadonlyArray<number>
}

function initializeState(numberOfSubdivisions: number): AppState {
  const waveform = "triangle"
  const synth = createSynth(waveform)
  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const pitches = tonesToPitches(261.6256, 2, tones)
  const keys = keyboardFromPitches(pitches)
  return {
    synth,
    waveform,
    numberOfSubdivisions,
    tones,
    keys,
    pressedKeyIndices: [],
    pressedToneMultipliers: []
  }
}

function createSynth(waveform: Waveform): PolySynth {
  return new PolySynth(Synth, {
    oscillator: { type: waveform },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      release: 1,
      sustain: 0.2,
    }
  }).toDestination()
}

export const initialAppState: AppState = initializeState(12)

export type AppAction =
  { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
  | { type: "setWaveform", waveform: AppState["waveform"] }
  | { type: "triggerNoteOn", keyIndex: number }
  | { type: "triggerNoteOff", keyIndex: number }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "setNumberOfSubdivisions":
      state.synth.releaseAll()
      return initializeState(action.numberOfSubdivisions)

    case "setWaveform":
      if (action.waveform !== state.waveform) {
        const { waveform } = action
        state.synth.releaseAll()
        state.synth.dispose()
        const synth = createSynth(waveform)
        return { ...state, synth, waveform }
      } else {
        return state
      }

    case "triggerNoteOn": {
      const key = state.keys[action.keyIndex]
      if (key === undefined || state.pressedKeyIndices.indexOf(action.keyIndex) >= 0) {
        return state
      } else {
        state.synth.triggerAttack(key.pitch.frequency)

        const pressedKeyIndices = [ ...state.pressedKeyIndices, action.keyIndex ]
        const pressedToneMultipliers = pressedKeyIndices.map(i => state.keys[i].pitch.tone.rootMultiplier)
        return { ...state, pressedKeyIndices, pressedToneMultipliers }
      }
    }

    case "triggerNoteOff": {
      const key = state.keys[action.keyIndex]
      if (key === undefined || state.pressedKeyIndices.indexOf(action.keyIndex) < 0) {
        return state
      } else {
        state.synth.triggerRelease(key.pitch.frequency)

        const pressedKeyIndices = state.pressedKeyIndices.filter(i => i !== action.keyIndex)
        const pressedToneMultipliers = pressedKeyIndices.map(i => state.keys[i].pitch.tone.rootMultiplier)
        return { ...state, pressedKeyIndices, pressedToneMultipliers }
      }
    }
  }
}
