import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {StyledButton} from '../styleComponents/StyledButton'


export function HomeHeader(){
    return (
        <Container>
        <Row>
          <Col md={{ span: 6, offset: 4 }}>
            <img src='./public/images/logo.png'/>
          </Col>
          <Col md={{ span: 2}}>
            <StyledButton variant="contained">
                Login In
            </StyledButton>
          </Col>
        </Row>
        </Container>
    )
}