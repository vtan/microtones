import * as React from "react"

import { AppDispatch } from "./AppReducer"
import { Key } from "./Key"
import { grayscaleColor } from "./Util"

export interface Props {
  dispatch: AppDispatch,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>
}

export function Keyboard({ dispatch, keys, pressedKeyIndices }: Props) {
  const noteOn = (keyIndex: number) => dispatch({ type: "triggerNoteOn", keyIndex })
  const noteOff = (keyIndex: number) => dispatch({ type: "triggerNoteOff", keyIndex })

  const keyWidthScale = 40
  const renderKey = (key: Key, index: number) =>
    <g
      key={index}
      onMouseDown={ (e) => e.buttons & 1 ? noteOn(index) : null }
      onMouseUp={ () => noteOff(index) }
      onMouseOver={ (e) => e.buttons & 1 ? noteOn(index) : null }
      onMouseOut={ () => noteOff(index) }
    >
      <rect
        x={keyWidthScale * key.x}
        y="0"
        width={keyWidthScale * key.width}
        height={ key.isShort ? "60%" : "100%" }
        stroke="black"
        fill={pressedKeyIndices.indexOf(index) >= 0 ? "yellow" : grayscaleColor(key.color)}
      />
      { key.keyboardChar === undefined
          ? null
          : <text
              textAnchor="middle"
              x={keyWidthScale * (key.x + key.width / 2)}
              y="25%"
              fill={key.isShort ? "white" : "black"}
              style={{ pointerEvents: "none", userSelect: "none", textTransform: "uppercase" }}
            >
              {key.keyboardChar}
            </text>
      }
    </g>

    return <svg width="100%" height="200">
      { keys.map((key, index) => key.isShort ? null : renderKey(key, index)) }
      { keys.map((key, index) => key.isShort ? renderKey(key, index) : null) }
    </svg>
}