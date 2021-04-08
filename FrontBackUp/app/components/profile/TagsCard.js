import React from 'react'

const TagsCard = (props)=>{
    const tags = props.tags
    return(
        <div>
            <ul className='bg-gray'>
                {tags.map((tag, i)=>
                   <li key={i}>{tag}</li> 
                )}
            </ul>
        </div>
    )
}

export default TagsCard