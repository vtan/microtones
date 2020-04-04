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
  | { type: "hold" }

export interface SequenceIndex {
  step: number,
  track: number
}

export interface StepTime {
  time: number,
  stepIndex: number
}

export interface StepEvent {
  duration: number,
  frequency: number,
  pitchIndex: number
}

export const emptySequence: Sequence = {
  numberOfTracks: 4,
  steps: emptySteps(16, 4),
  secondsPerStep: 0.2
}

function emptySteps(numberOfSteps: number, numberOfTracks: number): ReadonlyArray<ReadonlyArray<Step>> {
  return [ ...Array(numberOfSteps) ].map(_ => emptyStep(numberOfTracks))
}

function emptyStep(numberOfTracks: number): ReadonlyArray<Step> {
  return [ ...Array(numberOfTracks) ].map(_ => ({ type: "empty" }))
}

export function setInSequence(index: SequenceIndex, newStep: Step, sequence: Sequence): Sequence {
  const steps = updateAt(
    index.step,
    stepsPerTrack => updateAt(index.track, _ => newStep, stepsPerTrack),
    sequence.steps
  )
  return { ...sequence, steps }
}

export function resizeSequenceSteps(newSteps: number, sequence: Sequence): Sequence {
  if (newSteps < 1 || newSteps > 256) {
    return sequence
  }

  if (newSteps < sequence.steps.length) {
    const steps = sequence.steps.slice(0, newSteps)
    return { ...sequence, steps }
  } else if (newSteps > sequence.steps.length) {
    const diff = newSteps - sequence.steps.length
    const steps = [ ...sequence.steps, ...emptySteps(diff, sequence.numberOfTracks) ]
    return { ...sequence, steps }
  } else {
    return sequence
  }
}

export function sequenceToTimes(sequence: Sequence): ReadonlyArray<StepTime> {
  return sequence.steps.map((_, stepIndex) => ({
    time: sequence.secondsPerStep * stepIndex,
    stepIndex: stepIndex
  }))
}

export function sequenceToEvents(
  pitches: ReadonlyArray<Pitch>,
  sequence: Sequence
): ReadonlyArray<ReadonlyArray<StepEvent>> {
  const eventsPerStep: Array<Array<StepEvent>> = sequence.steps.map(_ => [])
  const trackIndices = [ ...Array(sequence.numberOfTracks)  ].map((_, i) => i)
  trackIndices.forEach((_, trackIndex) => {
      trackToEvents(pitches, trackIndex, sequence).forEach(([stepIndex, event]) => {
        eventsPerStep[stepIndex].push(event)
      })
  })
  return eventsPerStep
}

function trackToEvents(
  pitches: ReadonlyArray<Pitch>,
  trackIndex: number,
  sequence: Sequence
): ReadonlyArray<[number, StepEvent]> {
  const eventsWithIndex: Array<[number, StepEvent]> = []
  let currentEventForHold: StepEvent | undefined
  sequence.steps.forEach((stepsPerTrack, stepIndex) => {
    const step = stepsPerTrack[trackIndex]
    let event
    switch (step.type) {
      case "pitch":
        event = {
          duration: sequence.secondsPerStep,
          frequency: pitches[step.pitchIndex].frequency,
          pitchIndex: step.pitchIndex
        }
        currentEventForHold = event
        break
      case "empty":
        currentEventForHold = undefined
        break
      case "hold":
        if (currentEventForHold !== undefined) {
          currentEventForHold.duration += sequence.secondsPerStep
        }
        break
    }
    if (event !== undefined) {
      eventsWithIndex.push([stepIndex, event])
    }
  })
  return eventsWithIndex
}
