import * as React from "react"
import styled from "styled-components"

import { AppDispatch } from "./AppReducer"
import { Pitch } from "./Pitch"
import { Sequence, Step, SequenceIndex } from "./Sequence"
import { notesIn12Edo, diffText } from "./Tone"
import { selectionColor } from "./Util"

interface Props {
  dispatch: AppDispatch,
  sequence: Sequence,
  pitches: ReadonlyArray<Pitch>,
  selection?: SequenceIndex,
  isPlaying: boolean
}

export function Sequencer({ dispatch, sequence, pitches, selection, isPlaying } : Props) {
  // TODO this doesn't optimize anything
  const onCellClick = React.useCallback(
    (sel: SequenceIndex) => () => dispatch({ type: "setSequencerSelection", selection: sel }),
    []
  )
  const onTableKey = React.useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Backspace":
        case "Delete":
          e.preventDefault()
          dispatch({ type: "setSelectedStep", step: { type: "empty" } })
          break
        case "Enter":
          e.preventDefault()
          dispatch({ type: "setSelectedStep", step: { type: "hold" } })
      }
    },
    []
  )
  const onStartClick = React.useCallback(
    () => dispatch({ type: "startSequencer" }),
    []
  )
  const onStopClick = React.useCallback(
    () => dispatch({ type: "stopSequencer" }),
    []
  )

  return <>
    <div>
      { isPlaying
          ? <button onClick={onStopClick}>⏹</button>
          : <button onClick={onStartClick}>▶</button>
      }
    </div>
    <div>
      <small>Press <kbd>Return</kbd> to hold a note.</small>
    </div>
    <Table tabIndex={0} onKeyDown={onTableKey}>
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
            return <Row key={i}>
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

const Table = styled.table`
  border-collapse: separate; border-spacing: 0;

  &:focus {
    outline: 1px solid #e0e0e0;
  }
`

const Row = styled.tr`
  &:nth-of-type(4n-3) {
    background-color: #f0f0f0;
  }
`

const Cell = styled.td<{ isSelected: boolean }>`
  width: 6rem;
  background-color: ${props => props.isSelected ? selectionColor : "transparent" }
`
