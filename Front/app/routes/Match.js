import React from 'react'
import _ from 'lodash'
import {Pagi} from '../components/Pagi'

import {DarkHeader} from '../components/DarkHeader'
import {ProfileGrid} from '../components/ProfileGrid'
import '../style/match.css'
import {Selector} from '../components/Selector'
import {SimpleSlider} from '../components/Slider'
import {DistanceCheckbox} from '../components/DistanceCheckbox'
import {API_URL} from '../../config'
import { connect} from "react-redux";

/**
 * todo *
 * add filter
 * photo need to rescrapping et store dans cloudify
 */

let ex =   {
    "id": 1,
    "name": "Gabriella",
    "birthday": "1993-04-10T22:00:00.000Z",
    "sex": "man",
    "orient": "gay",
    "geo_loc": {
      "x": 3.11871,
      "y": 48.474315
    },
    "city": "Donnemarie-Dontilly",
    "login": "Freeman.Kassulke22",
    "email": "Elza_Ullrich93@gmail.com",
    "password": "$2b$10$F727ML1ie/3ukmJ.rTxXzuratSnzMiOfzbe9wFfeqVQpBV5ccdJki",
    "tocken": "45d3c14b-12f0-4383-ae13-5fef8554938b",
    "is_verified": 1,
    "role": "ROLE_USER",
    "photo_path": "https://gangz.io/picture/165898-456-568-180491-pola-210220-25.jpg",
    "is_profile": 1,
    "user_id": 1
  };

class MatchComponent extends React.Component{

    state = {
        allusers:[],
        currentusers: [],
        page:1,
        ageSliderVal:[20, 30],
        distanceVal: 100, //todo: corriger dans didstance compoenet
        citySelectorItem: '',
        popularitySelectorItem: '',
        genderSelectorItem: '',
        orientSelectorItem: ''
    }
    componentDidUpdate(preprops, prestate){
        if(preprops.users.length !== this.props.users.length && this.state.currentusers.length === 0){
            this.setState({
                allusers: this.props.users,
                currentusers: this.props.users.slice(0, 20)
            })
        }
    }
    handleChange = (event, value) => {
      this.setState({
        page: value,
        currentusers: _.slice(this.state.allusers, (parseInt(value) -1)*20, (parseInt(value))*20),
      })
    };

    handleAgeSliderChange = (event, newValue) => {
        console.log('age range ', newValue);
        this.setState({ageSliderVal : newValue});
    };

    handleDistanceSliderChange = (event, newValue) => {
        console.log('distance range ', newValue);
        this.setState({distanceVal : newValue});
    };
    handleCitySelectorChange = (event) => {
        console.log('city')
        this.setState({citySelectorItem: event.target.value});
    };
    handleGenderSelectorChange = (event) => {
        this.setState({genderSelectorItem: event.target.value});
    };
    handlePopularitySelectorChange = (event) => {
        this.setState({popularitySelectorItem: event.target.value});
    };
    handleOrientSelectorChange = (event) => {
        this.setState({orientSelectorItem: event.target.value});
    };
    render(){
        const { citySelectorItem, popularitySelectorItem, genderSelectorItem, orientSelectorItem } = this.state;
        return (
            <div>
                {/* <button onClick={()=>this.clickHandler()}>next</button> */}
                <DarkHeader/>

                <div className='profile-main'>
                    <div className='profile-people'>
                        <ProfileGrid  profilesData={this.state.currentusers}/>
                        <Pagi handleChange={this.handleChange} page={this.state.page}/>
                    </div>
                    <div className='profile-filter'>
                        <SimpleSlider 
                            title='age'
                            step={1}
                            min={18}
                            max={60}
                            handleSliderChange ={this.handleAgeSliderChange }
                            value={this.state.ageSliderVal}
                        />
                        <SimpleSlider 
                            title='distance(km)'
                            step={10}
                            min={0}
                            max={200}
                            handleSliderChange ={this.handleDistanceSliderChange}
                            value={this.state.distanceVal}
                        />
                        <DistanceCheckbox/>
                        <Selector item={citySelectorItem} title='city' items = {['paris', 'londre']} handleChange={this.handleCitySelectorChange}/>
                        <Selector item={popularitySelectorItem} title='popularity' items = {['little popular', 'quite popular', 'very popular']} handleChange={this.handlePopularitySelectorChange}/>
                        <Selector item={genderSelectorItem} title='gender' items = {['All', 'Man', 'Woman']} handleChange={this.handleGenderSelectorChange}/>
                        <Selector item={orientSelectorItem} title='sexual orientation' items = {['Straight', 'Gay', 'Bisexual']} handleChange={this.handleOrientSelectorChange}/>
                    </div>
                </div>
               
  
            </div>
        )
    }
}


const MapStateToProps = state =>{
    return {users: state.UserReducer.users}
}
  

export const Match = connect(MapStateToProps,null)(MatchComponent);
