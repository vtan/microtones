import * as React from "react"
import styled from "styled-components"

import { AppDispatch } from "./AppReducer"
import { Label, Hint } from "./InputComponents"
import { short12TetKeys, Key } from "./Key"
import { Tone, toneColor, notesIn12Edo, diffText } from "./Tone"
import { grayscaleColor, selectionColor } from "./Util"

export interface Props {
  dispatch: AppDispatch,
  numberOfSubdivisions: number,
  tones: ReadonlyArray<Tone>,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>
}

export function TuningPanel({ dispatch, numberOfSubdivisions, tones, keys, pressedKeyIndices }: Props) {
  const pressedToneMultipliers = React.useMemo(
    () => pressedKeyIndices.map(i => keys[i].pitch.tone.rootMultiplier),
    [pressedKeyIndices, keys]
  )

  const toneColors = React.useMemo(
    () => tones.map(tone =>
      grayscaleColor(toneColor(tone, short12TetKeys.indexOf(tone.nearest12TetTone) < 0))
    ),
    [tones]
  )

  return <>
    <div>
      <Label>Tuning</Label>
      <select
        onChange={ e => dispatch({ type: "setNumberOfSubdivisions", numberOfSubdivisions: Number.parseInt(e.target.value) }) }
        value={numberOfSubdivisions}
      >
        { [12,17,19,24,31,5,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(n =>
            <option key={n} value={n}>{n}-EDO</option>
        ) }
      </select>
      <Hint>Changing the tuning clears the sequencer</Hint>
    </div>
    <Table>
      <tbody>
        { tones.map((tone, index) => {
            const nearest12EdoNote = notesIn12Edo[tone.nearest12TetTone]
            const cents = diffText(tone)
            return <tr key={index} style={{ backgroundColor: pressedToneMultipliers.indexOf(tone.rootMultiplier) >= 0 ? selectionColor : "transparent" }}>
              <td style={{ backgroundColor: toneColors[index], width: "1lh" }}></td>
              <td>{index}</td>
              <td>{nearest12EdoNote} {cents}</td>
            </tr>
        }) }
      </tbody>
    </Table>
  </>
}

const Table = styled.table`
  margin: 0.5rem 0 0 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  line-height: 1.5rem;

  & tr {
    margin: 0;
    padding: 0;
  }
  & td { margin: 0; padding: 0 0.5rem; }
`
