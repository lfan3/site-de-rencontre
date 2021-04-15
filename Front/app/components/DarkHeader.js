import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {StyledButton} from '../styleComponents/StyledButton'
import {makeStyles} from '@material-ui/styles'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const darkHeaderStyle = makeStyles({
    navBar:{
        backgroundColor: '#463757'
    },
    logo:{
        height: '3em'
    },
    navLink : {
        fontFamily: 'Open Sans',
        color: 'white !important',
        fontWeight: 'bold'
    },
    search : {
        margin: '1em'
    }
})

export function DarkHeader(){
    const classes = darkHeaderStyle();

    return (
        <Navbar className={classes.navBar} variant="dark">
            <Navbar.Brand href="#home">
                <Image className={classes.logo} src='./public/images/logo.svg' fluid/>
          
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home" className={classes.navLink}>Home</Nav.Link>
              <Nav.Link href="#features" className={classes.navLink}>Features</Nav.Link>
              <Nav.Link href="#pricing" className={classes.navLink}>Pricing</Nav.Link>
            </Nav>
            <Form inline className={classes.search}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
        // <Container>
        // <Row>
        //   <Col md={{ span: 6, offset: 4 }}>
        //     <img src='./public/images/logoDark.png'/>
        //   </Col>
        //   <Col md={{ span: 2}}>
 
        //   </Col>
        // </Row>
        // </Container>
    )
}