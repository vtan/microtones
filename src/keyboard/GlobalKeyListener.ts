import { keyboardLookup } from "./Key"

const keyDownListener = (onNoteOn: (keyIndex: number) => void) => (e: KeyboardEvent): void => {
  const isModifierPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  if (!isModifierPressed) {
    const keyIndex = keyboardLookup[e.key]
    if (keyIndex !== undefined) {
      if (!e.repeat) {
        onNoteOn(keyIndex)
      }
      e.preventDefault()
    }
  }
}

const keyUpListener = (onNoteOff: (keyIndex: number) => void) => (e: KeyboardEvent): void => {
  const isModifierPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  const keyIndex = keyboardLookup[e.key]
  if (!isModifierPressed && keyIndex !== undefined) {
    onNoteOff(keyIndex)
    e.preventDefault()
  }
}

export function addGlobalKeyListeners(
  onNoteOn: (keyIndex: number) => void,
  onNoteOff: (keyIndex: number) => void
): void {
  window.addEventListener("keydown", keyDownListener(onNoteOn), true)
  window.addEventListener("keyup", keyUpListener(onNoteOff), true)
}
