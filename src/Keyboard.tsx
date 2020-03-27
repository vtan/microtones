import * as React from "react"

import { AppDispatch } from "./AppReducer"
import { Key } from "./Key"
import { grayscaleColor } from "./Util"

export interface Props {
  dispatch: AppDispatch,
  keys: ReadonlyArray<Key>,
  pressedKeyIndices: ReadonlyArray<number>
}

export function Keyboard(props: Props) {
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
    (key: Key, index: number, pressedKeyIndices: ReadonlyArray<number>) => {
      const keyWidthScale = 36
      return <g
        key={index}
        onMouseDown={onTrigger(index)}
        onMouseUp={onRelease(index)}
        onMouseOver={onTrigger(index)}
        onMouseOut={onRelease(index)}
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
    },
    []
  )

  const { keys, pressedKeyIndices } = props

  return <svg width="100%" height="120">
    { keys.map((key, index) => key.isShort ? null : renderKey(key, index, pressedKeyIndices)) }
    { keys.map((key, index) => key.isShort ? renderKey(key, index, pressedKeyIndices) : null) }
  </svg>
}
