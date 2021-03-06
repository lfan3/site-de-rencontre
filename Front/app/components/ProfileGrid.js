import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Grid, Image } from 'semantic-ui-react'
import {ProfileCard} from '../components/ProfileCard'
import { v4 as uuidv4 } from 'uuid';
import '../style/match.css'

const grid = (array) =>{
    let rows = []

    _.forEach(array, (val, index)=>{
        if(index % 4 == 0){
            rows.push(row(array, index))
        }
    })
    return (
        _.map(rows, (val)=>val)
    )
}

const row = (array, i)=>{
    const cols = _.slice(array, i, i+4)

    return(
        <Grid.Row columns={4} key={i}>
        {
            columns(cols)
        }
        </Grid.Row>
    )   
}

const columns = (array) => {
 
    return(
        _.map(array, (val, i)=>(
            <Grid.Column key={uuidv4()}>
            <ProfileCard
              photo_path = {val.photo_path}
              name = {val.name}
              birthday= {val.birthday}
              city = {val.city}
            />
            </Grid.Column>
        ))
    )
}

export const ProfileGrid = ({profilesData}) => <Grid className='profile-grid'>{grid(profilesData)}</Grid>

