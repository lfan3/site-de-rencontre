import React from 'react'
import _ from 'lodash'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {LikeOrDislike} from '../components/LikeOrDislike'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'; 
import {CustomeTextField} from '../components/CustomeTextField';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';

const useStyle = makeStyles((theme)=>({
    root:{
        height:'100%'
    },
    cardContent:{
        "&:last-child": {
            paddingBottom: 0
        }
    },
    form:{
        marginBlockEnd:'0.5em',
        marginTop: '-0.7em'
    },
    buttonWrapper:{
        width: '100%',
        height: '6.5em',
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'column',
        textAlign:'center',
        padding:'8px'
    }
}))

//todo input verification
export const UserCardEdit = ({user, changeHandler})=>{
    const classes = useStyle();
    return(
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
            <form noValidate autoComplete="off" className={classes.form}>
              <CustomeTextField changeHandler={changeHandler} value = {user.city}  name="city" label="city"/>
              <CustomeTextField changeHandler={changeHandler} value = {user.job}   name="job" label="job"/>
              <CustomeTextField changeHandler={changeHandler} value = {user.height} name="height" label="height" />
              <CustomeTextField changeHandler={changeHandler} value = {user.sign}  name="sign" label="sign"/>
              <CustomeTextField changeHandler={changeHandler} value = {user.email} name="email"  label="email" /> 
              <div className={classes.buttonWrapper}>
                <Button color="primary" variant="outlined">Change password</Button>
                <Button
                        // className={classes.btn}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveSharpIcon/>}
                >
                    save modification
                </Button>
              </div>
            </form>
            </CardContent>
        </Card>
    )
}
