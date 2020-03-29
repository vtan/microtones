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
  const onCellClick = React.useCallback(
    (sel: SequenceIndex) => () => dispatch({ type: "setSequencerSelection", selection: sel }),
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
            return <Row key={i}>
              { stepsPerTrack.map((step, j) => {
                  const isSelected = isStepSelected && selection !== undefined && selection.track === j
                  return <StepCell
                    key={j}
                    step={step}
                    pitches={pitches}
                    isSelected={isSelected}
                    onClick={onCellClick({ step: i, track: j })}
                  />
              }) }
            </Row>
        }) }
      </tbody>
    </Table>
  </>
}

interface StepCellProps {
  step: Step,
  pitches: ReadonlyArray<Pitch>,
  isSelected: boolean,
  onClick: () => void
}

function StepCell({ step, pitches, isSelected, onClick }: StepCellProps) {
  switch (step.type) {
    case "empty": return <Cell isSelected={isSelected} onClick={onClick}>_</Cell>
    case "pitch":
      const pitch = pitches[step.pitchIndex]
      const note = notesIn12Edo[pitch.tone.nearest12TetTone]
      const cents = diffText(pitch.tone)
      return <Cell isSelected={isSelected} onClick={onClick}>{note}<sub>{pitch.octave}</sub> {cents}</Cell>
  }
}

const Table = styled.table`
  border-collapse: separate; border-spacing: 0;
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
