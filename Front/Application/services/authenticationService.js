import Axios from 'axios';
import {authPost, authGet} from '../utilities/auth'

export const sendEmailApi = async(data)=>{
    let param = 'users/signup'
    //let data = this.state
    let auth = authPost(param, data)
    let res = await Axios(auth)
    return (res.data)
}