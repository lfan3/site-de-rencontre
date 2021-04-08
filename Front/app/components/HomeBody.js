import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import {PoemCard} from '../components/PoemCard'
import {makeStyles} from '@material-ui/styles'

const HomeBodyStyle = makeStyles({
    root:{
        marginTop: '2em'  
    },
    poem:{
        marginTop: '6%'
    }
})

export function HomeBody(){
    const classes = HomeBodyStyle();
    return (
        <Container className={classes.root}>
            <Row>
                <Col lg={7} md={6} >
                    <Image src='./public/images/couple.png' fluid/>
                </Col>
                <Col lg={5} md={6}  className={classes.poem}>
                    <PoemCard/>
                </Col>
            </Row>
        </Container>
    )
}