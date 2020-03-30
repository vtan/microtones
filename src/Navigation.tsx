import * as React from "react"
import styled from "styled-components"

import { AppDispatch, Panel } from "./AppReducer"
import { selectionColor } from "./Util"

interface Props {
  dispatch: AppDispatch,
  openPanel: Panel
}

const panels: ReadonlyArray<[Panel, string]> = [
  ["tuning", "Tuning"],
  ["sequencer", "Sequencer"],
  ["synth", "Synth"]
]

const setOpenPanel = (panel: Panel, dispatch: AppDispatch) =>
  () => dispatch({ type: "openPanel", panel })

export function Navigation({ dispatch, openPanel }: Props) {
  return <Container>
    { panels.map(([panel, name]) =>
        <Link
          key={panel}
          isActive={openPanel === panel}
          onClick={setOpenPanel(panel, dispatch)}
        >
          {name}
        </Link>
    ) }
    <Placeholder />
    <Link href="https://github.com/vtan/microtones" isActive={false}>Source code</Link>
  </Container>
}

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f3f3f3;
`

const Link = styled.a<{ isActive: boolean }>`
  display: inline-block;
  margin-left: 1rem;
  padding: 1rem;

  background-color: ${props => props.isActive ? selectionColor : "transparent" };
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s;

  &:last-child {
    margin-right: 1rem;
  }
  &:hover {
    background-color: ${props => props.isActive ? selectionColor : "#f3f3f3" };
  }
  &:visited {
    color: black;
  }
`

const Placeholder = styled.div`
  flex: auto;
`
