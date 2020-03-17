import { equalOctaveSubdivisions } from "./Tone"

import * as React from "react"
import { keyboardFromTones } from "./Key"

export function App() {
  const [numberOfSubdivisions, setNumberOfSubdivisions] = React.useState(12)
  const [pressedKeyIndices, setPressedKeyIndices] = React.useState<ReadonlyArray<number>>([])

  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const keys = keyboardFromTones(tones)
  const keysInDrawOrder = [ ...keys ].sort((a, b) =>
    a.isShort && !b.isShort ? 1
      : !a.isShort && b.isShort ? -1
      : a.x - b.x
  )

  return <>
    <div>
      <select
        onChange={ (e) => setNumberOfSubdivisions(Number.parseInt(e.target.value)) }
        value={numberOfSubdivisions}
      >
        { [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,31].map(n =>
          <option key={n} value={n}>{n}</option>
        ) }
      </select>
    </div>
    <svg width="1000" height="100">
      { keysInDrawOrder.map((key, index) =>
          <g
            onMouseDown={ () => setPressedKeyIndices(is => is.indexOf(index) >= 0 ? is : [ ...is, index ]) }
            onMouseUp={ () => setPressedKeyIndices(is => is.filter(i => i !== index)) }
            onMouseOver={ (e) => e.buttons & 1 ? setPressedKeyIndices(is => is.indexOf(index) >= 0 ? is : [ ...is, index ]) : undefined }
            onMouseOut={ () => setPressedKeyIndices(is => is.indexOf(index) >= 0 ? is.filter(i => i !== index) : is) }
          >
            <rect key={`rect-${index}`}
              x={key.x}
              y="0"
              width={key.width}
              height={ key.isShort ? 60 : 100 }
              stroke="black"
              fill={pressedKeyIndices.indexOf(index) >= 0 ? "yellow" : `hsl(0, 0%, ${(100 * key.color).toFixed(0)}%)`}
            />
            { key.keyboardChar === undefined
                ? null
                : <text key={`text-${index}`}
                    textAnchor="middle"
                    x={key.x + key.width / 2}
                    y="20"
                    fill={key.isShort ? "white" : "black"}
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {key.keyboardChar}
                  </text>
            }
          </g>
      ) }
    </svg>
    <table>
      <thead></thead>
      <tbody>
        { tones.map((tone, index) =>
            <tr key={index}>
              <td>{index}</td>
              <td>{tone.rootMultiplier.toFixed(3)}</td>
              <td>{tone.cents.toFixed(0)}c</td>
              <td>{tone.nearest12TetTone}</td>
              <td>{tone.diffFromNearest12TetTone.toFixed(0)}c</td>
            </tr>
        ) }
      </tbody>
    </table>
  </>
}
