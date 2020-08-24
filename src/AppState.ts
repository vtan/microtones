import * as Tone from "tone"

import { Key, keyboardFromPitches } from "./Key"
import { equalOctaveSubdivisions, Note, Accidental } from "./Note"
import { Panel } from "./Panel"
import { notesToPitches, Pitch } from "./Pitch"
import { Project, emptyProject } from "./Project"
import { Sequence, SequenceIndex } from "./Sequence"
import { SequencerPlaybackState } from "./SequencerPlayback"
import { Waveform, waveformToSynth } from "./Waveform"

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
  sequencerPlayback?: SequencerPlaybackState,
  shareUrl: string
}

export function initializeAppState(project: Project | undefined): AppState {
  const openPanel = project === undefined ? "tuning" : "sequencer"

  const { waveform, numberOfSubdivisions,  displayedAccidental, sequence } = project || emptyProject

  const keyboardOffset = 4 * numberOfSubdivisions
  const synth = waveformToSynth(waveform)
  const { notes, pitches, keys } = notesPitchesKeysForTuning(numberOfSubdivisions, keyboardOffset)

  return {
    openPanel,
    synth,
    waveform,
    numberOfSubdivisions,
    displayedAccidental,
    notes,
    pitches,
    keys,
    keyboardOffset,
    pressedKeyIndices: [],
    sequence,
    shareUrl: ""
  }
}

export function notesPitchesKeysForTuning(numberOfSubdivisions: number, keyboardOffset: number) {
  const minOctave = 0
  const maxOctave = 8
  const notes = equalOctaveSubdivisions(numberOfSubdivisions)
  // Hacky: + 2 below so the highest C is also included
  const pitches = notesToPitches(16.0352, minOctave, maxOctave - minOctave + 2, notes)
  const octaves = keyboardOctavesForTuning(numberOfSubdivisions)
  const keyPitches = pitches.slice(keyboardOffset, keyboardOffset + octaves * numberOfSubdivisions + 1)
  const keys = keyboardFromPitches(keyPitches)
  return { notes, pitches, keys }
}

export function keyboardOctavesForTuning(numberOfSubdivisions: number): number {
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