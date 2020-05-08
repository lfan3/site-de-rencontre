import React from 'react'
import RangeSlider from './RangeSlider'
import GenderOption from './GenderOption'
import OrientOption from './OrientOption'
import AgeOption from './AgeOption'
import StyledP from './StyledP'


export default class FilterBar extends React.Component{
    state = {}
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.selector !== nextProps.selector){
            this.setState(()=>(nextProps.selector))
        }
    }
    changeGenderInputValue = (value)=>{
        this.setState({
            sexdata : value
        })
    }
    changeOrInputValue = (value)=>{
            this.setState(()=>({orientdata : value}))
    }
    changeFAgesInput = (e)=>{
        let from = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(from)
        if(check || e.target.value === ''){
            this.setState(()=>({fromdata : from}))
            this.props.ages(-1 * from)
        }
    }
    changeTAgesInput = (e)=>{
        let to = e.target.value
        let numberRex = RegExp(/^[0-9]+$/);
        let check = numberRex.test(to)
        if(check || e.target.value === ''){
            this.setState(()=>({toAge : to}))
            this.props.ages(to)
        }
    }
    changeDistanceInput = (value)=>{
        //without the newly created variable d will cause a synteticEvent reuse problem
        //because the e.target.value will be nutified
        this.setState(()=>({distancedata : value}))
    }
    render(){
        //not age range but form to two input
        const {gender, orient, ages, distance, sexdata, orientdata, fromdata, toAge, distancedata} = this.state
        return(
            //input onchange change the parents state, onclick show the children componenent
            <div className='flex-row space-aroud'>
                <GenderOption 
                    {...this.props}
                    sexdata = {sexdata}
                    gender = {gender}
                    clickHandler = {this.props.clickHandler}
                    changeInput = {this.changeGenderInputValue}
                />
                <OrientOption
                    {...this.props}
                    ori = {orient}
                    orientdata = {orientdata}
                    clickHandler = {this.props.clickHandler}
                    changeInput = {this.changeOrInputValue}
                />
                <AgeOption
                    {...this.props}
                    old = {ages}
                    clickHandler = {this.props.clickHandler}
                    fromdata = {fromdata}
                    toAge = {toAge}
                    onChangeF = {this.changeFAgesInput}
                    onChangeT = {this.changeTAgesInput}
                />
                <div>
                    <StyledP className = 'whiteLetters' type='text' id = 'distance' onClick = {this.props.clickHandler}>within {distancedata} km from you</StyledP>
                    {distance && <RangeSlider {...this.props} color='white' min={5} max={500} value={distancedata} changeDistance={this.changeDistanceInput}/>}
                </div>
            </div>
           
        )
    }
}
