import React, {useState} from 'react'


/*
       <label className='flex-row'>
                <Checkbox id='Allgenders' checked = {this.state.Allgenders} onChange = {this.changeHandler} />
                <span className='gender-options'>All genders</span>
            </label>
*/

const Presentation = ({setPres, setDisp})=>{
    let input
    const changeHandler = (e)=>{
        input = e.target.value
    }
    const clickHandler = (e)=>{
        e.preventDefault(e)
        setPres(input)
        setDisp([0,1,0,0,0,0,0,0])
    }
    return(
        <div>
        <textarea rows='10' cols='33'
            placeholder=' Tells something about yourself...'
            onChange = {changeHandler}
            value = {input}
        > 
        </textarea>
        <button onClick = {clickHandler}>OK</button>
        </div>
    )

}

const Birthday = ({setAge})=>{
    return(
        <div>
            birthday
        </div>
    )
}
const Biography = ()=>{
    const [pres, setPres] = useState('')
    const [sex, setSex] = useState('')
    const [sexOr, setSexOr] = useState('')
    const [tags, setTags] = useState([])
    const [age, setAge] = useState('')
    const [city, setCity] = useState('')
    const [lat, setLat] = useState(0)
    const [lon, setLon] = useState(0)
    const [disp, setDisp] = useState([1,0,0,0,0,0,0,0])
    console.log(pres)
    return(
        <div>
        {disp[0] && <Presentation setPres={setPres} setDisp = {setDisp} pres={pres}/>}
        {disp[1] === 1 && <Birthday setAge = {setAge}/>}
        </div>
    )



}

export default Biography

/*
    state = {
        biography : '',
        gender : '',
        sexOr : ''
        tags : [], 
        age: '',
        city: '',
        lat: 0,
        lon: 0,
    }*/