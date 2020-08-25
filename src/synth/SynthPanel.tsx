import * as React from "react"

import { AppDispatch } from "../AppReducer"
import { InputRow, Label } from "../InputComponents"
import { Synth, Waveform, allWaveforms } from "./Synth"
import { Slider } from "../common/Slider"

interface Props {
  dispatch: AppDispatch,
  synth: Synth
}

const numberDispatcher = (dispatch: AppDispatch, key: keyof Synth) => (value: number) =>
  dispatch({ type: "updateSynth", synthDiff: { [key]: value } })

const dbString = (value: number) => `${value} dB`
const secString = (value: number) => `${value} s`
const percentString = (value: number) => `${(value * 100).toFixed(0)}%`

export function SynthPanel({ dispatch, synth }: Props) {
  const onWaveformChange = React.useCallback(e => {
    const waveform = e.target.value as Waveform
    dispatch({ type: "updateSynth", synthDiff: { waveform } })
  }, [])
  const onVolumeChange = React.useCallback(numberDispatcher(dispatch, "volume"), [])
  const onAttackChange = React.useCallback(numberDispatcher(dispatch, "amplitudeAttack"), [])
  const onDecayChange = React.useCallback(numberDispatcher(dispatch, "amplitudeDecay"), [])
  const onSustainChange = React.useCallback(numberDispatcher(dispatch, "amplitudeSustain"), [])
  const onReleaseChange = React.useCallback(numberDispatcher(dispatch, "amplitudeRelease"), [])

  return <>
    <InputRow>
      <Label>Waveform</Label>
      <select onChange={onWaveformChange} value={synth.waveform}>
        { allWaveforms.map(w => <option key={w} value={w}>{w}</option>) }
      </select>
    </InputRow>
    <InputRow>
      <Label>Volume</Label>
      <Slider onThrottledChange={onVolumeChange} initialValue={synth.volume} min={-20} max={0} valueToString={dbString} />
    </InputRow>
    <InputRow>
      <Label>Attack</Label>
      <Slider onThrottledChange={onAttackChange} initialValue={synth.amplitudeAttack} min={0.01} max={0.5} step={0.01} valueToString={secString} />
    </InputRow>
    <InputRow>
      <Label>Decay</Label>
      <Slider onThrottledChange={onDecayChange} initialValue={synth.amplitudeDecay} min={0.01} max={0.5} step={0.01} valueToString={secString} />
    </InputRow>
    <InputRow>
      <Label>Sustain</Label>
      <Slider onThrottledChange={onSustainChange} initialValue={synth.amplitudeSustain} min={0.01} max={1} step={0.01} valueToString={percentString} />
    </InputRow>
    <InputRow>
      <Label>Release</Label>
      <Slider onThrottledChange={onReleaseChange} initialValue={synth.amplitudeRelease} min={0.1} max={1.5} step={0.1} valueToString={secString} />
    </InputRow>
  </>
}
