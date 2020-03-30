import * as React from "react"

import { AppDispatch, Waveform, waveforms } from "./AppReducer"
import { Label } from "./InputComponents"

interface Props {
  dispatch: AppDispatch,
  waveform: Waveform
}

export function SynthPanel({ dispatch, waveform }: Props) {
  return <>
    <Label>Waveform</Label>
    <select
      onChange={ e => dispatch({ type: "setWaveform", waveform: e.target.value as Waveform }) }
      value={waveform}
    >
      { waveforms.map(w => <option key={w} value={w}>{w}</option>) }
    </select>
  </>
}
