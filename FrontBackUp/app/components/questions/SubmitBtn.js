import React from 'react'

const SubmitBtn = ({disableBtn, nextQuestion, index, beforeLastNumQues, submitHandler})=>{
    return(
        <div className='row justify-content-center'>
            <div className='col-3'>
            {disableBtn
             ? (index < beforeLastNumQues
                ? <button className='btn btn-primary' disabled onClick = {nextQuestion}>Next</button>
                : <button className='btn btn-primary' disabled onClick = {submitHandler}>let's begin the jouney</button>
                )
            :(index < beforeLastNumQues
                ? <button className='btn btn-primary' onClick = {nextQuestion}>Next</button>
                : <button className='btn btn-primary' onClick = {submitHandler}>let's begin the journey</button>
                )
            }
            </div>
        </div>
    )
}

export default SubmitBtn