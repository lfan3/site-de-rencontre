import styled from 'styled-components'
import React from 'react'

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  height: 1px;
  width: 1px;
  margin: -1px;
  background-color: red;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
const StyledCheckbox = styled.div`
  display: inline-block;
  margin: 2px 5px 2px 10px;
  width: 20px;
  height: 20px;
  background: ${props => props.checked ? 'salmon' : 'papayawhip'};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenInput} : focus + & {
      box-shadow : 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`


export default function Checkbox({checked, ...props}){
    return(
        <div>
        <HiddenInput checked = {checked} {...props}/>
        <StyledCheckbox checked = {checked}>
            <Icon viewBox='0 0 24 24'>
                <polyline points="20 6 9 17 4 12"/>
            </Icon>
        </StyledCheckbox>
        </div>
    )
}