import { Part, PolySynth, Synth, Transport } from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { tonesToPitches, Pitch } from "./Pitch"
import { equalOctaveSubdivisions, Tone } from "./Tone"
import { Sequence, emptySequence, SequenceIndex, setInSequence, sequenceToEvents, Step } from "./Sequence"

export type Waveform = "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const waveforms: ReadonlyArray<Waveform> = ["triangle", "sawtooth", "square", "sine", "sine3"]

export type Panel = "sequencer" | "tuning" | "synth"

export interface AppState {
  openPanel: Panel,
  synth: PolySynth,
  waveform: Waveform,
  numberOfSubdivisions: number,
  tones: ReadonlyArray<Tone>,
  pitches: ReadonlyArray<Pitch>,
  keys: ReadonlyArray<Key>,
  keyboardOffset: number,
  pressedKeyIndices: ReadonlyArray<number>,
  pressedToneMultipliers: ReadonlyArray<number>,
  sequence: Sequence,
  sequencerSelection?: SequenceIndex,
  isSequencerPlaying: boolean
}

export const initialAppState: AppState = initializeState()

function initializeState(): AppState {
  const numberOfSubdivisions = 12
  const waveform = "triangle"
  const synth = createSynth(waveform)
  const { tones, pitches, keys } = tonesPitchesKeys(numberOfSubdivisions)

  return {
    openPanel: "tuning",
    synth,
    waveform,
    numberOfSubdivisions,
    tones,
    pitches,
    keys,
    keyboardOffset: 0,
    pressedKeyIndices: [],
    pressedToneMultipliers: [],
    sequence: emptySequence,
    isSequencerPlaying: false
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

function tonesPitchesKeys(numberOfSubdivisions: number) {
  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const pitches = tonesToPitches(261.6256, 4, 3, tones)
  const keys = keyboardFromPitches(pitches)
  return { tones, pitches, keys }
}

export type AppAction =
  { type: "openPanel", panel: Panel }
  | { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
  | { type: "setWaveform", waveform: Waveform }
  | { type: "triggerNoteOn", keyIndex: number }
  | { type: "triggerNoteOff", keyIndex: number }
  | { type: "setSequencerSelection", selection?: SequenceIndex }
  | { type: "moveSequencerSelection", diff: SequenceIndex }
  | { type: "setSelectedStep", step: Step }
  | { type: "toggleSequencerPlaying" }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "openPanel":
      return { ...state, openPanel: action.panel }

    case "setNumberOfSubdivisions":
      stopSequencer(state)
      return {
        ...state,
        numberOfSubdivisions: action.numberOfSubdivisions,
        ...tonesPitchesKeys(action.numberOfSubdivisions),
        sequence: emptySequence,
        isSequencerPlaying: false
      }

    case "setWaveform":
      if (action.waveform !== state.waveform) {
        const { waveform } = action
        state.synth.set({ oscillator: { type: waveform } })
        return { ...state, waveform }
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
        const sequence = state.openPanel === "sequencer" && state.sequencerSelection !== undefined
          ? setInSequence(
              state.sequencerSelection,
              { type: "pitch", pitchIndex: action.keyIndex - state.keyboardOffset },
              state.sequence
            )
          : state.sequence
        return { ...state, pressedKeyIndices, pressedToneMultipliers, sequence }
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

    case "setSequencerSelection":
      return { ...state, sequencerSelection: action.selection }

    case "moveSequencerSelection":
      if (state.sequencerSelection === undefined) {
        return state
      } else {
        const sel = {
          step: state.sequencerSelection.step + action.diff.step,
          track: state.sequencerSelection.track + action.diff.track
        }
        if (
          sel.step >= 0 && sel.step < state.sequence.steps.length &&
          sel.track >= 0 && sel.track < state.sequence.numberOfTracks
        ) {
          return { ...state, sequencerSelection: sel }
        } else {
          return state
        }
      }

    case "setSelectedStep":
      if (state.sequencerSelection === undefined) {
        return state
      } else {
        // TODO update part so the edited sequence is played
        const sequence = setInSequence(state.sequencerSelection, action.step, state.sequence)
        return { ...state, sequence }
      }

    case "toggleSequencerPlaying": {
      const isSequencerPlaying = !state.isSequencerPlaying
      if (isSequencerPlaying) {
        startSequencer(state)
      } else {
        stopSequencer(state)
      }
      return { ...state, isSequencerPlaying }
    }
  }
}

function startSequencer(state: AppState): void {
  const events = [ ...sequenceToEvents(state.pitches, state.sequence) ]
  const part = new Part(
    (time, event) => state.synth.triggerAttackRelease(event.frequency, event.duration, time),
    events
  )
  const loopLength = state.sequence.secondsPerStep * state.sequence.steps.length
  Transport.cancel()
  Transport.start()
  Transport.setLoopPoints(0, loopLength)
  Transport.loop = true
  part.start(0)
}

function stopSequencer(state: AppState): void {
  Transport.stop()
  Transport.cancel()
  state.synth.releaseAll()
}
