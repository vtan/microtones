import * as React from "react"
import styled from "styled-components"

import { appReducer, AppState, initializeFromProject } from "./AppReducer"
import { addGlobalKeyListeners } from "./GlobalKeyListener"
import { KeyboardPanel } from "./KeyboardPanel"
import { Navigation } from "./Navigation"
import { importFromHash } from "./ProjectExporter"
import { SequencerPanel } from "./SequencerPanel"
import { SynthPanel } from "./SynthPanel"
import { TuningPanel } from "./TuningPanel"

function initializeState(): AppState {
  return initializeFromProject(importFromHash(window.location.hash))
}

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, undefined, initializeState)
  const
    { openPanel, numberOfSubdivisions, displayedAccidental, waveform
    , notes, pitches, keys, keyboardOffset, pressedKeyIndices
    , sequence, sequencerSelection, sequencerPlayback
    , shareUrl
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
      />
      { openPanel === "sequencer"
          ? <SequencerPanel
              dispatch={dispatch}
              sequence={sequence}
              displayedAccidental={displayedAccidental}
              pitches={pitches}
              selection={sequencerSelection}
              playback={sequencerPlayback}
              shareUrl={shareUrl} />
        : openPanel === "tuning"
          ? <TuningPanel
              dispatch={dispatch}
              numberOfSubdivisions={numberOfSubdivisions}
              displayedAccidental={displayedAccidental}
              notes={notes}
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
