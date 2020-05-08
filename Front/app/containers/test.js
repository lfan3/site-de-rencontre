import React, {useEffect,useState}from 'react'
import Axios from 'axios'
import { API_URL } from '../config'
import FilterBar from '../components/filterBar/Filterbar'
import Profiles from '../components/Profiles'
import {authPost, authGet} from '../utiles/auth'

const Test = ()=>{
    /*
    const [userId, setUserId] = useState('344')
    const [sexdata,setSex] = useState('woman') 
    const [orientdata, setOrient] = 'straight'
    const [fromdata, setFrom ]= 21
    const [toAge, setToAge] = 40
    const [ distancedata, setDistance] = 200*/
    const state = {
        users : [],
        loading : true,
        //userId : this.props.userId,
        userId:344,
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
    
    //useEffect(()=>{
    //    firstAxios().then((res)=>console.log(res))
    //},[])
    //useEffect(()=>{
    //    secondAxios().then((res)=>console.log(res))
    //},[])
    useEffect(()=>{
       getBoth().then((res)=>console.log(res))
    }, [state.userId])
    //useEffect(()=>{
    //   axiosAll().then()
    //}, [state.userId])
    //useEffect(()=>{
    //    firstFetch().then((res)=>res.json()).then(data =>console.log(data))
    //})
    //useEffect(()=>{
    //    secondFetch().then((res)=>res.json()).then(data =>console.log(data))
    //})
    //useEffect(()=>{
    //    let promises = [firstFetch(), secondFetch()]
    //    Promise.all(promises).then(async([res1, res2])=>{
    //        let obj1 = await res1.json()
    //        let obj2 = await res2.json()
    //        console.log(obj1)
    //        console.log(obj2)
    //    })
    //    secondFetch().then((res)=>res.json()).then(data =>console.log(data))
    //})
    async function firstFetch(){
        let url = `${API_URL}/session`
        let data = {content : 'fetch'}
        const options = {
            method: 'POST',
            headers:{
                
                'content-type': 'application/json'},
            body : JSON.stringify(data),
            //withCredential and send headers will enable the cookie
            credentials: 'include'
        }
        let res = await fetch(url, options)
        console.log(res)
        return res
    }
    async function secondFetch(){
        let url = `${API_URL}/filterUsers`
        let data = state
        const options = {
            method: 'POST',
            headers:{
                'Cache-Control': 'no-cache',
                'content-type': 'application/json'
            },
            body : JSON.stringify(data),
            //withCredential and send headers will enable the cookie
            credentials: 'include'
        }
        let res = await fetch(url, options)
        return res
    }
    async function getBoth(){
        //let promises = [firstAxios(), secondAxios()]
        //let [ff, sf] = await Promise.all(promises)
        //return {ff, sf}
        let promises = [secondAxios()]
        let [ff] = await Promise.all(promises)
        return {ff}
    }
   
    async function axiosAll(){
        let param = 'session'
        let data = {data : true}
        let auth = authPost(param, data)
        let param1 = 'filterUsers'
        let data1 = state
        let auth1 = authPost(param1, data1)
        Axios.all([Axios(auth), Axios(auth1)])
        .then((Axios.spread((obj1, obj2)=>{
            console.log(obj1.data, obj2.data)
        })))
    }
    async function firstAxios(){
            let param = 'session'
            let data = {data : true}
            let auth = authPost(param, data)
            let res = await Axios(auth)
            //Axios(auth).then((res)=>{
            //    let userId = res.data.user
            //    console.log('inside Main')
            //    console.log(userId)
            //})
            return (res.data)
        }
 
    async function secondAxios(){
            var authOption = {
                method : 'POST',
                url : `${API_URL}/filterUsers`,
                header: {'content-type':'application/json'},
                data : state,
                timeout : 5000,
                withCredentials : true,
            }
            //Axios(authOption).then((res)=>{
            //    console.log('inside secondAxios')
            //})
            let res = await Axios(authOption)
            let users = res.data
            return users
        }


    
    return(
        <div>hi</div>
    )
}
export default Test
/*
export default class AxiosTest extends React.Component{
    state = {
        users : [],
        loading : true,
        //userId : this.props.userId,
        userId:344,
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
            //let promises = [this.firstAxios(), this.secondAxios()]
            //Promise.all(promises).then((values)=>console.log(values))

            this.secondAxios().then((res)=>{
                console.log(res)
                this.firstAxios()
                //this.secondAxios()
                console.log('ok second')})
            //this.firstAxios().then((res)=>{
            //    console.log(res)
            //   // this.secondAxios()
            //   this.firstAxios()
            //})
        }
        async firstAxios(){
            let param = 'session'
            let auth = authGet(param)
            let data = await Axios(auth)
            console.log(data.data)
            //Axios(auth).then((res)=>{
            //    let userId = res.data.user
            //    console.log('inside Main')
            //    console.log(userId)
            //})
            return ('ok')
        }
        async secondAxios(){
            var authOption = {
                method : 'POST',
                url : `${API_URL}/filterUsers`,
                header: {'content-type':'application/json'},
                data : this.state,
                withCredentials : true,
            }
            Axios(authOption).then((res)=>{
                console.log('inside secondAxios')
            })
            //let res = await Axios(authOption)
            //let users = res.data
            //return users
        }
  render(){
      return(
          <div>Hi</div>
      )
  }
}
*/