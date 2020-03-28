export interface Sequence {
  numberOfTracks: number,
  steps: ReadonlyArray<ReadonlyArray<Step>>
}

export const emptySequence: Sequence = {
  numberOfTracks: 4,
  steps: [ ...Array(16) ].map((_, i) => [ ...Array(4) ].map(_ => ({ type: "empty" })))
}

export type Step =
  { type: "empty" }
  | { type: "tone", pitchIndex: number }
