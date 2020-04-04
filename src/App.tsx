import * as React from "react"
import styled from "styled-components"

import { appReducer, initialAppState } from "./AppReducer"
import { addGlobalKeyListeners } from "./GlobalKeyListener"
import { KeyboardPanel } from "./KeyboardPanel"
import { Navigation } from "./Navigation"
import { SequencerPanel } from "./SequencerPanel"
import { SynthPanel } from "./SynthPanel"
import { TuningPanel } from "./TuningPanel"

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState)
  const
    { openPanel, numberOfSubdivisions, waveform
    , tones, pitches, keys, keyboardOffset, pressedKeyIndices
    , sequence, sequencerSelection, sequencerPlayback
    } = state

  React.useEffect(() => addGlobalKeyListeners(dispatch), [])

  return <Root>
    <Navigation dispatch={dispatch} openPanel={openPanel} />
    <Main>
      <KeyboardPanel
        dispatch={dispatch}
        keys={keys}
        keyboardOffset={keyboardOffset}
        numberOfSubdivisons={numberOfSubdivisions}
        pressedKeyIndices={pressedKeyIndices}
        sequencerPlayback={sequencerPlayback}
        />
      { openPanel === "sequencer"
          ? <SequencerPanel
              dispatch={dispatch}
              sequence={sequence}
              pitches={pitches}
              selection={sequencerSelection}
              playback={sequencerPlayback} />
        : openPanel === "tuning"
          ? <TuningPanel
              dispatch={dispatch}
              numberOfSubdivisions={numberOfSubdivisions}
              tones={tones}
              keys={keys}
              pressedKeyIndices={pressedKeyIndices} />
        : openPanel === "synth"
          ? <SynthPanel
              dispatch={dispatch}
              waveform={waveform} />
        : null
      }
    </Main>
  </Root>
}

const Root = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Main = styled.main`
  flex: auto;
  padding: 1rem;
`
