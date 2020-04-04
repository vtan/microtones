import { Part, PolySynth, Synth, Transport } from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { tonesToPitches, Pitch } from "./Pitch"
import { equalOctaveSubdivisions, Tone } from "./Tone"
import { Sequence, emptySequence, SequenceIndex, setInSequence, sequenceToEvents, Step, StepEvent, sequenceToTimes, resizeSequenceSteps } from "./Sequence"

export type Waveform = "triangle" | "sawtooth" | "square" | "sine" | "sine3"

export const waveforms: ReadonlyArray<Waveform> = ["triangle", "sawtooth", "square", "sine", "sine3"]

export type Panel = "sequencer" | "tuning" | "synth"

const minOctave: number = 0
const maxOctave: number = 8

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
  sequence: Sequence,
  sequencerSelection?: SequenceIndex,
  sequencerPlayback?: SequencerPlaybackState
}

export interface SequencerPlaybackState {
  synth: PolySynth,
  stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>],
  currentStepIndex: number
}

export const initialAppState: AppState = initializeState()

function initializeState(): AppState {
  const numberOfSubdivisions = 12
  const keyboardOffset = 4 * numberOfSubdivisions
  const waveform = "triangle"
  const synth = createSynth(waveform)
  const { tones, pitches, keys } = tonesPitchesKeys(numberOfSubdivisions, keyboardOffset)

  return {
    openPanel: "tuning",
    synth,
    waveform,
    numberOfSubdivisions,
    tones,
    pitches,
    keys,
    keyboardOffset,
    pressedKeyIndices: [],
    sequence: emptySequence
  }
}

function createSynth(waveform: Waveform): PolySynth {
  return new PolySynth(Synth, {
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

function tonesPitchesKeys(numberOfSubdivisions: number, keyboardOffset: number) {
  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  // Hacky: + 2 below so the highest C is also included
  const pitches = tonesToPitches(16.0352, minOctave, maxOctave - minOctave + 2, tones)
  const octaves = keyboardOctavesForTuning(numberOfSubdivisions)
  const keyPitches = pitches.slice(keyboardOffset, keyboardOffset + octaves * numberOfSubdivisions + 1)
  const keys = keyboardFromPitches(keyPitches)
  return { tones, pitches, keys }
}

export type AppAction =
  { type: "openPanel", panel: Panel }
  | { type: "setNumberOfSubdivisions", numberOfSubdivisions: number }
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
        ...tonesPitchesKeys(action.numberOfSubdivisions, keyboardOffset),
        keyboardOffset,
        sequence: emptySequence,
        sequencerPlayback: undefined
      }
    }

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

    case "resizeSequenceSteps":
      if (state.sequencerPlayback !== undefined) {
        stopSequencer(state)
      }
      return {
        ...state,
        sequence: resizeSequenceSteps(action.numberOfSteps, state.sequence),
        sequencerPlayback: undefined
      }

    case "setSequenceTempo":
      if (action.secondsPerStep > 0) {
        if (state.sequencerPlayback !== undefined) {
          stopSequencer(state)
        }
        const sequence = { ...state.sequence, secondsPerStep: action.secondsPerStep }
        return { ...state, sequence, sequencerPlayback: undefined }
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

function startSequencer(state: AppState, dispatch: AppDispatch): SequencerPlaybackState {
  const synth = createSynth(state.waveform)

  const stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>] =
    [sequenceToEvents(state.pitches, state.sequence)]
  const stepTimes = [ ...sequenceToTimes(state.sequence) ]
  const part = new Part(
    (time, { stepIndex }) => {
      for (const event of stepEventsRef[0][stepIndex]) {
        synth.triggerAttackRelease(event.frequency, event.duration, time)
      }
      dispatch({ type: "setSequencerPlaybackStepIndex", stepIndex })
    },
    stepTimes
  )
  const loopLength = state.sequence.secondsPerStep * state.sequence.steps.length
  Transport.cancel()
  Transport.start()
  Transport.setLoopPoints(0, loopLength)
  Transport.loop = true
  part.start(0)

  return { synth, stepEventsRef, currentStepIndex: 0 }
}

function stopSequencer(state: AppState): void {
  Transport.stop()
  Transport.cancel()
  if (state.sequencerPlayback !== undefined) {
    const synth = state.sequencerPlayback.synth
    synth.releaseAll()
    synth.disconnect()
  }
}
