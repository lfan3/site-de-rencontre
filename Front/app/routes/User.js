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
import {UserCard} from '../components/UserCard';


const user = {
        imageLink : './public/images/alice.png',
        name : 'Cloe',
        age : '33',
        city: 'Paris',
        job: 'Developer',
        height: '167cm',
        sign: 'Balance',
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
    }
}))

const bioContent = "Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle\
Chez World Courier, nous faisons avancer le progrès. Qu’il s’agisse de concevoir et de mettre en œuvre des processus logistiques de classe mondiale pour l’industrie bio-pharmaceutique ou de fournir un soutien logistique d’urgence à d’autres secteurs clés, nous avons acquis notre renommée grâce à une fiabilité éprouvée et une exécution parfaite depuis un demi-siècle";

const tagContent = 'happy beach';
export function User(){
    const classes = useStyle();
    return(
        <div>
            <DarkHeader/>
            <Container className={classes.header}>
                <Row>
                <Col md={3}>
                    <UserCard user={user}/>
                </Col>
                <Col md={9}>
                    <UserPhotosGallery/>
                </Col>
                </Row>
                <Row>
                    <TextBox title='Bio' content={bioContent}/>
                    <ChipBox title='Tags' chip = {tagContent}/>
                </Row>
            </Container>

        </div>
    )
}