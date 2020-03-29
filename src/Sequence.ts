import { updateAt } from "./Util"
import { Pitch } from "./Pitch"

export interface Sequence {
  numberOfTracks: number,
  steps: ReadonlyArray<ReadonlyArray<Step>>,
  secondsPerStep: number
}

export type Step =
  { type: "empty" }
  | { type: "pitch", pitchIndex: number }

export interface SequenceIndex {
  step: number,
  track: number
}

export interface StepEvent {
  index: number,
  time: number,
  duration: number,
  frequency: number
}

export const emptySequence: Sequence = {
  numberOfTracks: 4,
  steps: [ ...Array(16) ].map(_ => [ ...Array(4) ].map(_ => ({ type: "empty" }))),
  secondsPerStep: 0.2
}

export function setInSequence(index: SequenceIndex, newStep: Step, sequence: Sequence): Sequence {
  const steps = updateAt(
    index.step,
    stepsPerTrack => updateAt(index.track, _ => newStep, stepsPerTrack),
    sequence.steps
  )
  return { ...sequence, steps }
}

export function sequenceToEvents(
  pitches: ReadonlyArray<Pitch>,
  sequence: Sequence
): ReadonlyArray<StepEvent> {
  return [ ...Array(sequence.numberOfTracks) ].flatMap((_, trackIndex) =>
    trackToEvents(pitches, trackIndex, sequence)
  )
}

function trackToEvents(
  pitches: ReadonlyArray<Pitch>,
  trackIndex: number,
  sequence: Sequence
): ReadonlyArray<StepEvent> {
  const events: Array<StepEvent> = []
  sequence.steps.forEach((stepsPerTrack, stepIndex) => {
    const step = stepsPerTrack[trackIndex]
    let event
    switch (step.type) {
      case "pitch":
        event = {
          index: stepIndex,
          time: sequence.secondsPerStep * stepIndex,
          duration: sequence.secondsPerStep,
          frequency: pitches[step.pitchIndex].frequency
        }
        break
    }
    if (event !== undefined) {
      events.push(event)
    }
  })
  return events
}
