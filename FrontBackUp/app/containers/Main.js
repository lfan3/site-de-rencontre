import React from 'react'
import Axios from 'axios'
import { API_URL } from '../config'
import FilterBar from '../components/filterBar/Filterbar'
import Profiles from '../components/Profiles'
import Header from '../components/header/Header'
import {authPost, authGet} from '../utiles/auth'
import {Redirect} from 'react-router-dom'

export default class Main extends React.Component{
    state = {
        users : [],
        loading : true,
        //userId : this.props.userId,
        userId:localStorage.getItem('userId'),
        //filter users conditions/initialise with preference from database
        sexdata : 'woman',
        orientdata : 'straight',
        fromdata : 21,
        toAge : 40,
        distancedata : 200,
        gender : false,
        orient : false,
        ages : false,
        distance : false,
    }
    componentDidMount(){
        console.log('inside did mount')
        this.filterUsers().then((fusers)=>{
            this.setState(()=>({users : fusers, loading : false}))
        })
    }

    filterUsers = async()=>{
        var authOption = {
            method : 'POST',
            url : `${API_URL}/filterUsers`,
            header: {'content-type':'application/json'},
            data : this.state,
            withCredentials : true,
            retry : {retries : 5}
        }
        console.log(authOption)
        let res = await Axios(authOption)
        let users = res.data
        return users
    }
    changeSex = (newSex)=>{
        if(newSex === 'Allgenders')
            newSex = 'all'
        this.setState({sexdata : newSex, loading : true})
    }
    changeOrient = (newOr)=>{
        this.setState(()=>({orientdata: newOr, loading : true}))
    }
    changeAges = (newAges)=>{
        if(newAges < 0){
            newAges = -newAges
            this.setState({fromdata : newAges, loading : true})
        }else{
            this.setState({toAge : newAges, loading : true})
        }
    }
    changeDistance = (newDis)=>{
        this.setState({distancedata: newDis, loading : true})
    }
    checkInputAge = ()=>{
        const {fromdata, toAge} = this.state
        if(toAge < fromdata)
            this.setState({toAge : 99})
    }
    
    reload = async (e)=>{
        if(e.target.id === 'loading'){
            await this.setState({
                gender : false,
                orient : false,
                ages : false,
                distance : false,
            })
            await this.checkInputAge()
            this.filterUsers().then((res)=>{
                console.log('res in reload')
                console.log(res)
                this.setState({users : res, loading : false})
            })
        }
    }
    clickHandler = (e)=>{
        let id = e.target.id
        let origin = {
            gender : false,
            orient : false,
            ages : false,
            distance : false
        }
        let changekey = {[id] : true}
        let obj = Object.assign(origin, changekey)
        this.setState(obj)
    }
    render(){
        const {loading, users, userId}= this.state
        const {url} = this.props.match
        console.log(this.state)
        return(
            <React.Fragment>
            {userId !== 'undefined' && userId !== undefined
            ?<div className = 'bg-gray fullHeight' >
                <Header userA = {userId}/>
                <FilterBar 
                    sex = {this.changeSex}
                    orient = {this.changeOrient}
                    ages = {this.changeAges}
                    dismain = {this.changeDistance}
                    selector = {this.state}
                    stateChange = {this.stateChange}
                    clickHandler = {this.clickHandler}
                />
                <Profiles 
                    reload = {this.reload}
                    users = {users}
                    loading = {loading}
                    url = {url}
                />
            </div>
            : <Redirect to='/'/>
            }
            </React.Fragment>
        )
    }
}
//518 Nia83 Rosalinda.Kuvalis99@hotmail.com
//Geovanni.Olson76 Howell_Cole@gmail.com
//288 Ansley.Willms Quinten_Bailey@hotmail.com