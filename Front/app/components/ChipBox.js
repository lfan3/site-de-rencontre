import React from 'react'
import _ from 'lodash'
import {DarkHeader} from '../components/DarkHeader'
import {ProfileCard} from '../components/ProfileCard'
import {UserPhotosGallery} from '../components/UserPhotosGallery'
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '@material-ui/core/Avatar';

const useStyle = makeStyles((theme)=>({
    root:{
        margin:'1em',
        marginTop: '2em',
    },
    title:{
        marginTop: '1em',
        marginBottom: '1em',
        color: '#9c29b7',
        fontFamily: 'DM Serif Display',
        fontSize : '2em',
        fontWeight: 'bold'
    },
    paper:{
        width:'100%',
        minHeight:'180px',
        padding: '1.5em',
        border:'none'
    },
    chip:{
        margin:'0.5em',
        padding: '0.3em',
        fontWeight:'bold'
    }
  
}))
const tags = [
    "joy", 
    "love", 
    "france", 
    "paris", 
    "happy", 
    "happiness", 
    "smile", 
    "fun", 
    "photography", 
    "life", 
    "instagood", 
    "picoftheday", 
    "travel", 
    "art", 
    "enjoy", 
    "amour", 
    "joie", 
    "europe"
];

export const ChipBox = ({title, chips})=>{
    const classes = useStyle();
    return(
        <Container className={classes.root} >
            <Row className={classes.title}>
            {title}
            </Row>
            <Row>
                <Paper variant="outlined" className={classes.paper} >
                {
                    tags.map((tag, index)=>{
                        const avatar = tag.charAt(0).toUpperCase();
                        if(index % 2)
                            return (
                                <Chip
                                    key={index}
                                    size='medium'
                                    variant = "outlined"
                                    label={tag}
                                    color="primary"
                                    className={classes.chip}
                                />
                            )
                        return (
                            <Chip
                                key={index}
                                size='medium'
                                avatar={<Avatar>{avatar}</Avatar>}
                                label={tag}
                                color="primary"
                                className={classes.chip}
                            />
                        )
                    })
                }
                </Paper>
            </Row>
        </Container>
    )
}