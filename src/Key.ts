import { Tone } from "./Tone"

export interface Key {
  x: number,
  width: number,
  isShort: boolean,
  color: number
  tone: Tone,
  keyboardChar?: string
}

const short12TetKeys = [1, 3, 6, 8, 10]
const tallKeyWidth = 32
const shortKeyWidth = 16
const keyboardChars = "qwertyuiopasdfghjklzxcvbnm"

export function keyboardFromTones(tones: ReadonlyArray<Tone>): ReadonlyArray<Key> {
  const keyboard: Array<Key> = []
  let shortKeysSinceLastTallKey = 0
  let x = 0
  tones.forEach((tone, index) => {
    const isShort = short12TetKeys.indexOf(tone.nearest12TetTone) >= 0
    const color = isShort
        ? Math.abs(tone.diffFromNearest12TetTone) / 100
        : 1 - Math.abs(tone.diffFromNearest12TetTone) / 100

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
    const key = { x: xActual, width, isShort, color, tone, keyboardChar }
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
