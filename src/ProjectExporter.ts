import * as Pako from "pako"

import { Step, emptySteps } from "./Sequence"
import { Project } from "./Project"
import { allWaveforms } from "./Waveform"
import { Accidental } from "./Note"

const hashPrefix = "#sequence/1="

export function exportToHash(project: Project): string {
  const exported = exportProject(project)
  const compressed = compressProject(exported)
  return hashPrefix + compressed
}

export function importFromHash(hash: string): Project | undefined {
  if (hash.startsWith(hashPrefix)) {
    try {
      const input = hash.substr(hashPrefix.length)
      const project = decompressProject(input)
      return importProject(project)
    } catch (err) {
      console.warn(`Failed to import project: ${err}; hash: ${hash}`)
      return
    }
  } else {
    return
  }
}

interface ExportedProject {
  wf: number,
  ac: number
  ns: number,
  s: ReadonlyArray<ExportedSequence>
}

interface ExportedSequence {
  ns: number,
  nt: number,
  ss: number,
  e: ReadonlyArray<ExportedStep>
}

type StepOffset = number
type EncodedStep = number
type ExportedStep = [StepOffset, EncodedStep]

function exportProject(project: Project): ExportedProject {
  const waveform = allWaveforms.indexOf(project.waveform)
  if (waveform < 0) {
    throw new Error(`Invalid waveform: ${project.waveform}`)
  }

  let accidental
  switch (project.displayedAccidental) {
    case "sharp": accidental = 0; break
    case "flat": accidental = 1; break
  }

  const { numberOfSubdivisions } = project
  const sequence = project.sequences[0]
  const { numberOfTracks, secondsPerStep, steps } = sequence
  const numberOfSteps = steps.length
  const events: Array<ExportedStep> = []

  steps.forEach((stepsPerTrack, stepIndex) =>
    stepsPerTrack.forEach((step, trackIndex) => {
      if (step.type !== "empty") {
        let encodedStep
        switch (step.type) {
          case "pitch":
            encodedStep = step.pitchIndex
            break
          case "hold":
            encodedStep = -1
            break
        }
        const offset = numberOfSteps * stepIndex + trackIndex
        const event: ExportedStep = [offset, encodedStep]
        events.push(event)
      }
    })
  )

  const exportedSequence = {
    ns: numberOfSteps,
    nt: numberOfTracks,
    ss: secondsPerStep,
    e: events
  }
  return {
    wf: waveform,
    ac: accidental,
    ns: numberOfSubdivisions,
    s: [exportedSequence]
  }
}

function importProject(exported: ExportedProject): Project {
  const waveform = allWaveforms[exported.wf]
  if (waveform === undefined) {
    throw new Error(`Invalid waveform index: ${exported.wf}`)
  }

  const numberOfSubdivisions = exported.ns
  const exportedSequence = exported.s[0]
  if (exportedSequence === undefined) {
    throw new Error("No sequence found")
  }

  let displayedAccidental: Accidental
  switch (exported.ac) {
    case 0: displayedAccidental = "sharp"; break
    case 1: displayedAccidental = "flat"; break
    default: throw new Error(`Invalid accidental index: ${exported.ac}`)
  }

  const numberOfSteps = exportedSequence.ns
  const numberOfTracks = exportedSequence.nt
  const secondsPerStep = exportedSequence.ss

  const steps = [ ...emptySteps(numberOfSteps, numberOfTracks).map(readonly => [ ...readonly ]) ]
  exportedSequence.e.forEach(([offset, encodedStep]) => {
    const stepIndex = Math.floor(offset / numberOfSteps)
    const trackIndex = Math.floor(offset % numberOfSteps)
    const step: Step = encodedStep === -1 ? { type: "hold" } : { type: "pitch", pitchIndex: encodedStep }
    steps[stepIndex][trackIndex] = step
  })

  const sequence = { numberOfTracks, secondsPerStep, steps }
  const sequences = [sequence]
  return { waveform, numberOfSubdivisions, displayedAccidental, sequences }
}

function compressProject(project: ExportedProject): string {
  return btoa(Pako.deflate(JSON.stringify(project), { to: "string" }))
}

export function decompressProject(str: string): ExportedProject {
  return JSON.parse(Pako.inflate(atob(str), { to: "string" }))
}