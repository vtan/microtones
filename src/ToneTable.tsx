import * as React from "react"
import styled from "styled-components"

import { Tone, toneColor, notesIn12Edo } from "./Tone"
import { short12TetKeys } from "./Key"
import { grayscaleColor } from "./Util"

export interface Props {
  tones: ReadonlyArray<Tone>,
  pressedToneMultipliers: ReadonlyArray<number>
}

export function ToneTable({ tones, pressedToneMultipliers }: Props) {
  const toneColors = React.useMemo(
    () => tones.map(tone =>
      grayscaleColor(toneColor(tone, short12TetKeys.indexOf(tone.nearest12TetTone) < 0))
    ),
    [tones]
  )
  return <Container>
    <Table>
      <tbody>
        { tones.map((tone, index) => {
            const nearest12EdoNote = notesIn12Edo[tone.nearest12TetTone]
            const cents = tone.diffFromNearest12TetTone === 0 ? ""
              : tone.diffFromNearest12TetTone < 0 ? `− ${Math.abs(tone.diffFromNearest12TetTone).toFixed(0)}c`
              : `+ ${tone.diffFromNearest12TetTone.toFixed(0)}c`
            return <tr key={index} style={{ backgroundColor: pressedToneMultipliers.indexOf(tone.rootMultiplier) >= 0 ? "yellow" : "transparent" }}>
              <td style={{ backgroundColor: toneColors[index], width: "1lh" }}></td>
              <td>{index}</td>
              <td>{nearest12EdoNote} {cents}</td>
            </tr>
        }) }
      </tbody>
    </Table>
  </Container>
}

const Container = styled.div`
  display: flex;
  line-height: 1.5rem;
`

const Table = styled.table`
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;

  & tr {
    margin: 0;
    padding: 0;
  }
  & td { margin: 0; padding: 0 0.5rem; }
`
