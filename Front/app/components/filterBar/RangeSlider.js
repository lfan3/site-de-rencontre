import React from 'react'
import styled from 'styled-components'

const sliderThumbStyles = (props) => (`
  width: 15px;
  height: 15px;
  background: #5c5150;
  cursor: pointer;
  /*outline: 2px solid #66dac7;*/
  /*opacity: ${props.opacity};*/
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  /*display: flex;*/
    color: ${props => props.color};
  .value {
    font-size: 1.3rem;
  }
  .slider {
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #ffefd5;
    outline: none;
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        ${props => sliderThumbStyles(props)}
      }
    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;


export default class RangeSlider extends React.Component {
    state = {
      value: this.props.value
    }
  
    handleOnChange = (e) => {
        let d = e.target.value
        this.setState({value : d})
        this.props.changeDistance(d)
        this.props.dismain(d)
    }
  
    render() {
      return (
          //opacity we do not need at this place
        <Styles opacity={this.state.value > 10 ? (this.state.value / 255) : .1} color={this.props.color}>
          <input type="range" min={this.props.min} max={this.props.max} value={this.state.value} className="slider" onChange={this.handleOnChange} />
          <div className="value">{this.state.value}</div>
        </Styles>
      )
    }
  }



