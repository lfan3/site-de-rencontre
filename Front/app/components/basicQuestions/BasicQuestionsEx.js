import React, {useRef, useState, useReducer,useEffect} from 'react'
import Selection from '../setting/Selection'
//import Birthday from '../setting/BirthdayForm'
import SubmitBtn from '../questions/SubmitBtn'
import {csv, dsv, json} from 'd3'
import './basic.css'

//formulaire use ref VS state
//if it is a one page formulaire, 
//ref is much better, we can access easily the data by dayRef.current.value to get the formulaire content, 
//otherwise, we need a changeHandler, but if we use changehandler, it is better to use a stateful valuething
//BUUUUUUUUUUT if it is a multiply page formulaire, it is better to use stateful value , so the value stay in the state
const Birthday= (props)=>{
    const {dayRef, monthRef, yearRef, change} = props
    return(
    <div className='form-row'> 
        <div className='form-group col-2'>
                <Selection optionsNumber ={31} id='day' Ref = {dayRef} change = {change}/>
        </div>
        
        <div className='form-group col-2'>
                <Selection optionsNumber = {12} id='month' Ref={monthRef} change = {change}/>
        </div>
        <div className='form-group col-4'>
                <Selection optionsNumber = {50} id='year' Ref={yearRef} change = {change}/>
        </div>
    </div>
    )
}
//<Selection optionsNumber = {12} id='month' monthRef={monthRef}/>
const questions = [
    "When is your birthday ?",
    "What is your gender ?",
    "What is your sex orientation ?",
    "In Which city do you live ?",
]

const initalState = {
    /*
    dayRef : 1,
    monthRef : 1,
    yearRef : 2002,
    genderRef : 'woman',
    orientRef : 'straight',
    cityRef : 'paris',
    */
    index : 0
}

const stateReducer = (state, action)=>{
    if(action.type === 'next'){
        return(Object.assign({}, state, {index : state.index + 1}))
    }
    //else if(action.type === 'selectDay')
    //else if(action.type === 'selectMonth')
    //else if(action.type === 'selectYear')
}

const GenderSelection = (props)=>{
    let {genderRef, change} = props
    return(
        <select 
            id = 'gender'
            className='form-control'
            ref={genderRef}
            onChange = {change}
        >
        <option value='woman'>woman</option>
        <option value='man'>man</option>
        </select>
    )
}

const OrientSelection = (props)=>{
    let {orientRef,change} = props
    return(
        <select 
            id = 'orient'
            className='form-control'
            ref = {orientRef}
            onChange = {change}
        >
        <option value='straigt'>straight</option>
        <option value='gay'>gay</option>
        <option value='bisexual'>bisexual</option>
        </select>
    )
}

const CitySelection = (props)=>{
    //selection with svg file
    //ip location
    const {cityRef, change} = props
    const [cityApi, setCityApi] = useState({})
    useEffect(()=>{
        //csv('app/dataCSV/villes_france.csv').then(data=>{
        //    data.forEach(d => setCity(()=>city.push(d.OZAN)))
        //})
        //json('app/dataCSV/arrondissements.json').then(data=>{
        //    console.log(data)
        //    let noms = data.map(d=>d.fields.l_ar)
        //    setCity(noms)
        //})
        fetch('http://ip-api.com/json/?fields=status,city,query,lat,lon')
            .then(res=>res.json())
            .then((res)=>{
                setCityApi(res)
            })

    }, [])
    console.log(cityApi)

    return(
        <select 
            id = 'city'
            className='form-control'
            ref = {cityRef}
            onChange = {change}
        >
        <option value='straigt'>city</option>
        <option value='newyork'>New York</option>
        <option value='bisexual'>London</option>
        </select>
    )
}





const BasicQ = ()=>{
    const [state, dispatch] = useReducer(
        stateReducer,
        initalState
    )
    //let {index, yearRef,dayRef, monthRef,genderRef,orientRef,cityRef} = state
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const genderRef = useRef()
    const orientRef = useRef()
    const cityRef = useRef()
    //const [index, setIndex] = useState(0)
    let index = state.index
    const submitHandler = ()=>{
        console.log(dayRef.current.value, orientRef.current.value, cityRef.current.value)
    }
    const change = (e)=>{
        console.log('e')
        console.log(dayRef.current.value)
        /*
        let id = e.target.id
        if(id === 'day'){
            console.log(dayRef.current.value)
            dayRef.current = e.target.value
        }
        else if(id === 'month')
            monthRef.current.value = e.target.value
        else if(id === 'year')
            yearRef.current.value = e.target.value
        else if(id === 'gender')
            genderRef.current.value = e.target.value
        else if(id === 'orient')
            orientRef.current.value = e.target.value
        else if(id === 'city')
            cityRef.current.value = e.target.value
            */
    }
    return(
        <div className='container-fluid center-page'>
            <div className='row no-padding justify-content-center'>
                <div className='offset-4 col-7'>
                   {questions[index]}
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
                <div className='offset-4 col-7'>
                {index === 0 && <Birthday dayRef={dayRef} monthRef = {monthRef} yearRef={yearRef} change={change}/>}
                {index === 1 &&  <GenderSelection genderRef={genderRef}  change={change}/>}
                {index === 2 &&  <OrientSelection orientRef ={orientRef}  change={change}/>}
                {index === 3 &&  <CitySelection cityRef = {cityRef} change={change}/>}
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
                <div className='offset-4 col-7'>
                    <SubmitBtn 
                        nextQuestion = {()=>dispatch({type : 'next'})}
                        index = {index}
                        beforeLastNumQues = {3}
                        submitHandler = {submitHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default BasicQ
/*
   const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const genderRef = useRef()
    const orientRef = useRef()
    const cityRef = useRef()
    const [index, setIndex] = useState(0)
*/