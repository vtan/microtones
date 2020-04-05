import * as Tone from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { notesToPitches, Pitch } from "./Pitch"
import { equalOctaveSubdivisions, Note, Accidental } from "./Note"
import { Sequence, emptySequence, SequenceIndex, setInSequence, sequenceToEvents, Step, StepEvent, sequenceToTimes, resizeSequenceSteps } from "./Sequence"

export type Waveform = "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const waveforms: ReadonlyArray<Waveform> = ["triangle", "sawtooth", "square", "sine", "sine3"]

export type Panel = "sequencer" | "tuning" | "synth"

const minOctave: number = 0
const maxOctave: number = 8

export interface AppState {
  openPanel: Panel,
  synth: Tone.PolySynth,
  waveform: Waveform,
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  notes: ReadonlyArray<Note>,
  pitches: ReadonlyArray<Pitch>,
  keys: ReadonlyArray<Key>,
  keyboardOffset: number,
  pressedKeyIndices: ReadonlyArray<number>,
  sequence: Sequence,
  sequencerSelection?: SequenceIndex,
  sequencerPlayback?: SequencerPlaybackState
}

export interface SequencerPlaybackState {
  synth: Tone.PolySynth,
  stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>],
  currentStepIndex: number,
  dispatch: AppDispatch
}

export const initialAppState: AppState = initializeState()

function initializeState(): AppState {
  const numberOfSubdivisions = 12
  const keyboardOffset = 4 * numberOfSubdivisions
  const waveform = "triangle"
  const synth = createSynth(waveform)
  const { notes, pitches, keys } = notesPitchesKeys(numberOfSubdivisions, keyboardOffset)

  return {
    openPanel: "tuning",
    synth,
    waveform,
    numberOfSubdivisions,
    displayedAccidental: "sharp",
    notes,
    pitches,
    keys,
    keyboardOffset,
    pressedKeyIndices: [],
    sequence: emptySequence
  }
}

function createSynth(waveform: Waveform): Tone.PolySynth {
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

function keyboardOctavesForTuning(numberOfSubdivisions: number): number {
  if (numberOfSubdivisions <= 10) {
    return 4
  } else if (numberOfSubdivisions <= 15) {
    return 3
  } else if (numberOfSubdivisions <= 21) {
    return 2
  } else {
    return 1
  }
}

function notesPitchesKeys(numberOfSubdivisions: number, keyboardOffset: number) {
  const notes = equalOctaveSubdivisions(numberOfSubdivisions)
  // Hacky: + 2 below so the highest C is also included
  const pitches = notesToPitches(16.0352, minOctave, maxOctave - minOctave + 2, notes)
  const octaves = keyboardOctavesForTuning(numberOfSubdivisions)
  const keyPitches = pitches.slice(keyboardOffset, keyboardOffset + octaves * numberOfSubdivisions + 1)
  const keys = keyboardFromPitches(keyPitches)
  return { notes, pitches, keys }
}

export type AppAction =
  { type: "openPanel", panel: Panel }
  | { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
  | { type: "setDisplayedAccidental", displayedAccidental: Accidental }
  | { type: "setKeyboardOffset", keyboardOffset: number }
  | { type: "setWaveform", waveform: Waveform }
  | { type: "triggerNoteOn", keyIndex: number }
  | { type: "triggerNoteOff", keyIndex: number }
  | { type: "setSequencerSelection", selection?: SequenceIndex }
  | { type: "moveSequencerSelection", diff: SequenceIndex }
  | { type: "setSelectedStep", step: Step }
  | { type: "resizeSequenceSteps", numberOfSteps: number }
  | { type: "setSequenceTempo", secondsPerStep: number }
  | { type: "toggleSequencerPlaying", dispatch: AppDispatch }
  | { type: "setSequencerPlaybackStepIndex", stepIndex: number }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "openPanel":
      return { ...state, openPanel: action.panel }

    case "setNumberOfSubdivisions": {
      const keyboardOffset = 4 * action.numberOfSubdivisions
      stopSequencer(state)
      return {
        ...state,
        numberOfSubdivisions: action.numberOfSubdivisions,
        ...notesPitchesKeys(action.numberOfSubdivisions, keyboardOffset),
        keyboardOffset,
        sequence: emptySequence,
        sequencerPlayback: undefined
      }
    }

    case "setDisplayedAccidental":
      return { ...state, displayedAccidental: action.displayedAccidental }

    case "setKeyboardOffset": {
      // TODO duplication
      const { pitches, numberOfSubdivisions } = state
      const { keyboardOffset } = action
      const octaves = keyboardOctavesForTuning(numberOfSubdivisions)
      const keyPitches = pitches.slice(keyboardOffset, keyboardOffset + octaves * numberOfSubdivisions + 1)
      const keys = keyboardFromPitches(keyPitches)
      return { ...state, keyboardOffset, keys }
    }

    case "setWaveform":
      if (action.waveform !== state.waveform) {
        const { waveform } = action
        state.synth.set({ oscillator: { type: waveform } })
        if (state.sequencerPlayback !== undefined) {
          state.sequencerPlayback.synth.set({ oscillator: { type: waveform } })
        }
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
        const updateSequence =
          state.openPanel === "sequencer" && state.sequencerSelection !== undefined
            ? (st: AppState) =>
                changeSelectedSequencerStep(st, { type: "pitch", pitchIndex: action.keyIndex + state.keyboardOffset })
            : (st: AppState) => st
        return updateSequence({ ...state, pressedKeyIndices })
      }
    }

    case "triggerNoteOff": {
      const key = state.keys[action.keyIndex]
      if (key === undefined || state.pressedKeyIndices.indexOf(action.keyIndex) < 0) {
        return state
      } else {
        state.synth.triggerRelease(key.pitch.frequency)

        const pressedKeyIndices = state.pressedKeyIndices.filter(i => i !== action.keyIndex)
        return { ...state, pressedKeyIndices }
      }
    }

    case "setSequencerSelection":
      return { ...state, sequencerSelection: action.selection }

    case "moveSequencerSelection":
      if (state.sequencerSelection === undefined) {
        return { ...state, sequencerSelection: { step: 0, track: 0 }}
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
      return changeSelectedSequencerStep(state, action.step)

    case "resizeSequenceSteps": {
      const sequence = resizeSequenceSteps(action.numberOfSteps, state.sequence)
      const newState = { ...state, sequence }
      const sequencerPlayback = restartSequencer(newState)
      return { ...newState, sequencerPlayback }
    }

    case "setSequenceTempo":
      if (action.secondsPerStep > 0) {
        const sequence = { ...state.sequence, secondsPerStep: action.secondsPerStep }
        const newState = { ...state, sequence }
        const sequencerPlayback = restartSequencer(newState)
        return { ...newState, sequencerPlayback}
      } else {
        return state
      }

    case "toggleSequencerPlaying": {
      if (state.sequencerPlayback === undefined) {
        const sequencerPlayback = startSequencer(state, action.dispatch)
        return { ...state, sequencerPlayback }
      } else {
        stopSequencer(state)
        return { ...state, sequencerPlayback: undefined }
      }
    }

    case "setSequencerPlaybackStepIndex":
      if (state.sequencerPlayback === undefined) {
        return state
      } else {
        const sequencerPlayback = { ...state.sequencerPlayback, currentStepIndex: action.stepIndex }
        return { ...state, sequencerPlayback }
      }
  }
}

function changeSelectedSequencerStep(state: AppState, newStep: Step): AppState {
  if (state.sequencerSelection === undefined) {
    return state
  } else {
    const sequence = setInSequence(state.sequencerSelection, newStep, state.sequence)
    if (state.sequencerPlayback !== undefined){
      state.sequencerPlayback.stepEventsRef[0] = sequenceToEvents(state.pitches, sequence)
    }
    return { ...state, sequence }
  }

}

function startSequencer(state: AppState, dispatch: AppDispatch, fromStep: number = 0): SequencerPlaybackState {
  const synth = createSynth(state.waveform)

  const currentStepIndex =
    fromStep >= 0 && fromStep < state.sequence.steps.length ? fromStep : 0
  const stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>] =
    [sequenceToEvents(state.pitches, state.sequence)]
  const stepTimes = [ ...sequenceToTimes(state.sequence) ]
  const part = new Tone.Part(
    (time, { stepIndex }) => {
      for (const event of stepEventsRef[0][stepIndex]) {
        synth.triggerAttackRelease(event.frequency, event.duration, time)
      }
      dispatch({ type: "setSequencerPlaybackStepIndex", stepIndex })
    },
    stepTimes
  )
  const loopLength = state.sequence.secondsPerStep * state.sequence.steps.length
  const startOffset = state.sequence.secondsPerStep * currentStepIndex
  Tone.Transport.cancel()
  Tone.Transport.start()
  part.loopStart = 0
  part.loopEnd = loopLength
  part.loop = true
  part.start(0, startOffset)

  return { synth, stepEventsRef, dispatch, currentStepIndex }
}

function restartSequencer(state: AppState): SequencerPlaybackState | undefined {
  if (state.sequencerPlayback === undefined) {
    return undefined
  } else {
    stopSequencer(state)
    return startSequencer(state, state.sequencerPlayback.dispatch, state.sequencerPlayback.currentStepIndex)
  }
}

function stopSequencer(state: AppState): void {
  Tone.Transport.stop()
  Tone.Transport.cancel()
  if (state.sequencerPlayback !== undefined) {
    const synth = state.sequencerPlayback.synth
    synth.releaseAll()
    synth.disconnect()
  }
}
