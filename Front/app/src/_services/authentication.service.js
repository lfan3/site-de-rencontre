import {BehaviorSubject} from 'rxjs'
import Axios from 'axios';

import {handleResponse} from '@/_helpers'
import {authPost, authGet} from '../../utiles/auth'
import { API_URL } from '../../config'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
    login,
    logout,
    //?
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue(){return currentUserSubject.value}
}

function login(email, password){
    let url = `${API_URL}/users/authenticate`
    const requestOption ={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email,password})
    }
    return fetch(url, requestOption)
        .then(handleResponse)
        .then(user =>{
            localStorage.setItem('currentUser',JSON.stringify(user))
            currentUserSubject.next(user);

            return user;
        })
}

function logout(){
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null)
}