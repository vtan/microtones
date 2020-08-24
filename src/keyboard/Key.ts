import { Pitch } from "../Pitch"
import { noteColor } from "../Note"

export interface Key {
  x: number,
  width: number,
  isShort: boolean,
  color: number,
  keyboardChar?: string,
  pitch: Pitch
}

export const short12EdoKeys = [1, 3, 6, 8, 10]
const tallKeyWidth = 1
const shortKeyWidth = 0.5

const keyboardChars: ReadonlyArray<string> =
  [ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'
  , 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''
  , 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'
  ]

export const keyboardLookup: Record<string, number> =
  Object.assign({}, ...keyboardChars.map((char, i) => ({ [char]: i })))

export function keyboardFromPitches(pitches: ReadonlyArray<Pitch>): ReadonlyArray<Key> {
  const keyboard: Array<Key> = []
  let shortKeysSinceLastTallKey = 0
  let x = 0
  pitches.forEach((pitch, index) => {
    const note = pitch.note
    const isShort = short12EdoKeys.indexOf(note.nearest12EdoNote) >= 0
    const color = noteColor(note, !isShort)

    let xActual = x
    let width = isShort ? shortKeyWidth : tallKeyWidth
    if (isShort) {
      if (shortKeysSinceLastTallKey === 0) {
        x -= shortKeyWidth / 2
        xActual = x
      }
    } else {
      if (shortKeysSinceLastTallKey > 0) {
        const extraWidth = (shortKeysSinceLastTallKey - 1) * shortKeyWidth
        x -= shortKeyWidth / 2
        xActual = x - extraWidth / 2
        width += extraWidth / 2

        const lastTallKey = keyboard[keyboard.length - 1 - shortKeysSinceLastTallKey]
        lastTallKey.width += extraWidth / 2
      }
    }

    const keyboardChar = keyboardChars[index]
    const key = { x: xActual, width, isShort, color, keyboardChar, pitch }
    keyboard.push(key)
    if (key.isShort) {
      ++shortKeysSinceLastTallKey
    } else {
      shortKeysSinceLastTallKey = 0
    }
    x += isShort ? shortKeyWidth : tallKeyWidth
  })
  return keyboard
}
