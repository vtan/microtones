import * as React from "react"
import styled from "styled-components"

import { AppDispatch, AppAction } from "../AppReducer"
import { Pitch } from "../Pitch"
import { Sequence, Step, SequenceIndex } from "./Sequence"
import { notesIn12Edo, diffText, Accidental } from "../Note"
import { selectionColor, playbackColor } from "../Util"
import { Hint, Label, InputRow } from "../InputComponents"
import { Slider } from "../common/Slider"

interface Props {
  dispatch: AppDispatch,
  sequence: Sequence,
  displayedAccidental: Accidental,
  pitches: ReadonlyArray<Pitch>,
  selection?: SequenceIndex,
  playbackStepIndex?: number,
  shareUrl: string
}

export function SequencerPanel(
  { dispatch, sequence, displayedAccidental, pitches, selection, playbackStepIndex, shareUrl }: Props
) {
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
  const onStepsChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "resizeSequenceSteps", numberOfSteps: parseInt(e.target.value) }),
    []
  )

  const tempo = React.useMemo(
    () => 60 / (4 * sequence.secondsPerStep),
    [sequence.secondsPerStep]
  )
  const onTempoChange = React.useCallback(
    (bpm: number) => {
      const secondsPerStep = 60 / Math.round(bpm) / 4
      dispatch({ type: "setSequenceTempo", secondsPerStep })
    },
    []
  )

  const onShare = React.useCallback(
    () => dispatch({ type: "shareProject"} ),
    []
  )

  const shareUrlRef = React.useRef<null | HTMLInputElement>(null)
  React.useEffect(
    () => {
      if (shareUrl !== "") {
        navigator.clipboard.writeText(shareUrl)
        if (shareUrlRef.current !== null) {
          shareUrlRef.current.select()
        }
      }
    },
    [shareUrl]
  )

  return <>
    <InputRow>
      <Button onClick={onShare}>Share & copy URL</Button>
      <Input ref={shareUrlRef} readOnly value={shareUrl} style={{ width: "20rem" }} />
    </InputRow>
    <InputRow>
      <Label>Steps</Label>
      <Input onChange={onStepsChange} type="number" min={4} max={256} value={sequence.steps.length} />
    </InputRow>
    <InputRow>
      <Label>Tempo</Label>
      <Slider onThrottledChange={onTempoChange} initialValue={tempo} min={40} max={200} />
    </InputRow>
    <InputRow>
      <Button
        onClick={ () => dispatch({ type: "toggleSequencerPlaying", dispatch }) }
        style={{ width: "3.5rem" }}
      >
        { playbackStepIndex === undefined ? "Play" : "Stop" }
      </Button>
      <Button onClick={ () => deleteSelectedStep(dispatch) } disabled={ selection === undefined }>Delete note</Button>
      <Button onClick={ () => holdSelectedStep(dispatch) } disabled={ selection === undefined }>Hold note</Button>
    </InputRow>
    <SequencerTable>
      <thead>
        <tr>
          <th key={-1} />
          { [ ...Array(sequence.numberOfTracks) ].map((_, i) =>
              <th key={i}>Track {i + 1}</th>
          ) }
        </tr>
      </thead>
      <tbody>
        { sequence.steps.map((stepsPerTrack, i) => {
            const isStepSelected = selection !== undefined && selection.step === i
            const isCurrentlyPlayed = playbackStepIndex === i
            return <SequencerRow key={i} isCurrentlyPlayed={isCurrentlyPlayed}>
              <StepNumberCell key={i}>{ i + 1 }</StepNumberCell>
              { stepsPerTrack.map((step, j) => {
                  const isSelected = isStepSelected && selection !== undefined && selection.track === j
                  const content = cellContent(step, pitches, displayedAccidental)
                  return <Cell
                    key={j}
                    isSelected={isSelected}
                    onClick={onCellClick({ step: i, track: j })}
                  >{content}</Cell>
              }) }
            </SequencerRow>
        }) }
      </tbody>
    </SequencerTable>
    <Hint>Use the keyboard to enter & delete notes, hold notes (<kbd>↵</kbd>), start/stop playback (<kbd>Space</kbd>) and move the selection</Hint>
  </>
}

function cellContent(step: Step, pitches: ReadonlyArray<Pitch>, displayedAccidental: Accidental) {
  switch (step.type) {
    case "empty":
      return "_"
    case "pitch":
      const pitch = pitches[step.pitchIndex]
      const note = notesIn12Edo[displayedAccidental][pitch.note.nearest12EdoNote]
      const cents = diffText(pitch.note)
      return <>{note}<sub>{pitch.octave}</sub> {cents}</>
    case "hold":
      return <small>hold</small>
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

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: inherit;
  font: inherit;

  &:disabled {
    background-color: #ddd;
  }
  &:hover:not(:disabled) {
    background-color: #f8f8f8;
  }
`

const Input = styled.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`

const SequencerTable = styled.table`
  margin-top: 2rem;
  border-collapse: separate;
  border-spacing: 0;
`

const SequencerRow = styled.tr<{ isCurrentlyPlayed: boolean }>`
  background-color: ${props => props.isCurrentlyPlayed ? playbackColor : "transparent" };
  height: 1.6rem;

  &:nth-of-type(4n-3) {
    background-color: ${props => props.isCurrentlyPlayed ? playbackColor : "#f0f0f0" };
  }
`

const StepNumberCell = styled.td`
  width: 2rem;
  padding-right: 1rem;
  text-align: right;
  vertical-align: baseline;
`

const Cell = styled.td<{ isSelected: boolean }>`
  width: 6rem;
  background-color: ${props => props.isSelected ? selectionColor : "transparent" }

  & small {
    font-size: 70%;
  }
`
