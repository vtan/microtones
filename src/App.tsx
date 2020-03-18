import * as React from "react"
import styled from "styled-components"

import { appReducer, initialAppState } from "./AppReducer"
import { addGlobalKeyListeners } from "./GlobalKeyListener"
import { Keyboard } from "./Keyboard"
import { ToneTable } from "./ToneTable"

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState)
  const { numberOfSubdivisions, tones, keys, pressedKeyIndices, pressedToneMultipliers } = state

  React.useEffect(() => addGlobalKeyListeners(dispatch), [])

  return <>
    <Settings>
      <Label>Tuning</Label>
      <select
        onChange={ (e) => dispatch({ type: "setNumberOfSubdivisions", numberOfSubdivisions: Number.parseInt(e.target.value) }) }
        value={numberOfSubdivisions}
      >
        { [12,17,19,24,31,5,6,7,8,9,10,11,13,14,15,16,18,20,21,22,23].map(n =>
            <option key={n} value={n}>{n}-EDO</option>
        ) }
      </select>
    </Settings>
    <Keyboard dispatch={dispatch} keys={keys} pressedKeyIndices={pressedKeyIndices} />
    <ToneTable tones={tones} pressedToneMultipliers={pressedToneMultipliers} />
  </>
}

const Settings = styled.div`
  margin-bottom: 0.5rem;
`

const Label = styled.span`
  margin-right: 1rem;
  font-weight: bold;
`