import * as Tone from "tone"

const synth = new Tone.PolySynth().toMaster()

export function noteOn(frequency: number): void {
  synth.triggerAttack(frequency)
}

export function noteOff(frequency: number): void {
  synth.triggerRelease(frequency)
}
