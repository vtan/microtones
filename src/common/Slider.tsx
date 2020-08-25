import * as _ from "lodash"
import * as React from "react"
import styled from "styled-components"

interface Props {
  initialValue: number,
  min: number,
  max: number,
  step?: number,
  onThrottledChange: (_: number) => void,
  valueToString?: (_: number) => string
}

const defaultValueToString = (value: number): string => value.toString()

export const Slider = ({ initialValue, min, max, step = 1, onThrottledChange, valueToString = defaultValueToString }: Props) => {
  const [displayedValue, setDisplayedValue] = React.useState(initialValue)
  const stringValue = React.useMemo(
    () => valueToString(displayedValue),
    [valueToString, displayedValue]
  )

  const dispatchChange = React.useCallback(
    _.throttle(onThrottledChange, 300, { leading: false }),
    []
  )
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value)
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        dispatchChange(newValue)
        setDisplayedValue(newValue)
      }
    },
    [dispatchChange]
  )

  return <>
    <Text>{stringValue}</Text>
    <Input onChange={onChange} type="range" min={min} max={max} step={step} value={displayedValue} />
  </>
}

const Text = styled.span`
  display: inline-block;
  width: 3rem;
`

const Input = styled.input`
  width: 16rem;
  height: 0.75rem;
`
