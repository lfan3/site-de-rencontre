import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'; 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyle = makeStyles((theme)=>({
    svgWrapper:{
        height:"100%",
        width:"100%"
    },
    btn:{
        width: 'auto',
        margin:'1em',
        position:'absolute',
        right:'0.5em'
    }
}));



export const DropFile = ()=>{
    const [open, setOpen] = React.useState(false);
    const [files, setFiles] = React.useState([])
 
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleSave = (files)=>{
        //Saving files to state for further use and closing Modal.
        setOpen(false);
        setFiles(files)
    }

    const handleOpen = ()=>{
        setOpen(true);
    }

    const classes = useStyle();
    return (
        <div className={classes.svgWrapper}>
            <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                startIcon={<AddAPhotoIcon/>}
                onClick={handleOpen.bind(this)}
            >
                Add New Photo
            </Button>
            <DropzoneDialog
                open={open}
                onSave={handleSave.bind(this)}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose.bind(this)}
            />
        </div>
    );
}

