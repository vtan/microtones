import { keyboardLookup } from "./Key"
import { AppDispatch } from "./AppReducer"

// TODO do not handle keys if a modifier key is pressed

const keyDownListener = (dispatch: AppDispatch) => (e: KeyboardEvent): void => {
  const isModifierPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  if (!isModifierPressed) {
    const keyIndex = keyboardLookup[e.key]
    if (keyIndex !== undefined) {
      if (!e.repeat) {
        dispatch({ type: "triggerNoteOn", keyIndex })
      }
      e.preventDefault()
    }
  }
}

const keyUpListener = (dispatch: AppDispatch) => (e: KeyboardEvent): void => {
  const isModifierPressed = e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  const keyIndex = keyboardLookup[e.key]
  if (!isModifierPressed && keyIndex !== undefined) {
    dispatch({ type: "triggerNoteOff", keyIndex })
    e.preventDefault()
  }
}

export function addGlobalKeyListeners(dispatch: AppDispatch): void {
  window.addEventListener("keydown", keyDownListener(dispatch), true)
  window.addEventListener("keyup", keyUpListener(dispatch), true)
}
