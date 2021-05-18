import React from 'react'
import _ from 'lodash'
import {Pagi} from '../components/Pagi'

import {DarkHeader} from '../components/DarkHeader'
import {ProfileGrid} from '../components/ProfileGrid'
import '../style/match.css'
import {Selector} from '../components/Selector'
import {SimpleSlider} from '../components/Slider'
import {Checkboxor} from '../components/Checkboxor'



const profilesData = [
    {
        imageLink : './public/images/alice.png',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/cloebig.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/gille.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/viela.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/yannis.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/alice.png',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe',
        city:'Paris'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/gille.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/viela.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/yannis.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },

]



export class Match extends React.Component{
    state = {
        data : _.slice(profilesData, 0, 8),
        page:1
    }
    handleChange = (event, value) => {
      this.setState(preState=>({
        page: value,
        data: _.slice(profilesData, (parseInt(value) -1)*8, (parseInt(value))*8),
      }))
    };
 
    render(){
        return (
            <div>
                {/* <button onClick={()=>this.clickHandler()}>next</button> */}
                <DarkHeader/>

                <div className='profile-main'>
                    <div className='profile-people'>
                        <ProfileGrid  profilesData={this.state.data}/>
                        <Pagi handleChange={this.handleChange} page={this.state.page}/>
                    </div>
                    <div className='profile-filter'>
                        <SimpleSlider 
                            range={[18,30]}
                            title='age'
                            step={1}
                            min={18}
                            max={50}
                        />
                        <SimpleSlider 
                            range={[0,20]}
                            title='distance(km)'
                            step={10}
                            min={0}
                            max={200}
                        />
                        <Checkboxor/>
                        <Selector title='city' items = {['paris', 'londre']}/>
                        <Selector title='popularity' items = {['little popular', 'quite popular', 'very popular']}/>
                    </div>
                </div>
               
  
            </div>
        )
    }
}