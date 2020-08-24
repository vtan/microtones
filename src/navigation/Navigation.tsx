import * as React from "react"
import styled from "styled-components"

import { AppDispatch } from "../AppReducer"
import { Panel } from "./Panel"
import { selectionColor } from "../Util"

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

const Container = styled.nav`
  display: flex;
  border-bottom: 1px solid #e0e0e0;

  @media (min-width: 768px) {
    position: -webkit-sticky;
    position: sticky;
    box-sizing: border-box;
    width: 15rem;
    height: 100vh;
    top: 0;
    left: 0;

    flex-direction: column;
    padding-top: 1rem;
    border: unset;
    border-right: 1px solid #e0e0e0;
  }
`

const Link = styled.a<{ isActive: boolean }>`
  display: inline-block;

  padding: 0.5rem;
  @media (min-width: 768px) {
    padding: 1rem;
  }

  background-color: ${props => props.isActive ? selectionColor : "transparent" };
  cursor: pointer;
  transition: background-color 0.15s;

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
