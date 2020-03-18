import { PolySynth } from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { tonesToPitches } from "./Pitch"
import { equalOctaveSubdivisions, Tone } from "./Tone"

export interface AppState {
  synth: PolySynth,
  numberOfSubdivisions: number,
  tones: ReadonlyArray<Tone>,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>,
  pressedToneMultipliers: ReadonlyArray<number>
}

const synth = new PolySynth().toMaster()

function initializeState(numberOfSubdivisions: number): AppState {
  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const pitches = tonesToPitches(261.6256, 2, tones)
  const keys = keyboardFromPitches(pitches)
  return {
    synth,
    numberOfSubdivisions,
    tones,
    keys,
    pressedKeyIndices: [],
    pressedToneMultipliers: []
  }
}

export const initialAppState: AppState = initializeState(12)

export type AppAction =
  { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
  | { type: "triggerNoteOn", keyIndex: number }
  | { type: "triggerNoteOff", keyIndex: number }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "setNumberOfSubdivisions":
      // TODO release all synth keys
      return initializeState(action.numberOfSubdivisions)

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
