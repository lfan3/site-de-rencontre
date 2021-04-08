import React from 'react'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/styles';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #6814b3 30%, #9d58db 90%)',
      borderRadius: 20,
      margin: '1em',
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(181, 122, 235, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

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