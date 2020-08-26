import * as React from "react"
import styled from "styled-components"

import { appReducer } from "./AppReducer"
import { AppState, initializeAppState } from "./AppState"
import { addGlobalKeyListeners } from "./keyboard/GlobalKeyListener"
import { KeyboardPanel } from "./keyboard/KeyboardPanel"
import { Navigation } from "./navigation/Navigation"
import { importFromHash } from "./project/ProjectExporter"
import { SequencerPanel } from "./sequencer/SequencerPanel"
import { SynthPanel } from "./synth/SynthPanel"
import { TuningPanel } from "./TuningPanel"

function initializeState(): AppState {
  return initializeAppState(importFromHash(window.location.hash))
}

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, undefined, initializeState)
  const
    { openPanel, numberOfSubdivisions, displayedAccidental, instrument
    , notes, pitches, keys, keyboardOffset, pressedKeyIndices
    , sequence, sequencerSelection, sequencerPlayback
    , shareUrl
    } = state

  React.useEffect(
    () => {
      const onNoteOn = (keyIndex: number) => dispatch({ type: "triggerNoteOn", keyIndex })
      const onNoteOff = (keyIndex: number) => dispatch({ type: "triggerNoteOff", keyIndex })
      addGlobalKeyListeners(onNoteOn, onNoteOff)
    },
    []
  )

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
              playbackStepIndex={ sequencerPlayback && sequencerPlayback.currentStepIndex }
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
              instrument={instrument} />
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
