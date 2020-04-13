import React from 'react'
import styled from 'styled-components'
import RangeSlider from './RangeSlider'
import {DoubleSlider} from './RangeSlider'
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
const StyledP = styled.p`
    font-size : 1.2em;
    font-weight : bold;
    `

function Checkbox({checked, ...props}){
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

class GenderCheckbox extends React.Component{
    state = {
        Allgenders: false,
        Woman : false,
        Man : false
    }
    changeHandler = (event)=>{
        let id = event.target.id
        this.props.sex(id)
        let init = {
            Allgenders: false,
            Woman : false,
            Man : false
        }
        this.setState(()=>{
            return Object.assign(init, {[id] :true})
        })
        this.props.changeInput(id)
    }
    render(){
        return(
            <div className='flex-row label space-aroud whiteLetters'>
            <label className='flex-row'>
                <Checkbox id='Allgenders' checked = {this.state.Allgenders} onChange = {this.changeHandler} />
                <span className='gender-options'>All genders</span>
            </label>
            <label className='flex-row' >
                <Checkbox id='Woman' checked = {this.state.Woman} onChange = {this.changeHandler}/>
                <span className='gender-options'>Woman</span>
            </label>
            <label className='flex-row'>
                <Checkbox id ='Man' checked = {this.state.Man} onChange = {this.changeHandler}type='checkbox' id='Man' value='Man'/>
                <span className='gender-options'>Man</span>
            </label>
            </div>
        )
    }
}

class OrientCheckbox extends React.Component{
    state = {
        Gay: false,
        Straight : false,
        Bisexual : false,
    }
    changeHandler = (event)=>{
        let id = event.target.id
        this.props.orient(id)
        //console.log(this.props)
        let init = {
            Gay: false,
            Straight : false,
            Bisexual : false
        }
        this.setState(()=>{
            return Object.assign(init, {[id] :true})
        })
        this.props.changeInput(id)
    }
    render(){
        return(
            <div className='flex-row label space-aroud whiteLetters'>
            <label className='flex-row'>
                <Checkbox id='Gay' checked = {this.state.Gay} onChange = {this.changeHandler} />
                <span className='options'>Gay</span>
            </label>
            <label className='flex-row'>
                <Checkbox id='Straight' checked = {this.state.Straight} onChange = {this.changeHandler}/>
                <span className='options'>Straight</span>
            </label>
            <label className='flex-row'>
                <Checkbox id='Bisexual' checked = {this.state.Bisexual} onChange = {this.changeHandler}/>
                <span className='options'>Bisexual</span>
            </label>
            </div>
        ) 
    }
  
}

export default class FilterBar extends React.Component{
    state = Object.assign({
        //preference value
        gendert : 'Woman',
        orientt : 'Gay',
        fromAge : 21,
        toAge : 25,
        distancet : '35',
    }, this.props.selector)
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.selector !== nextProps.selector){
            this.setState(({distance, orient, ages, gender, toAge})=>(nextProps.selector))
        }
    }
    clickHander = (e)=>{
        let id = e.target.id
        let origin = {
            gender : false,
            orient : false,
            ages : false,
            distance : false
        }
        let changekey = {[id] : true}
       // let changekey = this.state[id] === false ? ({[id] : true}) : ({[id] : false})
        let obj = Object.assign(origin, changekey)
        this.props.stateChange(obj)
        //this.setState(()=>{
        //    return Object.assign(origin, changekey)
        //})
    }
    changeGenderInputValue = (value)=>{
        this.setState(({gendert})=>{
            if(value === 'Allgenders')
                value = 'All genders'
            else if(value === 'Man')
                value = 'Man'
            return ({gendert : value})
        })
    }
    changeOrInputValue = (value)=>{
            this.setState(({orientt})=>({orientt : value}))
    }

    changeFAgesInput = (e)=>{
        let from = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(from)
        if(check || e.target.value === ''){
            this.setState(({fromAge})=>({fromAge : from}))
            this.props.ages(-1 * from)
        }
    }
    changeTAgesInput = (e)=>{
        let to = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(to)
        if(check || e.target.value === ''){
            this.setState(({toAge})=>({toAge : to}))
            this.props.ages(to)
        }
    }
    changeDistanceInput = (value)=>{
        //without the newly created variable d will cause a synteticEvent reuse problem
        //because the e.target.value will be nutified
        this.setState(({distancet})=>({distancet : value}))
    }
  
    render(){
        //not age range but form to two input
        const {gender, orient, ages, distance, gendert, orientt, fromAge, toAge, distancet} = this.state
        return(
            //input onchange change the parents state, onclick show the children componenent
            <div className='flex-row space-aroud'>
                <div className='flex-colum'>
                    <StyledP className = 'whiteLetters' type='text' id='gender' onClick = {this.clickHander}>{gendert} </StyledP>
                    {gender && 
                    <label>
                        <GenderCheckbox {...this.props} changeInput = {this.changeGenderInputValue}/>
                    </label>
                    }
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type='text' id = 'orient' onClick = {this.clickHander}> {orientt}</StyledP>
                    {orient && <OrientCheckbox {...this.props} changeInput = {this.changeOrInputValue}/>}
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type ='text' id = 'ages' onClick = {this.clickHander}>Ages from {fromAge} to {toAge}</StyledP>
                    {ages &&
                        <div>
                            <input className='ageInput' type='text' id ='fromAge' maxLength='2' size='4' value ={fromAge} onChange = {this.changeFAgesInput}/>
                            <label className='whiteLetters'>--</label>
                            <input className='ageInput' type='text' id='toAge' maxLength='2' size='4' value={toAge} onChange = {this.changeTAgesInput}/>
                        </div>
                    }
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type='text' id = 'distance' onClick = {this.clickHander}>Within {distancet} km from you</StyledP>
                    {distance && <RangeSlider {...this.props} color='white' min={20} max={500} value={distancet} changeDistance={this.changeDistanceInput}/>}
 
                </div>
            </div>
           
        )
    }
}
/*
export default class FilterBar extends React.Component{
    state = {
        gender : false,
        orient : false,
        ages : true,
        distance : true,
        //preference value
        gendert : 'Woman',
        orientt : 'Gay',
        fromAge : 21,
        toAge : 25,
        distancet : '35'
    }
    clickHander = (e)=>{
        let id = e.target.id
        let origin = {
            gender : false,
            orient : false,
            ages : false,
            distance : false
        }
        let changekey = this.state[id] === false ? ({[id] : true}) : ({[id] : false})
        this.setState(()=>{
            return Object.assign(origin, changekey)
        })
    }
    changeGenderInputValue = (value)=>{
        this.setState(({gendert})=>{
            if(value === 'Allgenders')
                value = 'All genders'
            else if(value === 'Man')
                value = 'Man'
            return ({gendert : value})
        })
    }
    changeOrInputValue = (value)=>{
            this.setState(({orientt})=>({orientt : value}))
    }

    changeFAgesInput = (e)=>{
        let from = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(from)
        if(check || e.target.value === '')
            this.setState(({fromAge})=>({fromAge : from}))
    }
    changeTAgesInput = (e)=>{
        let to = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(to)
        if(check || e.target.value === '')
            this.setState(({toAge})=>({toAge : to}))
    }
    changeDistanceInput = (value)=>{
        //without the newly created variable d will cause a synteticEvent reuse problem
        //because the e.target.value will be nutified
        this.setState(({distancet})=>({distancet : value}))
    }
  
    render(){
        //not age range but form to two input
        const {gender, orient, ages, distance, gendert, orientt, fromAge, toAge, distancet} = this.state
        return(
            //input onchange change the parents state, onclick show the children componenent
            <div className='flex-row space-aroud'>
                <div className='flex-colum'>
                    <StyledP className = 'whiteLetters' type='text' id='gender' onClick = {this.clickHander}>{gendert} </StyledP>
                    {gender && 
                    <label>
                        <GenderCheckbox {...this.props} changeInput = {this.changeGenderInputValue}/>
                    </label>
                    }
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type='text' id = 'orient' onClick = {this.clickHander}> {orientt}</StyledP>
                    {orient && <OrientCheckbox changeInput = {this.changeOrInputValue}/>}
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type ='text' id = 'ages' onClick = {this.clickHander}>Ages from {fromAge} to {toAge}</StyledP>
                    {ages &&
                        <div>
                            <input className='ageInput' type='text' id ='fromAge' maxlength='2' size='4' value ={fromAge} onChange = {this.changeFAgesInput}/>
                            <label className='whiteLetters'>--</label>
                            <input className='ageInput' type='text' id='toAge' maxlength='2' size='4' value={toAge} onChange = {this.changeTAgesInput}/>
                        </div>
                    }
                </div>
                <div>
                    <StyledP className = 'whiteLetters' type='text' id = 'distance' onClick = {this.clickHander}>Within {distancet} km from you</StyledP>
                    {distance && <RangeSlider color='white' min={20} max={500} value={distancet} changeDistance={this.changeDistanceInput}/>}
 
                </div>
            </div>
           
        )
    }
}
*/