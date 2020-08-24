import * as React from "react"
import styled from "styled-components"

import { AppDispatch } from "../AppReducer"
import { Key } from "./Key"
import { grayscaleColor, selectionColor } from "../Util"
import { notesIn12Edo } from "../Note"

const keyWidthScale = 36

export interface Props {
  dispatch: AppDispatch,
  keys: ReadonlyArray<Key>,
  numberOfSubdivisons: number,
  keyboardOffset: number,
  pressedKeyIndices: ReadonlyArray<number>
}

export function KeyboardPanel(props: Props) {
  const { dispatch } = props

  const onTrigger = React.useCallback(
    (keyIndex: number) => (e: React.MouseEvent) =>
      e.buttons & 1 ? dispatch({ type: "triggerNoteOn", keyIndex }) : null,
    []
  )
  const onRelease = React.useCallback(
    (keyIndex: number) => () => dispatch({ type: "triggerNoteOff", keyIndex }),
    []
  )

  const renderKey = React.useCallback(
    (key: Key, index: number, pressedKeyIndices: ReadonlyArray<number>) =>
      <rect
        key={index}
        onMouseDown={onTrigger(index)}
        onMouseUp={onRelease(index)}
        onMouseOver={onTrigger(index)}
        onMouseOut={onRelease(index)}
        x={keyWidthScale * key.x}
        y="0"
        width={keyWidthScale * key.width}
        height={ key.isShort ? "60%" : "100%" }
        stroke="black"
        fill={pressedKeyIndices.indexOf(index) >= 0 ? selectionColor : grayscaleColor(key.color)}
      />,
    []
  )

  const renderKeyLabels = React.useCallback(
    (key: Key, index: number) => {
      const keyboardLabel = key.keyboardChar === undefined
        ? null
        : <KeyLabel
            x={keyWidthScale * (key.x + key.width / 2)}
            y="25%"
            fill={key.isShort ? "white" : "black"}
          >
            {key.keyboardChar}
          </KeyLabel>
      const nearest12NoteLabel = key.isShort || key.pitch.note.nearestTo12EdoNote === undefined
        ? null
        : <KeyLabel
            x={keyWidthScale * (key.x + key.width / 2)}
            y="95%"
            fill="black"
            fillOpacity={0.3}
          >
            {notesIn12Edo.sharp[key.pitch.note.nearestTo12EdoNote]}
          </KeyLabel>
      return <React.Fragment key={"l" + index}>{keyboardLabel}{nearest12NoteLabel}</React.Fragment>
    },
    []
  )

  const { keys, pressedKeyIndices, keyboardOffset, numberOfSubdivisons } = props

  const octave = React.useMemo(
    () => keyboardOffset / numberOfSubdivisons,
    [keyboardOffset, numberOfSubdivisons]
  )
  const onOctaveChange = React.useCallback(
    e => dispatch({
      type: "setKeyboardOffset",
      keyboardOffset: numberOfSubdivisons * parseInt(e.target.value)
    }),
    [numberOfSubdivisons]
  )

  return <Container>
    <OctaveContainer>
      <OctaveLabel>Octave</OctaveLabel>
      <OctaveInput type="number" min={0} max={6} value={octave} onChange={onOctaveChange} />
    </OctaveContainer>
    <Svg>
      { keys.map((key, index) => key.isShort ? null : renderKey(key, index, pressedKeyIndices)) }
      { keys.map((key, index) => key.isShort ? renderKey(key, index, pressedKeyIndices) : null) }
      { keys.map((key, index) => renderKeyLabels(key, index)) }
    </Svg>
  </Container>
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const OctaveContainer = styled.div`
  text-align: center;
  & input { text-align: right; }
`

const OctaveLabel = styled.div`
  font-size: 0.8rem;
`

const OctaveInput = styled.input`
  width: 2.5rem;
`;

const Svg = styled.svg`
  width: 100%;
  height: 120px;
  margin-left: 1rem;
`

const KeyLabel = styled.text`
  pointer-events: none;
  text-anchor: middle;
  text-transform: uppercase;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`
