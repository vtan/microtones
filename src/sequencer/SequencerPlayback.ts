import * as Tone from "tone"

import { AppState } from "../AppState"
import { sequenceToEvents, StepEvent, sequenceToTimes } from "./Sequence"
import { PlaybackInstrument } from "../synth/PlaybackInstrument"

export interface SequencerPlaybackState {
  instrument: PlaybackInstrument,
  stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>],
  currentStepIndex: number,
  onPlaybackStep: (_: number) => void
}

export function startSequencerPlayback(
  state: AppState,
  onPlaybackStep: (_: number) => void,
  fromStep: number = 0
): SequencerPlaybackState {
  const instrument = new PlaybackInstrument(state.instrument)

  const sequence = state.sequence
  const currentStepIndex =
    fromStep >= 0 && fromStep < sequence.steps.length ? fromStep : 0
  const stepEventsRef: [ReadonlyArray<ReadonlyArray<StepEvent>>] =
    [sequenceToEvents(state.pitches, sequence)]
  const stepTimes = [ ...sequenceToTimes(sequence) ]
  const part = new Tone.Part(
    (time, { stepIndex }) => {
      for (const event of stepEventsRef[0][stepIndex]) {
        instrument.synth.triggerAttackRelease(event.frequency, event.duration, time)
      }
      onPlaybackStep(stepIndex)
    },
    stepTimes
  )
  const loopLength = sequence.secondsPerStep * sequence.steps.length
  const startOffset = sequence.secondsPerStep * currentStepIndex
  Tone.Transport.cancel()
  Tone.Transport.start()
  part.loopStart = 0
  part.loopEnd = loopLength
  part.loop = true
  part.start(0, startOffset)

  return { instrument, stepEventsRef, onPlaybackStep, currentStepIndex }
}

export function restartSequencerPlayback(state: AppState): SequencerPlaybackState | undefined {
  if (state.sequencerPlayback === undefined) {
    return undefined
  } else {
    stopSequencerPlayback(state)
    return startSequencerPlayback(state, state.sequencerPlayback.onPlaybackStep, state.sequencerPlayback.currentStepIndex)
  }
}

export function stopSequencerPlayback(state: AppState): void {
  Tone.Transport.stop()
  Tone.Transport.cancel()
  if (state.sequencerPlayback !== undefined) {
    state.sequencerPlayback.instrument.free()
  }
}
