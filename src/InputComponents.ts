import styled from "styled-components"

export const InputRow = styled.div`
  margin-bottom: 0.5rem;

  & > :not(:first-child) {
    margin-left: 0.5rem;
  }
`

export const Label = styled.span`
  display: inline-block;
  min-width: 7rem;
  margin-right: 0.5rem;
  font-weight: bold;
`

export const Hint = styled.p`
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.8rem;
`
