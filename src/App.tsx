import * as React from "react"
import styled from "styled-components"

import { appReducer, initialAppState } from "./AppReducer"
import { addGlobalKeyListeners } from "./GlobalKeyListener"
import { Keyboard } from "./Keyboard"
import { Navigation } from "./Navigation"
import { SequencerPanel } from "./SequencerPanel"
import { SynthPanel } from "./SynthPanel"
import { TuningPanel } from "./TuningPanel"

export function App() {
  const [state, dispatch] = React.useReducer(appReducer, initialAppState)
  const
    { openPanel, numberOfSubdivisions, waveform
    , tones, pitches, keys, pressedKeyIndices, pressedToneMultipliers
    , sequence, sequencerSelection, isSequencerPlaying
    } = state

  React.useEffect(() => addGlobalKeyListeners(dispatch), [])

  return <>
    <Navigation dispatch={dispatch} openPanel={openPanel} />
    <Container>
      <Keyboard dispatch={dispatch} keys={keys} pressedKeyIndices={pressedKeyIndices} />
      { openPanel === "sequencer"
          ? <SequencerPanel
              dispatch={dispatch}
              sequence={sequence}
              pitches={pitches}
              selection={sequencerSelection}
              isPlaying={isSequencerPlaying} />
        : openPanel === "tuning"
          ? <TuningPanel
              dispatch={dispatch}
              numberOfSubdivisions={numberOfSubdivisions}
              tones={tones}
              pressedToneMultipliers={pressedToneMultipliers} />
        : openPanel === "synth"
          ? <SynthPanel
              dispatch={dispatch}
              waveform={waveform} />
        : null
      }
    </Container>
  </>
}

const Container = styled.div`
  margin: 0 1rem;
`
