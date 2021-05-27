import React from 'react'
import _ from 'lodash'
import {DarkHeader} from '../components/DarkHeader'
import {UserPhotosGallery} from '../components/UserPhotosGallery'
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import {TextBox} from '../components/TextBox';
import {ChipBox} from '../components/ChipBox';
import {UserCardEdit} from '../components/UserCardEdit';
import Typography from '@material-ui/core/Typography';
import { CustomeTextField } from '../components/CustomeTextField';

import '../style/userPrivate.css';

const _user = {
        photo_path : './public/images/alice.png',
        name : 'Cloe',
        age : '33',
        city: 'Paris',
        job: 'Developer',
        height: '167cm',
        sign: 'Balance',
        email:'niceProfile.g@hotmail.com'
}

const useStyle = makeStyles((theme)=>({
    header:{
        marginTop: '2em',
    },
    iconsWrapper:{
        width:'150px',
        margin: 'auto',
        marginTop: '2.5em',
        display:'flex',
        justifyContent:'space-between'
    },
    heartIcon:{
        color: theme.palette.secondary.main,
        boxShadow: '0.5px 1px 6px #cfd8dc'
    },
    cancelIcon:{
        color: theme.palette.text.light,
        boxShadow: '0.5px 1px 6px #cfd8dc'
    },
    hello:{
        fontFamily: 'DM Serif Display',
        fontSize : '4em',
    }
}))

const _bioContent = "Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle";

const tagContent = 'abc'
export function UserPrivate(){
    const classes = useStyle();
    const [user,setUser] = React.useState(_user);
    const [bioContent, setBioContent] = React.useState(_bioContent);
    const handleChange= (e) =>{
        const key = e.target.name;
        setUser({[key]: e.target.value});
    }
    const textBoxChangeHandler = (e) =>{
        setBioContent(e.target.value);
    }
    return(
        <div>
            <DarkHeader/>
            <Container >
                <Row style={{marginTop: '1.2em'}}>
                    <Col>
                        <Typography variant="h1" color='primary' className={classes.hello}>Hi, {_user.name} :)</Typography>
                    </Col>
                </Row>
            </Container>
            <Container className={classes.header}>
                <Row>
                <Col md={3}>
                    <UserCardEdit user={user} changeHandler={handleChange} />
                </Col>
                <Col md={9}>
                    <UserPhotosGallery edit={true}/>
                </Col>
                </Row>
                <Row>
                    <TextBox title='Bio' content={bioContent} edit={true} changeHandler={textBoxChangeHandler}/>
                    <ChipBox title='Tags' chip = {tagContent}/>
                </Row>
            </Container>
            

        </div>
    )
}