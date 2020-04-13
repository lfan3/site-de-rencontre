import React from 'react'
import {Router, Link} from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from '../config'
import FilterBar from './Filterbar'

function UserInfo(props){
    let user = props.user
    return(
        <div className='flex-center bg-blue'>
            <ul className='flex-colum'>
                <li>{user.name}</li>
                <li>{user.age}</li>
                <li>{user.city}</li>
            </ul>
        </div>
    )
}

export default class Main extends React.Component{
    state = {
        //loading : true,
        users : [],
        loading : true,
        userId : 2,
        //filter users conditions/initialise with preference from database
        sexdata : 'woman',
        orientdata : 'gay',
        fromdata : 21,
        toAge : 25,
        distancedata : 35,
        gender : false,
        orient : false,
        ages : false,
        distance : false,
    }
    componentDidMount(){
        let {userId} = this.state
        this.filterUsers().then((fusers)=>{
            this.setState(({users, loading})=>({users : fusers, loading : false}))
        })
    }
    filterUsers = async()=>{
        var authOption = {
            method : 'POST',
            url : `${API_URL}/filterUsers`,
            header: {'content-type':'application/json'},
            data : this.state,
            withCredentials : true
        }
        let res = await Axios(authOption)
        //res.send(result), result is an array of object
        //res.data === result
        let users = res.data
        return users
    }
    changeSex = (newSex)=>{
        if(newSex === 'Allgenders')
            newSex = ''
        console.log(newSex)
        this.setState(({sexdata, loading})=>({sexdata : newSex, loading : true}))
    }
    changeOrient = (newOr)=>{
        this.setState(({orientdata, loading})=>({orientdata: newOr, loading : true}))
    }
    changeAges = (newAges)=>{
        if(newAges < 0){
            newAges = -newAges
            this.setState(({from, loading})=>({fromdata : newAges, loading : true}))
        }else{
            this.setState(({to, loading})=>({toAge : newAges, loading : true}))
        }
    }
    changeDistance = (newDis)=>{
        this.setState(({distancedata, loading})=>({distancedata: newDis, loading : true}))
    }
    checkInputAge = ()=>{
        const {fromdata, toAge} = this.state
        if(toAge < fromdata)
            this.setState(({toAge})=>({toAge : 99}))
    }
    reload = async ()=>{
        await this.setState(({distance, orient, ages, gender})=>({
            gender : false,
            orient : false,
            ages : false,
            distance : false,
        }))
        await this.checkInputAge()

        this.filterUsers().then((res)=>{
            this.setState(({users, loading})=>({users : res, loading : false}))
        })
    }

    stateChange = (obj)=>{
        this.setState(({distance, orient, ages, gender})=>(obj))
    }
    
    render(){
        //header component
        //filter component add hier
        //display all the user hier
        const {loading, users}= this.state
        console.log("this state in main")
        console.log(this.state)
        return(
            <div className = 'bg-gray fullHeight' >
                <FilterBar 
                    sex = {this.changeSex}
                    orient = {this.changeOrient}
                    ages = {this.changeAges}
                    dismain = {this.changeDistance}
                    selector = {this.state}
                    stateChange = {this.stateChange}
                />
                <div className='fullHeight' onClick={this.reload}>
                    <div className='flex-center'>
                    <ul className='grid space-around'>
                        {loading && <div className='light-blue'>LOADING ...</div>}
                        {!loading && users.map((user, index)=>(
                            <li key={index} className='grid-li'>
                                <img className='image-grid' src = {user.photo_path}/>
                                <UserInfo user = {user}/>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
}
