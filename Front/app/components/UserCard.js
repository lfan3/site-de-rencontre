import React from 'react'
import _ from 'lodash'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {LikeOrDislike} from '../components/LikeOrDislike'

const useStyle = makeStyles((theme)=>({
    root:{
        height:'100%'
    }
}))

export const UserCard = ({user})=>{
    const classes = useStyle();
    return(
        <Card className={classes.root}>
            <CardContent>
            <Typography variant="h3">
               {user.name}
            </Typography>
            <Typography variant="h5">
               {user.age}
            </Typography>
            <Typography variant="h5">
               {user.city}
            </Typography>
            <Typography variant="h5">
               {user.job}
            </Typography>
            <Typography variant="h5">
               {user.height}
            </Typography>
            <Typography variant="h5">
               {user.sign}
            </Typography>
            <LikeOrDislike/>
            </CardContent>
        </Card>
    )
}
