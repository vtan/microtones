import { AppState, notesPitchesKeysForTuning, keyboardOctavesForTuning } from "./AppState"
import { keyboardFromPitches } from "./Key"
import { Accidental } from "./Note"
import { Panel } from "./Panel"
import { exportToHash } from "./ProjectExporter"
import { emptySequence, SequenceIndex, setInSequence, sequenceToEvents, Step, resizeSequenceSteps } from "./Sequence"
import { restartSequencerPlayback, startSequencerPlayback, stopSequencerPlayback } from "./SequencerPlayback"
import { Waveform } from "./Waveform"

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
  | { type: "shareProject" }

export type AppDispatch = (_: AppAction) => void

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "openPanel":
      return { ...state, openPanel: action.panel }

    case "setNumberOfSubdivisions": {
      const keyboardOffset = 4 * action.numberOfSubdivisions
      stopSequencerPlayback(state)
      return {
        ...state,
        numberOfSubdivisions: action.numberOfSubdivisions,
        ...notesPitchesKeysForTuning(action.numberOfSubdivisions, keyboardOffset),
        keyboardOffset,
        sequence: emptySequence,
        sequencerPlayback: undefined,
        shareUrl: ""
      }
    }

    case "setDisplayedAccidental":
      return { ...state, displayedAccidental: action.displayedAccidental, shareUrl: "" }

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
        return { ...state, waveform, shareUrl: "" }
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
      const sequencerPlayback = restartSequencerPlayback(newState)
      return { ...newState, sequencerPlayback, shareUrl: "" }
    }

    case "setSequenceTempo":
      if (action.secondsPerStep > 0) {
        const sequence = { ...state.sequence, secondsPerStep: action.secondsPerStep }
        const newState = { ...state, sequence }
        const sequencerPlayback = restartSequencerPlayback(newState)
        return { ...newState, sequencerPlayback, shareUrl: "" }
      } else {
        return state
      }

    case "toggleSequencerPlaying": {
      if (state.sequencerPlayback === undefined) {
        const onPlaybackStep = (stepIndex: number) =>
          action.dispatch({ type: "setSequencerPlaybackStepIndex", stepIndex })
        const sequencerPlayback = startSequencerPlayback(state, onPlaybackStep)
        return { ...state, sequencerPlayback }
      } else {
        stopSequencerPlayback(state)
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

    case "shareProject": {
      let shareUrl
      try {
        const hash = exportToHash(state)
        const url = new URL(window.location.href)
        url.hash = hash
        shareUrl = url.toString()
      } catch (e) {
        console.warn(`Failed to export project to URL: ${e}`)
      }
      return shareUrl === undefined ? state : { ...state, shareUrl }
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
    return { ...state, sequence, shareUrl: "" }
  }
}
