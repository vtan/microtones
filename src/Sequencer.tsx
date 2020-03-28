import * as React from "react"

import { Pitch } from "./Pitch"
import { Sequence, Step } from "./Sequence"
import styled from "styled-components"
import { notesIn12Edo, diffText } from "./Tone"
import { selectionColor } from "./Util"

interface Props {
  sequence: Sequence,
  pitches: ReadonlyArray<Pitch>
}

interface SelectionIndex {
  step: number,
  track: number
}

export function Sequencer({ sequence, pitches } : Props) {
  const [selection, setSelection] = React.useState<SelectionIndex | undefined>(undefined)

  const onCellClick = React.useCallback(
    (sel: SelectionIndex) => () => setSelection(sel),
    [setSelection]
  )

  return <Table>
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
    case "tone":
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
