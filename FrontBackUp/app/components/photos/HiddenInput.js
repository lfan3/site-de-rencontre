import React from 'react'
import styled from 'styled-components'

const HiddenInput = styled.input.attrs({ type: 'file' })`
  height: 1px;
  width: 0px;
  margin: -1px;
  background-color: red;
`

export default HiddenInput