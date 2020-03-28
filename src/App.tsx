import * as React from "react"

import { appReducer, initialAppState, Panel } from "./AppReducer"
import { addGlobalKeyListeners } from "./GlobalKeyListener"
import { Keyboard } from "./Keyboard"
import { Settings } from "./Settings"
import { Sequencer } from "./Sequencer"
import { ToneTable } from "./ToneTable"

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState)
  const
    { openPanel, numberOfSubdivisions, waveform
    , tones, pitches, keys, pressedKeyIndices, pressedToneMultipliers, sequence
    } = state

  React.useEffect(() => addGlobalKeyListeners(dispatch), [])

  const setOpenPanel = React.useCallback(
    (panel: Panel) => () => dispatch({ type: "openPanel", panel }),
    []
  )

  return <>
    <Settings dispatch={dispatch} numberOfSubdivisions={numberOfSubdivisions} waveform={waveform} />
    <Keyboard dispatch={dispatch} keys={keys} pressedKeyIndices={pressedKeyIndices} />
    <div>
      <div>
        <button onClick={setOpenPanel("sequencer")}>Sequencer</button>
        <button onClick={setOpenPanel("notes")}>Notes</button>
      </div>
    </div>
    { openPanel === "sequencer"
        ? <Sequencer sequence={sequence} pitches={pitches} />
      : openPanel === "notes"
        ? <ToneTable tones={tones} pressedToneMultipliers={pressedToneMultipliers} />
      : null
    }
  </>
}
