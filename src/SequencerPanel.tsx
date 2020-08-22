import * as _ from "lodash"
import * as React from "react"
import styled from "styled-components"

import { AppDispatch, AppAction, SequencerPlaybackState, selectedSequence } from "./AppReducer"
import { Pitch } from "./Pitch"
import { Sequence, Step, SequenceIndex } from "./Sequence"
import { notesIn12Edo, diffText, Accidental } from "./Note"
import { selectionColor, playbackColor } from "./Util"
import { Hint, Label } from "./InputComponents"

interface Props {
  dispatch: AppDispatch,
  sequences: ReadonlyArray<Sequence>,
  selectedSequenceIndex: number,
  displayedAccidental: Accidental,
  pitches: ReadonlyArray<Pitch>,
  selection?: SequenceIndex,
  playback?: SequencerPlaybackState,
  shareUrl: string
}

export function SequencerPanel(
  { dispatch, sequences, selectedSequenceIndex, displayedAccidental, pitches, selection, playback, shareUrl }: Props
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

  const sequence = React.useMemo(
    () => selectedSequence({ sequences, selectedSequenceIndex }),
    [sequences, selectedSequenceIndex]
  )

  const tempo = React.useMemo(
    () => 60 / (4 * sequence.secondsPerStep),
    [sequence.secondsPerStep]
  )
  const [displayedTempo, setDisplayedTempo] = React.useState(tempo)
  const dispatchTempoChange = React.useCallback(
    _.throttle((bpm: number) => {
      const secondsPerStep = 60 / bpm / 4
      dispatch({ type: "setSequenceTempo", secondsPerStep })
    }, 500, { leading: false }),
    []
  )
  const onTempoChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const bpm = parseInt(e.target.value)
      dispatchTempoChange(bpm)
      setDisplayedTempo(bpm)
    },
    [dispatchTempoChange]
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
      <TempoText>{displayedTempo.toFixed(0)}</TempoText>
      <input onChange={onTempoChange} type="range" min={40} max={200} value={displayedTempo} style={{ width: "16rem" }} />
    </InputRow>
    <InputRow>
      <Button
        onClick={ () => dispatch({ type: "toggleSequencerPlaying", dispatch }) }
        style={{ width: "3.5rem" }}
      >
        { playback === undefined ? "Play" : "Stop" }
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
            const isCurrentlyPlayed = playback !== undefined && playback.currentStepIndex === i
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

const InputRow = styled.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  color: inherit;
  font: inherit;
`

const Input = styled.input`
  padding: 0.125rem 0.5rem;
  color: inherit;
  font: inherit;
`

const TempoText = styled.span`
  display: inline-block;
  width: 2.5rem;
`

const SequencerTable = styled.table`
  margin-top: 1rem;
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
