import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {makeStyles} from '@material-ui/styles'
import {StyledButton} from '../styleComponents/StyledButton'

const poemStyles = makeStyles({
    title: {
      color: '#9c29b7',
      fontFamily: 'DM Serif Display',
      fontSize : '4em'
    },
    body:{
        marginTop:'2em',
        color: '#c238eb',
        fontFamily: 'Open Sans',
        fontSize : '1em'
    },
    button:{
        marginTop:'2em',
    },
    root:{
    
    }
});

export function PoemCard(){
  const classes = poemStyles();

    return (
        <Container>
            <Row>
                <Col className={classes.root}>
                    <Row className={classes.title}>
                        <Col>
                            Idle Dreams M
                        </Col>
                    </Row>
                    <Row className={classes.body}>
                        <Col md={{ span: 9, offset: 3 }}>
                            <Row>In idle dreams of long ago,</Row>
                            <Row>I imagined my true love;</Row>
                            <Row>A perfect match, a soulmate,</Row>
                            <Row>An angel from above.</Row>
                            <Row>Now you’re here, and now I know</Row>
                            <Row>Our love will stay and thrive and grow.</Row>
                        </Col>
                    </Row>
                    <Row className={classes.body}>
                        <Col md={{ span: 9, offset: 3 }}>
                            <StyledButton>Create an account</StyledButton>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Container>

    )
}