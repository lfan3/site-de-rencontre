import React from 'react'

const SubmitBtn = ({nextQuestion, index, beforeLastNumQues, submitHandler})=>{
    return(
        <div className='row justify-content-center'>
            <div className='col-3'>
                {index < beforeLastNumQues
                ? <button className='btn btn-primary' onClick = {nextQuestion}>Next</button>
                : <button className='btn btn-primary' onClick = {submitHandler}>Submit</button>
                }

            </div>
        </div>
    )
}

export default SubmitBtn