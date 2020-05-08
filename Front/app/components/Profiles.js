import React from 'react'
import ProfilesGrid from './ProfilesGrid'


const Profiles= (props) =>{
    let {reload, users, loading, url} = props
    if(url === '/main/')
        url = '/main'
    return(
    <div className='fullHeight'>
        {loading && <div id='loading' onClick={reload} className='light-blue fullHeight' style={{border : 'yellow 1px solid'}}>LOADING ...</div>}
        <ProfilesGrid {...props}/>
    </div>
    )
}

export default Profiles