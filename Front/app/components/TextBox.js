import React from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const useStyle = makeStyles((theme)=>({
    root:{
        marginLeft:'1em',
        marginRight:'1em',
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
        boxShadow: 'inset 1px 2px 5px rgb(202, 198, 204)',
        padding:'1.5em',
        textAlign: 'justify'
    },
    textArea:{
        width:'100%',
        padding: '1em 1.5em',
        textAlign: 'justify',
        fontFamily: 'Open Sans',
        fontSize : '1em',
        lineHeight: '1.5em',
        boxShadow: '0.2px 1px 1px 2px lightgrey',
        outlineStyle: 'none',
        border:'none'
    },
    btn:{
        position: 'absolute',
        right: '8em',
        marginTop: '1em'
    }
  
}))

export const TextBox = ({title, content, edit=false, changeHandler})=>{
    const classes = useStyle();
    return(
        <Container className={classes.root} >
            <Row className={classes.title}>
            {title}
            </Row>
            <Row>
                {
                    edit 
                    ?(
                        <TextareaAutosize className={classes.textArea} onChange={changeHandler} rowsMin={15} value={content} aria-label="minimum height"  />
                     )
                    :(<Paper variant="outlined" className={classes.paper}> {content} </Paper> )
                }
            </Row>
            <Row style={{justifyContent: 'end'}}>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon/>}
                    >
                        Edit my Bio
                    </Button>

            </Row>
        </Container>
    )
}