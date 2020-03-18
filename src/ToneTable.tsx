import * as React from "react"
import styled from "styled-components"

import { Tone, toneColor } from "./Tone"
import { intervalsIn12Edo } from "./Interval"
import { short12TetKeys } from "./Key"
import { grayscaleColor } from "./Util"

export interface Props {
  tones: ReadonlyArray<Tone>,
  pressedToneMultipliers: ReadonlyArray<number>
}

export function ToneTable({ tones, pressedToneMultipliers }: Props) {
  return <Container>
    <Table>
      <tbody>
        { tones.map((tone, index) => {
            const nearest12EdoInterval = intervalsIn12Edo[tone.nearest12TetTone]
            const interval = <abbr title={nearest12EdoInterval.longName}>{nearest12EdoInterval.shortName}</abbr>
            const cents = tone.diffFromNearest12TetTone === 0 ? ""
              : tone.diffFromNearest12TetTone < 0 ? `− ${Math.abs(tone.diffFromNearest12TetTone).toFixed(0)}c`
              : `+ ${tone.diffFromNearest12TetTone.toFixed(0)}c`
            const color = toneColor(tone, short12TetKeys.indexOf(tone.nearest12TetTone) < 0)
            return <tr key={index} style={{ backgroundColor: pressedToneMultipliers.indexOf(tone.rootMultiplier) >= 0 ? "yellow" : "transparent" }}>
              <td style={{ backgroundColor: grayscaleColor(color), width: "1lh" }}></td>
              <td>{index}</td>
              <td>{interval} {cents}</td>
            </tr>
        }) }
      </tbody>
    </Table>
  </Container>
}

const Container = styled.div`
  display: flex;
  line-height: 2rem;
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
