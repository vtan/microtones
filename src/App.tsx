import * as React from "react"

import { keyboardFromPitches, keyboardLookup, Key } from "./Key"
import { tonesToPitches, Pitch } from "./Pitch"
import * as Synth from "./Synth"
import { equalOctaveSubdivisions } from "./Tone"

export function App() {
  const [numberOfSubdivisions, setNumberOfSubdivisions] = React.useState(12)

  const tones = equalOctaveSubdivisions(numberOfSubdivisions)
  const pitches = tonesToPitches(261.6256, 2, tones)
  const keys = keyboardFromPitches(pitches)

  const [pressedKeyIndices, setPressedKeyIndices] = React.useState<ReadonlyArray<number>>([])

  const noteOn =
    (keyIndex: number, pitch: Pitch) => {
      setPressedKeyIndices(is => is.indexOf(keyIndex) >= 0 ? is : [ ...is, keyIndex ])
      Synth.noteOn(pitch.frequency)
    }

  const noteOff =
    (keyIndex: number, pitch: Pitch) => {
      setPressedKeyIndices(is => is.indexOf(keyIndex) >= 0 ? is.filter(i => i !== keyIndex) : is)
      Synth.noteOff(pitch.frequency)
    }

  React.useEffect(
    () => {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (!e.repeat) {
          const keyIndex = keyboardLookup[e.key]
          if (keyIndex !== undefined && keyIndex < keys.length) {
            const pitch = keys[keyIndex].pitch
            noteOn(keyIndex, pitch)
            e.preventDefault()
          }
        }
      }, true)

      window.addEventListener("keyup", (e: KeyboardEvent) => {
        const keyIndex = keyboardLookup[e.key]
        if (keyIndex !== undefined && keyIndex < keys.length) {
          const pitch = keys[keyIndex].pitch
          noteOff(keyIndex, pitch)
          e.preventDefault()
        }
      }, true)
    },
    []
  )

  const renderKey = (key: Key, index: number) =>
    <g
      key={index}
      onMouseDown={ (e) => e.buttons & 1 ? noteOn(index, key.pitch) : null }
      onMouseUp={ () => noteOff(index, key.pitch) }
      onMouseOver={ (e) => e.buttons & 1 ? noteOn(index, key.pitch) : null }
      onMouseOut={ () => noteOff(index, key.pitch) }
    >
      <rect
        x={key.x}
        y="0"
        width={key.width}
        height={ key.isShort ? 60 : 100 }
        stroke="black"
        fill={pressedKeyIndices.indexOf(index) >= 0 ? "yellow" : `hsl(0, 0%, ${(100 * key.color).toFixed(0)}%)`}
      />
      { key.keyboardChar === undefined
          ? null
          : <text
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

  return <>
    <div>
      <select
        onChange={ (e) => setNumberOfSubdivisions(Number.parseInt(e.target.value)) }
        value={numberOfSubdivisions}
      >
        { [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,31].map(n =>
          <option key={n} value={n}>{n}-EDO</option>
        ) }
      </select>
    </div>
    <svg width="1000" height="100">
      { keys.map((key, index) => key.isShort ? null : renderKey(key, index)) }
      { keys.map((key, index) => key.isShort ? renderKey(key, index) : null) }
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
