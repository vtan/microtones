import * as React from "react"

import { AppDispatch } from "../AppReducer"
import { InputRow, Label } from "../InputComponents"
import { Synth, Waveform, allWaveforms, Instrument, Reverb } from "./Instrument"
import { Slider } from "../common/Slider"

interface Props {
  dispatch: AppDispatch,
  instrument: Instrument
}

const synthDispatcher = (dispatch: AppDispatch, key: keyof Synth) => (value: number) =>
  dispatch({ type: "updateInstrument", diff: { synth: { [key]: value } } })
const reverbDispatcher = (dispatch: AppDispatch, key: keyof Reverb) => (value: number) =>
  dispatch({ type: "updateInstrument", diff: { reverb: { [key]: value } } })

const dbString = (value: number) => `${value} dB`
const secString = (value: number) => `${value} s`
const percentString = (value: number) => `${(value * 100).toFixed(0)}%`

const freqString = (value: number) => {
  const freq = sliderToFreq(value)
  if (freq >= 10_000) {
    return `${(freq / 1_000).toFixed(1)} kHz`
  } else if (freq >= 1_000) {
    return `${(freq / 1_000).toFixed(2)} kHz`
  } else {
    return `${freq.toFixed(0)} Hz`
  }
}

const sliderToFreq = (slider: number) => 100 * Math.pow(2, slider)
const freqToSlider = (freq: number) => Math.round(Math.log2(freq / 100))

export function SynthPanel({ dispatch, instrument }: Props) {
  const { synth, lowPassFilter, reverb } = instrument
  const lpfFreq = React.useMemo(() => freqToSlider(lowPassFilter.frequency), [lowPassFilter.frequency])

  const onWaveformChange = React.useCallback(e => {
    const waveform = e.target.value as Waveform
    dispatch({ type: "updateInstrument", diff: { synth: { waveform } } })
  }, [])
  const onVolumeChange = React.useCallback(synthDispatcher(dispatch, "volume"), [])
  const onAttackChange = React.useCallback(synthDispatcher(dispatch, "attack"), [])
  const onDecayChange = React.useCallback(synthDispatcher(dispatch, "decay"), [])
  const onSustainChange = React.useCallback(synthDispatcher(dispatch, "sustain"), [])
  const onReleaseChange = React.useCallback(synthDispatcher(dispatch, "release"), [])

  const onFilterFreqChange = React.useCallback(value =>
    dispatch({ type: "updateInstrument", diff: { lowPassFilter: { frequency: sliderToFreq(value) } } }),
  [])

  const onReverbMixChange = React.useCallback(reverbDispatcher(dispatch, "wet"), [])
  const onReverbDecayChange = React.useCallback(reverbDispatcher(dispatch, "decay"), [])

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
      <Slider onThrottledChange={onAttackChange} initialValue={synth.attack} min={0.01} max={0.5} step={0.01} valueToString={secString} />
    </InputRow>
    <InputRow>
      <Label>Decay</Label>
      <Slider onThrottledChange={onDecayChange} initialValue={synth.decay} min={0.01} max={0.5} step={0.01} valueToString={secString} />
    </InputRow>
    <InputRow>
      <Label>Sustain</Label>
      <Slider onThrottledChange={onSustainChange} initialValue={synth.sustain} min={0.01} max={1} step={0.01} valueToString={percentString} />
    </InputRow>
    <InputRow>
      <Label>Release</Label>
      <Slider onThrottledChange={onReleaseChange} initialValue={synth.release} min={0.1} max={1.5} step={0.1} valueToString={secString} />
    </InputRow>
    <InputRow>
      <Label>Low-pass filter</Label>
      <Slider onThrottledChange={onFilterFreqChange} initialValue={lpfFreq} min={0} max={7.5} step={0.1} valueToString={freqString} />
    </InputRow>
    <InputRow>
      <Label>Reverb mix</Label>
      <Slider onThrottledChange={onReverbMixChange} initialValue={reverb.wet} min={0} max={1} step={0.05} valueToString={percentString} />
    </InputRow>
    <InputRow>
      <Label>Reverb decay</Label>
      <Slider onThrottledChange={onReverbDecayChange} initialValue={reverb.decay} min={0.1} max={6} step={0.1} valueToString={secString} />
    </InputRow>
  </>
}
