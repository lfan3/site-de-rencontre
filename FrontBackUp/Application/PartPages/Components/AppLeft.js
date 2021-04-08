import React, { Component } from 'react';

//if the perple logined in then let it enter in the main page
export default function AppLeft({state}){
    console.log(state.notice, state.signup , ' inside the appleft')
    return(
        <React.Fragment>
            <div className="col-sm-6 bg-blue whiteLetters">
                <div className='heartAnimation'>
                  <div className='heart'></div>
                </div>
                <div> {state.notice} </div> 
                {state.signup && <div>Check your email</div>}

            </div>
        </React.Fragment>
    )
}