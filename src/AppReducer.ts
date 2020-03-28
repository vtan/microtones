import { PolySynth, Synth } from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { tonesToPitches, Pitch } from "./Pitch"
import { equalOctaveSubdivisions, Tone } from "./Tone"
import { Sequence, emptySequence } from "./Sequence"

export type Waveform = "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const waveforms: ReadonlyArray<Waveform> = ["triangle", "sawtooth", "square", "sine", "sine3"]

export type Panel = "sequencer" | "notes"

export interface AppState {
  openPanel: Panel,
  synth: PolySynth,
  waveform: Waveform,
  numberOfSubdivisions: number,
  tones: ReadonlyArray<Tone>,
  pitches: ReadonlyArray<Pitch>,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>,
  pressedToneMultipliers: ReadonlyArray<number>,
  sequence: Sequence
}

function initializeState(numberOfSubdivisions: number): AppState {
  const waveform = "triangle"
  const synth = createSynth(waveform)
  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const pitches = tonesToPitches(261.6256, 4, 2, tones)
  const keys = keyboardFromPitches(pitches)
  return {
    openPanel: "sequencer",
    synth,
    waveform,
    numberOfSubdivisions,
    tones,
    pitches,
    keys,
    pressedKeyIndices: [],
    pressedToneMultipliers: [],
    sequence: emptySequence
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
  { type: "openPanel", panel: Panel }
  | { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
  | { type: "setWaveform", waveform: AppState["waveform"] }
  | { type: "triggerNoteOn", keyIndex: number }
  | { type: "triggerNoteOff", keyIndex: number }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "openPanel":
      return { ...state, openPanel: action.panel }

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
