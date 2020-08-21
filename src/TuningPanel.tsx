import * as React from "react"
import styled from "styled-components"

import { AppDispatch } from "./AppReducer"
import { Label, Hint } from "./InputComponents"
import { short12EdoKeys, Key } from "./Key"
import { Note, noteColor, notesIn12Edo, diffText, Accidental } from "./Note"
import { grayscaleColor, selectionColor } from "./Util"

export interface Props {
  dispatch: AppDispatch,
  numberOfSubdivisions: number,
  displayedAccidental: Accidental,
  notes: ReadonlyArray<Note>,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>
}

export function TuningPanel({ dispatch, numberOfSubdivisions, displayedAccidental, notes, keys, pressedKeyIndices }: Props) {
  const pressedNoteMultipliers = React.useMemo(
    () => pressedKeyIndices.map(i => keys[i].pitch.note.rootMultiplier),
    [pressedKeyIndices, keys]
  )

  const noteColors = React.useMemo(
    () => notes.map(note =>
      grayscaleColor(noteColor(note, short12EdoKeys.indexOf(note.nearest12EdoNote) < 0))
    ),
    [notes]
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
    <div>
      <Label>Accidental</Label>
      <select
        onChange={ e => dispatch({ type: "setDisplayedAccidental", displayedAccidental: e.target.value as Accidental }) }
        value={displayedAccidental}
      >
        <option value="sharp">#</option>
        <option value="flat">b</option>
      </select>
    </div>
    <Table>
      <tbody>
        { notes.map((note, index) => {
            const nearest12EdoNote = notesIn12Edo[displayedAccidental][note.nearest12EdoNote]
            const cents = diffText(note)
            return <tr key={index} style={{ backgroundColor: pressedNoteMultipliers.indexOf(note.rootMultiplier) >= 0 ? selectionColor : "transparent" }}>
              <td style={{ backgroundColor: noteColors[index], width: "1lh" }}></td>
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
