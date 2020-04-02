import * as React from "react"
import styled from "styled-components"

import { AppDispatch, AppAction, SequencerPlaybackState } from "./AppReducer"
import { Pitch } from "./Pitch"
import { Sequence, Step, SequenceIndex } from "./Sequence"
import { notesIn12Edo, diffText } from "./Tone"
import { selectionColor, playbackColor } from "./Util"
import { Hint } from "./InputComponents"

interface Props {
  dispatch: AppDispatch,
  sequence: Sequence,
  pitches: ReadonlyArray<Pitch>,
  selection?: SequenceIndex,
  playback?: SequencerPlaybackState
}

export function SequencerPanel({ dispatch, sequence, pitches, selection, playback } : Props) {
  React.useEffect(
    () => {
      const listener = keyDownListener(dispatch)
      window.addEventListener("keydown", listener, true)
      return () => window.removeEventListener("keydown", listener, true)
    },
    []
  )

  // TODO this doesn't optimize anything
  const onCellClick = React.useCallback(
    (sel: SequenceIndex) => () => dispatch({ type: "setSequencerSelection", selection: sel }),
    []
  )

  return <>
    <Toolbar>
      <Button onClick={ () => dispatch({ type: "toggleSequencerPlaying", dispatch }) }>
        { playback === undefined ? "▶" : "◼" }
      </Button>
      <Separator />
      <Button onClick={ () => deleteSelectedStep(dispatch) }>Delete</Button>
      <Button onClick={ () => holdSelectedStep(dispatch) }>Hold</Button>
    </Toolbar>
    <Table>
      <thead>
        <tr>
          { [ ...Array(sequence.numberOfTracks) ].map((_, i) =>
              <th key={i}>Track {i + 1}</th>
          ) }
        </tr>
      </thead>
      <tbody>
        { sequence.steps.map((stepsPerTrack, i) => {
            const isStepSelected = selection !== undefined && selection.step === i
            const isCurrentlyPlayed = playback !== undefined && playback.currentStepIndex === i
            return <Row key={i} isCurrentlyPlayed={isCurrentlyPlayed}>
              { stepsPerTrack.map((step, j) => {
                  const isSelected = isStepSelected && selection !== undefined && selection.track === j
                  const content = cellContent(step, pitches)
                  return <Cell
                    key={j}
                    isSelected={isSelected}
                    onClick={onCellClick({ step: i, track: j })}
                  >{content}</Cell>
              }) }
            </Row>
        }) }
      </tbody>
    </Table>
    <Hint>Use the keyboard to enter & delete notes, hold notes (<kbd>↵</kbd>), start/stop playback (<kbd>Space</kbd>) and move the selection</Hint>
  </>
}

function cellContent(step: Step, pitches: ReadonlyArray<Pitch>) {
  switch (step.type) {
    case "empty":
      return "_"
    case "pitch":
      const pitch = pitches[step.pitchIndex]
      const note = notesIn12Edo[pitch.tone.nearest12TetTone]
      const cents = diffText(pitch.tone)
      return <>{note}<sub>{pitch.octave}</sub> {cents}</>
    case "hold":
      return "|"
  }
}

function deleteSelectedStep(dispatch: AppDispatch): void {
  dispatch({ type: "setSelectedStep", step: { type: "empty" } })
}

function holdSelectedStep(dispatch: AppDispatch): void {
  dispatch({ type: "setSelectedStep", step: { type: "hold" } })
}

const keyToAction: Record<string, (_: AppDispatch) => AppAction> = {
  "Backspace": () => ({ type: "setSelectedStep", step: { type: "empty" } }),
  "Delete": () =>({ type: "setSelectedStep", step: { type: "empty" } }),
  "Enter": () => ({ type: "setSelectedStep", step: { type: "hold" } }),
  "ArrowLeft": () => ({ type: "moveSequencerSelection", diff: { track: -1, step: 0 } }),
  "ArrowRight": () => ({ type: "moveSequencerSelection", diff: { track: 1, step: 0 } }),
  "ArrowUp": () => ({ type: "moveSequencerSelection", diff: { step: -1, track: 0 } }),
  "ArrowDown": () => ({ type: "moveSequencerSelection", diff: { step: 1, track: 0 } }),
  " ": dispatch => ({ type: "toggleSequencerPlaying", dispatch })
}

const keyDownListener = (dispatch: AppDispatch) => (e: KeyboardEvent): void => {
  const isModifierPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  if (!isModifierPressed) {
    const action = keyToAction[e.key]
    if (action !== undefined) {
      e.preventDefault()
      dispatch(action(dispatch))
    }
  }
}

const Toolbar = styled.div`
  margin-bottom: 0.5rem;
`

const Button = styled.button`
  margin: 0 0.25rem;
  padding: 0.5rem;

  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;

  &:hover {
    background-color: #f3f3f3;
  }
`

const Separator = styled.div`
  display: inline-block;
  width: 1rem;
`

const Table = styled.table`
  border-collapse: separate; border-spacing: 0;
`

const Row = styled.tr<{ isCurrentlyPlayed: boolean }>`
  background-color: ${props => props.isCurrentlyPlayed ? playbackColor : "transparent" };

  &:nth-of-type(4n-3) {
    background-color: ${props => props.isCurrentlyPlayed ? playbackColor : "#f0f0f0" };
  }
`

const Cell = styled.td<{ isSelected: boolean }>`
  width: 6rem;
  background-color: ${props => props.isSelected ? selectionColor : "transparent" }
`